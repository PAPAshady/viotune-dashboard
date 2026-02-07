import { useState } from 'react';

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenuSeparator,
} from '@components/ui/dropdown-menu';
import { Button } from '@components/ui/button';
import { MoreHorizontalIcon, PencilIcon, EyeOffIcon } from 'lucide-react';

import DeleteSongDialog from '@/components/Dialogs/Songs/DeleteSongDialog';

function SongsTableActionCell({ row }) {
  const [open, setOpen] = useState(false);

  const closeDropDown = () => setOpen(false);

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button className="size-8 p-0" variant="ghost">
          <MoreHorizontalIcon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem>
          <PencilIcon className="me-2 size-4" />
          Edit metadata
        </DropdownMenuItem>
        <DropdownMenuItem>
          <EyeOffIcon className="me-2 size-4" />
          Hide / Draft
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DeleteSongDialog onDropDownClose={closeDropDown} song={row.original} />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default SongsTableActionCell;
