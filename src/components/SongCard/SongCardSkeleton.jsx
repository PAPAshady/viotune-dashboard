import { Skeleton } from '@components/ui/skeleton';

function SongCardSkeleton() {
  return (
    <div className="bg-muted/40 flex items-center gap-3 rounded-lg border px-3 py-2.5">
      <Skeleton className="size-4 shrink-0 rounded-[2px]" />
      <Skeleton className="size-10 shrink-0 rounded" />
      <div className="min-w-0 flex-1 space-y-1.5">
        <Skeleton className="h-2.5 w-1/3" />
        <Skeleton className="h-2 w-1/4" />
      </div>
      <div className="flex shrink-0 items-center gap-2">
        <Skeleton className="h-4 w-9 rounded-full" />
        <Skeleton className="h-3 w-12 rounded-full" />
      </div>
    </div>
  );
}

export default SongCardSkeleton;
