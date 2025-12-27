import { useState } from 'react';

import { useIsMobile } from '@hooks/use-mobile';
import { PlusIcon } from 'lucide-react';
import { Button } from '@components/ui/button';

import PageHeader from '@components/shared/PageHeader/PageHeader';
import KpiCard from '@components/KpiCard/KpiCard';
import SearchInput from '@components/Tables/SearchInput/SearchInput';
import FilterBar from '@components/FilterBar/FilterBar';
import FilterSelectBox from '@components/FilterSelectBox/FilterSelectBox';
import FilterSearchBox from '@/components/FilterSearchBox/FilterSearchBox';

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

function Playlists() {
  const [filterSearchValue, setFilterSearchValue] = useState();
  const [visibility, setVisibility] = useState();
  const isMobile = useIsMobile();

  const onVisibilityChange = (e) => {
    const value = e.target.value;
    setVisibility(value);
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
    </>
  );
}

export default Playlists;
