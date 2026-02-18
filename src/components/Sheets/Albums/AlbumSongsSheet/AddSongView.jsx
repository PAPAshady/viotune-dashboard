import { useState } from 'react';

import { SheetHeader, SheetTitle, SheetDescription, SheetFooter } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useInfiniteQuery } from '@tanstack/react-query';

import SearchInput from '@/components/SearchInput/SearchInput';
import SongCard from '@/components/SongCard/SongCard';
import { getAlbumRecommendedSongsInfiniteQuery } from '@/queries/songs';

function AddSongView({ onBack }) {
  const [searchValue, setSearchValue] = useState('');
  const { data: songs } = useInfiniteQuery(getAlbumRecommendedSongsInfiniteQuery());

  return (
    <div className="animate-in slide-in-from-right-4 fade-in flex h-full grow flex-col duration-300">
      <SheetHeader className="mb-10 border-b">
        <div className="flex items-center gap-4 py-2">
          <Button variant="ghost" onClick={onBack}>
            <ArrowLeft className="xs:size-6 size-5" />
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
      <div className="grow space-y-1 overflow-y-auto px-4 py-2">
        {songs?.pages.flat().map((song) => (
          <SongCard key={song.id} {...song} />
        ))}
        <div className="bg-red p-2"></div>
      </div>
      <SheetFooter className="border-t">
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground text-sm">
            {songs?.pages.flat().length} songs available
          </span>
          <div className="flex items-center justify-end gap-4">
            <Button variant="outline" onClick={onBack}>
              Cancel
            </Button>
            <Button className="bg-blue-500 text-white hover:bg-blue-600">Add</Button>
          </div>
        </div>
      </SheetFooter>
    </div>
  );
}

export default AddSongView;
