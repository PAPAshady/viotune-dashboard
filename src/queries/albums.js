import { queryOptions, keepPreviousData, mutationOptions } from '@tanstack/react-query';
import { toast } from 'sonner';

import {
  getPeginatedAlbums,
  getAllAlbums,
  toggleAlbumStatus,
  createAlbum,
  deleteAlbum,
  deleteAlbums,
  updateAlbum,
  addSongToAlbum,
  removeSongFromAlbum,
} from '@/services/albums';
import queryClient from '@/QueryClient';

export const getAllAlbumsQuery = () =>
  queryOptions({ queryKey: ['albums'], queryFn: getAllAlbums });

export const getPeginatedAlbumsQuery = (options) =>
  queryOptions({
    queryKey: ['albums', options],
    queryFn: () => getPeginatedAlbums(options),
    placeholderData: keepPreviousData, // don't have 0 rows flash while changing pages/loading next page
  });

export const toggleAlbumStatusMutation = () =>
  mutationOptions({
    queryKey: ['albums'],
    mutationFn: toggleAlbumStatus,
    onSuccess: (data) => {
      queryClient.invalidateQueries(['albums']);
      const isPublished = data.status === 'published';
      const message = isPublished ? 'Album published' : 'Album moved to draft';
      const description = isPublished
        ? 'This album is now public and visible to everyone.'
        : 'This album is no longer public and has been moved back to drafts.';

      toast.success(message, { description });
    },
    onError: (err) => {
      toast.error('Update failed.', {
        description: 'We couldn’t update the album. Please try again.',
      });
      console.error('Error while changing album status => ', err);
    },
  });

export const createAlbumMutation = () =>
  mutationOptions({
    queryKey: ['albums'],
    mutationFn: createAlbum,
    onSuccess: () => {
      queryClient.invalidateQueries(['albums']);
      toast.success('Album created successfully', {
        description: 'Your album is now added to the library and ready to be streamed.',
      });
    },
    onError: (err) => {
      toast.error('Upload failed', {
        description: 'Something went wrong while creating the album.',
      });
      console.error('Error while uploading album => ', err);
    },
  });

export const deleteAlbumMutation = () =>
  mutationOptions({
    queryKey: ['albums'],
    mutationFn: deleteAlbum,
    onSuccess: () => {
      queryClient.invalidateQueries(['albums']);
      toast.success('Album deleted successfully', {
        description: 'The album has been permanently removed from your library.',
      });
    },
    onError: (err) => {
      toast.error('Unable to Delete slbum', {
        description: 'We couldn’t delete the album. Please try again.',
      });
      console.error('Error while uploading album => ', err);
    },
  });

export const deleteAlbumsMutation = () =>
  mutationOptions({
    queryKey: ['albums'],
    mutationFn: deleteAlbums,
    onSuccess: () => {
      queryClient.invalidateQueries(['albums']);
      toast.success('All albums deleted successfully.', {
        description: 'Your albums no longer exist in the library.',
      });
    },
    onError: (err) => {
      toast.error('Deletion failed.', {
        description: 'Something went wrong while deleting albums.',
      });
      console.error('Error while deleting albums => ', err);
    },
  });

export const updateAlbumMutation = () =>
  mutationOptions({
    queryKey: ['albums'],
    mutationFn: updateAlbum,
    onSuccess: () => {
      queryClient.invalidateQueries(['albums']);
      toast.success('Album updated successfully', {
        description:
          'Your changes have been saved. The album details are now up to date and ready to go.',
      });
    },
    onError: (err) => {
      toast.error('Update failed.', {
        description: 'We couldn’t update the album. Please try again.',
      });
      console.error('Error while updating album => ', err);
    },
  });

export const addSongToAlbumMutation = (albumId) =>
  mutationOptions({
    queryKey: ['albums', { albumId }],
    mutationFn: addSongToAlbum,
    enabled: !!albumId,
    onSuccess: () => {
      queryClient.invalidateQueries(['songs', { albumId }]);
      queryClient.invalidateQueries(['albums']);
      toast.success('Album updated successfully', {
        description:
          'Your changes have been saved. The album details are now up to date and ready to go.',
      });
    },
    onError: (err) => {
      toast.error('Update failed.', {
        description: 'We couldn’t update the album. Please try again.',
      });
      console.error('Error while updating album => ', err);
    },
  });

export const removeSongFromAlbumMutation = (albumId) =>
  mutationOptions({
    queryKey: ['albums', { albumId }],
    mutationFn: (songId) => removeSongFromAlbum(songId, albumId),
    onSuccess: () => {
      queryClient.invalidateQueries(['songs', { albumId }]);
      queryClient.invalidateQueries(['albums']);
      toast.success('Album updated successfully', {
        description:
          'Your changes have been saved. The album details are now up to date and ready to go.',
      });
    },
    onError: (err) => {
      toast.error('Update failed.', {
        description: 'We couldn’t update the album. Please try again.',
      });
      console.error('Error while updating album => ', err);
    },
  });
