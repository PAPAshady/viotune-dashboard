import { queryOptions, keepPreviousData } from '@tanstack/react-query';

import {
  getPlaylists,
  getMostPlayedPlaylists,
  getMonthlyPlaylistsStats,
} from '@/services/playlists';

export const getPlaylistsQuery = ({ pageIndex, pageSize }) =>
  queryOptions({
    queryKey: ['playlists', { pageIndex, pageSize }],
    queryFn: () => getPlaylists(pageIndex, pageSize),
    placeholderData: keepPreviousData, // don't have 0 rows flash while changing pages/loading next page
  });

export const getMostPlayedPlaylistsQuery = (options) =>
  queryOptions({
    queryKey: ['playlists', 'most-played', options],
    queryFn: () => getMostPlayedPlaylists(options),
  });

export const getMonthlyPlaylistsStatsQuery = () =>
  queryOptions({ queryKey: ['playlists', 'monthly-stats'], queryFn: getMonthlyPlaylistsStats });
