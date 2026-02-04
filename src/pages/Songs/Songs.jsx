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
import PageHeader from '@components/shared/PageHeader/PageHeader';
import FilterBar from '@components/FilterBar/FilterBar';
import FilterComboBox from '@components/FilterComboBox/FilterComboBox';
import FilterSelectBox from '@components/FilterSelectBox/FilterSelectBox';
import KpiCardWrapper from '@components/KpiCardWrapper/KpiCardWrapper';
import { formatTime } from '@/utils';
import PrimaryTable from '@components/Tables/PrimaryTable/PrimaryTable';
import MostPlaysChart from '@components/MostPlaysChart/MostPlaysChart';
import SearchInput from '@components/SearchInput/SearchInput';
import CheckBoxHeader from '@components/Tables/ColumnDefs/Headers/CheckBoxHeader';
import CheckBoxCell from '@components/Tables/ColumnDefs/Cells/GenreicTableCells/CheckBoxCell';
import SongsTableSongCell from '@components/Tables/ColumnDefs/Cells/SongsTableCells/SongsTableSongCell';
import TimeCell from '@components/Tables/ColumnDefs/Cells/GenreicTableCells/TimeCell';
import ActionsCell from '@components/Tables/ColumnDefs/Cells/GenreicTableCells/ActionsCell';
import SongsTableSongCellSkeleton from '@components/Tables/ColumnDefs/Cells/SongsTableCells/SongsTableSongCellSkeleton';
import TextSkeleton from '@components/Tables/ColumnDefs/Cells/GenreicTableCells/Skeleton/TextSkeleton';
import CheckBoxSkeleton from '@components/Tables/ColumnDefs/Cells/GenreicTableCells/Skeleton/CheckBoxSkeleton';
import ActionsCellSkeleton from '@components/Tables/ColumnDefs/Cells/GenreicTableCells/Skeleton/ActionsCellSkeleton';
import SongsDialog from '@/components/Dialogs/SongsDialog';

const albums = [
  { id: 1, title: 'Album One' },
  { id: 2, title: 'Album Two' },
  { id: 3, title: 'Album Three' },
  { id: 4, title: 'Album Four' },
];

const genres = [
  { id: 1, title: 'Rock' },
  { id: 2, title: 'Pop' },
  { id: 3, title: 'Jazz' },
  { id: 5, title: 'Classical' },
];

const visibilityOptions = [
  { value: 'public', label: 'Public' },
  { value: 'private', label: 'Private' },
  { value: 'draft', label: 'Draft' },
];

const columns = [
  {
    id: 'select',
    header: (props) => <CheckBoxHeader {...props} />,
    cell: (props) => <CheckBoxCell {...props} />,
    meta: { skeleton: <CheckBoxSkeleton /> },
  },
  {
    id: 'song',
    header: 'Song',
    cell: (props) => <SongsTableSongCell {...props} />,
    meta: { skeleton: <SongsTableSongCellSkeleton /> },
  },
  {
    header: 'Artist',
    accessorKey: 'artist',
    meta: { skeleton: <TextSkeleton className="w-16" /> },
  },
  {
    header: 'Genre',
    accessorKey: 'genre_name',
    meta: { skeleton: <TextSkeleton className="w-16" /> },
  },
  { header: 'Plays', accessorKey: 'play_count', meta: { skeleton: <TextSkeleton /> } },
  {
    header: 'Duration',
    accessorKey: 'duration',
    cell: ({ getValue }) => formatTime(getValue()),
    meta: { skeleton: <TextSkeleton className="w-16" /> },
  },
  {
    header: 'Uploaded At',
    accessorKey: 'created_at',
    cell: (props) => <TimeCell {...props} />,
    meta: { skeleton: <TextSkeleton className="w-30 max-w-30" /> },
  },
  {
    header: 'Actions',
    id: 'actions',
    cell: (props) => <ActionsCell {...props} />,
    meta: { skeleton: <ActionsCellSkeleton /> },
  },
];

function Songs() {
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 5 });
  const { data, isLoading } = useQuery(getSongsQuery(pagination));
  const { data: chartData } = useQuery(getMostPlayedSongsQuery({ limit: 6 }));
  const { data: statsData, isPending: isStatsPending } = useQuery(getCurrentStatsQuery());
  const { data: zeroPlayedSongsCount, isPending: isZeroPlayedSongsPending } = useQuery(
    getZeroPlayedSongsCountQuery()
  );
  const { data: artists, isPending: isArtistsPending } = useQuery(getArtistsQuery());
  const [visibility, setVisibility] = useState();
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
      <SearchInput placeholder="Search by song title or artist..." />
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
          valueKey="title"
          onSelect={onAlbumSelect}
        />
        <FilterComboBox
          filterName="Genres"
          placeholder="Select a genre"
          options={genres}
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
