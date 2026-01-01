import supabase from './supabase';

export const getGenres = async () => {
  const { data, error } = await supabase.from('genres_extended').select('*');
  if (error) throw error;
  return data;
};
