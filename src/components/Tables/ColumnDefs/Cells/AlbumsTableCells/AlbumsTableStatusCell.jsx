import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

function AlbumsTableStatusCell({ getValue }) {
  return (
    <Badge
      className={cn(
        'text-white capitalize',
        getValue() === 'published' ? 'bg-blue-500' : 'bg-orange-500'
      )}
    >
      {getValue()}
    </Badge>
  );
}

export default AlbumsTableStatusCell;
