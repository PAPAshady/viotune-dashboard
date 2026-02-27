import { Card, CardContent } from '@components/ui/card';
import { Separator } from '@components/ui/separator';

import { Skeleton } from '@components/ui/skeleton';

function GenreCardSkeleton() {
  return (
    <Card className="flex flex-col">
      <div className="aspect-video overflow-hidden">
        <Skeleton className="size-full object-cover" />
      </div>
      <CardContent className="-mt-1 flex grow flex-col px-3">
        <div className="h-full grow">
          <div className="mb-4 space-y-3">
            <Skeleton className="h-3 w-3/4" />
            <div className="space-y-2">
              <Skeleton className="h-2 w-full" />
              <Skeleton className="h-2 w-full" />
              <Skeleton className="h-2 w-1/2" />
            </div>
          </div>
          <div className="flex flex-wrap gap-x-1 gap-y-2">
            {Array(3)
              .fill()
              .map((_, index) => (
                <Skeleton key={index} className="h-4 w-14 rounded-full" />
              ))}
          </div>
        </div>
        <Separator className="my-4" />
        <div className="flex flex-wrap items-center gap-3 pb-4">
          <div className="flex items-center gap-1 text-xs">
            <Skeleton className="size-5 rounded-full" />
            <Skeleton className="h-2 w-12 rounded-full" />
          </div>
          <div className="flex items-center gap-1 text-xs">
            <Skeleton className="size-5 rounded-full" />
            <Skeleton className="h-2 w-12 rounded-full" />
          </div>
        </div>
        <div className="flex gap-2">
          <Skeleton className="h-6 grow rounded-md" />
          <Skeleton className="h-6 grow rounded-md" />
        </div>
      </CardContent>
    </Card>
  );
}

export default GenreCardSkeleton;
