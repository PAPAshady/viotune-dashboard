import { X, FileHeadphone } from 'lucide-react';
import { Button } from '@components/ui/button';

function UploadedFileItem({ fileType, url, name, onRemove }) {
  return (
    <div className="flex items-center gap-2.5 rounded-md border p-3">
      <div className="bg-accent/50 relative flex size-10 shrink-0 items-center justify-center overflow-hidden rounded border [&>svg]:size-10">
        {fileType === 'audio' ? (
          <FileHeadphone />
        ) : (
          <img className="size-full object-cover" src={url} alt={name} />
        )}
      </div>
      <div className="flex min-w-0 flex-1 flex-col">
        <span className="truncate text-sm font-medium">{name}</span>
      </div>
      <Button size="sm" variant="ghost" onClick={onRemove}>
        <X />
      </Button>
    </div>
  );
}

export default UploadedFileItem;
