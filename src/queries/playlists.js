import { queryOptions, keepPreviousData } from '@tanstack/react-query';

import { getPlaylists } from '@/services/playlists';

export const getPlaylistsQuery = ({ pageIndex, pageSize }) =>
  queryOptions({
    queryKey: ['playlists', { pageIndex, pageSize }],
    queryFn: () => getPlaylists(pageIndex, pageSize),
    placeholderData: keepPreviousData, // don't have 0 rows flash while changing pages/loading next page
  });
