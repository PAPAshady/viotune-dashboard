import { cn } from '@/lib/utils';
import { Skeleton } from '@components/ui/skeleton';

function TextSkeleton({ className }) {
  return <Skeleton className={cn('h-3 max-w-20 w-full', className)} />;
}

export default TextSkeleton;
