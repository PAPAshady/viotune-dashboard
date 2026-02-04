import supabase from './supabase';

export const getAllAlbums = async () => {
  const { data, error } = await supabase
    .from('albums_extended')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data;
};

export const getPeginatedAlbums = async (pageIndex, pageSize) => {
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
