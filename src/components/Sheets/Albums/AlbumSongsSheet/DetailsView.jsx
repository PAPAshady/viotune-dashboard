import { useState } from 'react';

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
import { SheetHeader, SheetTitle, SheetDescription } from '@/components/ui/sheet';

import defaultCover from '@assets/images/default-cover.jpg';
import SearchInput from '@/components/SearchInput/SearchInput';
import columns from '@/columns/columns.albumSongs.jsx';
import { getSongsByAlbumIdQuery } from '@/queries/songs';
import useDebounce from '@/hooks/useDebounce';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

const mockData = Array(6).fill({});

function DetailsView({ album, open, onAddSongClick }) {
  const [searchValue, setSearchValue] = useState('');
  const debouncedSearchValue = useDebounce(searchValue);
  const { data: albumSongs, isPending } = useQuery({
    ...getSongsByAlbumIdQuery(album?.id, debouncedSearchValue),
    enabled: !!album?.id && open,
  });

  const table = useReactTable({
    getCoreRowModel: getCoreRowModel(),
    data: albumSongs?.data ?? mockData,
    columns,
    getRowId: (row) => row?.id,
    meta: { album },
  });

  return (
    <div className="animate-in fade-in slide-in-from-left-4 flex h-full grow flex-col duration-300">
      <SheetHeader className="pt-10">
        <div className="flex items-center gap-4">
          <div className="size-24 overflow-hidden rounded-md border">
            <img src={album.cover || defaultCover} className="size-full object-cover" />
          </div>
          <div className="flex h-full grow flex-col justify-between py-1">
            <SheetTitle className="text-2xl font-bold">{album.title}</SheetTitle>
            <SheetDescription className="text-muted-foreground">{album.artist}</SheetDescription>
            <div className="text-muted-foreground flex items-center gap-3">
              <span>{album.release_date.split('-')[0]}</span>
              <span>•</span>
              <span>{album.totaltracks} songs</span>
            </div>
          </div>
        </div>
      </SheetHeader>
      <div className="my-4 flex flex-wrap items-center justify-between gap-2 px-4 sm:mb-12">
        <p className="text-2xl font-bold">Songs</p>
        <Button className="bg-blue-500 text-white hover:bg-blue-600" onClick={onAddSongClick}>
          <Plus />
          Add Song
        </Button>
      </div>
      <div className="mb-4 px-4">
        <SearchInput
          placeholder="Search songs by title or artist"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
      </div>
      <div className="w-full grow space-y-4 overflow-y-auto p-4 pb-8">
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
  );
}

export default DetailsView;
