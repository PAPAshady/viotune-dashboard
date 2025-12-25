import { useState } from 'react';

import { Button } from '@components/ui/button';
import { UploadIcon, SearchIcon } from 'lucide-react';
import { useIsMobile } from '@hooks/use-mobile';
import { InputGroup, InputGroupInput, InputGroupAddon } from '@components/ui/input-group';

import PageHeader from '@components/shared/PageHeader/PageHeader';
import FilterBar from '@components/FilterBar/FilterBar';
import FilterComboBox from '@components/FilterComboBox/FilterComboBox';
import FilterSelectBox from '@components/FilterSelectBox/FilterSelectBox';
import SongsKpi from '@components/SongsKpi/SongsKpi';
import SongsTable from '@/components/Tables/SongsTable/SongsTable';

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

function Songs() {
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
    <div className="space-y-4 md:space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <PageHeader title="Songs" description="Manage and analyze all uploaded songs." />
        <div className="flex-wra -mt-6 flex gap-2 sm:m-0 sm:justify-end">
          <Button size={isMobile ? 'sm' : 'default'} variant="outline">
            Bulk Actions (0)
          </Button>
          <Button
            size={isMobile ? 'sm' : 'default'}
            className="bg-blue-500 text-white hover:bg-blue-600"
          >
            <UploadIcon /> Upload Song
          </Button>
        </div>
      </div>
      <div className="sm:-mt-5">
        <InputGroup>
          <InputGroupInput placeholder="Search by song title or artist..." />
          <InputGroupAddon>
            <SearchIcon />
          </InputGroupAddon>
        </InputGroup>
      </div>
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
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:gap-4">
        {kpiInfos.map((kpi) => (
          <SongsKpi key={kpi.id} {...kpi} />
        ))}
      </div>
      <SongsTable />
    </div>
  );
}

export default Songs;
