import supabase from './supabase';
import { uploadFile, getFileUrl, deleteFiles } from './storage';

export const getAllAlbums = async () => {
  const { data, error } = await supabase
    .from('albums_extended')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data;
};

export const getPeginatedAlbums = async ({
  pageIndex,
  pageSize,
  artistId,
  genreId,
  releaseYear,
  status,
  search,
}) => {
  const from = pageIndex * pageSize;
  const to = from + pageSize - 1;
  let query = supabase
    .from('albums_extended')
    .select('*', { count: 'exact' })
    .range(from, to)
    .or(`title.ilike.%${search}%,artist.ilike.%${search}%`)
    .order('created_at', { ascending: false });

  if (artistId) query.eq('artist_id', artistId);
  if (genreId) query.eq('genre_id', genreId);
  if (status) query.eq('status', status);
  if (releaseYear)
    query
      .gte('release_date', `${releaseYear}-01-01`)
      .lt('release_date', `${+releaseYear + 1}-01-01`);

  const { data, error, count } = await query;
  if (error) throw error;
  return { data, total: count };
};

export const toggleAlbumStatus = async (album) => {
  const newStatus = album.status === 'published' ? 'draft' : 'published';
  const { data, error } = await supabase
    .from('albums')
    .update({ status: newStatus })
    .eq('id', album.id)
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const createAlbum = async (data) => {
  // since we send artist and genre data in a string format, we have to extract them them.
  const [artist_id, artist_name] = data.artist ? data.artist.split('|') : [null, 'Unknown artist'];
  const [genre_id, genre_title] = data.genre ? data.genre.split('|') : [null, null];

  delete data.genre; // delete genre property because we already exctracted it

  const newAlbum = { ...data, genre_id, genre_title, artist: artist_name, artist_id };

  // upload album coverfile if it exists
  if (newAlbum.coverFile && newAlbum.coverFile.length > 0) {
    const coverFile = newAlbum.coverFile[0];
    const uploadedAt = new Date().toISOString();

    const { data: coverFileData, error: coverFileError } = await uploadFile(
      'album-covers',
      `${data.title}-${artist_name}-${uploadedAt}`,
      coverFile
    );

    if (coverFileError) throw coverFileError;

    newAlbum.cover_path = coverFileData.path;
    newAlbum.cover = getFileUrl('album-covers', coverFileData.path);
  }

  // delete coverFile property because we already exctracted it
  delete newAlbum.coverFile;

  const { data: dbData, error: dbError } = await supabase
    .from('albums')
    .insert(newAlbum)
    .select()
    .single();

  if (dbError) throw dbError;

  return dbData;
};

export const deleteAlbum = async (data) => {
  // delete cover file from storage if exists
  if (data.cover_path) {
    const { error: coverDeleteError } = await deleteFiles('album-covers', [data.cover_path]);
    if (coverDeleteError) throw coverDeleteError;
  }

  // remove album metadata from database
  const { error, data: dbData } = await supabase
    .from('albums')
    .delete()
    .eq('id', data.id)
    .select()
    .single();

  if (error) throw error;

  return dbData;
};

export const deleteAlbums = async (albumRows) => {
  const coverPaths = albumRows.map((row) => row.original.cover_path);
  const albumIds = albumRows.map((row) => row.original.id);

  // delete cover files
  const { error: coversDeleteErrors } = await deleteFiles('album-covers', coverPaths);
  if (coversDeleteErrors) throw coversDeleteErrors;

  // remove albums metadata from database
  const { data, error } = await supabase.from('albums').delete().in('id', albumIds).select();

  if (error) throw error;

  return data;
};

export const updateAlbum = async ({ modifiedFields, prevAlbumData }) => {
  const updatedArtist = modifiedFields?.artist;
  const updatedGenre = modifiedFields?.genre;
  const updatedTitle = modifiedFields?.title;
  const uploadedAt = new Date().toISOString(); // we use this timestamp in the name of our files in storage to be unique

  // extract artist_id and artist_name from 'modifiedFields.artist'
  const [artist_id, artist_name] = updatedArtist
    ? updatedArtist.split('|')
    : [null, 'Unknown artist'];

  const [genre_id, genre_title] = updatedGenre ? updatedGenre.split('|') : [null, null];

  const data = { ...modifiedFields };

  // update cover in case user changed it.
  if (data.coverFile || data.existingCoverUrl === null) {
    // delete previous cover file from storage
    const { error: prevCoverFileDeleteError } = await deleteFiles('album-covers', [
      prevAlbumData.cover_path,
    ]);

    if (prevCoverFileDeleteError) throw prevCoverFileDeleteError;
    data.cover = null;
    data.cover_path = null;

    // upload new cover if user selected a new cover
    if (data.coverFile) {
      const newCoverFile = data.coverFile[0];

      // include updated title and artist name in the new cover file name (if changed)
      const newCoverFileName = `${updatedTitle ? updatedTitle : prevAlbumData.title}-${updatedArtist ? artist_name : prevAlbumData.artist}-${uploadedAt}`;

      // upload new cover file to storage
      const { data: newCoverFileData, error: newCoverFileError } = await uploadFile(
        'album-covers',
        newCoverFileName,
        newCoverFile
      );
      if (newCoverFileError) throw newCoverFileError;
      data.cover_path = newCoverFileData.path;
      data.cover = getFileUrl('album-covers', newCoverFileData.path);
    }
  }

  // normalize data structure because we want to send it to database

  if (updatedArtist) {
    data.artist = artist_name;
    data.artist_id = artist_id;
  }

  if (updatedGenre) {
    data.genre_title = genre_title;
    data.genre_id = genre_id;
  }

  // remove unnecessary properties from data because we will send "data" to postgres database
  delete data.existingCoverUrl;
  delete data.coverFile;
  delete data.genre;

  const { data: dbData, error: dbError } = await supabase
    .from('albums')
    .update(data)
    .eq('id', prevAlbumData.id)
    .select()
    .single();

  if (dbError) throw dbError;

  return dbData;
};

export const addSongToAlbum = async (songsData) => {
  const { data, error } = await supabase.from('album_songs').insert(songsData).select();
  if (error) throw error;
  return data;
};

export const removeSongFromAlbum = async (song_id, album_id) => {
  const { data, error } = await supabase
    .from('album_songs')
    .delete()
    .match({ album_id, song_id })
    .select();
  if (error) throw error;
  return data;
};
