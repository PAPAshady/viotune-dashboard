import { queryOptions, mutationOptions, keepPreviousData } from '@tanstack/react-query';
import { toast } from 'sonner';

import {
  getSongs,
  getMostPlayedSongs,
  getZeroPlayedSongsCount,
  uploadSong,
  deleteSong,
  toggleSongStatus,
  deleteSongs,
  updateSong,
} from '@/services/songs';
import queryClient from '@/QueryClient';

export const getSongsQuery = (options) =>
  queryOptions({
    queryKey: ['songs', options],
    queryFn: () => getSongs(options),
    placeholderData: keepPreviousData, // don't have 0 rows flash while changing pages/loading next page
  });

export const getMostPlayedSongsQuery = (options) =>
  queryOptions({
    queryKey: ['songs', 'most-played', options],
    queryFn: () => getMostPlayedSongs(options),
  });

export const getZeroPlayedSongsCountQuery = () =>
  queryOptions({
    queryKey: ['songs', 'zero-played-count'],
    queryFn: getZeroPlayedSongsCount,
  });

export const uploadSongMutation = () =>
  mutationOptions({
    queryKey: ['songs'],
    mutationFn: uploadSong,
    onSuccess: () => {
      queryClient.invalidateQueries(['songs']);
      toast.success('Song uploaded successfully', {
        description: 'Your song is now added to the library and ready to be streamed.',
      });
    },
    onError: (err) => {
      toast.error('Upload failed', {
        description: 'Something went wrong while uploading the song.',
      });
      console.error('Error while uploading song => ', err);
    },
  });

export const deleteSongMutation = () =>
  mutationOptions({
    queryKey: ['songs'],
    mutationFn: deleteSong,
    onSuccess: () => {
      queryClient.invalidateQueries(['songs']);
      toast.success('Song deleted successfully', {
        description: 'The song has been permanently removed from your library.',
      });
    },
    onError: (err) => {
      toast.error('Unable to Delete Song', {
        description: 'We couldn’t delete the song. Please try again.',
      });
      console.error('Error while uploading song => ', err);
    },
  });

export const deleteSongsMutation = () =>
  mutationOptions({
    queryKey: ['songs'],
    mutationFn: deleteSongs,
    onSuccess: () => {
      queryClient.invalidateQueries(['songs']);
      toast.success('All songs deleted successfully.', {
        description: 'Your songs no longer exist in the library.',
      });
    },
    onError: (err) => {
      toast.error('Upload failed.', {
        description: 'Something went wrong while deleting songs.',
      });
      console.error('Error while deleting songs => ', err);
    },
  });

export const toggleSongStatusMutation = () =>
  mutationOptions({
    queryKey: ['songs'],
    mutationFn: toggleSongStatus,
    onSuccess: (data) => {
      queryClient.invalidateQueries(['songs']);

      const isPublished = data.status === 'published';
      const message = isPublished ? 'Song published' : 'Song moved to draft';
      const description = isPublished
        ? 'This song is now public and visible to everyone.'
        : 'This song is no longer public and has been moved back to drafts.';

      toast.success(message, { description });
    },
    onError: (err) => {
      toast.error('Update failed.', {
        description: 'We couldn’t update the song. Please try again.',
      });
      console.error('Error while changing song status => ', err);
    },
  });

export const updateSongMutation = () =>
  mutationOptions({
    queryKey: ['songs'],
    mutationFn: updateSong,
    onSuccess: () => {
      queryClient.invalidateQueries(['songs']);
      toast.success('Song updated successfully', {
        message:
          'Your changes have been saved. The song details are now up to date and ready to go.',
      });
    },
    onError: (err) => {
      toast.error('Update failed.', { message: 'We couldn’t update the song. Please try again.' });
      console.error('Error while updating song => ', err);
    },
  });
