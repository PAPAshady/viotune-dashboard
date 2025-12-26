import { useState } from 'react';

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
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenuSeparator,
} from '@components/ui/dropdown-menu';

import { Button } from '@components/ui/button';
import { Checkbox } from '@components/ui/checkbox';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { MoreHorizontalIcon, PencilIcon, EyeOffIcon, Trash2Icon } from 'lucide-react';
import { useQuery, keepPreviousData } from '@tanstack/react-query';

import { getSongsQuery } from '@/queries/songs';
import { formatTime } from '@/utils';
import useMediaQuery from '@/hooks/useMediaQuery';
import Pagination from '@/components/Pagination/Pagination';

const columns = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={table.toggleAllPageRowsSelected}
      />
    ),
    cell: ({ row }) => (
      <Checkbox checked={row.getIsSelected()} onCheckedChange={row.getToggleSelectedHandler()} />
    ),
  },
  {
    id: 'song',
    header: 'Song',
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <img src={row.original.cover} alt={row.original.title} className="size-12 rounded-md" />
        <div className="space-y-1">
          <p className="text-base font-semibold">{row.original.title}</p>
          <p className="text-muted-foreground">{row.original.album}</p>
        </div>
      </div>
    ),
  },
  { header: 'Artist', accessorKey: 'artist' },
  { header: 'Genre', accessorKey: 'genre_name' },
  { header: 'Plays', accessorKey: 'play_count' },
  { header: 'Duration', accessorKey: 'duration', cell: ({ getValue }) => formatTime(getValue()) },
  {
    header: 'Uploaded',
    accessorKey: 'created_at',
    cell: ({ getValue }) => (
      <span className="text-muted-foreground">
        {new Date(getValue()).toLocaleString('en-CA', { hour12: false }).replace(/-/g, '/')}
      </span>
    ),
  },
  {
    header: 'actions',
    id: 'actions',
    cell: () => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="size-8 p-0" variant="ghost">
            <MoreHorizontalIcon />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem>
            <PencilIcon className="me-2 size-4" />
            Edit metadata
          </DropdownMenuItem>
          <DropdownMenuItem>
            <EyeOffIcon className="me-2 size-4" />
            Hide / Unpublish
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="text-destructive">
            <Trash2Icon className="me-2 size-4" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
];

function SongsTable() {
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 6 });
  const { data: songs } = useQuery({
    ...getSongsQuery(pagination),
    placeholderData: keepPreviousData, // don't have 0 rows flash while changing pages/loading next page
  });
  const rowCount = songs?.total;
  const pageCount = Math.ceil(rowCount / pagination.pageSize);
  const table = useReactTable({
    data: songs?.data ?? [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    rowCount,
    state: { pagination },
    onPaginationChange: setPagination,
    getRowId: (row) => row.id,
  });
  const isMobile = useMediaQuery('(min-width: 360px)');
  const paginationSiblingCount = isMobile ? 1 : 0; // show no sibling pages on mobile due to limited space
  const paginationBoundryCount = 1;
  const from = (pagination.pageIndex + 1) * pagination.pageSize - pagination.pageSize + 1;
  const to = Math.min(pagination.pageIndex * pagination.pageSize + pagination.pageSize, rowCount);

  return (
    <Card>
      <CardContent>
        <div className="max-w-[calc(100dvw-50px)] overflow-x-auto md:max-w-[calc(100dvw-306px)]">
          <Table className="min-w-187.5">
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id} className="whitespace-nowrap">
                      {header.isPlaceholder
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
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
      <CardFooter className="overflow-hidden px-2 sm:px-6">
        <div className="flex w-full flex-wrap items-center justify-between gap-4">
          <p className="text-muted-foreground text-sm">
            Showing <span className="font-semibold">{from}</span> to{' '}
            <span className="font-semibold">{to}</span> of{' '}
            <span className="font-semibold">{rowCount}</span> songs
          </p>
          <div>
            <Pagination
              pageNumber={pagination.pageIndex + 1}
              pageCount={pageCount}
              siblingCount={paginationSiblingCount}
              boundryCount={paginationBoundryCount}
              setPageIndex={table.setPageIndex}
            />
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}

export default SongsTable;
