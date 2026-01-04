import { useState } from 'react';

import { useIsMobile } from '@hooks/use-mobile';
import { PlusIcon } from 'lucide-react';
import { Button } from '@components/ui/button';
import { useQuery } from '@tanstack/react-query';

import PageHeader from '@components/shared/PageHeader/PageHeader';
import SearchInput from '@/components/SearchInput/SearchInput';
import FilterBar from '@components/FilterBar/FilterBar';
import FilterSelectBox from '@components/FilterSelectBox/FilterSelectBox';
import FilterSearchBox from '@components/FilterSearchBox/FilterSearchBox';
import PrimaryTable from '@components/Tables/PrimaryTable/PrimaryTable';
import { getPlaylistsQuery, getMostPlayedPlaylistsQuery } from '@/queries/playlists';
import CheckBoxHeader from '@components/Tables/ColumnDefs/Headers/CheckBoxHeader';
import CheckBoxCell from '@components/Tables/ColumnDefs/Cells/GenreicTableCells/CheckBoxCell';
import PlaylistsTablePlaylistCell from '@components/Tables/ColumnDefs/Cells/PlaylistsTableCells/PlaylistsTablePlaylistCell';
import PlaylistsTableCreatorCell from '@components/Tables/ColumnDefs/Cells/PlaylistsTableCells/PlaylistsTableCreatorCell';
import PlaylistsTableGenreCell from '@components/Tables/ColumnDefs/Cells/PlaylistsTableCells/PlaylistsTableGenreCell';
import PlaylistsTableVisibilityCell from '@components/Tables/ColumnDefs/Cells/PlaylistsTableCells/PlaylistsTableVisibilityCell';
import ActionsCell from '@components/Tables/ColumnDefs/Cells/GenreicTableCells/ActionsCell';
import MostPlaysChart from '@components/MostPlaysChart/MostPlaysChart';
import KpiCardWrapper from '@components/KpiCardWrapper/KpiCardWrapper';
import CheckBoxSkeleton from '@components/Tables/ColumnDefs/Cells/GenreicTableCells/Skeleton/CheckBoxSkeleton';
import PlaylistsTablePlaylistCellSkeleton from '@components/Tables/ColumnDefs/Cells/PlaylistsTableCells/Skeleton/PlaylistsTablePlaylistCellSkeleton';
import TextSkeleton from '@components/Tables/ColumnDefs/Cells/GenreicTableCells/Skeleton/TextSkeleton';
import ActionsCellSkeleton from '@components/Tables/ColumnDefs/Cells/GenreicTableCells/Skeleton/ActionsCellSkeleton';

const kpiInfos = [
  { id: 1, value: 2, title: 'Total Playlists' },
  { id: 2, value: 200, title: 'Most Played Playlist' },
  { id: 3, value: 0, title: 'Zero Songs' },
  { id: 4, value: 15, title: 'Avg Songs/Playlist' },
];

const visibilityOptions = [
  { value: 'public', label: 'Public' },
  { value: 'private', label: 'Private' },
  { value: 'draft', label: 'Draft' },
];

const typeOptions = [
  { value: 'private', label: 'User playlists' },
  { value: 'public', label: 'Admin playlists' },
];

const columns = [
  {
    id: 'select',
    header: (props) => <CheckBoxHeader {...props} />,
    cell: (props) => <CheckBoxCell {...props} />,
    meta: { skeleton: <CheckBoxSkeleton /> },
  },
  {
    id: 'playlist',
    header: 'Playlist',
    cell: (props) => <PlaylistsTablePlaylistCell {...props} />,
    meta: { skeleton: <PlaylistsTablePlaylistCellSkeleton /> },
  },
  {
    id: 'creator',
    header: 'Creator',
    cell: (props) => <PlaylistsTableCreatorCell {...props} />,
    meta: { skeleton: <TextSkeleton className="max-w-none" /> },
  },
  {
    accessorKey: 'is_public',
    header: 'Visibility',
    cell: (props) => <PlaylistsTableVisibilityCell {...props} />,
    meta: { skeleton: <TextSkeleton /> },
  },
  {
    accessorKey: 'total_plays',
    header: 'Plays',
    meta: { skeleton: <TextSkeleton className="max-w-12" /> },
  },
  {
    accessorKey: 'genre_title',
    header: 'Genre',
    cell: (props) => <PlaylistsTableGenreCell {...props} />,
    meta: { skeleton: <TextSkeleton /> },
  },
  {
    accessorKey: 'totaltracks',
    header: 'Tracks',
    meta: { skeleton: <TextSkeleton className="max-w-16" /> },
  },
  {
    header: 'Actions',
    id: 'actions',
    cell: (props) => <ActionsCell {...props} />,
    meta: { skeleton: <ActionsCellSkeleton /> },
  },
];

function Playlists() {
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 5 });
  const [filterSearchValue, setFilterSearchValue] = useState();
  const [visibility, setVisibility] = useState();
  const [type, setType] = useState();
  const isMobile = useIsMobile();
  const { data, isLoading } = useQuery(getPlaylistsQuery(pagination));
  const { data: mostPlayedPublicPlaylists } = useQuery(getMostPlayedPlaylistsQuery({ limit: 6 }));

  const onVisibilityChange = (e) => {
    const value = e.target.value;
    setVisibility(value);
  };

  const onTypeChange = (e) => {
    const value = e.target.value;
    setType(value);
  };

  const onFilterSearchChange = (e) => {
    const value = e.target.value;
    setFilterSearchValue(value);
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
      <SearchInput placeholder="Search playlists or creator..." />
      <FilterBar>
        <FilterSearchBox
          filterName="Creator"
          value={filterSearchValue}
          onChange={onFilterSearchChange}
          placeholder="Filter by creator"
        />
        <FilterSelectBox
          filterName="Type"
          placeholder="Select type"
          options={typeOptions}
          value={type}
          onChange={onTypeChange}
        />
        <FilterSelectBox
          filterName="Visibility"
          placeholder="Select visibility"
          options={visibilityOptions}
          value={visibility}
          onChange={onVisibilityChange}
        />
      </FilterBar>
      <KpiCardWrapper data={kpiInfos} />
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
