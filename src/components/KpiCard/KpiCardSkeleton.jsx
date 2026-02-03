import { Card, CardContent } from '@components/ui/card';
import { Skeleton } from '@components/ui/skeleton';

function KpiCardSkeleton() {
  return (
    <Card>
      <CardContent className="p-4 md:p-2 lg:p-4">
        <Skeleton className="mb-2 h-5 w-25 md:w-20 md:h-4 lg:h-5 lg:w-25 xl:w-32 xl:h-6" />
        <Skeleton className="h-4 w-16 md:w-13 md:h-3 lg:h-4 lg:w-16 xl:w-20 xl:h-5" />
      </CardContent>
    </Card>
  );
}

export default KpiCardSkeleton;
