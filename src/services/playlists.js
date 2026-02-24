import supabase from './supabase';
import { getFileUrl, uploadFile, deleteFiles } from './storage';

export const getPlaylists = async ({
  pageIndex,
  pageSize,
  type,
  playlistCreator,
  tracksRange,
  search,
}) => {
  const from = pageIndex * pageSize;
  const to = from + pageSize - 1;
  let query = supabase
    .from('playlists_extended_admin')
    .select('*', { count: 'exact' })
    .or(`title.ilike.%${search}%`)
    .range(from, to)
    .order('created_at', { ascending: false });

  if (type) {
    query.eq('is_public', type === 'public');
  }

  if (playlistCreator) {
    query.or(`creator->>full_name.ilike.%${playlistCreator}%`);
  }

  if (tracksRange) {
    if (tracksRange === '50+') {
      query.gte('totaltracks', 50);
    } else {
      const [min, max] = tracksRange.split('-');
      query = query.gte('totaltracks', min).lte('totaltracks', max);
    }
  }

  const { data, error, count } = await query;

  if (error) throw error;
  return { data, total: count };
};

export const getMostPlayedPlaylists = async ({ limit = 5 }) => {
  const { data, error } = await supabase
    .from('most_played_playlists')
    .select('*')
    .limit(limit)
    .order('play_count', { ascending: false });
  if (error) throw error;
  return data;
};

export const getPlaylistsStats = async () => {
  const { data, error } = await supabase.functions.invoke('get-playlists-stats');
  if (error) throw error;
  return data;
};

export const createPlaylist = async (formData) => {
  const newPlaylist = { ...formData, is_public: formData.visibility === '1' }; // convert visibility string to boolean for database

  delete newPlaylist.visibility; // delete visibility because we already converted it to is_public which is what we need for database

  // upload playlist coverfile if it exists
  if (newPlaylist.coverFile && newPlaylist.coverFile.length > 0) {
    const coverFile = newPlaylist.coverFile[0];
    const uploadedAt = new Date().toISOString();

    const newPlaylistCoverFileName = `${newPlaylist.title}-${newPlaylist.is_public ? 'public' : 'private'}-${uploadedAt}`;

    const { data: coverFileData, error: coverFileError } = await uploadFile(
      'playlist-covers',
      newPlaylistCoverFileName,
      coverFile
    );

    if (coverFileError) throw coverFileError;

    newPlaylist.cover_path = coverFileData.path;
    newPlaylist.cover = getFileUrl('playlist-covers', coverFileData.path);
  }

  // delete coverFile property because we already exctracted it
  delete newPlaylist.coverFile;

  const { data: dbData, error: dbError } = await supabase
    .from('playlists')
    .insert(newPlaylist)
    .select()
    .single();

  if (dbError) throw dbError;

  return dbData;
};

export const deletePlaylist = async (data) => {
  // delete cover file from storage if exists
  if (data.cover_path) {
    const { error: coverDeleteError } = await deleteFiles('playlist-covers', [data.cover_path]);
    if (coverDeleteError) throw coverDeleteError;
  }

  // remove playlist metadata from database
  const { error, data: dbData } = await supabase
    .from('playlists')
    .delete()
    .eq('id', data.id)
    .select()
    .single();

  if (error) throw error;

  return dbData;
};

export const deletePlaylists = async (playlistRows) => {
  const coverPaths = playlistRows.map((row) => row.original.cover_path);
  const playlistIds = playlistRows.map((row) => row.original.id);

  // delete cover files
  const { error: coversDeleteErrors } = await deleteFiles('playlist-covers', coverPaths);
  if (coversDeleteErrors) throw coversDeleteErrors;

  // remove playlists metadata from database
  const { data, error } = await supabase.from('playlists').delete().in('id', playlistIds).select();

  if (error) throw error;

  return data;
};

export const updatePlaylist = async ({ modifiedFields, prevPlaylistData }) => {
  const updatedTitle = modifiedFields?.title;
  const uploadedAt = new Date().toISOString(); // we use this timestamp in the name of our files in storage to be unique

  const data = { ...modifiedFields, is_public: modifiedFields.visibility === '1' }; // convert visibility string to boolean for database

  // update cover in case user changed it.
  if (data.coverFile || data.existingCoverUrl === null) {
    // delete previous cover file from storage
    const { error: prevCoverFileDeleteError } = await deleteFiles('playlist-covers', [
      prevPlaylistData.cover_path,
    ]);

    if (prevCoverFileDeleteError) throw prevCoverFileDeleteError;
    data.cover = null;
    data.cover_path = null;

    // upload new cover if user selected a new cover
    if (data.coverFile) {
      const newCoverFile = data.coverFile[0];

      // include updated title and playlist status in the new cover file name (if changed)
      const newCoverFileName = `${updatedTitle ? updatedTitle : prevPlaylistData.title}-${modifiedFields.visibility !== undefined ? (modifiedFields.visibility === '1' ? 'public' : 'private') : prevPlaylistData.is_public ? 'public' : 'private'}-${uploadedAt}`;

      // upload new cover file to storage
      const { data: newCoverFileData, error: newCoverFileError } = await uploadFile(
        'playlist-covers',
        newCoverFileName,
        newCoverFile
      );
      if (newCoverFileError) throw newCoverFileError;
      data.cover_path = newCoverFileData.path;
      data.cover = getFileUrl('playlist-covers', newCoverFileData.path);
    }
  }

  // remove unnecessary properties from data because we will send "data" to postgres database
  delete data.existingCoverUrl;
  delete data.coverFile;
  delete data.visibility; // we already converted visibility to is_public which is what we need for database

  const { data: dbData, error: dbError } = await supabase
    .from('playlists')
    .update(data)
    .eq('id', prevPlaylistData.id)
    .select()
    .single();

  if (dbError) throw dbError;

  return dbData;
};
