import CheckBoxHeader from '@components/Tables/ColumnDefs/Headers/CheckBoxHeader';
import CheckBoxCell from '@components/Tables/ColumnDefs/Cells/GenreicTableCells/CheckBoxCell';
import AlbumsTableAlbumCell from '@components/Tables/ColumnDefs/Cells/AlbumsTableCells/AlbumsTableAlbumCell';
import AlbumsTableArtistCell from '@components/Tables/ColumnDefs/Cells/AlbumsTableCells/AlbumsTableArtistCell';
import AlbumsTableActionCell from '@/components/Tables/ColumnDefs/Cells/AlbumsTableCells/AlbumsTableActionCell';
import CheckBoxSkeleton from '@components/Tables/ColumnDefs/Cells/GenreicTableCells/Skeleton/CheckBoxSkeleton';
import AlbumsTableAlbumCellSkeleton from '@components/Tables/ColumnDefs/Cells/AlbumsTableCells/Skeleton/AlbumsTableAlbumCellSkeleton';
import TextSkeleton from '@components/Tables/ColumnDefs/Cells/GenreicTableCells/Skeleton/TextSkeleton';
import ActionsCellSkeleton from '@components/Tables/ColumnDefs/Cells/GenreicTableCells/Skeleton/ActionsCellSkeleton';
import AlbumsTableStatusCell from '@/components/Tables/ColumnDefs/Cells/AlbumsTableCells/AlbumsTableStatusCell';

export default [
  {
    id: 'select',
    header: (props) => <CheckBoxHeader {...props} />,
    cell: (props) => <CheckBoxCell {...props} />,
    meta: { skeleton: <CheckBoxSkeleton /> },
  },
  {
    id: 'album',
    header: 'Album',
    cell: (props) => <AlbumsTableAlbumCell {...props} />,
    meta: { skeleton: <AlbumsTableAlbumCellSkeleton /> },
  },
  {
    accessorKey: 'artist',
    header: 'Artist',
    cell: (props) => <AlbumsTableArtistCell {...props} />,
    meta: { skeleton: <TextSkeleton className="w-16" /> },
  },
  { accessorKey: 'totaltracks', header: 'Tracks', meta: { skeleton: <TextSkeleton /> } },
  { accessorKey: 'play_count', header: 'Plays', meta: { skeleton: <TextSkeleton /> } },
  {
    accessorKey: 'genre_title',
    header: 'Genre',
    meta: { skeleton: <TextSkeleton className="w-16" /> },
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: (props) => <AlbumsTableStatusCell {...props} />,
    meta: { skeleton: <TextSkeleton className="w-20" /> },
  },
  {
    accessorKey: 'release_date',
    header: 'Release Date',
    cell: ({ getValue }) => getValue().replace(/-/g, '/'),
    meta: { skeleton: <TextSkeleton className="w-30 max-w-30" /> },
  },
  {
    header: 'Actions',
    id: 'actions',
    cell: (props) => <AlbumsTableActionCell {...props} />,
    meta: { skeleton: <ActionsCellSkeleton /> },
  },
];
