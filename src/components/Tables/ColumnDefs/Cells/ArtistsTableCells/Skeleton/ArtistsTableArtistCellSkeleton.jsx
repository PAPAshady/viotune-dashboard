import { Skeleton } from '@components/ui/skeleton';

function ArtistsTableArtistCellSkeleton() {
  return (
    <div className="flex items-center gap-1.5">
      <Skeleton className="size-8 rounded-full md:size-10"></Skeleton>
      <div className="w-12 max-w-40 grow space-y-1.5 lg:w-20">
        <Skeleton className="h-2 lg:h-2.5"></Skeleton>
        <Skeleton className="h-2 w-2/3 lg:h-2.5"></Skeleton>
      </div>
    </div>
  );
}

export default ArtistsTableArtistCellSkeleton;
