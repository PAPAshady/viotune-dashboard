import { useState } from 'react';

import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTrigger } from '@/components/ui/sheet';
import { DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { Music } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@components/ui/table';
import { useReactTable, getCoreRowModel, flexRender } from '@tanstack/react-table';
import { useQuery } from '@tanstack/react-query';

import defaultCover from '@assets/images/default-cover.jpg';
import SearchInput from '@/components/SearchInput/SearchInput';
import columns from '@/columns/columns.albumSongs.jsx';
import { getSongsByAlbumIdQuery } from '@/queries/songs';
import useDebounce from '@/hooks/useDebounce';

const mockData = Array(6).fill({});

function AlbumSongsSheet({ album }) {
  const [searchValue, setSearchValue] = useState('');
  const debouncedSearchValue = useDebounce(searchValue);
  const [open, setOpen] = useState(false);
  const { data: albumSongs, isPending } = useQuery({
    ...getSongsByAlbumIdQuery(album?.id, debouncedSearchValue),
    enabled: !!album?.id && open,
  });

  const table = useReactTable({
    getCoreRowModel: getCoreRowModel(),
    data: albumSongs?.data ?? mockData,
    columns,
    getRowId: (row) => row?.id,
  });

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
          <Music className="me-2 size-4" />
          View Songs
        </DropdownMenuItem>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-xl! lg:max-w-2xl!">
        <div className="flex h-full grow flex-col">
          <SheetHeader className="pt-10">
            <div className="flex items-center gap-4">
              <div className="size-24 overflow-hidden rounded-md border">
                <img src={album.cover || defaultCover} className="size-full object-cover" />
              </div>
              <div className="flex h-full grow flex-col justify-between py-1">
                <p className="text-2xl font-bold">{album.title}</p>
                <span className="text-muted-foreground">{album.artist}</span>
                <div className="text-muted-foreground flex items-center gap-3">
                  <span>{album.release_date.split('-')[0]}</span>
                  <span>•</span>
                  <span>{albumSongs?.total} songs</span>
                </div>
              </div>
            </div>
          </SheetHeader>
          <p className="mb-4 px-4 text-2xl font-bold sm:mb-8">Songs</p>
          <div className="mb-4 px-2">
            <SearchInput
              placeholder="Search songs by title or artist"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
          </div>
          <div className="w-full grow space-y-4 overflow-y-auto pb-8">
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
                          {isPending
                            ? flexRender(cell.column.columnDef.meta?.skeleton, cell.getContext())
                            : flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

export default AlbumSongsSheet;
