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
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '@/components/ui/empty';
import { Card, CardContent } from '@components/ui/card';
import { cn } from '@/lib/utils';
import { MusicIcon } from 'lucide-react';

import PrimaryTableHeader from '@components/Tables/PrimaryTableHeader/PrimaryTableHeader';
import PrimaryTableFooter from '@components/Tables/PrimaryTableFooter/PrimaryTableFooter';

const mockData = Array(5).fill();

function PrimaryTable({
  columns,
  rows,
  isLoading,
  pagination,
  setPagination,
  onBulkDelete,
  bulkDeletePending,
  tableClassName,
}) {
  const rowCount = rows?.total;
  const isEmpty = !isLoading && !rowCount;
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

  return (
    <Card>
      <PrimaryTableHeader
        table={table}
        onBulkDelete={onBulkDelete}
        bulkDeletePending={bulkDeletePending}
      />
      <CardContent>
        <div className="max-h-110 max-w-[calc(100dvw-50px)] overflow-auto md:max-w-[calc(100dvw-306px)]">
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
          {isEmpty && (
            <div className="flex justify-center">
              <Empty>
                <EmptyHeader>
                  <EmptyMedia variant="icon">
                    <MusicIcon />
                  </EmptyMedia>
                  <EmptyTitle>No results found</EmptyTitle>
                  <EmptyDescription>
                    We coundn't find anything that matches your search. <br /> Try adjusting your
                    keywords or filters.
                  </EmptyDescription>
                </EmptyHeader>
              </Empty>
            </div>
          )}
        </div>
      </CardContent>
      <PrimaryTableFooter table={table} isLoading={isLoading} />
    </Card>
  );
}

export default PrimaryTable;
