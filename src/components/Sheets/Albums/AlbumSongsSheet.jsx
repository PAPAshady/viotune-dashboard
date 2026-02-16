import { Sheet, SheetContent, SheetHeader, SheetTrigger } from '@/components/ui/sheet';
import { DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { Music, Trash } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@components/ui/table';
import { useReactTable, getCoreRowModel, flexRender } from '@tanstack/react-table';

import defaultImage from '@assets/images/default-cover.jpg';
import { formatTime } from '@/utils';

const columns = [
  { accessorKey: 'id', header: '#' },
  {
    accessorKey: 'cover',
    header: 'Cover',
    cell: () => (
      <div className="size-10 overflow-hidden rounded-md border">
        <img src={defaultImage} className="size-full object-cover" />
      </div>
    ),
  },
  {
    accessorKey: 'title',
    header: 'Title',
    cell: ({ getValue }) => <span className="font-semibold">{getValue()}</span>,
  },
  { accessorKey: 'artist', header: 'Artist' },
  { accessorKey: 'genre', header: 'Genre' },
  { accessorKey: 'duration', header: 'Duration', cell: ({ getValue }) => formatTime(getValue()) },
  { id: 'actions', header: 'Actions', cell: () => <Trash className="size-5 text-red-500/70" /> },
];

const data = [
  {
    id: 1,
    title: 'When I Grow Up',
    cover: defaultImage,
    artist: 'NF',
    genre: 'Hip-Hop',
    duration: 119.99113,
  },
  {
    id: 2,
    title: 'Outcast',
    cover: defaultImage,
    artist: 'NF',
    genre: 'Hip-Hop',
    duration: 119.99113,
  },
  {
    id: 3,
    title: 'Change',
    cover: defaultImage,
    artist: 'NF',
    genre: 'Hip-Hop',
    duration: 119.99113,
  },
  {
    id: 4,
    title: 'Rap God',
    cover: defaultImage,
    artist: 'NF',
    genre: 'Hip-Hop',
    duration: 119.99113,
  },
  {
    id: 5,
    title: 'Free Will',
    cover: defaultImage,
    artist: 'NF',
    genre: 'Hip-Hop',
    duration: 119.99113,
  },
];

function AlbumSongsSheet() {
  const table = useReactTable({
    getCoreRowModel: getCoreRowModel(),
    data,
    columns,
    getRowId: (row) => row.id,
  });

  return (
    <Sheet>
      <SheetTrigger asChild>
        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
          <Music className="me-2 size-4" />
          View Songs
        </DropdownMenuItem>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-xl! lg:max-w-2xl!">
        <SheetHeader className="pt-10">
          <div className="flex items-center gap-4">
            <div className="size-24 overflow-hidden rounded-md border">
              <img src={defaultImage} className="size-full object-cover" />
            </div>
            <div className="flex h-full grow flex-col justify-between py-1">
              <p className="text-2xl font-bold">Night Sessions</p>
              <span className="text-muted-foreground text-sm">Travis Barker</span>
              <div className="text-muted-foreground flex items-center gap-4 text-sm">
                <span>2023</span>
                <span>•</span>
                <span>0 songs</span>
              </div>
            </div>
          </div>
        </SheetHeader>
        <div className="space-y-4">
          <p className="px-4 text-2xl font-bold">Songs</p>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <TableHead key={header.id}>
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
                  <TableRow className="text-muted-foreground" key={row.id}>
                    {row.getAllCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

export default AlbumSongsSheet;
