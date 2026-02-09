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
import { Button } from '@components/ui/button';
import { useState } from 'react';

function BulkDeleteRowsDialog({ onDelete, isPending }) {
  const [open, setOpen] = useState(false);

  const deleteHandler = async (e) => {
    e.preventDefault(); // prevent the dialog from closing righ after clicking on the button
    await onDelete();
    setOpen(false); // close the the dialog after deletion
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button size="sm" className="text-sm!" variant="destructive">
          <Trash2Icon />
          Delete
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogMedia className="bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive">
            <Trash2Icon />
          </AlertDialogMedia>
          <AlertDialogTitle>Delete selected items ?</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete the selected items ? This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel variant="outline">Cancel</AlertDialogCancel>
          <AlertDialogAction disabled={isPending} variant="destructive" onClick={deleteHandler}>
            {isPending ? (
              <>
                <Spinner />
                Deleting
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

export default BulkDeleteRowsDialog;
