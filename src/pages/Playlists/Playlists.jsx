import { useState } from 'react';

import { useQuery } from '@tanstack/react-query';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

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
import PlaylistsSheet from '@/components/Sheets/Playlists/PlaylistsSheet';

const typeOptions = [
  { value: 'private', label: 'User playlists (Private)' },
  { value: 'public', label: 'Admin playlists (Public)' },
];

const tracksRangeOptions = [
  { value: '0-5', label: '0 to 5 tracks' },
  { value: '6-10', label: '6 to 10 tracks' },
  { value: '11-30', label: '11 to 30 tracks' },
  { value: '31-50', label: '31 to 50 tracks' },
  { value: '50+', label: '50+ tracks' },
];

function Playlists() {
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 5 });
  const [type, setType] = useState();
  const { data: mostPlayedPublicPlaylists } = useQuery(getMostPlayedPlaylistsQuery({ limit: 6 }));
  const [searchValue, setSearchValue] = useState('');
  const [playlistCreatorSearchValue, setPlaylistCreatorSearchValue] = useState('');
  const [tracksRange, setTracksRange] = useState();
  const debouncedSearchValue = useDebounce(searchValue);
  const { data: playlistsStats, isPending: isStatsPending } = useQuery(getPlaylistsStatsQuery());

  const filters = {
    type,
    tracksRange,
    playlistCreator: playlistCreatorSearchValue,
  };

  const { data, isLoading } = useQuery(
    getPlaylistsQuery({ ...pagination, ...filters, search: debouncedSearchValue })
  );

  const onTypeChange = (e) => setType(e.target.value || null);
  const onTracksRangeSelect = (e) => setTracksRange(e.target.value);

  const clearFilters = () => {
    setType('');
    setPlaylistCreatorSearchValue('');
    setTracksRange('');
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

  return (
    <>
      <PageHeader title="Playlists" description="Manage user and admin playlists.">
        <PlaylistsSheet />
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
        <div className="space-y-3">
          <Label>Creator</Label>
          <Input
            placeholder="Search by creator name..."
            value={playlistCreatorSearchValue}
            onChange={(e) => setPlaylistCreatorSearchValue(e.target.value)}
          />
        </div>
        <FilterSelectBox
          filterName="Tracks range"
          placeholder="Select tracks range"
          options={tracksRangeOptions}
          value={tracksRange}
          onChange={onTracksRangeSelect}
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
        chartTitle="Most Played Public Playlists"
        data={mostPlayedPublicPlaylists}
        yAxisDataKey="title"
        barDataKey="total_plays"
      />
    </>
  );
}

export default Playlists;
