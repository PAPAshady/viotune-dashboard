import { FileHeadphone, X } from 'lucide-react';
import { Button } from '@components/ui/button';

import { formatFileSize } from '@/utils';

function FileItem({ file, onRemove }) {
  const isAudio = file.type.includes('audio');
  return (
    <div className="flex items-center gap-2.5 rounded-md border p-3">
      <div className="bg-accent/50 relative flex size-10 shrink-0 items-center justify-center overflow-hidden rounded border [&>svg]:size-10">
        {isAudio ? (
          <FileHeadphone />
        ) : (
          <img className="size-full object-cover" src={URL.createObjectURL(file)} />
        )}
      </div>
      <div className="flex min-w-0 flex-1 flex-col">
        <span className="truncate text-sm font-medium">{file.name}</span>
        <span className="text-muted-foreground truncate text-xs">{formatFileSize(file.size)}</span>
      </div>
      <Button size="sm" variant="ghost" onClick={onRemove}>
        <X />
      </Button>
    </div>
  );
}

export default FileItem;
