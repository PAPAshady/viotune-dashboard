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
