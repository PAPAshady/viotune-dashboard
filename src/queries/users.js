import { queryOptions, keepPreviousData, mutationOptions } from '@tanstack/react-query';
import { toast } from 'sonner';

import { getUsers, getUsersStats, updateUser } from '@/services/user';
import queryClient from '@/QueryClient';

export const getUsersQuery = (filters) =>
  queryOptions({
    queryKey: ['users', filters],
    queryFn: () => getUsers(filters),
    placeholderData: keepPreviousData,
  });

export const getUsersStatsQuery = () =>
  queryOptions({
    queryKey: ['users', 'stats'],
    queryFn: getUsersStats,
  });

export const updateUserMutationOptions = () =>
  mutationOptions({
    mutationKey: ['users'],
    mutationFn: updateUser,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['users'] });
      toast.success('User updated successfully');
    },
    onError: (err) => {
      toast.error('Failed to update user. Please try again.');
      console.log('Error updating user => ', err);
    },
  });
