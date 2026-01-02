import { queryOptions, keepPreviousData } from '@tanstack/react-query';

import { getArtists } from '@/services/artists';

export const getArtistsQuery = ({ pageIndex, pageSize }) =>
  queryOptions({
    queryKey: ['artists', { pageIndex, pageSize }],
    queryFn: () => getArtists(pageIndex, pageSize),
    placeholderData: keepPreviousData,
  });
