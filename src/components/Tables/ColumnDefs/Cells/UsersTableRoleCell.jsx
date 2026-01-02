import { Badge } from '@components/ui/badge';
import { cn } from '@/lib/utils';

function UsersTableRoleCell({ getValue }) {
  return (
    <Badge
      className={cn('capitalize', getValue() === 'super_admin' && 'bg-blue-500 text-white')}
      variant={getValue() === 'user' ? 'secondary' : 'default'}
    >
      {getValue().replace('_', ' ')}
    </Badge>
  );
}

export default UsersTableRoleCell;
