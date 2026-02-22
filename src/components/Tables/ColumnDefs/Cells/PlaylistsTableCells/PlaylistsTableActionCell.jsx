import { useState } from 'react';

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenuSeparator,
} from '@components/ui/dropdown-menu';
import { Button } from '@components/ui/button';
import { MoreHorizontalIcon, PencilIcon, Trash2Icon } from 'lucide-react';
import { useMutation } from '@tanstack/react-query';

import usePlaylistsSheet from '@/store/playlistsSheer.store';
import DeleteDialog from '@/components/Dialogs/DeleteDialog';
import { deletePlaylistMutation } from '@/queries/playlists';

function PlaylistsTableActionCell({ row }) {
  const [open, setOpen] = useState(false);
  const setIsPlaylistsSheetOpen = usePlaylistsSheet((state) => state.setOpen); // open open edit/upload playlist form
  const setIsEditMode = usePlaylistsSheet((state) => state.setIsEditMode); // set edit/uplaod playlist form mode
  const setPlaylist = usePlaylistsSheet((state) => state.setPlaylist); // set seleced playlist to edit
  const playlist = row.original;
  const deletionMutation = useMutation(deletePlaylistMutation());

  const closeDropDown = () => setOpen(false);

  const openPlaylistsSheet = () => {
    setPlaylist(playlist);
    setIsEditMode(true);
    setIsPlaylistsSheetOpen(true);
  };

  const onPlaylistDelete = () => {
    deletionMutation.mutate(playlist, { onSuccess: closeDropDown });
  };

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button className="size-8 p-0" variant="ghost">
          <MoreHorizontalIcon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onSelect={openPlaylistsSheet}>
          <PencilIcon className="me-2 size-4" />
          Edit metadata
        </DropdownMenuItem>

        <DropdownMenuSeparator />
        <DeleteDialog
          onDelete={onPlaylistDelete}
          isPending={deletionMutation.isPending}
          onDropDownClose={closeDropDown}
          title="Delete playlist ?"
          description="Are you sure you want to delete this playlist ? This action cannot be undone."
        />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default PlaylistsTableActionCell;
