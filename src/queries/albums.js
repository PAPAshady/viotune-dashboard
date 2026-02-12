import { queryOptions, keepPreviousData } from '@tanstack/react-query';

import { getPeginatedAlbums, getAllAlbums } from '@/services/albums';

export const getAllAlbumsQuery = () =>
  queryOptions({ queryKey: ['albums'], queryFn: getAllAlbums });

export const getPeginatedAlbumsQuery = (options) =>
  queryOptions({
    queryKey: ['albums', options],
    queryFn: () => getPeginatedAlbums(options),
    placeholderData: keepPreviousData, // don't have 0 rows flash while changing pages/loading next page
  });
