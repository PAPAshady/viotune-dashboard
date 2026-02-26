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
import useArtistSheet from '@/store/artistsSheet.store';

function ArtistsTableActionCell({ row }) {
  const [open, setOpen] = useState(false);
  const setIsAlbumSheetOpen = useArtistSheet((state) => state.setOpen); // open open edit/upload artist form
  const setIsEditMode = useArtistSheet((state) => state.setIsEditMode); // set edit/uplaod artist form mode
  const setArtist = useArtistSheet((state) => state.setArtist); // set seleced artist to edit
  const artist = row.original;

  const openAlbumSheet = () => {
    setArtist(artist);
    setIsEditMode(true);
    setIsAlbumSheetOpen(true);
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
        <DropdownMenuItem className="text-destructive">
          <Trash2Icon className="me-2 size-4" />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default ArtistsTableActionCell;
