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
import { Spinner } from '@/components/ui/spinner';
import { Trash2Icon } from 'lucide-react';
import { Button } from '../ui/button';

function DeleteGenreDialog({
  onDelete,
  isPending,
  onDropDownClose,
  title = 'Delete genre ?',
  description = 'Are you sure you want to delete this genre ? This action cannot be undone.',
}) {
  const deleteHandler = (e) => {
    e.preventDefault(); // prevent the dropdown to close right after a click.
    onDelete();
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline" className="text-destructive grow">
          <Trash2Icon className="me-2 size-4" />
          Delete
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogMedia className="bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive">
            <Trash2Icon />
          </AlertDialogMedia>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel variant="outline" onClick={onDropDownClose}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction disabled={isPending} variant="destructive" onClick={deleteHandler}>
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

export default DeleteGenreDialog;
