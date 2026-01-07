import { queryOptions } from '@tanstack/react-query';

import {
  getCurrentStats,
  getStatsByDaysAgo,
  getStatsSince,
  getPlaysStatsSince,
  getUsersStatsSince,
} from '@/services/stats';

export const getCurrentStatsQuery = () =>
  queryOptions({ queryKey: ['stats', 'current'], queryFn: getCurrentStats });

export const getStatsByDaysAgoQuery = (daysAgo) =>
  queryOptions({ queryKey: ['stats', { daysAgo }], queryFn: () => getStatsByDaysAgo(daysAgo) });

export const getStatsSinceQuery = (since) =>
  queryOptions({ queryKey: ['stats', { since }], queryFn: () => getStatsSince(since) });

export const getPlaysStatsSinceQuery = (since) =>
  queryOptions({
    queryKey: ['stats', 'plays', { since }],
    queryFn: () => getPlaysStatsSince(since),
  });

export const getUsersStatsSinceQuery = (since) =>
  queryOptions({
    queryKey: ['stats', 'users', { since }],
    queryFn: () => getUsersStatsSince(since),
  });
