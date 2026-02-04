import { useState } from 'react';

import { Button } from '@components/ui/button';
import { useIsMobile } from '@hooks/use-mobile';
import { useQuery } from '@tanstack/react-query';

import {
  getSongsQuery,
  getMostPlayedSongsQuery,
  getZeroPlayedSongsCountQuery,
} from '@/queries/songs';
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
import SongsDialog from '@/components/Dialogs/SongsDialog';
import columns from '@/columns/columns.songs.jsx';
import useDebounce from '@/hooks/useDebounce';

const visibilityOptions = [
  { value: 'all', label: 'All' },
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
  const { data: artists, isPending: isArtistsPending } = useQuery(getArtistsQuery());
  const { data: albums, isPending: isAlbumsPending } = useQuery(getAllAlbumsQuery());
  const { data: genres, isPending: isGenresPending } = useQuery(getGenresQuery());
  const [searchValue, setSearchValue] = useState('');
  const debouncedSearchValue = useDebounce(searchValue);
  const [visibility, setVisibility] = useState();
  const { data, isLoading } = useQuery(
    getSongsQuery({ ...pagination, search: debouncedSearchValue })
  );
  const isMobile = useIsMobile();
  const isKpiLoading = isStatsPending || isZeroPlayedSongsPending;

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

  const onArtistSelect = (value) => {
    console.log(`Selected artist: ${value}`);
  };

  const onAlbumSelect = (value) => {
    console.log(`Selected album: ${value}`);
  };

  const onGenreSelect = (value) => {
    console.log(`Selected genre: ${value}`);
  };

  const onVisibilityChange = (e) => {
    const value = e.target.value;
    setVisibility(value);
  };

  return (
    <>
      <PageHeader title="Songs" description="Manage and analyze all uploaded songs.">
        <Button size={isMobile ? 'sm' : 'default'} variant="outline">
          Bulk Actions (0)
        </Button>
        {/* Upload new son dialog */}
        <SongsDialog />
      </PageHeader>
      <SearchInput
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        placeholder="Search by song title or artist..."
      />
      <FilterBar>
        <FilterComboBox
          filterName="Artists"
          placeholder="Select an artist"
          options={artists}
          isPending={isArtistsPending}
          valueKey="name"
          onSelect={onArtistSelect}
        />
        <FilterComboBox
          filterName="Albums"
          placeholder="Select an album"
          options={albums}
          isPending={isAlbumsPending}
          valueKey="title"
          onSelect={onAlbumSelect}
        />
        <FilterComboBox
          filterName="Genres"
          placeholder="Select a genre"
          options={genres}
          isPending={isGenresPending}
          valueKey="title"
          onSelect={onGenreSelect}
        />
        <FilterSelectBox
          filterName="Visibility"
          placeholder="Select visibility"
          options={visibilityOptions}
          value={visibility}
          onChange={onVisibilityChange}
        />
      </FilterBar>
      <KpiCardWrapper data={kpiInfos} isPending={isKpiLoading} />
      <PrimaryTable
        columns={columns}
        rows={data}
        isLoading={isLoading}
        pagination={pagination}
        setPagination={setPagination}
      />
      <MostPlaysChart
        chartTitle="Top songs by Plays"
        data={chartData}
        yAxisDataKey="title"
        barDataKey="play_count"
      />
    </>
  );
}

export default Songs;
