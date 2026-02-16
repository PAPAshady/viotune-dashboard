import { Trash } from 'lucide-react';

import { formatTime } from '@/utils';
import { Button } from '@/components/ui/button';
import defaultImage from '@assets/images/default-cover.jpg';

export default [
  { accessorKey: 'track_number', header: '#' },
  {
    accessorKey: 'cover',
    header: 'Cover',
    cell: ({ getValue }) => (
      <div className="size-10 overflow-hidden rounded-md border">
        <img src={getValue() || defaultImage} className="size-full object-cover" />
      </div>
    ),
  },
  {
    accessorKey: 'title',
    header: 'Title',
    cell: ({ getValue }) => <span className="font-semibold">{getValue()}</span>,
  },
  { accessorKey: 'artist', header: 'Artist' },
  { accessorKey: 'genre_name', header: 'Genre' },
  { accessorKey: 'duration', header: 'Duration', cell: ({ getValue }) => formatTime(getValue()) },
  {
    id: 'actions',
    header: 'Actions',
    cell: () => (
      <Button variant="ghost">
        <Trash className="text-red-400" />
      </Button>
    ),
  },
];
