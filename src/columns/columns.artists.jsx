import CheckBoxSkeleton from '@/components/Tables/ColumnDefs/Cells/GenreicTableCells/Skeleton/CheckBoxSkeleton';
import ArtistsTableArtistCellSkeleton from '@components/Tables/ColumnDefs/Cells/ArtistsTableCells/Skeleton/ArtistsTableArtistCellSkeleton';
import TextSkeleton from '@components/Tables/ColumnDefs/Cells/GenreicTableCells/Skeleton/TextSkeleton';
import ActionsCellSkeleton from '@components/Tables/ColumnDefs/Cells/GenreicTableCells/Skeleton/ActionsCellSkeleton';
import CheckBoxHeader from '@components/Tables/ColumnDefs/Headers/CheckBoxHeader';
import CheckBoxCell from '@/components/Tables/ColumnDefs/Cells/GenreicTableCells/CheckBoxCell';
import ArtistsTableArtistCell from '@/components/Tables/ColumnDefs/Cells/ArtistsTableCells/ArtistsTableArtistCell';
import ArtistsTableGenreCell from '@/components/Tables/ColumnDefs/Cells/ArtistsTableCells/ArtistsTableGenreCell';
import ArtistsTableActionCell from '@/components/Tables/ColumnDefs/Cells/ArtistsTableCells/ArtistsTableActionCell';

export default [
  {
    id: 'select',
    header: (props) => <CheckBoxHeader {...props} />,
    cell: (props) => <CheckBoxCell {...props} />,
    meta: { skeleton: <CheckBoxSkeleton /> },
  },
  {
    id: 'Artist',
    header: 'Artist',
    cell: (props) => <ArtistsTableArtistCell {...props} />,
    meta: { skeleton: <ArtistsTableArtistCellSkeleton /> },
  },
  {
    accessorKey: 'songs_count',
    header: 'Songs',
    meta: { skeleton: <TextSkeleton className="w-12" /> },
  },
  {
    accessorKey: 'albums_count',
    header: 'Albums',
    meta: { skeleton: <TextSkeleton className="w-12" /> },
  },
  {
    accessorKey: 'genre_title',
    header: 'Genre',
    cell: (props) => <ArtistsTableGenreCell {...props} />,
    meta: { skeleton: <TextSkeleton className="w-20" /> },
  },
  {
    id: 'actions',
    header: 'Actions',
    cell: (props) => <ArtistsTableActionCell {...props} />,
    meta: { skeleton: <ActionsCellSkeleton /> },
  },
];
