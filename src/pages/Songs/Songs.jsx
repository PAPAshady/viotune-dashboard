import { useState } from 'react';

import { useMutation, useQuery } from '@tanstack/react-query';

import {
  getSongsQuery,
  getMostPlayedSongsQuery,
  getZeroPlayedSongsCountQuery,
} from '@/queries/songs';
import { deleteSongsMutation } from '@/queries/songs';
import { getArtistsQuery } from '@/queries/artists';
import { getCurrentStatsQuery } from '@/queries/stats';
import { getAllAlbumsQuery } from '@/queries/albums';
import { getGenresQuery } from '@/queries/genres';
import PageHeader from '@components/shared/PageHeader/PageHeader';
import FilterBar from '@components/FilterBar/FilterBar';
import FilterComboBox from '@components/FilterComboBox/FilterComboBox';
import FilterSelectBox from '@components/FilterSelectBox/FilterSelectBox';
import KpiCardWrapper from '@components/KpiCardWrapper/KpiCardWrapper';
import PrimaryTable from '@components/Tables/PrimaryTable/PrimaryTable';
import MostPlaysChart from '@components/MostPlaysChart/MostPlaysChart';
import SearchInput from '@components/SearchInput/SearchInput';
import columns from '@/columns/columns.songs.jsx';
import useDebounce from '@/hooks/useDebounce';
import UploadSongSheet from '@/components/Sheets/Songs/UploadSongSheet';

const statusOptions = [
  { value: '', label: 'All' },
  { value: 'draft', label: 'Draft' },
  { value: 'published', label: 'Published' },
];

function Songs() {
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 5 });
  const { data: chartData } = useQuery(getMostPlayedSongsQuery({ limit: 6 }));
  const { data: statsData, isPending: isStatsPending } = useQuery(getCurrentStatsQuery());
  const { data: zeroPlayedSongsCount, isPending: isZeroPlayedSongsPending } = useQuery(
    getZeroPlayedSongsCountQuery()
  );
  const bulkDeleteMutation = useMutation(deleteSongsMutation());
  const { data: artists, isPending: isArtistsPending } = useQuery(getArtistsQuery());
  const { data: albums, isPending: isAlbumsPending } = useQuery(getAllAlbumsQuery());
  const { data: genres, isPending: isGenresPending } = useQuery(getGenresQuery());
  const [searchValue, setSearchValue] = useState('');
  const debouncedSearchValue = useDebounce(searchValue);
  const isKpiLoading = isStatsPending || isZeroPlayedSongsPending;
  const [artistId, setArtistId] = useState(null);
  const [albumId, setAlbumId] = useState(null);
  const [genreId, setGenreId] = useState(null);
  const [status, setStatus] = useState(null);
  ``;

  const filters = { artistId, albumId, genreId, status };

  const { data, isLoading } = useQuery(
    getSongsQuery({
      ...pagination,
      ...filters,
      search: debouncedSearchValue,
    })
  );

  // if no filter is selected, set to null instead if empty string
  const onArtistSelect = (selectedArtistId) => setArtistId(selectedArtistId || null);
  const onAlbumSelect = (selectedAlbumId) => setAlbumId(selectedAlbumId || null);
  const onGenreSelect = (selectedGenreId) => setGenreId(selectedGenreId || null);
  const onStatusSelect = (e) => setStatus(e.target.value || null);

  const clearFilters = () => {
    setArtistId(null);
    setAlbumId(null);
    setGenreId(null);
    setStatus(null);
  };

  const kpiInfos = [
    { id: 1, title: 'Total Songs', value: statsData?.songs ?? 0 },
    { id: 2, title: 'Total Song Plays', value: statsData?.plays ?? 0 },
    { id: 3, title: 'Songs with Zero Plays', value: zeroPlayedSongsCount ?? 0 },
    {
      id: 4,
      title: 'Avg Plays per Songs',
      value: statsData?.songs ? (statsData.plays / statsData.songs).toFixed(1) : 0,
    },
  ];

  return (
    <>
      <PageHeader title="Songs" description="Manage and analyze all uploaded songs.">
        {/* Upload new song sheet */}
        <UploadSongSheet genres={genres} albums={albums} artists={artists} />
      </PageHeader>
      <KpiCardWrapper data={kpiInfos} isPending={isKpiLoading} />

      <SearchInput
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        placeholder="Search by song title or artist..."
      />
      <FilterBar filters={filters} onClearAll={clearFilters}>
        <FilterComboBox
          filterName="Artists"
          placeholder="Select an artist"
          options={artists}
          isPending={isArtistsPending}
          valueKey="name"
          value={artistId}
          onChange={onArtistSelect}
        />
        <FilterComboBox
          filterName="Albums"
          placeholder="Select an album"
          options={albums}
          isPending={isAlbumsPending}
          valueKey="title"
          onChange={onAlbumSelect}
          value={albumId}
        />
        <FilterComboBox
          filterName="Genres"
          placeholder="Select a genre"
          options={genres}
          isPending={isGenresPending}
          valueKey="title"
          onChange={onGenreSelect}
          value={genreId}
        />
        <FilterSelectBox
          filterName="Status"
          placeholder="Select status"
          options={statusOptions}
          value={status}
          onChange={onStatusSelect}
        />
      </FilterBar>
      <PrimaryTable
        columns={columns}
        rows={data}
        isLoading={isLoading}
        pagination={pagination}
        setPagination={setPagination}
        tableClassName="min-w-235"
        onBulkDelete={bulkDeleteMutation.mutateAsync}
        bulkDeletePending={bulkDeleteMutation.isPending}
      />
      <MostPlaysChart
        chartTitle="Top songs by Plays"
        data={chartData}
        yAxisDataKey="title"
        barDataKey="total_plays"
      />
    </>
  );
}

export default Songs;
