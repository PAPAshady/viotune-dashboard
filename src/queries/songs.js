import { queryOptions } from '@tanstack/react-query';

import { getSongs, getMostPlayedSongs } from '@/services/songs';

export const getSongsQuery = ({ pageIndex, pageSize }) =>
  queryOptions({
    queryKey: ['songs', { pageIndex, pageSize }],
    queryFn: () => getSongs(pageIndex, pageSize),
  });

export const getMostPlayedSongsQuery = (options) =>
  queryOptions({
    queryKey: ['songs', 'most-played', options],
    queryFn: () => getMostPlayedSongs(options),
  });
