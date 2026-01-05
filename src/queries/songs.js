import { queryOptions, keepPreviousData } from '@tanstack/react-query';

import { getSongs, getMostPlayedSongs, getMonthlySongsStats } from '@/services/songs';

export const getSongsQuery = ({ pageIndex, pageSize }) =>
  queryOptions({
    queryKey: ['songs', { pageIndex, pageSize }],
    queryFn: () => getSongs(pageIndex, pageSize),
    placeholderData: keepPreviousData, // don't have 0 rows flash while changing pages/loading next page
  });

export const getMostPlayedSongsQuery = (options) =>
  queryOptions({
    queryKey: ['songs', 'most-played', options],
    queryFn: () => getMostPlayedSongs(options),
  });

export const getMonthlySongsStatsQuery = () =>
  queryOptions({ queryKey: ['songs', 'monthly-stats'], queryFn: getMonthlySongsStats });
