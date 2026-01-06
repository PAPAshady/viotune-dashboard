import { queryOptions, keepPreviousData } from '@tanstack/react-query';

import { getAlbums } from '@/services/albums';

export const getAlbumsQuery = ({ pageIndex, pageSize }) =>
  queryOptions({
    queryKey: ['albums', { pageIndex, pageSize }],
    queryFn: () => getAlbums(pageIndex, pageSize),
    placeholderData: keepPreviousData, // don't have 0 rows flash while changing pages/loading next page
  });
