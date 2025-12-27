import { useState } from 'react';

import { InputGroup, InputGroupInput, InputGroupAddon } from '@components/ui/input-group';
import { PlusIcon, SearchIcon } from 'lucide-react';
import { Button } from '@components/ui/button';
import { useIsMobile } from '@hooks/use-mobile';

import PageHeader from '@components/shared/PageHeader/PageHeader';
import FilterBar from '@components/FilterBar/FilterBar';
import FilterComboBox from '@components/FilterComboBox/FilterComboBox';
import FilterSelectBox from '@components/FilterSelectBox/FilterSelectBox';

const artists = [
  { id: 1, name: 'Artist One' },
  { id: 2, name: 'Artist Two' },
  { id: 3, name: 'Artist Three' },
  { id: 4, name: 'Artist Four' },
];

const visibilityOptions = [
  { value: 'public', label: 'Public' },
  { value: 'private', label: 'Private' },
  { value: 'draft', label: 'Draft' },
];

const releaseYearOptions = [
  { value: '2023', label: '2023' },
  { value: '2022', label: '2022' },
  { value: '2021', label: '2021' },
  { value: '2020', label: '2020' },
];

function Albums() {
  const isMobile = useIsMobile();
  const [visibility, setVisibility] = useState();
  const [releaseYear, setReleaseYear] = useState();

  const onArtistSelect = (value) => {
    console.log(`Selected artist: ${value}`);
  };

  const onVisibilityChange = (e) => {
    const value = e.target.value;
    setVisibility(value);
  };
  const onReleaseYearChange = (e) => {
    const value = e.target.value;
    setReleaseYear(value);
  };

  return (
    <div className="space-y-4 md:space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <PageHeader title="Albums" description="Manage all albums in your platform." />
        <div className="flex-wra -mt-6 flex gap-2 sm:m-0 sm:justify-end">
          <Button size={isMobile ? 'sm' : 'default'} variant="outline">
            Bulk Actions (0)
          </Button>
          <Button
            size={isMobile ? 'sm' : 'default'}
            className="bg-blue-500 text-white hover:bg-blue-600"
          >
            <PlusIcon /> Add Album
          </Button>
        </div>
      </div>
      <div className="sm:-mt-5">
        <InputGroup>
          <InputGroupInput placeholder="Search albums by title or artist..." />
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
        <FilterSelectBox
          filterName="Visibility"
          placeholder="Select visibility"
          options={visibilityOptions}
          value={visibility}
          onChange={onVisibilityChange}
        />
        <FilterSelectBox
          filterName="Release year"
          placeholder="Select release year"
          options={releaseYearOptions}
          value={releaseYear}
          onChange={onReleaseYearChange}
        />
      </FilterBar>
    </div>
  );
}

export default Albums;
