import { queryOptions, keepPreviousData } from '@tanstack/react-query';

import { getPlaylists, getMostPlayedPlaylists, getPlaylistsStats } from '@/services/playlists';

export const getPlaylistsQuery = (options) =>
  queryOptions({
    queryKey: ['playlists', options],
    queryFn: () => getPlaylists(options),
    placeholderData: keepPreviousData, // don't have 0 rows flash while changing pages/loading next page
  });

export const getMostPlayedPlaylistsQuery = (options) =>
  queryOptions({
    queryKey: ['playlists', 'most-played', options],
    queryFn: () => getMostPlayedPlaylists(options),
  });

export const getPlaylistsStatsQuery = () =>
  queryOptions({
    queryKey: ['playlists', 'stats'],
    queryFn: getPlaylistsStats,
  });
