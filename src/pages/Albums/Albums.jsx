import { useState } from 'react';

import { PlusIcon } from 'lucide-react';
import { Button } from '@components/ui/button';
import { useIsMobile } from '@hooks/use-mobile';
import { useQuery } from '@tanstack/react-query';

import PageHeader from '@components/shared/PageHeader/PageHeader';
import FilterBar from '@components/FilterBar/FilterBar';
import FilterComboBox from '@components/FilterComboBox/FilterComboBox';
import FilterSelectBox from '@components/FilterSelectBox/FilterSelectBox';
import { getAlbumsQuery } from '@/queries/albums';
import PrimaryTable from '@components/Tables/PrimaryTable/PrimaryTable';
import SearchInput from '@components/SearchInput/SearchInput';
import CheckBoxHeader from '@components/Tables/ColumnDefs/Headers/CheckBoxHeader';
import CheckBoxCell from '@components/Tables/ColumnDefs/Cells/CheckBoxCell';
import AlbumsTableAlbumCell from '@components/Tables/ColumnDefs/Cells/AlbumsTableAlbumCell';
import AlbumsTableArtistCell from '@components/Tables/ColumnDefs/Cells/AlbumsTableArtistCell';
import ActionsCell from '@components/Tables/ColumnDefs/Cells/ActionsCell';

const artists = [
  { id: 1, name: 'Artist One' },
  { id: 2, name: 'Artist Two' },
  { id: 3, name: 'Artist Three' },
  { id: 4, name: 'Artist Four' },
];

const visibilityOptions = [
  { value: 'public', label: 'Public' },
  { value: 'private', label: 'Private' },
  { value: 'draft', label: 'Draft' },
];

const releaseYearOptions = [
  { value: '2023', label: '2023' },
  { value: '2022', label: '2022' },
  { value: '2021', label: '2021' },
  { value: '2020', label: '2020' },
];

const columns = [
  {
    id: 'select',
    header: (props) => <CheckBoxHeader {...props} />,
    cell: (props) => <CheckBoxCell {...props} />,
  },
  {
    id: 'album',
    header: 'Album',
    cell: (props) => <AlbumsTableAlbumCell {...props} />,
  },
  {
    accessorKey: 'artist',
    header: 'Artist',
    cell: (props) => <AlbumsTableArtistCell {...props} />,
  },
  { accessorKey: 'totaltracks', header: 'Tracks' },
  { accessorKey: 'play_count', header: 'Plays' },
  { accessorKey: 'genre_title', header: 'Genre' },
  {
    accessorKey: 'release_date',
    header: 'Release Date',
    cell: ({ getValue }) => getValue().replace(/-/g, '/'),
  },
  {
    header: 'Actions',
    id: 'actions',
    cell: (props) => <ActionsCell {...props} />,
  },
];

function Albums() {
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 5 });
  const isMobile = useIsMobile();
  const [visibility, setVisibility] = useState();
  const [releaseYear, setReleaseYear] = useState();
  const { data } = useQuery(getAlbumsQuery(pagination));

  const onArtistSelect = (value) => {
    console.log(`Selected artist: ${value}`);
  };

  const onVisibilityChange = (e) => {
    const value = e.target.value;
    setVisibility(value);
  };

  const onReleaseYearChange = (e) => {
    const value = e.target.value;
    setReleaseYear(value);
  };

  return (
    <>
      <PageHeader title="Albums" description="Manage all albums in your platform.">
        <Button size={isMobile ? 'sm' : 'default'} variant="outline">
          Bulk Actions (0)
        </Button>
        <Button
          size={isMobile ? 'sm' : 'default'}
          className="bg-blue-500 text-white hover:bg-blue-600"
        >
          <PlusIcon /> Add Album
        </Button>
      </PageHeader>
      <SearchInput placeholder="Search albums by title or artist..." />
      <FilterBar>
        <FilterComboBox
          filterName="Artists"
          placeholder="Select an artist"
          options={artists}
          valueKey="name"
          onSelect={onArtistSelect}
        />
        <FilterSelectBox
          filterName="Visibility"
          placeholder="Select visibility"
          options={visibilityOptions}
          value={visibility}
          onChange={onVisibilityChange}
        />
        <FilterSelectBox
          filterName="Release year"
          placeholder="Select release year"
          options={releaseYearOptions}
          value={releaseYear}
          onChange={onReleaseYearChange}
        />
      </FilterBar>
      <PrimaryTable
        columns={columns}
        rows={data}
        pagination={pagination}
        setPagination={setPagination}
      />
    </>
  );
}

export default Albums;
