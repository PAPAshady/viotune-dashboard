import { Button } from '@/components/ui/button';
import { Badge } from '@components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { CardHeader } from '@/components/ui/card';
import { XIcon } from 'lucide-react';

import BulkDeleteRowsDialog from '@/components/Dialogs/BulkDeleteRowsDialog';

function PrimaryTableHeader({ table, onBulkDelete, bulkDeletePending }) {
  'use no memo';
  const numberOfSelectedRows = table.getSelectedRowModel().rows.length;

  return (
    !!numberOfSelectedRows && (
      <CardHeader className="bg-red flex flex-wrap items-center gap-2">
        <Button
          variant="secondary"
          size="sm"
          onClick={() => table.toggleAllPageRowsSelected(false)}
        >
          <XIcon />
        </Button>
        <Badge variant="secondary" className="text-sm">
          {numberOfSelectedRows} row{numberOfSelectedRows > 1 && 's'} selected
        </Badge>
        <span className="text-muted-foreground hidden text-sm sm:block">
          Actions will apply to selected row{numberOfSelectedRows > 1 && 's'}
        </span>
        <Separator orientation="vertical" className="mx-1 h-6! w-1" />
        {/* show bulk delete dialog */}
        <BulkDeleteRowsDialog
          onDelete={() => onBulkDelete(table.getSelectedRowModel().rows)}
          isPending={bulkDeletePending}
        />
      </CardHeader>
    )
  );
}

export default PrimaryTableHeader;
