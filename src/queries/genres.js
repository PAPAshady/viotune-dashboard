import { queryOptions, mutationOptions } from '@tanstack/react-query';
import { toast } from 'sonner';

import { getGenres, getGenresStats, updateGenre, createGenre } from '@/services/genres';
import queryClient from '@/QueryClient';

export const getGenresQuery = () => queryOptions({ queryKey: ['genres'], queryFn: getGenres });

export const getGenresStatsQuery = () =>
  queryOptions({ queryKey: ['genres', 'stats'], queryFn: getGenresStats });

export const createGenreMutation = () =>
  mutationOptions({
    queryKey: ['genres'],
    mutationFn: createGenre,
    onSuccess: () => {
      queryClient.invalidateQueries(['genres']);
      toast.success('Genre created successfully', {
        description: 'Your genre is now added to the library.',
      });
    },
    onError: (err) => {
      toast.error('Creation failed', {
        description: 'Something went wrong while creating the genre.',
      });
      console.error('Error while creating genre => ', err);
    },
  });

export const updateGenreMutation = () =>
  mutationOptions({
    queryKey: ['genres'],
    mutationFn: updateGenre,
    onSuccess: () => {
      queryClient.invalidateQueries(['genres']);
      toast.success('Genre updated successfully', {
        description:
          'Your changes have been saved. The genre details are now up to date and ready to go.',
      });
    },
    onError: (err) => {
      toast.error('Update failed.', {
        description: 'We couldn’t update the genre. Please try again.',
      });
      console.error('Error while updating genre => ', err);
    },
  });
