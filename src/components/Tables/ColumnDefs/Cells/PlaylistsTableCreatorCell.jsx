import { Avatar, AvatarFallback, AvatarImage } from '@components/ui/avatar';
import { Badge } from '@components/ui/badge';

import defaultAvatar from '@assets/images/default-avatar.png';

function PlaylistsTableCreatorCell({ row }) {
  const hasCreator = row.original.creator;

  if(!hasCreator) return <span className='text-muted-foreground'>Unknown creator</span>;

  return (
    <div className="flex items-center gap-2">
      <Avatar className="md:size-10">
        <AvatarImage src={row.original.creator?.avatar_url} alt="Avatar" />
        <AvatarFallback>
          <img src={defaultAvatar} className="size-full object-cover" />
        </AvatarFallback>
      </Avatar>
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <span>{row.original.creator?.full_name}</span>
          <Badge variant="secondary">{row.original.creator?.role.replace('_', ' ')}</Badge>
        </div>
        <p className="text-muted-foreground text-xs">{row.original.creator?.email}</p>
      </div>
    </div>
  );
}

export default PlaylistsTableCreatorCell;
