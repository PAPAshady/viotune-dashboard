import { useState } from 'react';

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenuSeparator,
} from '@components/ui/dropdown-menu';
import { Button } from '@components/ui/button';
import { MoreHorizontalIcon, Ban, UserCheck } from 'lucide-react';
import { useMutation } from '@tanstack/react-query';
import { Spinner } from '@/components/ui/spinner';

import UsersSheet from '@/components/Sheets/Users/UsersSheet';
import { toggleUserStatusMutationOptions } from '@/queries/users';

function UsersTableActionCell({ row }) {
  const [open, setOpen] = useState(false);
  const user = row.original;
  const isBanned = user.status === 'banned';
  const { mutate, isPending } = useMutation(toggleUserStatusMutationOptions());

  const closeDropDown = () => setOpen(false);

  const onStatusChange = async (e) => {
    e.preventDefault();
    mutate(
      { userId: user.id, status: isBanned ? 'active' : 'banned' },
      { onSuccess: closeDropDown }
    );
  };

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button className="size-8 p-0" variant="ghost">
          <MoreHorizontalIcon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <UsersSheet
          userId={user.id}
          userName={user.full_name}
          role={user.role}
          status={user.status}
        />
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onSelect={onStatusChange}
          disabled={isPending}
          variant={!isBanned && 'destructive'}
          className={isBanned && 'text-green-300'}
        >
          {isPending ? (
            <Spinner className="me-2" />
          ) : isBanned ? (
            <UserCheck className="me-2 size-4 text-green-300" />
          ) : (
            <Ban className="me-2 size-4" />
          )}
          {isBanned ? 'Unban' : 'Ban'} User
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default UsersTableActionCell;
