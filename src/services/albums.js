import supabase from './supabase';

export const getAllAlbums = async () => {
  const { data, error } = await supabase
    .from('albums_extended')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data;
};

export const getPeginatedAlbums = async ({
  pageIndex,
  pageSize,
  artistId,
  genreId,
  releaseYear,
  status,
  search,
}) => {
  const from = pageIndex * pageSize;
  const to = from + pageSize - 1;
  let query = supabase
    .from('albums_extended')
    .select('*', { count: 'exact' })
    .range(from, to)
    .or(`title.ilike.%${search}%,artist.ilike.%${search}%`)
    .order('created_at', { ascending: false });

  if (artistId) query.eq('artist_id', artistId);
  if (genreId) query.eq('genre_id', genreId);
  if (status) query.eq('status', status);
  if (releaseYear)
    query
      .gte('release_date', `${releaseYear}-01-01`)
      .lt('release_date', `${+releaseYear + 1}-01-01`);

  const { data, error, count } = await query;
  if (error) throw error;
  return { data, total: count };
};

export const toggleAlbumStatus = async (album) => {
  const newStatus = album.status === 'published' ? 'draft' : 'published';
  const { data, error } = await supabase
    .from('albums')
    .update({ status: newStatus })
    .eq('id', album.id)
    .select()
    .single();

  if (error) throw error;
  return data;
};
