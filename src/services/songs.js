import supabase from './supabase';

export const getSongs = async ({
  pageIndex,
  pageSize,
  search,
  artistId,
  albumId,
  genreId,
  status,
}) => {
  const from = pageIndex * pageSize;
  const to = from + pageSize - 1;
  let query = supabase
    .from('songs_extended')
    .select('*', { count: 'exact' })
    .range(from, to)
    .or(`title.ilike.%${search}%,artist.ilike.%${search}%`)
    .order('created_at', { ascending: false });

  if (artistId) query.eq('artist_id', artistId);
  if (albumId) query.eq('album_id', albumId);
  if (genreId) query.eq('genre_id', genreId);
  if (status) query.eq('status', status);

  const { data, error, count } = await query;

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

export const uploadSong = async (songData) =>
  await supabase.from('songs').insert(songData).select().single();
