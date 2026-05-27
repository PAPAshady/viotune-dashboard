import { useState } from 'react';

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenuSeparator,
} from '@components/ui/dropdown-menu';
import { Button } from '@components/ui/button';
import { MoreHorizontalIcon, PencilIcon, EyeOffIcon, Trash2Icon } from 'lucide-react';
import { useMutation } from '@tanstack/react-query';

import useArtistSheet from '@/store/artistsSheet.store';
import DeleteDialog from '@/components/Dialogs/DeleteDialog';
import { deleteArtistMutation } from '@/queries/artists';

function ArtistsTableActionCell({ row }) {
  const [open, setOpen] = useState(false);
  const setIsAlbumSheetOpen = useArtistSheet((state) => state.setOpen); // open open edit/upload artist form
  const setIsEditMode = useArtistSheet((state) => state.setIsEditMode); // set edit/uplaod artist form mode
  const setArtist = useArtistSheet((state) => state.setArtist); // set seleced artist to edit
  const artist = row.original;
  const { mutate: deleteArtist, isPending: isDeleting } = useMutation(deleteArtistMutation());

  const closeDropDown = () => setOpen(false);

  const openAlbumSheet = () => {
    setArtist(artist);
    setIsEditMode(true);
    setIsAlbumSheetOpen(true);
  };

  const onArtistDelete = () => {
    deleteArtist(artist, { onSuccess: closeDropDown });
  };

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button className="size-8 p-0" variant="ghost">
          <MoreHorizontalIcon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onSelect={openAlbumSheet}>
          <PencilIcon className="me-2 size-4" />
          Edit metadata
        </DropdownMenuItem>
        <DropdownMenuItem>
          <EyeOffIcon className="me-2 size-4" />
          Hide / Unpublish
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DeleteDialog
          onDelete={onArtistDelete}
          isPending={isDeleting}
          onDropDownClose={closeDropDown}
          title="Delete artist ?"
          description="Are you sure you want to delete this artist ? This action cannot be undone."
        />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default ArtistsTableActionCell;
