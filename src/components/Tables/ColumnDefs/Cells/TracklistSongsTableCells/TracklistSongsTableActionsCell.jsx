import { Trash } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { useMutation } from '@tanstack/react-query';

import { removeSongFromAlbumMutation } from '@/queries/albums';
import { removeSongFromPlaylistMutation } from '@/queries/playlists';

function TracklistSongsTableActionsCell({ table, row }) {
  const tracklist = table.options.meta.tracklist;
  const isAlbum = tracklist.type === 'album';
  const { id } = tracklist;


  const { isPending, mutate } = useMutation(
    isAlbum ? removeSongFromAlbumMutation(id) : removeSongFromPlaylistMutation(id)
  );

  return (
    <Button disbaled={isPending} variant="ghost" onClick={() => mutate(row.original.id)}>
      {isPending ? <Spinner /> : <Trash className="text-red-400" />}
    </Button>
  );
}

export default TracklistSongsTableActionsCell;
