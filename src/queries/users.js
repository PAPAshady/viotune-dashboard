import { queryOptions, keepPreviousData } from '@tanstack/react-query';

import { getUsers, getUsersStats } from '@/services/user';

export const getUsersQuery = ({ pageIndex, pageSize }) =>
  queryOptions({
    queryKey: ['users', { pageIndex, pageSize }],
    queryFn: () => getUsers(pageIndex, pageSize),
    placeholderData: keepPreviousData,
  });

export const getUsersStatsQuery = (daysAgo) =>
  queryOptions({ queryKey: ['users', 'stats'], queryFn: () => getUsersStats(daysAgo) });
