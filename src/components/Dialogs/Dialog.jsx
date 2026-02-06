import {
  Dialog as DialogWrapper,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from '@components/ui/dialog';
import { useIsMobile } from '@/hooks/use-mobile';
import { Button } from '@components/ui/button';
import { UploadIcon } from 'lucide-react';

function Dialog({
  triggerTitle,
  dialogTitle,
  dialogDescription,
  onSubmit,
  isPending,
  children,
  ...props
}) {
  const isMobile = useIsMobile();

  return (
    <DialogWrapper {...props}>
      <DialogTrigger asChild>
        <Button
          size={isMobile ? 'sm' : 'default'}
          className="bg-blue-500 text-white hover:bg-blue-600"
        >
          <UploadIcon /> {triggerTitle}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <form className="space-y-4" onSubmit={onSubmit}>
          <DialogHeader>
            <DialogTitle>{dialogTitle}</DialogTitle>
            <DialogDescription>{dialogDescription}</DialogDescription>
          </DialogHeader>
          <div className="max-h-100 overflow-y-auto px-2" style={{ scrollbarWidth: 'thin' }}>
            {children}
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="secondary">Close</Button>
            </DialogClose>
            <Button
              className="bg-blue-500 text-white hover:bg-blue-600"
              disabled={isPending}
              type="submit"
            >
              {isPending ? 'Uploading...' : 'Submit'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </DialogWrapper>
  );
}

export default Dialog;
