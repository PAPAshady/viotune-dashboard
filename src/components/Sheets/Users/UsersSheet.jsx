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
import { useForm } from 'react-hook-form';

export default function UsersSheet({ userName, role, status }) {
  const { handleSubmit, watch, setValue } = useForm({ defaultValues: { role, status } });

  const submitHandler = (data) => console.log(data);

  return (
    <Sheet>
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
            <FieldGroup className="gap-6">
              <Field>
                <FieldLabel>Role</FieldLabel>
                <Select onValueChange={(value) => setValue('role', value)} value={watch('role')}>
                  <SelectTrigger>
                    <SelectValue placeholder={watch('role')} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Select role</SelectLabel>
                      <SelectItem value="user">User</SelectItem>
                      <SelectItem value="admin">Admin</SelectItem>
                      <SelectItem value="super_admin">Super Admin</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </Field>
              <Field>
                <FieldLabel>Status</FieldLabel>
                <Select
                  onValueChange={(value) => setValue('status', value)}
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
              <Button className="bg-blue-500 text-white hover:bg-blue-600" type="submit" size="sm">
                save changes
              </Button>
            </div>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  );
}
