import { Trash } from 'lucide-react';

import { formatTime } from '@/utils';
import { Button } from '@/components/ui/button';
import defaultImage from '@assets/images/default-cover.jpg';
import { Skeleton } from '@/components/ui/skeleton';
import TextSkeleton from '@/components/Tables/ColumnDefs/Cells/GenreicTableCells/Skeleton/TextSkeleton';
import ActionsCellSkeleton from '@/components/Tables/ColumnDefs/Cells/GenreicTableCells/Skeleton/ActionsCellSkeleton';

export default [
  {
    accessorKey: 'track_number',
    header: '#',
    meta: { skeleton: <TextSkeleton className="w-6" /> },
  },
  {
    accessorKey: 'cover',
    header: 'Cover',
    cell: ({ getValue }) => (
      <div className="size-10 overflow-hidden rounded-md border">
        <img src={getValue() || defaultImage} className="size-full object-cover" />
      </div>
    ),
    meta: { skeleton: <Skeleton className="size-10 rounded-md" /> },
  },
  {
    accessorKey: 'title',
    header: 'Title',
    cell: ({ getValue }) => <span className="font-semibold">{getValue()}</span>,
    meta: { skeleton: <TextSkeleton /> },
  },
  { accessorKey: 'artist', header: 'Artist', meta: { skeleton: <TextSkeleton /> } },
  { accessorKey: 'genre_name', header: 'Genre', meta: { skeleton: <TextSkeleton /> } },
  {
    accessorKey: 'duration',
    header: 'Duration',
    cell: ({ getValue }) => formatTime(getValue()),
    meta: { skeleton: <TextSkeleton /> },
  },
  {
    id: 'actions',
    header: 'Actions',
    cell: () => (
      <Button variant="ghost">
        <Trash className="text-red-400" />
      </Button>
    ),
    meta: { skeleton: <ActionsCellSkeleton /> },
  },
];
