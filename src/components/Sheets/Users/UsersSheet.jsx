import { useState } from 'react';

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { PencilIcon } from 'lucide-react';
import { FieldGroup, Field, FieldLabel } from '@/components/ui/field';
import { DropdownMenuItem } from '@components/ui/dropdown-menu';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectItem,
} from '@components/ui/select';
import { Spinner } from '@/components/ui/spinner';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';

import { updateUserMutationOptions } from '@/queries/users';
import { getDirtyFields } from '@/utils';
import GuestAlert from '@/components/GuestAlert/GuestAlert';

export default function UsersSheet({ userId, userName, role, status }) {
  const [open, setOpen] = useState(false);
  const {
    handleSubmit,
    watch,
    setValue,
    reset: resetFields,
    formState: { isDirty, dirtyFields },
  } = useForm({ defaultValues: { role, status } });
  const { mutateAsync, isPending, reset } = useMutation(updateUserMutationOptions());

  const submitHandler = async (data) => {
    const modifiedFields = getDirtyFields(data, dirtyFields);
    await mutateAsync({ ...modifiedFields, userId }, { onSuccess: () => onSheetOpenChange(false) });
  };

  function onSheetOpenChange(isOpen) {
    if (!isOpen) {
      reset();
      resetFields({});
      setOpen(false);
      return;
    }
    setOpen(isOpen);
  }

  return (
    <Sheet open={open} onOpenChange={onSheetOpenChange}>
      <SheetTrigger asChild>
        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
          <PencilIcon className="me-2 size-4" />
          Edit metadata
        </DropdownMenuItem>
      </SheetTrigger>
      <SheetContent onCloseAutoFocus={(e) => e.preventDefault()}>
        <form className="flex h-full flex-col" onSubmit={handleSubmit(submitHandler)}>
          <SheetHeader className="border-b">
            <SheetTitle>Edit user metadata</SheetTitle>
            <SheetDescription>Edit {userName} data</SheetDescription>
          </SheetHeader>
          <div className="w-full grow overflow-y-auto p-4 pb-10" style={{ scrollbarWidth: 'thin' }}>
            <GuestAlert className="mt-0" />
            <FieldGroup className="gap-6">
              <Field>
                <FieldLabel>Role</FieldLabel>
                <Select
                  onValueChange={(value) => setValue('role', value, { shouldDirty: true })}
                  value={watch('role')}
                >
                  <SelectTrigger>
                    <SelectValue placeholder={watch('role')} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Select role</SelectLabel>
                      <SelectItem value="user">User</SelectItem>
                      <SelectItem value="admin">Admin</SelectItem>
                      <SelectItem value="super_admin">Super Admin</SelectItem>
                      <SelectItem value="guest">Guest</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </Field>
              <Field>
                <FieldLabel>Status</FieldLabel>
                <Select
                  onValueChange={(value) => setValue('status', value, { shouldDirty: true })}
                  value={watch('status')}
                >
                  <SelectTrigger>
                    <SelectValue placeholder={watch('status')} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Select status</SelectLabel>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="banned">Ban</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </Field>
            </FieldGroup>
          </div>
          <SheetFooter className="border-t">
            <div className="flex justify-end gap-3">
              <SheetClose asChild>
                <Button type="button" variant="secondary" size="sm">
                  Cancel
                </Button>
              </SheetClose>
              <Button
                disabled={isPending || !isDirty}
                className="bg-blue-500 text-white hover:bg-blue-600"
                type="submit"
                size="sm"
              >
                {isPending ? (
                  <>
                    <Spinner />
                    Saving changes
                  </>
                ) : (
                  'Save changes'
                )}
              </Button>
            </div>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  );
}
