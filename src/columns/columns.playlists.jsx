import CheckBoxSkeleton from '@components/Tables/ColumnDefs/Cells/GenreicTableCells/Skeleton/CheckBoxSkeleton';
import PlaylistsTablePlaylistCellSkeleton from '@components/Tables/ColumnDefs/Cells/PlaylistsTableCells/Skeleton/PlaylistsTablePlaylistCellSkeleton';
import TextSkeleton from '@components/Tables/ColumnDefs/Cells/GenreicTableCells/Skeleton/TextSkeleton';
import ActionsCellSkeleton from '@components/Tables/ColumnDefs/Cells/GenreicTableCells/Skeleton/ActionsCellSkeleton';
import CheckBoxHeader from '@components/Tables/ColumnDefs/Headers/CheckBoxHeader';
import CheckBoxCell from '@components/Tables/ColumnDefs/Cells/GenreicTableCells/CheckBoxCell';
import PlaylistsTablePlaylistCell from '@components/Tables/ColumnDefs/Cells/PlaylistsTableCells/PlaylistsTablePlaylistCell';
import PlaylistsTableCreatorCell from '@components/Tables/ColumnDefs/Cells/PlaylistsTableCells/PlaylistsTableCreatorCell';
import PlaylistsTableVisibilityCell from '@components/Tables/ColumnDefs/Cells/PlaylistsTableCells/PlaylistsTableVisibilityCell';
import ActionsCell from '@components/Tables/ColumnDefs/Cells/GenreicTableCells/ActionsCell';

export default [
  {
    id: 'select',
    header: (props) => <CheckBoxHeader {...props} />,
    cell: (props) => <CheckBoxCell {...props} />,
    meta: { skeleton: <CheckBoxSkeleton /> },
  },
  {
    id: 'playlist',
    header: 'Playlist',
    cell: (props) => <PlaylistsTablePlaylistCell {...props} />,
    meta: { skeleton: <PlaylistsTablePlaylistCellSkeleton /> },
  },
  {
    id: 'creator',
    header: 'Creator',
    cell: (props) => <PlaylistsTableCreatorCell {...props} />,
    meta: { skeleton: <TextSkeleton className="max-w-none" /> },
  },
  {
    accessorKey: 'is_public',
    header: 'Visibility',
    cell: (props) => <PlaylistsTableVisibilityCell {...props} />,
    meta: { skeleton: <TextSkeleton /> },
  },
  {
    accessorKey: 'total_plays',
    header: 'Plays',
    meta: { skeleton: <TextSkeleton className="max-w-12" /> },
  },
  {
    accessorKey: 'totaltracks',
    header: 'Tracks',
    meta: { skeleton: <TextSkeleton className="max-w-16" /> },
  },
  {
    header: 'Actions',
    id: 'actions',
    cell: (props) => <ActionsCell {...props} />,
    meta: { skeleton: <ActionsCellSkeleton /> },
  },
];
