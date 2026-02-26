import supabase from './supabase';

export const getArtists = async () => {
  const { data, error } = await supabase
    .from('artists_extended')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data;
};

export const getPaginatedArtists = async ({ pageIndex, pageSize, genreId, search }) => {
  const from = pageIndex * pageSize;
  const to = from + pageSize - 1;
  const query = supabase
    .from('artists_extended')
    .select('*', { count: 'exact' })
    .or(`name.ilike.%${search}%,full_name.ilike.%${search}%`)
    .range(from, to)
    .order('created_at', { ascending: false });

  if (genreId) {
    query.eq('genre_id', genreId);
  }

  const { data, error, count } = await query;
  if (error) throw error;
  return { data, total: count };
};
