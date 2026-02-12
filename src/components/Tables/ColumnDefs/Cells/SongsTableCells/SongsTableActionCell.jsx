import { useState } from 'react';

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenuSeparator,
} from '@components/ui/dropdown-menu';
import { Button } from '@components/ui/button';
import { MoreHorizontalIcon, PencilIcon, EyeOffIcon, EyeIcon } from 'lucide-react';
import { useMutation } from '@tanstack/react-query';
import { Spinner } from '@/components/ui/spinner';

import DeleteSongDialog from '@/components/Dialogs/Songs/DeleteSongDialog';
import { toggleSongStatusMutation } from '@/queries/songs';
import useSongSheet from '@/store/songSheet.store';

function SongsTableActionCell({ row }) {
  const setIsSongSheetOpen = useSongSheet((state) => state.setOpen); // open open edit/upload song form
  const setIsEditMode = useSongSheet((state) => state.setIsEditMode); // set edit/uplaod song form mode
  const setSong = useSongSheet((state) => state.setSong); // set seleced song to edit
  const [open, setOpen] = useState(false);
  const statusMutation = useMutation(toggleSongStatusMutation());
  const song = row.original;

  const closeDropDown = () => setOpen(false);

  const onStatusChange = async (e) => {
    e.preventDefault();
    await statusMutation.mutateAsync(song);
    closeDropDown();
  };

  const openEditSongForm = () => {
    setIsEditMode(true);
    setSong(song)
    setIsSongSheetOpen(true);
  };

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button className="size-8 p-0" variant="ghost">
          <MoreHorizontalIcon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onSelect={openEditSongForm}>
          <PencilIcon className="me-2 size-4" />
          Edit metadata
        </DropdownMenuItem>
        <DropdownMenuItem disabled={statusMutation.isPending} onSelect={onStatusChange}>
          {statusMutation.isPending ? (
            <Spinner className="me-2" />
          ) : song.status === 'published' ? (
            <EyeOffIcon className="me-2 size-4" />
          ) : (
            <EyeIcon className="me-2 size-4" />
          )}

          {song.status === 'published' ? 'Draft' : 'Publish'}
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DeleteSongDialog onDropDownClose={closeDropDown} song={song} />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default SongsTableActionCell;
