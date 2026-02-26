import { queryOptions, keepPreviousData } from '@tanstack/react-query';

import { getArtists, getPaginatedArtists } from '@/services/artists';

export const getArtistsQuery = () =>
  queryOptions({
    queryKey: ['artists'],
    queryFn: getArtists,
  });

export const getPaginatedArtistsQuery = (options) =>
  queryOptions({
    queryKey: ['artists', options],
    queryFn: () => getPaginatedArtists(options),
    placeholderData: keepPreviousData,
  });
