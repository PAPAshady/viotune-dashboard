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

export const updatePlaylist = async ({ modifiedFields, prevPlaylistData }) => {
  return { modifiedFields, prevPlaylistData };
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
