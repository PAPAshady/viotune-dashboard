import { queryOptions, keepPreviousData } from '@tanstack/react-query';

import { getUsers, getUsersStats } from '@/services/user';

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
