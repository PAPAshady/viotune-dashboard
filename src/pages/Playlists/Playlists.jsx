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
import {
  getPlaylistsQuery,
  getMostPlayedPlaylistsQuery,
  getPlaylistsStatsQuery,
} from '@/queries/playlists';
import MostPlaysChart from '@components/MostPlaysChart/MostPlaysChart';
import KpiCardWrapper from '@components/KpiCardWrapper/KpiCardWrapper';
import columns from '@/columns/columns.playlists.jsx';
import useDebounce from '@/hooks/useDebounce';

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
  const { data: playlistsStats, isPending: isStatsPending } = useQuery(getPlaylistsStatsQuery());

  const filters = {
    type,
  };

  const kpiCardsData = [
    {
      id: 1,
      title: 'Total Playlists',
      value: playlistsStats?.totalPlaylists ?? 'N/A',
    },
    {
      id: 2,
      title: 'Total Playlist Plays',
      value: playlistsStats?.totalPlaylistPlays ?? 'N/A',
    },
    {
      id: 3,
      title: 'Total Playlist Tracks',
      value: playlistsStats?.totalPlaylistTracks ?? 'N/A',
    },
    {
      id: 4,
      title: 'Avg Tracks per Playlist',
      value: playlistsStats?.avgSongsPerPlaylist ?? 'N/A',
    },
  ];

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
        <Button
          size={isMobile ? 'sm' : 'default'}
          className="bg-blue-500 text-white hover:bg-blue-600"
        >
          <PlusIcon /> Create Playlist
        </Button>
      </PageHeader>
      <KpiCardWrapper data={kpiCardsData} isPending={isStatsPending} />
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
