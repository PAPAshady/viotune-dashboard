import supabase from './supabase';
import { uploadFile, getFileUrl } from './storage';

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
