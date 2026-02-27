import { queryOptions } from '@tanstack/react-query';

import { getGenres, getGenresStats } from '@/services/genres';

export const getGenresQuery = () => queryOptions({ queryKey: ['genres'], queryFn: getGenres });

export const getGenresStatsQuery = () =>
  queryOptions({ queryKey: ['genres', 'stats'], queryFn: getGenresStats });
