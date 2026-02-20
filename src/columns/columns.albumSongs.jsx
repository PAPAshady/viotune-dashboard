
import { formatTime } from '@/utils';
import { Skeleton } from '@/components/ui/skeleton';
import TextSkeleton from '@/components/Tables/ColumnDefs/Cells/GenreicTableCells/Skeleton/TextSkeleton';
import ActionsCellSkeleton from '@/components/Tables/ColumnDefs/Cells/GenreicTableCells/Skeleton/ActionsCellSkeleton';
import AlbumSongsTableIdCell from '@/components/Tables/ColumnDefs/Cells/AlbumSongsTableCells/AlbumSongsTableIdCell';
import AlbumSongsTableCoverCell from '@/components/Tables/ColumnDefs/Cells/AlbumSongsTableCells/AlbumSongsTableCoverCell';
import AlbumSongsTableActionsCell from '@/components/Tables/ColumnDefs/Cells/AlbumSongsTableCells/AlbumSongsTableActionsCell';

export default [
  {
    id: 'id',
    header: () => <span className="ps-1.5">#</span>,
    cell: (props) => <AlbumSongsTableIdCell {...props} />,
  },
  {
    accessorKey: 'cover',
    header: 'Cover',
    cell: (props) => <AlbumSongsTableCoverCell {...props} />,
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
    cell: (props) => <AlbumSongsTableActionsCell {...props} />,
    meta: { skeleton: <ActionsCellSkeleton /> },
  },
];
