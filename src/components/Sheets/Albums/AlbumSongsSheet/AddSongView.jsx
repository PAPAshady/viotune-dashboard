import { useState } from 'react';

import { SheetHeader, SheetTitle, SheetDescription } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import SearchInput from '@/components/SearchInput/SearchInput';

function AddSongView({ onBack }) {
  const [searchValue, setSearchValue] = useState('');
  return (
    <div className="animate-in slide-in-from-right-4 fade-in duration-300">
      <SheetHeader className="mb-10 border-b">
        <div className="flex items-center gap-4 py-2">
          <Button variant="ghost" onClick={onBack}>
            <ArrowLeft />
          </Button>
          <div className="space-y-1">
            <SheetTitle className="text-xl font-bold">Add Songs</SheetTitle>
            <SheetDescription>Browse existing songs to add to "album title"</SheetDescription>
          </div>
        </div>
      </SheetHeader>
      <div className="mb-4 px-4">
        <SearchInput
          placeholder="Search songs by title or artist"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
      </div>
      
    </div>
  );
}

export default AddSongView;
