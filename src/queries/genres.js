import { queryOptions, mutationOptions } from '@tanstack/react-query';
import { toast } from 'sonner';

import {
  getGenres,
  getGenresStats,
  updateGenre,
  createGenre,
  deleteGenre,
} from '@/services/genres';
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

export const deleteGenreMutation = () =>
  mutationOptions({
    queryKey: ['genres'],
    mutationFn: deleteGenre,
    onSuccess: () => {
      queryClient.invalidateQueries(['genres']);
      toast.success('Genre deleted successfully', {
        description: 'The genre has been permanently removed from your library.',
      });
    },
    onError: (err) => {
      toast.error('Unable to Delete Genre', {
        description: 'We couldn’t delete the genre. Please try again.',
      });
      console.error('Error while deleting genre => ', err);
    },
  });
