import { queryOptions, keepPreviousData } from '@tanstack/react-query';

import { getUsers } from '@/services/user';

export const getUsersQuery = (filters) =>
  queryOptions({
    queryKey: ['users', filters],
    queryFn: () => getUsers(filters),
    placeholderData: keepPreviousData,
  });
