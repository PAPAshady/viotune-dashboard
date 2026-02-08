import { queryOptions, mutationOptions, keepPreviousData } from '@tanstack/react-query';
import { toast } from 'sonner';

import {
  getSongs,
  getMostPlayedSongs,
  getZeroPlayedSongsCount,
  uploadSong,
  deleteSong,
  toggleSongStatus,
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
        position: 'top-right',
      });
    },
    onError: (err) => {
      toast.error('Upload failed', {
        description: 'Something went wrong while uploading the song.',
        duration: 6000,
        position: 'top-right',
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
        description: 'You song no longer exists in the library.',
        position: 'top-right',
      });
    },
    onError: (err) => {
      toast.error('Upload failed', {
        description: 'Something went wrong while deleting the song.',
        duration: 6000,
        position: 'top-right',
      });
      console.error('Error while uploading song => ', err);
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

      toast.success(message, { description, position: 'top-right' });
    },
    onError: (err) => console.log(err),
  });
