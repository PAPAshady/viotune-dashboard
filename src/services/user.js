import supabase from './supabase';

export const getMe = async (userId) => {
  const { data, error } = await supabase.from('users').select('*').eq('id', userId).single();
  if (error) throw error;
  return data;
};

export const getUsers = async ({ pageIndex, pageSize, role, provider, status }) => {
  const from = pageIndex * pageSize;
  const to = from + pageSize - 1;

  const params = new URLSearchParams({ from, to });
  if (role) params.append('role', role);
  if (provider) params.append('provider', provider);
  if (status) params.append('status', status);

  const { data, error } = await supabase.functions.invoke(`get_users?${params.toString()}`);
  if (error) throw error;
  return { data: data.users, total: data.count };
};

export const getUsersStats = async (daysAgo) => {
  const { data, error } = await supabase.functions.invoke(`get_users_stats?daysAgo=${daysAgo}`);
  if (error) throw error;
  return data;
};
