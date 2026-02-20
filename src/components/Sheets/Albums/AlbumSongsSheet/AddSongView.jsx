import { useRef, useState } from 'react';

import { SheetHeader, SheetTitle, SheetDescription, SheetFooter } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Music } from 'lucide-react';
import { useInfiniteQuery } from '@tanstack/react-query';
import useIntersectionObserver from '../../../../hooks/useIntersectionObserver';
import { Spinner } from '@/components/ui/spinner';
import { useMutation } from '@tanstack/react-query';
import {
  Empty,
  EmptyMedia,
  EmptyTitle,
  EmptyHeader,
  EmptyDescription,
} from '@/components/ui/empty';

import SearchInput from '@/components/SearchInput/SearchInput';
import SongCard from '@/components/SongCard/SongCard';
import SongCardSkeleton from '@/components/SongCard/SongCardSkeleton';
import { getAlbumRecommendedSongsInfiniteQuery } from '@/queries/songs';
import useDebounce from '@/hooks/useDebounce';
import { addSongToAlbumMutation } from '@/queries/albums';

function AddSongView({ onBack, album }) {
  const [selectedSongs, setSelectedSongs] = useState(new Set());
  const containerRef = useRef(null);
  const [searchValue, setSearchValue] = useState('');
  const debouncedSearchValue = useDebounce(searchValue);
  const addSongMutation = useMutation(addSongToAlbumMutation(album?.id));
  const { data, isPending, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery(
    getAlbumRecommendedSongsInfiniteQuery({
      pageSize: 10,
      search: debouncedSearchValue,
      albumId: album?.id,
    })
  );
  const { targetRef } = useIntersectionObserver({
    onIntersect: hasNextPage && fetchNextPage,
  });
  const numberOfAvailableSongs = Number(data?.pages.flat().length);

  const songSelectHandler = (songId) => {
    const updatedSongs = new Set(selectedSongs);
    if (updatedSongs.has(songId)) updatedSongs.delete(songId);
    else updatedSongs.add(songId);
    setSelectedSongs(updatedSongs);
  };

  const onSubmit = () => {
    const data = [...selectedSongs].map((songId) => ({ album_id: album.id, song_id: songId }));
    addSongMutation.mutate(data);
  };

  return (
    <div className="animate-in slide-in-from-right-4 fade-in flex h-full grow flex-col duration-300">
      <SheetHeader className="mb-10 border-b">
        <div className="flex items-center gap-4 py-2">
          <Button variant="ghost" onClick={onBack}>
            <ArrowLeft className="xs:size-6 size-5" />
          </Button>
          <div className="space-y-1">
            <SheetTitle className="text-xl font-bold">Add Songs</SheetTitle>
            <SheetDescription>Browse existing songs to add to "{album.title}"</SheetDescription>
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
      <div className="grow space-y-1.5 overflow-y-auto px-4 py-2" ref={containerRef}>
        {isPending
          ? Array(10)
              .fill()
              .map((_, index) => <SongCardSkeleton key={index} />)
          : data.pages
              .flat()
              .map((song) => (
                <SongCard
                  key={song.id}
                  isSelected={selectedSongs.has(song.id)}
                  onSelect={songSelectHandler}
                  {...song}
                />
              ))}
        {!numberOfAvailableSongs && (
          <Empty className="border border-dashed md:p-6!">
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <Music />
              </EmptyMedia>
              <EmptyTitle>No tracks available</EmptyTitle>
              <EmptyDescription>Check later or add new songs</EmptyDescription>
            </EmptyHeader>
          </Empty>
        )}

        {!isPending && <div className="p-2" ref={targetRef}></div>}
        {isFetchingNextPage && (
          <div className="flex justify-center px-4 pb-4">
            <Spinner className="size-10" />
          </div>
        )}
      </div>
      <SheetFooter className="border-t">
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground text-sm">
            {numberOfAvailableSongs} songs available
          </span>
          <div className="ms-auto flex items-center justify-end gap-4">
            <Button variant="outline" onClick={onBack}>
              Cancel
            </Button>
            <Button
              className="bg-blue-500 text-white hover:bg-blue-600"
              disabled={!selectedSongs.size || addSongMutation.isPending}
              onClick={onSubmit}
            >
              {addSongMutation.isPending ? (
                <>
                  <Spinner />
                  Adding...
                </>
              ) : (
                'Add'
              )}
            </Button>
          </div>
        </div>
      </SheetFooter>
    </div>
  );
}

export default AddSongView;
