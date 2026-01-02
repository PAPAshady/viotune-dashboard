import { useState } from 'react';

import { useIsMobile } from '@hooks/use-mobile';
import { PlusIcon } from 'lucide-react';
import { Button } from '@components/ui/button';
import { useQuery } from '@tanstack/react-query';

import SearchInput from '@components/SearchInput/SearchInput';
import PageHeader from '@components/shared/PageHeader/PageHeader';
import FilterBar from '@components/FilterBar/FilterBar';
import FilterComboBox from '@components/FilterComboBox/FilterComboBox';
import { getArtistsQuery } from '@/queries/artists';
import CheckBoxHeader from '@components/Tables/ColumnDefs/Headers/CheckBoxHeader';
import CheckBoxCell from '@components/Tables/ColumnDefs/Cells/CheckBoxCell';
import ArtistsTableArtistCell from '@components/Tables/ColumnDefs/Cells/ArtistsTableArtistCell';
import ArtistsTableGenreCell from '@components/Tables/ColumnDefs/Cells/ArtistsTableGenreCell';
import ActionsCell from '@components/Tables/ColumnDefs/Cells/ActionsCell';
import PrimaryTable from '@components/Tables/PrimaryTable/PrimaryTable';
import KpiCardWrapper from '@components/KpiCardWrapper/KpiCardWrapper';

const genre = [
  { id: 1, title: 'Genre One' },
  { id: 2, title: 'Genre Two' },
  { id: 3, title: 'Genre Three' },
  { id: 4, title: 'Genre Four' },
];

const kpiInfos = [
  { id: 1, value: 2, title: 'Total Artists' },
  { id: 2, value: 200, title: 'Verified Artists' },
  { id: 3, value: 0, title: 'Avg Plays per Artist' },
  { id: 4, value: 15, title: 'Artists with Zero Songs' },
];

const columns = [
  {
    id: 'select',
    header: (props) => <CheckBoxHeader {...props} />,
    cell: (props) => <CheckBoxCell {...props} />,
  },
  { id: 'Artist', header: 'Artist', cell: (props) => <ArtistsTableArtistCell {...props} /> },
  { accessorKey: 'songs_count', header: 'Songs' },
  { accessorKey: 'albums_count', header: 'Albums' },
  {
    accessorKey: 'genre_title',
    header: 'Genre',
    cell: (props) => <ArtistsTableGenreCell {...props} />,
  },
  { id: 'actions', header: 'Actions', cell: (props) => <ActionsCell {...props} /> },
];

function Artists() {
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 5 });
  const { data } = useQuery(getArtistsQuery(pagination));
  const isMobile = useIsMobile();

  const onGenreSelect = (value) => {
    console.log(`Selected artist: ${value}`);
  };

  return (
    <>
      <PageHeader title="Artists" description="Manage Artists and their content.">
        <Button size={isMobile ? 'sm' : 'default'} variant="outline">
          Bulk Actions (0)
        </Button>
        <Button
          size={isMobile ? 'sm' : 'default'}
          className="bg-blue-500 text-white hover:bg-blue-600"
        >
          <PlusIcon /> Add Artist
        </Button>
      </PageHeader>
      <SearchInput placeholder="Search by artist name..." />
      <FilterBar>
        <FilterComboBox
          filterName="Genre"
          placeholder="Select Genre"
          options={genre}
          valueKey="title"
          onSelect={onGenreSelect}
        />
      </FilterBar>
      <KpiCardWrapper data={kpiInfos} />
      <PrimaryTable
        columns={columns}
        rows={data}
        pagination={pagination}
        setPagination={setPagination}
      />
    </>
  );
}

export default Artists;
