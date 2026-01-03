import { useState } from 'react';

import { Button } from '@components/ui/button';
import { UploadIcon } from 'lucide-react';
import { useIsMobile } from '@hooks/use-mobile';
import { useQuery } from '@tanstack/react-query';

import { getSongsQuery, getMostPlayedSongsQuery } from '@/queries/songs';
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
import CheckBoxCell from '@/components/Tables/ColumnDefs/Cells/GenreicTableCells/CheckBoxCell';
import SongsTableSongCell from '@/components/Tables/ColumnDefs/Cells/SongsTableCells/SongsTableSongCell';
import TimeCell from '@/components/Tables/ColumnDefs/Cells/GenreicTableCells/TimeCell';
import ActionsCell from '@/components/Tables/ColumnDefs/Cells/GenreicTableCells/ActionsCell';

const artists = [
  { id: 1, name: 'Artist One' },
  { id: 2, name: 'Artist Two' },
  { id: 3, name: 'Artist Three' },
  { id: 4, name: 'Artist Four' },
];

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

const kpiInfos = [
  { id: 1, title: 'Total Songs', value: 1564 },
  { id: 2, title: 'Total Song Plays', value: 164_770 },
  { id: 3, title: 'Songs with Zero Plays', value: 15 },
  { id: 4, title: 'Avg Plays per Songs', value: 1564 },
];

const columns = [
  {
    id: 'select',
    header: (props) => <CheckBoxHeader {...props} />,
    cell: (props) => <CheckBoxCell {...props} />,
  },
  {
    id: 'song',
    header: 'Song',
    cell: (props) => <SongsTableSongCell {...props} />,
  },
  { header: 'Artist', accessorKey: 'artist' },
  { header: 'Genre', accessorKey: 'genre_name' },
  { header: 'Plays', accessorKey: 'play_count' },
  { header: 'Duration', accessorKey: 'duration', cell: ({ getValue }) => formatTime(getValue()) },
  {
    header: 'Uploaded At',
    accessorKey: 'created_at',
    cell: (props) => <TimeCell {...props} />,
  },
  {
    header: 'Actions',
    id: 'actions',
    cell: (props) => <ActionsCell {...props} />,
  },
];

function Songs() {
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 5 });
  const { data } = useQuery(getSongsQuery(pagination));
  const { data: chartData } = useQuery(getMostPlayedSongsQuery({ limit: 6 }));
  const [visibility, setVisibility] = useState();
  const isMobile = useIsMobile();

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
        <Button
          size={isMobile ? 'sm' : 'default'}
          className="bg-blue-500 text-white hover:bg-blue-600"
        >
          <UploadIcon /> Upload Song
        </Button>
      </PageHeader>
      <SearchInput placeholder="Search by song title or artist..." />
      <FilterBar>
        <FilterComboBox
          filterName="Artists"
          placeholder="Select an artist"
          options={artists}
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
      <KpiCardWrapper data={kpiInfos} />
      <PrimaryTable
        columns={columns}
        rows={data}
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
