import { Skeleton } from '@components/ui/skeleton';

function UsersTableProvidersCellSkeleton() {
  return (
    <div className="ms-3 flex items-center">
      <Skeleton className="size-6.5 rounded-full" />
      <Skeleton className="-ms-2 size-6.5 rounded-full" />
      <Skeleton className="-ms-2 size-6.5 rounded-full" />
    </div>
  );
}

export default UsersTableProvidersCellSkeleton;
