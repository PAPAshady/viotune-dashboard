import { queryOptions, keepPreviousData, mutationOptions } from '@tanstack/react-query';
import { toast } from 'sonner';

import {
  getPlaylists,
  getMostPlayedPlaylists,
  getPlaylistsStats,
  createPlaylist,
  updatePlaylist,
  deletePlaylist,
  deletePlaylists,
  addSongToPlaylist,
  removeSongFromPlaylist,
} from '@/services/playlists';
import queryClient from '@/QueryClient';

export const getPlaylistsQuery = (options) =>
  queryOptions({
    queryKey: ['playlists', options],
    queryFn: () => getPlaylists(options),
    placeholderData: keepPreviousData, // don't have 0 rows flash while changing pages/loading next page
  });

export const getMostPlayedPlaylistsQuery = (options) =>
  queryOptions({
    queryKey: ['playlists', 'most-played', options],
    queryFn: () => getMostPlayedPlaylists(options),
  });

export const getPlaylistsStatsQuery = () =>
  queryOptions({
    queryKey: ['playlists', 'stats'],
    queryFn: getPlaylistsStats,
  });

export const createPlaylistMutation = () =>
  queryOptions({
    queryKey: ['playlists'],
    mutationFn: createPlaylist,
    onSuccess: () => {
      queryClient.invalidateQueries(['playlists']);
      toast.success('Playlist created successfully', {
        description: 'Your playlist is now added to the library and ready to be streamed.',
      });
    },
    onError: (err) => {
      toast.error('Upload failed', {
        description: 'Something went wrong while creating the playlist.',
      });
      console.error('Error while uploading playlist => ', err);
    },
  });

export const updatePlaylistMutation = () =>
  mutationOptions({
    queryKey: ['playlists'],
    mutationFn: updatePlaylist,
    onSuccess: () => {
      queryClient.invalidateQueries(['playlists']);
      toast.success('Playlist updated successfully', {
        description:
          'Your changes have been saved. The playlist details are now up to date and ready to go.',
      });
    },
    onError: (err) => {
      toast.error('Update failed.', {
        description: 'We couldn’t update the playlist. Please try again.',
      });
      console.error('Error while updating playlist => ', err);
    },
  });

export const deletePlaylistMutation = () =>
  mutationOptions({
    queryKey: ['playlists'],
    mutationFn: deletePlaylist,
    onSuccess: () => {
      queryClient.invalidateQueries(['playlists']);
      toast.success('Playlist deleted successfully', {
        description: 'The playlist has been permanently removed from your library.',
      });
    },
    onError: (err) => {
      toast.error('Unable to Delete playlist', {
        description: 'We couldn’t delete the playlist. Please try again.',
      });
      console.error('Error while uploading playlist => ', err);
    },
  });

export const deletePlaylistsMutation = () =>
  mutationOptions({
    queryKey: ['playlists'],
    mutationFn: deletePlaylists,
    onSuccess: () => {
      queryClient.invalidateQueries(['playlists']);
      toast.success('All playlists deleted successfully.', {
        description: 'Your playlists no longer exist in the library.',
      });
    },
    onError: (err) => {
      toast.error('Deletion failed.', {
        description: 'Something went wrong while deleting playlists.',
      });
      console.error('Error while deleting playlists => ', err);
    },
  });

export const addSongToPlaylistMutation = (playlistId) =>
  mutationOptions({
    queryKey: ['playlists', { playlistId }],
    mutationFn: addSongToPlaylist,
    enabled: !!playlistId,
    onSuccess: () => {
      queryClient.invalidateQueries(['songs', { playlistId }]);
      queryClient.invalidateQueries(['playlists']);
      toast.success('Playlist updated successfully', {
        description:
          'Your changes have been saved. The playlist details are now up to date and ready to go.',
      });
    },
    onError: (err) => {
      toast.error('Update failed.', {
        description: 'We couldn’t update the playlist. Please try again.',
      });
      console.error('Error while updating playlist => ', err);
    },
  });

export const removeSongFromPlaylistMutation = (playlistId) =>
  mutationOptions({
    queryKey: ['playlists', { playlistId }],
    mutationFn: (songId) => removeSongFromPlaylist(songId, playlistId),
    onSuccess: () => {
      queryClient.invalidateQueries(['songs', { playlistId }]);
      queryClient.invalidateQueries(['playlists']);
      toast.success('Playlist updated successfully', {
        description:
          'Your changes have been saved. The playlist details are now up to date and ready to go.',
      });
    },
    onError: (err) => {
      toast.error('Update failed.', {
        description: 'We couldn’t update the playlist. Please try again.',
      });
      console.error('Error while updating album => ', err);
    },
  });
