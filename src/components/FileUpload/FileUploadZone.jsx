import { Upload } from 'lucide-react';
import { cn } from '@/lib/utils';

function FileUploadZone({ validFileTypes, isInvalid, ...props }) {
  const types = validFileTypes.join().replaceAll(',', ', ');
  return (
    <label
      htmlFor={props.name}
      className={cn(
        'relative flex cursor-pointer flex-col items-center gap-3 rounded-lg border-2 border-dashed p-6 transition-colors',
        isInvalid ? 'border-red-500/80' : 'hover:border-muted'
      )}
    >
      <input type="file" id={props.name} className="absolute size-0" accept={types} {...props} />

      <Upload className="text-muted-foreground" />

      <div className="text-center">
        <p>Click to Upload</p>
        <span className="text-muted-foreground text-xs">{types.toUpperCase()} up to 10 MB </span>
      </div>
    </label>
  );
}

export default FileUploadZone;
