import supabase from './supabase';

export const getMe = async (userId) => {
  const { data, error } = await supabase.from('users').select('*').eq('id', userId).single();
  if (error) throw error;
  return data;
};

export const getUsers = async ({ pageIndex, pageSize, role, provider, status, search }) => {
  const from = pageIndex * pageSize;
  const to = from + pageSize - 1;

  const params = new URLSearchParams({ from, to });
  if (role) params.append('role', role);
  if (provider) params.append('provider', provider);
  if (status) params.append('status', status);
  if (search) params.append('search', search);

  const { data, error } = await supabase.functions.invoke(`get_users?${params.toString()}`);
  if (error) throw error;
  return { data: data.users, total: data.count };
};

export const getUsersStats = async () => {
  const { data, error } = await supabase.functions.invoke(`get_users_stats`);
  if (error) throw error;
  return data;
};

export const updateUser = async (userData) => {
  const { data, error } = await supabase.functions.invoke('rapid-service', { body: userData });
  if (error) throw error;
  return data;
};

export const toggleUserStatus = async (userData) => {
  const { data, error } = await supabase.functions.invoke('rapid-service', { body: userData });
  if (error) throw error;
  return data;
};
