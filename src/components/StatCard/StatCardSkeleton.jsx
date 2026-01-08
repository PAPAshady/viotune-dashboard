import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@components/ui/skeleton';

function StatCard() {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center justify-between gap-2">
          <div className="xs:max-w-40 w-full">
            <Skeleton className="xs:w-full mb-3 h-3 w-30" />
            <Skeleton className="xs:w-2/3 h-4.5 w-20" />
            <p className="mt-4 flex items-center text-xs md:text-sm">
              <Skeleton className="mr-2 size-7 min-w-7" />
              <Skeleton className="xs:w-3/5 h-3 w-30" />
            </p>
          </div>

          <Skeleton className="size-12 min-w-12 rounded-full" />
        </div>
      </CardContent>
    </Card>
  );
}

export default StatCard;
