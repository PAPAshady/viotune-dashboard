import { Avatar, AvatarFallback, AvatarImage } from '@components/ui/avatar';

import defaultAvatar from '@assets/images/default-avatar.png';

function UsersTableUserCell({ row }) {
  const { avatar_url, full_name } = row.original;

  return (
    <div className="flex items-center gap-1.5">
      <Avatar className="md:size-9">
        <AvatarImage src={avatar_url} alt={full_name} className="object-cover" />
        <AvatarFallback>
          <img src={defaultAvatar} className="size-full object-cover" />
        </AvatarFallback>
      </Avatar>
      <div className="space-y-0.5">
        <p className="font-semibold">{full_name}</p>
      </div>
    </div>
  );
}

export default UsersTableUserCell;
