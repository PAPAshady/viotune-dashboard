import { queryOptions } from '@tanstack/react-query';

import { getCurrentStats, getStatsByDaysAgo, getStatsSince } from '@/services/stats';

export const getCurrentStatsQuery = () =>
  queryOptions({ queryKey: ['stats', 'current'], queryFn: getCurrentStats });

export const getStatsByDaysAgoQuery = (daysAgo) =>
  queryOptions({ queryKey: ['stats', { daysAgo }], queryFn: () => getStatsByDaysAgo(daysAgo) });

export const getStatsSinceQuery = (since) =>
  queryOptions({ queryKey: ['stats', { since }], queryFn: () => getStatsSince(since) });
