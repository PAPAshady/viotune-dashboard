import { queryOptions } from '@tanstack/react-query';

import { getCurrentStats, getStatsByDaysAgo } from '@/services/stats';

export const getCurrentStatsQuery = () =>
  queryOptions({ queryKey: ['stats', 'current'], queryFn: getCurrentStats });

export const getStatsByDaysAgoQuery = (daysAgo) =>
  queryOptions({ queryKey: ['stats', { daysAgo }], queryFn: () => getStatsByDaysAgo(daysAgo) });
