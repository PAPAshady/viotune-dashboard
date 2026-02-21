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
import usePlaylistsSheet from '@/store/playlistsSheer.store';

function PlaylistsTableActionCell({ row }) {
  const [open, setOpen] = useState(false);
  const setIsPlaylistsSheetOpen = usePlaylistsSheet((state) => state.setOpen); // open open edit/upload playlist form
  const setIsEditMode = usePlaylistsSheet((state) => state.setIsEditMode); // set edit/uplaod playlist form mode
  const setPlaylist = usePlaylistsSheet((state) => state.setPlaylist); // set seleced playlist to edit
  const playlist = row.original;

  const closeDropDown = () => setOpen(false);

  const openPlaylistsSheet = () => {
    setPlaylist(playlist);
    setIsEditMode(true);
    setIsPlaylistsSheetOpen(true);
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
        <DropdownMenuItem className="text-destructive" onSelect={closeDropDown}>
          <Trash2Icon className="me-2 size-4" />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default PlaylistsTableActionCell;
