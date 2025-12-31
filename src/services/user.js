import supabase from './supabase';

export const getMe = async (userId) => {
  const { data, error } = await supabase.from('users').select('*').eq('auth_id', userId).single();
  if (error) throw error;
  return data;
};
