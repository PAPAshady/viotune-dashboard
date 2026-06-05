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

import UsersSheet from '@/components/Sheets/Users/UsersSheet';

function UsersTableActionCell({ row }) {
  const [open, setOpen] = useState(false);
  const user = row.original;
  const isBanned = user.status === 'banned';

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button className="size-8 p-0" variant="ghost">
          <MoreHorizontalIcon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <UsersSheet userName={user.full_name} role={user.role} status={user.status} />
        <DropdownMenuSeparator />
        <DropdownMenuItem
          variant={!isBanned && 'destructive'}
          className={isBanned && 'text-green-300'}
        >
          {isBanned ? (
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
