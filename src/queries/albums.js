import { queryOptions, keepPreviousData, mutationOptions } from '@tanstack/react-query';
import { toast } from 'sonner';

import { getPeginatedAlbums, getAllAlbums, toggleAlbumStatus } from '@/services/albums';
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
