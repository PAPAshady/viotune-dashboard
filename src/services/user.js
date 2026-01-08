import supabase from './supabase';

export const getMe = async (userId) => {
  const { data, error } = await supabase.from('users').select('*').eq('id', userId).single();
  if (error) throw error;
  return data;
};

export const getUsers = async (pageIndex, pageSize) => {
  const from = pageIndex * pageSize;
  const to = from + pageSize - 1;
  const { data, error } = await supabase.functions.invoke(`get_users?from=${from}&to=${to}`);
  if (error) throw error;
  return { data: data.users, total: data.count };
};

export const getUsersStats = async (daysAgo) => {
  const { data, error } = await supabase.functions.invoke(`get_users_stats?daysAgo=${daysAgo}`);
  if (error) throw error;
  return data;
};
