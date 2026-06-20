import { AlertTriangleIcon } from 'lucide-react';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { cn } from '@/lib/utils';

export default function GuestAlert({ className }) {
  return (
    <Alert
      className={cn(
        'my-4 max-w-md border-amber-200 bg-amber-50 text-amber-900 dark:border-amber-900 dark:bg-amber-950 dark:text-amber-50',
        className
      )}
    >
      <AlertTriangleIcon />
      <AlertTitle>You're Viewing as a Guest.</AlertTitle>
      <AlertDescription>
        Guest accounts have read-only access. You can explore the dashboard, but adding, updating,
        or deleting content is not available.
      </AlertDescription>
    </Alert>
  );
}
