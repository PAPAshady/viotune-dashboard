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

import { deleteSongMutation } from '@/queries/songs';

function DeleteSongDialog({ song, onDropDownClose }) {
  const { mutateAsync, isPending } = useMutation(deleteSongMutation());

  const deleteSongHandler = async (e) => {
    e.preventDefault(); // prevent the dropdown to close right after a click.
    await mutateAsync(song);
    onDropDownClose();
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
          <AlertDialogTitle>Delete song ?</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete this song ? This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel variant="outline" onClick={onDropDownClose}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction disabled={isPending} variant="destructive" onClick={deleteSongHandler}>
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

export default DeleteSongDialog;
