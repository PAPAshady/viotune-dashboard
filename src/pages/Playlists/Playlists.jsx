import { useState } from 'react';

import { useIsMobile } from '@hooks/use-mobile';
import { PlusIcon } from 'lucide-react';
import { Button } from '@components/ui/button';
import { useQuery } from '@tanstack/react-query';

import PageHeader from '@components/shared/PageHeader/PageHeader';
import SearchInput from '@/components/SearchInput/SearchInput';
import FilterBar from '@components/FilterBar/FilterBar';
import FilterSelectBox from '@components/FilterSelectBox/FilterSelectBox';
import PrimaryTable from '@components/Tables/PrimaryTable/PrimaryTable';
import { getPlaylistsQuery, getMostPlayedPlaylistsQuery } from '@/queries/playlists';
import MostPlaysChart from '@components/MostPlaysChart/MostPlaysChart';
import KpiCardWrapper from '@components/KpiCardWrapper/KpiCardWrapper';
import columns from '@/columns/columns.playlists.jsx';
import useDebounce from '@/hooks/useDebounce';

const kpiInfos = [
  { id: 1, value: 2, title: 'Total Playlists' },
  { id: 2, value: 200, title: 'Most Played Playlist' },
  { id: 3, value: 0, title: 'Zero Songs' },
  { id: 4, value: 15, title: 'Avg Songs/Playlist' },
];

const typeOptions = [
  { value: 'private', label: 'User playlists (Private)' },
  { value: 'public', label: 'Admin playlists (Public)' },
];

function Playlists() {
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 5 });
  const [type, setType] = useState();
  const isMobile = useIsMobile();
  const { data: mostPlayedPublicPlaylists } = useQuery(getMostPlayedPlaylistsQuery({ limit: 6 }));
  const [searchValue, setSearchValue] = useState('');
  const debouncedSearchValue = useDebounce(searchValue);

  const filters = {
    type,
  };

  const { data, isLoading } = useQuery(
    getPlaylistsQuery({ ...pagination, ...filters, search: debouncedSearchValue })
  );

  const onTypeChange = (e) => setType(e.target.value || null);

  const clearFilters = () => {
    setType('');
  };

  return (
    <>
      <PageHeader title="Playlists" description="Manage user and admin playlists.">
        <Button size={isMobile ? 'sm' : 'default'} variant="outline">
          Bulk Actions (0)
        </Button>
        <Button
          size={isMobile ? 'sm' : 'default'}
          className="bg-blue-500 text-white hover:bg-blue-600"
        >
          <PlusIcon /> Create Playlist
        </Button>
      </PageHeader>
      <KpiCardWrapper data={kpiInfos} />
      <SearchInput
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        placeholder="Search playlists by title..."
      />
      <FilterBar filters={filters} onClearAll={clearFilters}>
        <FilterSelectBox
          filterName="Type"
          placeholder="Select type"
          options={typeOptions}
          value={type}
          onChange={onTypeChange}
        />
      </FilterBar>
      <PrimaryTable
        columns={columns}
        rows={data}
        isLoading={isLoading}
        pagination={pagination}
        setPagination={setPagination}
        tableClassName="min-w-220"
      />
      <MostPlaysChart
        chartTitle="Most Played Playlists"
        data={mostPlayedPublicPlaylists}
        yAxisDataKey="title"
        barDataKey="total_plays"
      />
    </>
  );
}

export default Playlists;
