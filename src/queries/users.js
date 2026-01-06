import { queryOptions, keepPreviousData } from '@tanstack/react-query';

import { getUsers } from '@/services/user';

export const getUsersQuery = ({ pageIndex, pageSize }) =>
  queryOptions({
    queryKey: ['users', { pageIndex, pageSize }],
    queryFn: () => getUsers(pageIndex, pageSize),
    placeholderData: keepPreviousData,
  });
