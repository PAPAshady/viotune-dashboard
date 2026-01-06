import supabase from './supabase';

export const getPlaylists = async (pageIndex, pageSize) => {
  const from = pageIndex * pageSize;
  const to = from + pageSize - 1;
  const { data, error, count } = await supabase
    .from('playlists_extended_admin')
    .select('*', { count: 'exact' })
    .range(from, to)
    .order('created_at', { ascending: false });
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
