import { Avatar, AvatarFallback, AvatarImage } from '@components/ui/avatar';
import { Badge } from '@components/ui/badge';
import { cn } from '@/lib/utils';

import defaultAvatar from '@assets/images/default-avatar.png';

function PlaylistsTableCreatorCell({ row }) {
  const creator = row.original.creator;

  if (!creator) return <span className="text-muted-foreground">Unknown creator</span>;

  return (
    <div className="flex items-center gap-2">
      <Avatar className="md:size-10">
        <AvatarImage src={creator.avatar_url} alt="Avatar" />
        <AvatarFallback>
          <img
            src={row.original.creator.avatar || defaultAvatar}
            className="size-full object-cover"
          />
        </AvatarFallback>
      </Avatar>
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <span>{creator.full_name}</span>
          <Badge
            className={cn('capitalize', creator.role === 'super_admin' && 'bg-blue-500 text-white')}
            variant={creator.role === 'admin' ? 'default' : 'secondary'}
          >
            {creator.role.replace('_', ' ')}
          </Badge>
        </div>
        <p className="text-muted-foreground text-xs">{creator.email}</p>
      </div>
    </div>
  );
}

export default PlaylistsTableCreatorCell;
