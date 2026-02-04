import { SearchIcon, MenuIcon } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { InputGroup, InputGroupInput, InputGroupAddon } from '@/components/ui/input-group';
import { useSidebar } from '@/components/ui/sidebar';

import defaultAvatar from '@assets/images/default-avatar.png';
import useAuth from '@/store/useAuth';

function Header() {
  const { toggleSidebar } = useSidebar();
  const avatar = useAuth((state) => state.user?.user_metadata.avatar_url);
  const userFullName = useAuth((state) => state.user?.user_metadata.full_name);

  return (
    <div className="border-secondary xs:px-6 xs:gap-3 bg-background sticky top-0 z-1 flex w-full items-center justify-between gap-2 border-b p-3.25">
      <button className="md:hidden">
        <MenuIcon onClick={toggleSidebar} size={20} />
      </button>

      <InputGroup className="md:max-w-md">
        <InputGroupInput placeholder="Search..." />
        <InputGroupAddon>
          <SearchIcon />
        </InputGroupAddon>
      </InputGroup>
      <Avatar className="md:size-10">
        <AvatarImage src={avatar || defaultAvatar} alt={userFullName} />
        <AvatarFallback>
          <Skeleton className="size-full" />
        </AvatarFallback>
      </Avatar>
    </div>
  );
}

export default Header;
