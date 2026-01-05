import { Skeleton } from '@components/ui/skeleton';

function UsersTableUserCellSkeleton() {
  return (
    <div className="flex items-center gap-1.5">
      <Skeleton className="size-8 rounded-full md:size-10"></Skeleton>
      <Skeleton className="h-2.5 w-35"></Skeleton>
    </div>
  );
}

export default UsersTableUserCellSkeleton;
