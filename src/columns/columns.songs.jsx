import CheckBoxHeader from '@components/Tables/ColumnDefs/Headers/CheckBoxHeader';
import CheckBoxCell from '@components/Tables/ColumnDefs/Cells/GenreicTableCells/CheckBoxCell';
import SongsTableSongCell from '@components/Tables/ColumnDefs/Cells/SongsTableCells/SongsTableSongCell';
import TimeCell from '@components/Tables/ColumnDefs/Cells/GenreicTableCells/TimeCell';
import ActionsCell from '@components/Tables/ColumnDefs/Cells/GenreicTableCells/ActionsCell';
import SongsTableSongCellSkeleton from '@components/Tables/ColumnDefs/Cells/SongsTableCells/SongsTableSongCellSkeleton';
import TextSkeleton from '@components/Tables/ColumnDefs/Cells/GenreicTableCells/Skeleton/TextSkeleton';
import CheckBoxSkeleton from '@components/Tables/ColumnDefs/Cells/GenreicTableCells/Skeleton/CheckBoxSkeleton';
import ActionsCellSkeleton from '@components/Tables/ColumnDefs/Cells/GenreicTableCells/Skeleton/ActionsCellSkeleton';
import StatusCell from '@/components/Tables/ColumnDefs/Cells/GenreicTableCells/StatusCell';
import StatusCellSkeleton from '@/components/Tables/ColumnDefs/Cells/GenreicTableCells/Skeleton/StatusCellSkeleton';
import SongsTableActionCell from '@/components/Tables/ColumnDefs/Cells/SongsTableCells/SongsTableActionCell';
import { formatTime } from '@/utils';

export default [
  {
    id: 'select',
    header: (props) => <CheckBoxHeader {...props} />,
    cell: (props) => <CheckBoxCell {...props} />,
    meta: { skeleton: <CheckBoxSkeleton /> },
  },
  {
    id: 'song',
    header: 'Song',
    cell: (props) => <SongsTableSongCell {...props} />,
    meta: { skeleton: <SongsTableSongCellSkeleton /> },
  },
  {
    header: 'Artist',
    accessorKey: 'artist',
    meta: { skeleton: <TextSkeleton className="w-16" /> },
  },
  {
    header: 'Genre',
    accessorKey: 'genre_name',
    meta: { skeleton: <TextSkeleton className="w-16" /> },
  },
  { header: 'Plays', accessorKey: 'play_count', meta: { skeleton: <TextSkeleton /> } },
  {
    header: 'Duration',
    accessorKey: 'duration',
    cell: ({ getValue }) => formatTime(getValue()),
    meta: { skeleton: <TextSkeleton className="w-16" /> },
  },
  {
    header: 'Status',
    accessorKey: 'status',
    cell: (props) => <StatusCell {...props} />,
    meta: { skeleton: <StatusCellSkeleton /> },
  },
  {
    header: 'Uploaded At',
    accessorKey: 'created_at',
    cell: (props) => <TimeCell {...props} />,
    meta: { skeleton: <TextSkeleton className="w-30 max-w-30" /> },
  },
  {
    header: 'Actions',
    id: 'actions',
    cell: (props) => <SongsTableActionCell {...props} />,
    meta: { skeleton: <ActionsCellSkeleton /> },
  },
];
