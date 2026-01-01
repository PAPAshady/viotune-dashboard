import { useState } from 'react';

import { useIsMobile } from '@hooks/use-mobile';
import { PlusIcon } from 'lucide-react';
import { Button } from '@components/ui/button';
import { useQuery } from '@tanstack/react-query';

import PageHeader from '@components/shared/PageHeader/PageHeader';
import KpiCard from '@components/KpiCard/KpiCard';
import SearchInput from '@/components/SearchInput/SearchInput';
import FilterBar from '@components/FilterBar/FilterBar';
import FilterSelectBox from '@components/FilterSelectBox/FilterSelectBox';
import FilterSearchBox from '@components/FilterSearchBox/FilterSearchBox';
import PrimaryTable from '@components/Tables/PrimaryTable/PrimaryTable';
import { getPlaylistsQuery, getMostPlayedPlaylistsQuery } from '@/queries/playlists';
import CheckBoxHeader from '@components/Tables/ColumnDefs/Headers/CheckBoxHeader';
import CheckBoxCell from '@components/Tables/ColumnDefs/Cells/CheckBoxCell';
import PlaylistsTablePlaylistCell from '@components/Tables/ColumnDefs/Cells/PlaylistsTablePlaylistCell';
import PlaylistsTableCreatorCell from '@components/Tables/ColumnDefs/Cells/PlaylistsTableCreatorCell';
import PlaylistsTableGenreCell from '@components/Tables/ColumnDefs/Cells/PlaylistsTableGenreCell';
import PlaylistsTableVisibilityCell from '@components/Tables/ColumnDefs/Cells/PlaylistsTableVisibilityCell';
import ActionsCell from '@components/Tables/ColumnDefs/Cells/ActionsCell';
import MostPlaysChart from '@components/MostPlaysChart/MostPlaysChart';

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
  },
  {
    id: 'playlist',
    header: 'Playlist',
    cell: (props) => <PlaylistsTablePlaylistCell {...props} />,
  },
  {
    id: 'creator',
    header: 'Creator',
    cell: (props) => <PlaylistsTableCreatorCell {...props} />,
  },
  {
    accessorKey: 'is_public',
    header: 'Visibility',
    cell: (props) => <PlaylistsTableVisibilityCell {...props} />,
  },
  { accessorKey: 'total_plays', header: 'Plays' },
  {
    accessorKey: 'genre_title',
    header: 'Genre',
    cell: (props) => <PlaylistsTableGenreCell {...props} />,
  },
  { accessorKey: 'totaltracks', header: 'Tracks' },
  {
    header: 'Actions',
    id: 'actions',
    cell: (props) => <ActionsCell {...props} />,
  },
];

function Playlists() {
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 5 });
  const [filterSearchValue, setFilterSearchValue] = useState();
  const [visibility, setVisibility] = useState();
  const [type, setType] = useState();
  const isMobile = useIsMobile();
  const { data } = useQuery(getPlaylistsQuery(pagination));
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
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:gap-4">
        {kpiInfos.map((kpi) => (
          <KpiCard key={kpi.id} {...kpi} />
        ))}
      </div>
      <PrimaryTable
        columns={columns}
        rows={data}
        pagination={pagination}
        setPagination={setPagination}
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
