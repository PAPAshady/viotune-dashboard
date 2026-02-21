import supabase from './supabase';

export const getPlaylists = async ({ pageIndex, pageSize, type, search }) => {
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
