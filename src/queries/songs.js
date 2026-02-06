import { queryOptions, mutationOptions, keepPreviousData } from '@tanstack/react-query';

import {
  getSongs,
  getMostPlayedSongs,
  getZeroPlayedSongsCount,
  uploadSong,
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
    onSuccess: () => queryClient.invalidateQueries(['songs']),
  });
