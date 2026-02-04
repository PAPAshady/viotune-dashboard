import { queryOptions, keepPreviousData } from '@tanstack/react-query';

import { getArtists, getPaginatedArtists } from '@/services/artists';

export const getArtistsQuery = () =>
  queryOptions({
    queryKey: ['artists'],
    queryFn: getArtists,
  });

export const getPaginatedArtistsQuery = ({ pageIndex, pageSize }) =>
  queryOptions({
    queryKey: ['artists', { pageIndex, pageSize }],
    queryFn: () => getPaginatedArtists(pageIndex, pageSize),
    placeholderData: keepPreviousData,
  });
