import { Avatar, AvatarFallback, AvatarImage } from '@components/ui/avatar';

import defaultAvatar from '@assets/images/default-avatar.png';

function ArtistsTableArtistCell({ row }) {
  const { name, image, full_name } = row.original;
  return (
    <div className="flex items-center gap-1.5">
      <Avatar className="md:size-10">
        <AvatarImage src={image} alt={name} className="object-cover" />
        <AvatarFallback>
          <img src={defaultAvatar} className="size-full object-cover" />
        </AvatarFallback>
      </Avatar>
      <div className="space-y-0.5">
        <p className="font-semibold">{name}</p>
        <span className="text-muted-foreground text-xs">{full_name}</span>
      </div>
    </div>
  );
}

export default ArtistsTableArtistCell;
