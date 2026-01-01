import { queryOptions } from '@tanstack/react-query';

import { getGenres } from '@/services/genres';

export const getGenresQuery = () => queryOptions({ queryKey: ['genres'], queryFn: getGenres });
