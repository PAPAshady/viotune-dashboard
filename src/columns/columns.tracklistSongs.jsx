import { formatTime } from '@/utils';
import { Skeleton } from '@/components/ui/skeleton';
import TextSkeleton from '@/components/Tables/ColumnDefs/Cells/GenreicTableCells/Skeleton/TextSkeleton';
import ActionsCellSkeleton from '@/components/Tables/ColumnDefs/Cells/GenreicTableCells/Skeleton/ActionsCellSkeleton';
import TracklistSongsTableIdCell from '@/components/Tables/ColumnDefs/Cells/TracklistSongsTableCells/TracklistSongsTableIdCell';
import TracklistSongsTableCoverCell from '@/components/Tables/ColumnDefs/Cells/TracklistSongsTableCells/TracklistSongsTableCoverCell';
import TracklistSongsTableActionsCell from '@/components/Tables/ColumnDefs/Cells/TracklistSongsTableCells/TracklistSongsTableActionsCell';

export default [
  {
    id: 'id',
    header: () => <span className="ps-1.5">#</span>,
    cell: (props) => <TracklistSongsTableIdCell {...props} />,
  },
  {
    accessorKey: 'cover',
    header: 'Cover',
    cell: (props) => <TracklistSongsTableCoverCell {...props} />,
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
    cell: (props) => <TracklistSongsTableActionsCell {...props} />,
    meta: { skeleton: <ActionsCellSkeleton /> },
  },
];
