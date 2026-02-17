import { useState } from 'react';

import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { Music } from 'lucide-react';
import DetailsView from './DetailsView';
import AddSongView from './AddSongView';

function AlbumSongsSheet({ album }) {
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState('details');

  const onOpenSheetChange = (isOpen) => {
    !isOpen && setTimeout(() => setTab('details'), 300);
    setOpen(isOpen);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenSheetChange}>
      <SheetTrigger asChild>
        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
          <Music className="me-2 size-4" />
          View Songs
        </DropdownMenuItem>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-xl! lg:max-w-2xl!">
        {tab === 'details' ? (
          <DetailsView album={album} open={open} onAddSongClick={() => setTab('add-song')} />
        ) : (
          <AddSongView onBack={() => setTab('details')} />
        )}
      </SheetContent>
    </Sheet>
  );
}

export default AlbumSongsSheet;
