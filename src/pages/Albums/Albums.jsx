import { useState } from 'react';

import { PlusIcon } from 'lucide-react';
import { Button } from '@components/ui/button';
import { useIsMobile } from '@hooks/use-mobile';
import { useQuery } from '@tanstack/react-query';

import PageHeader from '@components/shared/PageHeader/PageHeader';
import FilterBar from '@components/FilterBar/FilterBar';
import FilterComboBox from '@components/FilterComboBox/FilterComboBox';
import FilterSelectBox from '@components/FilterSelectBox/FilterSelectBox';
import { getPeginatedAlbumsQuery } from '@/queries/albums';
import { getArtistsQuery } from '@/queries/artists';
import PrimaryTable from '@components/Tables/PrimaryTable/PrimaryTable';
import SearchInput from '@components/SearchInput/SearchInput';
import columns from '@/columns/columns.albums.jsx';
import useDebounce from '@/hooks/useDebounce';

const statusOptions = [
  { value: '', label: 'All' },
  { value: 'draft', label: 'Draft' },
  { value: 'published', label: 'Published' },
];

const releaseYearOptions = [
  { value: '2026', label: '2026' },
  { value: '2025', label: '2025' },
  { value: '2024', label: '2024' },
  { value: '2023', label: '2023' },
  { value: '2022', label: '2022' },
  { value: '2021', label: '2021' },
  { value: '2020', label: '2020' },
  { value: '2019', label: '2019' },
];

function Albums() {
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 5 });
  const isMobile = useIsMobile();
  const { data: artists, isPending: isArtistsPending } = useQuery(getArtistsQuery());
  const [searchValue, setSearchValue] = useState('');
  const debouncedSearchValue = useDebounce(searchValue);
  const [status, setStatus] = useState(null);
  const [releaseYear, setReleaseYear] = useState(null);
  const [artistId, setArtistId] = useState(null);

  const filters = {
    status,
    releaseYear,
    artistId,
  };

  const { data, isLoading } = useQuery(
    getPeginatedAlbumsQuery({ ...pagination, ...filters, search: debouncedSearchValue })
  );

  const onArtistSelect = (selectedArtistId) => setArtistId(selectedArtistId || null);
  const onStatusChange = (e) => setStatus(e.target.value || null);
  const onReleaseYearChange = (e) => setReleaseYear(e.target.value || null);

  const clearFilters = () => {
    setStatus(null);
    setArtistId(null);
    setReleaseYear('');
  };

  return (
    <>
      <PageHeader title="Albums" description="Manage all albums in your platform.">
        <Button size={isMobile ? 'sm' : 'default'} variant="outline">
          Bulk Actions (0)
        </Button>
        <Button
          size={isMobile ? 'sm' : 'default'}
          className="bg-blue-500 text-white hover:bg-blue-600"
        >
          <PlusIcon /> Add Album
        </Button>
      </PageHeader>
      <SearchInput
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        placeholder="Search albums by title or artist..."
      />
      <FilterBar filters={filters} onClearAll={clearFilters}>
        <FilterComboBox
          filterName="Artists"
          placeholder="Select an artist"
          options={artists}
          isPending={isArtistsPending}
          valueKey="name"
          onChange={onArtistSelect}
          value={artistId}
        />
        <FilterSelectBox
          filterName="Status"
          placeholder="Select Status"
          options={statusOptions}
          value={status}
          onChange={onStatusChange}
        />
        <FilterSelectBox
          filterName="Release year"
          placeholder="Select release year"
          options={releaseYearOptions}
          value={releaseYear}
          onChange={onReleaseYearChange}
        />
      </FilterBar>
      <PrimaryTable
        columns={columns}
        rows={data}
        isLoading={isLoading}
        pagination={pagination}
        setPagination={setPagination}
      />
    </>
  );
}

export default Albums;
