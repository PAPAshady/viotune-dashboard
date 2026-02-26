import { queryOptions, keepPreviousData, mutationOptions } from '@tanstack/react-query';
import { toast } from 'sonner';

import { getArtists, getPaginatedArtists, createArtist, updateArtist } from '@/services/artists';
import queryClient from '@/QueryClient';

export const getArtistsQuery = () =>
  queryOptions({
    queryKey: ['artists'],
    queryFn: getArtists,
  });

export const getPaginatedArtistsQuery = (options) =>
  queryOptions({
    queryKey: ['artists', options],
    queryFn: () => getPaginatedArtists(options),
    placeholderData: keepPreviousData,
  });

export const createArtistMutation = () =>
  mutationOptions({
    queryKey: ['artists'],
    mutationFn: createArtist,
    onSuccess: () => {
      queryClient.invalidateQueries(['artists']);
      toast.success('Artist created successfully', {
        description: 'Your artist is now added to the library.',
      });
    },
    onError: (err) => {
      toast.error('Creation failed', {
        description: 'Something went wrong while creating the artist.',
      });
      console.error('Error while creating artist => ', err);
    },
  });

export const updateArtistMutation = () =>
  mutationOptions({
    queryKey: ['artists'],
    mutationFn: updateArtist,
    onSuccess: () => {
      queryClient.invalidateQueries(['artists']);
      toast.success('Artist updated successfully', {
        message:
          'Your changes have been saved. The artist details are now up to date and ready to go.',
      });
    },
    onError: (err) => {
      toast.error('Update failed.', {
        message: 'We couldn’t update the artist. Please try again.',
      });
      console.error('Error while updating artist => ', err);
    },
  });
