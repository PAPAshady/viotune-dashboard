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

export const getMonthlySongsStats = async () => {
  const now = new Date();
  const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

  const { count: total, error: totalError } = await supabase
    .from('songs')
    .select('*', { count: 'exact', head: true });
  if (totalError) throw totalError;

  const { count: total30DaysAgo, error: total30DaysAgoError } = await supabase
    .from('songs')
    .select('*', { count: 'exact', head: true })
    .lt('created_at', thirtyDaysAgo.toISOString());
  if (total30DaysAgoError) throw total30DaysAgoError;

  return { total, total30DaysAgo };
};
