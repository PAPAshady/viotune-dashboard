import { queryOptions } from '@tanstack/react-query';

import { getSongs } from '@/services/songs';

export const getSongsQuery = ({ pageIndex, pageSize }) =>
  queryOptions({
    queryKey: ['songs', { pageIndex, pageSize }],
    queryFn: () => getSongs(pageIndex, pageSize),
  });
