import { Skeleton } from '@components/ui/skeleton';

function SongsTableSongCellSkeleton() {
  return (
    <div className="flex items-center gap-2">
      <Skeleton className="size-12 rounded-md"></Skeleton>
      <div className="w-12 max-w-45 grow space-y-1.5 lg:w-20">
        <Skeleton className="h-2 lg:h-2.5"></Skeleton>
        <Skeleton className="h-2 w-2/3 lg:h-2.5"></Skeleton>
      </div>
    </div>
  );
}

export default SongsTableSongCellSkeleton;
