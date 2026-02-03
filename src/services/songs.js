import supabase from './supabase';

export const getSongs = async (pageIndex, pageSize) => {
  const from = pageIndex * pageSize;
  const to = from + pageSize - 1;
  const { data, error, count } = await supabase
    .from('songs_extended')
    .select('*', { count: 'exact' })
    .range(from, to)
    .order('created_at', { ascending: false });
  if (error) throw error;
  return { data, total: count };
};

export const getMostPlayedSongs = async ({ limit = 5 }) => {
  const { data, error } = await supabase
    .from('most_played_songs')
    .select('*')
    .limit(limit)
    .order('play_count', { ascending: false });
  if (error) throw error;
  return data;
};

export const getZeroPlayedSongsCount = async () => {
  const { data, error } = await supabase.rpc('get_zero_play_songs');
  if (error) throw error;
  return data;
};
