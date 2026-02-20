import { Trash } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { useMutation } from '@tanstack/react-query';

import { removeSongFromAlbumMutation } from '@/queries/albums';

function AlbumSongsTableActionsCell({ table, row }) {
  const { isPending, mutate } = useMutation(
    removeSongFromAlbumMutation(table.options.meta.album.id)
  );

  return (
    <Button disbaled={isPending} variant="ghost" onClick={() => mutate(row.original.id)}>
      {isPending ? <Spinner /> : <Trash className="text-red-400" />}
    </Button>
  );
}

export default AlbumSongsTableActionsCell;
