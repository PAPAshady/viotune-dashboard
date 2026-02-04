import { cn } from '@/lib/utils';

function StatusCell({ getValue }) {
  return (
    <span
      className={cn(
        'capitalize',
        getValue() === 'published' ? 'text-green-500' : 'text-orange-500'
      )}
    >
      {getValue()}
    </span>
  );
}

export default StatusCell;
