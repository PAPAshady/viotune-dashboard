import { useState } from 'react';

import { MenuIcon, LogOut } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useSidebar } from '@/components/ui/sidebar';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuContent,
} from '@components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { useNavigate } from 'react-router';

import defaultAvatar from '@assets/images/default-avatar.png';
import useAuth from '@/store/auth.store';
import supabase from '@/services/supabase';
import { Spinner } from '@/components/ui/spinner';

function Header() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const { toggleSidebar } = useSidebar();
  const avatar = useAuth((state) => state.user?.user_metadata.avatar_url);
  const userFullName = useAuth((state) => state.user?.user_metadata.full_name);

  const signOutHandler = async () => {
    try {
      setIsPending(true);
      await supabase.auth.signOut();
      toast.success('Signed-out successfully.');
      navigate('/auth/sign-in');
    } catch (error) {
      toast.error('Failed to sign-out. Please try again.');
      console.log('Error signing out user => ', error);
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div className="border-secondary xs:px-6 xs:gap-3 bg-background sticky top-0 z-1 flex w-full items-center justify-between gap-2 border-b p-3.25">
      <button className="md:hidden">
        <MenuIcon onClick={toggleSidebar} size={20} />
      </button>

      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger asChild>
          <Avatar
            className={cn(
              'ms-auto cursor-pointer border-2 border-transparent transition-colors duration-200 md:size-10',
              open && 'border-blue-500'
            )}
          >
            <AvatarImage src={avatar || defaultAvatar} alt={userFullName} />
            <AvatarFallback>
              <Skeleton className="size-full" />
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem disabled={isPending} variant="destructive" onSelect={signOutHandler}>
            {isPending ? <Spinner /> : <LogOut />}
            Sign-out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export default Header;
