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

function Dialog({ triggerTitle, dialogTitle, dialogDescription, onSubmit, children }) {
  const isMobile = useIsMobile();

  return (
    <DialogWrapper>
      <DialogTrigger asChild>
        <Button
          size={isMobile ? 'sm' : 'default'}
          className="bg-blue-500 text-white hover:bg-blue-600"
        >
          <UploadIcon /> {triggerTitle}
        </Button>
      </DialogTrigger>
      <DialogContent>
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
          <Button className="bg-blue-500 text-white hover:bg-blue-600" onClick={onSubmit}>
            Submit
          </Button>
        </DialogFooter>
      </DialogContent>
    </DialogWrapper>
  );
}

export default Dialog;
