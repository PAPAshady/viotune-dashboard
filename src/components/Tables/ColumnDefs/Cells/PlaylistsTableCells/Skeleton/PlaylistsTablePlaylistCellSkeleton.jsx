import { Skeleton } from '@components/ui/skeleton';

function PlaylistsTablePlaylistCellSkeleton() {
  return (
    <div className="flex items-center gap-2">
      <Skeleton className="size-12 min-w-12 rounded-md" />
      <Skeleton className="h-2.5 w-10 max-w-30 grow lg:w-16" />
    </div>
  );
}

export default PlaylistsTablePlaylistCellSkeleton;
