import supabase from './supabase';

export const getAlbums = async (pageIndex, pageSize) => {
  const from = pageIndex * pageSize;
  const to = from + pageSize - 1;
  const { data, error, count } = await supabase
    .from('albums_extended')
    .select('*', { count: 'exact' })
    .range(from, to)
    .order('created_at', { ascending: false });
  if (error) throw error;
  return { data, total: count };
};

export const getMonthlyAlbumsStats = async () => {
  const now = new Date();
  const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

  const { count: total, error: totalError } = await supabase
    .from('albums')
    .select('*', { count: 'exact', head: true });
  if (totalError) throw totalError;

  const { count: total30DaysAgo, error: total30DaysAgoError } = await supabase
    .from('albums')
    .select('*', { count: 'exact', head: true })
    .lt('created_at', thirtyDaysAgo.toISOString());
  if (total30DaysAgoError) throw total30DaysAgoError;

  return { total, total30DaysAgo };
};
