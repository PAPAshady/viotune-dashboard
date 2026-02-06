import { useReactTable, getCoreRowModel, flexRender } from '@tanstack/react-table';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@components/ui/select';
import { Badge } from '@components/ui/badge';
import { Card, CardContent, CardFooter, CardHeader } from '@components/ui/card';
import { cn } from '@/lib/utils';

import useMediaQuery from '@/hooks/useMediaQuery';
import Pagination from '@/components/Pagination/Pagination';
import TextSkeleton from '@components/Tables/ColumnDefs/Cells/GenreicTableCells/Skeleton/TextSkeleton';

const mockData = Array(5).fill();

function PrimaryTable({ columns, rows, isLoading, pagination, setPagination, tableClassName }) {
  const rowCount = rows?.total;
  const pageCount = Math.ceil(rowCount / pagination.pageSize);
  const table = useReactTable({
    data: rows?.data ?? mockData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    rowCount,
    state: { pagination },
    onPaginationChange: setPagination,
    getRowId: (row) => row?.id,
  });
  const isCompactLayout = useMediaQuery('(min-width: 360px)');
  const paginationSiblingCount = isCompactLayout ? 1 : 0; // show no sibling pages on small screens due to limited space
  const paginationBoundryCount = 1;
  const numberOfSelectedRows = Object.keys(table.getState().rowSelection).length;
  const from = (pagination.pageIndex + 1) * pagination.pageSize - pagination.pageSize + 1;
  const to = Math.min(pagination.pageIndex * pagination.pageSize + pagination.pageSize, rowCount);

  return (
    <Card>
      {!!numberOfSelectedRows && (
        <CardHeader className="flex items-center gap-2">
          <Badge variant="secondary">
            {numberOfSelectedRows} row{numberOfSelectedRows > 1 && 's'} selected
          </Badge>
          <span className="text-muted-foreground text-sm">
            Actions will apply to selected row{numberOfSelectedRows > 1 && 's'}
          </span>
        </CardHeader>
      )}
      <CardContent>
        <div
          className="max-h-110 max-w-[calc(100dvw-50px)] overflow-auto md:max-w-[calc(100dvw-306px)]"
        >
          <Table className={cn('min-w-187.5', tableClassName)}>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id} className="whitespace-nowrap">
                      {/* show loading state for checkbox header so user wont be able to select rows
                      while loading. */}
                      {header.id === 'select' && isLoading
                        ? flexRender(header.column.columnDef.meta?.skeleton, header.getContext())
                        : header.isPlaceholder
                          ? null
                          : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getAllCells().map((cell) => (
                    <TableCell key={cell.id} className="whitespace-nowrap">
                      {isLoading
                        ? flexRender(cell.column.columnDef.meta?.skeleton, cell.getContext())
                        : flexRender(cell.column.columnDef.cell, cell.getContext())}
                      {}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
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
    </Card>
  );
}

export default PrimaryTable;
