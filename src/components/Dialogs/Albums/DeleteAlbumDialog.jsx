import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { Spinner } from '@/components/ui/spinner';
import { Trash2Icon } from 'lucide-react';
import { useMutation } from '@tanstack/react-query';

import { deleteAlbumMutation } from '@/queries/albums';

function DeleteAlbumDialog({ album, onDropDownClose }) {
  const { mutate, isPending } = useMutation(deleteAlbumMutation());

  const deleteAlbumHandler = (e) => {
    e.preventDefault(); // prevent the dropdown to close right after a click.
    mutate(album, { onSuccess: onDropDownClose });
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <DropdownMenuItem variant="destructive" onSelect={(e) => e.preventDefault()}>
          <Trash2Icon className="me-2 size-4" />
          Delete
        </DropdownMenuItem>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogMedia className="bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive">
            <Trash2Icon />
          </AlertDialogMedia>
          <AlertDialogTitle>Delete album ?</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete this album ? This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel variant="outline" onClick={onDropDownClose}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            disabled={isPending}
            variant="destructive"
            onClick={deleteAlbumHandler}
          >
            {isPending ? (
              <>
                <Spinner />
                Deleting...
              </>
            ) : (
              'Delete'
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default DeleteAlbumDialog;
