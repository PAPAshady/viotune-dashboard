import { useState } from 'react';

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenuSeparator,
} from '@components/ui/dropdown-menu';
import { Button } from '@components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { MoreHorizontal, Pencil, EyeOff, Eye, Trash2 } from 'lucide-react';
import { useMutation } from '@tanstack/react-query';

import useAlbumSheet from '@/store/albumsSheet.store';
import { toggleAlbumStatusMutation } from '@/queries/albums';

function AlbumsTableActionCell({ row }) {
  const [open, setOpen] = useState(false);
  const setIsAlbumSheetOpen = useAlbumSheet((state) => state.setOpen); // open open edit/upload album form
  const setIsEditMode = useAlbumSheet((state) => state.setIsEditMode); // set edit/uplaod album form mode
  const setAlbum = useAlbumSheet((state) => state.setAlbum); // set seleced album to edit
  const album = row.original;
  const isPublished = album.status === 'published';
  const albumStatusMutation = useMutation(toggleAlbumStatusMutation());

  const closeDropDown = () => setOpen(false);

  const openAlbumSheet = () => {
    setAlbum(album);
    setIsEditMode(true);
    setIsAlbumSheetOpen(true);
  };

  const onStatusChange = async (e) => {
    e.preventDefault();
    await albumStatusMutation.mutateAsync(album);
    closeDropDown();
  };

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button className="size-8 p-0" variant="ghost">
          <MoreHorizontal />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onSelect={openAlbumSheet}>
          <Pencil className="me-2 size-4" />
          Edit metadata
        </DropdownMenuItem>
        <DropdownMenuItem disabled={albumStatusMutation.isPending} onSelect={onStatusChange}>
          {albumStatusMutation.isPending ? (
            <Spinner className="me-2" />
          ) : isPublished ? (
            <EyeOff className="me-2 size-4" />
          ) : (
            <Eye className="me-2 size-4" />
          )}
          {isPublished ? 'Draft' : 'Publish'}
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="text-destructive">
          <Trash2 className="me-2 size-4" />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default AlbumsTableActionCell;
