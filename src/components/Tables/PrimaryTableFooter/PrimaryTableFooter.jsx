import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@components/ui/select';
import { CardFooter } from '@components/ui/card';

import useMediaQuery from '@/hooks/useMediaQuery';
import Pagination from '@/components/Pagination/Pagination';
import TextSkeleton from '@components/Tables/ColumnDefs/Cells/GenreicTableCells/Skeleton/TextSkeleton';

function PrimaryTableFooter({ table, isLoading }) {
  const rowCount = table.getRowCount();
  const pagination = table.getState().pagination;
  const pageCount = Math.ceil(rowCount / pagination.pageSize);
  const isCompactLayout = useMediaQuery('(min-width: 360px)');
  const paginationSiblingCount = isCompactLayout ? 1 : 0; // show no sibling pages on small screens due to limited space
  const paginationBoundryCount = 1;
  const from = (pagination.pageIndex + 1) * pagination.pageSize - pagination.pageSize + 1;
  const to = Math.min(pagination.pageIndex * pagination.pageSize + pagination.pageSize, rowCount);

  return (
    <CardFooter className="overflow-hidden px-2 sm:px-6">
      <div className="flex w-full flex-wrap items-center gap-4">
        {isLoading ? (
          <TextSkeleton className="me-auto w-45 max-w-none" />
        ) : (
          <p className="text-muted-foreground me-auto text-sm">
            Showing <span className="font-semibold">{from}</span> to{' '}
            <span className="font-semibold">{to}</span> of{' '}
            <span className="font-semibold">{rowCount}</span> rows
          </p>
        )}

        {!isLoading && (
          <>
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground text-sm">Rows per page : </span>
              <Select value={pagination.pageSize.toString()} onValueChange={table.setPageSize}>
                <SelectTrigger className="w-20!">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {[5, 10, 25, 50].map((pageSize) => (
                    <SelectItem key={pageSize} value={pageSize.toString()}>
                      {pageSize}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            {pageCount > 1 && (
              <Pagination
                pageNumber={pagination.pageIndex + 1}
                pageCount={pageCount}
                siblingCount={paginationSiblingCount}
                boundryCount={paginationBoundryCount}
                setPageIndex={table.setPageIndex}
              />
            )}
          </>
        )}
      </div>
    </CardFooter>
  );
}

export default PrimaryTableFooter;
