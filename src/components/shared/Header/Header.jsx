import { SearchIcon, MenuIcon } from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { InputGroup, InputGroupInput, InputGroupAddon } from '@/components/ui/input-group';
import { useSidebar } from '@/components/ui/sidebar';

import defaultAvatar from '@assets/images/default-avatar.png';

function Header() {
  const { toggleSidebar } = useSidebar();
  return (
    <div className="border-secondary xs:px-6 xs:gap-3 bg-background sticky z-1 top-0 flex w-full items-center justify-between gap-2 border-b p-3.25">
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
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        <AvatarFallback>
          <img src={defaultAvatar} alt="Avatar" />
        </AvatarFallback>
      </Avatar>
    </div>
  );
}

export default Header;
