import supabase from './supabase';

export const getGenres = async () => {
  const { data, error } = await supabase.from('genres_extended').select('*');
  if (error) throw error;
  return data;
};

export const getGenresStats = async () => {
  const { data, error } = await supabase.functions.invoke('get_genres_stats');
  if (error) throw error;
  return data;
};
