import { useState } from 'react';

import { useIsMobile } from '@hooks/use-mobile';
import { PlusIcon } from 'lucide-react';
import { Button } from '@components/ui/button';
import { useQuery } from '@tanstack/react-query';

import SearchInput from '@components/SearchInput/SearchInput';
import PageHeader from '@components/shared/PageHeader/PageHeader';
import FilterBar from '@components/FilterBar/FilterBar';
import FilterComboBox from '@components/FilterComboBox/FilterComboBox';
import { getPaginatedArtistsQuery } from '@/queries/artists';
import PrimaryTable from '@components/Tables/PrimaryTable/PrimaryTable';
import KpiCardWrapper from '@components/KpiCardWrapper/KpiCardWrapper';
import columns from '@/columns/columns.artists.jsx';
import { getGenresQuery } from '@/queries/genres';
import useDebounce from '@/hooks/useDebounce';

const kpiInfos = [
  { id: 1, value: 2, title: 'Total Artists' },
  { id: 2, value: 200, title: 'Verified Artists' },
  { id: 3, value: 0, title: 'Avg Plays per Artist' },
  { id: 4, value: 15, title: 'Artists with Zero Songs' },
];

function Artists() {
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 5 });
  const [searchedValue, setSearchedValue] = useState('');
  const debouncedSearchValue = useDebounce(searchedValue);
  const [genreId, setGenreId] = useState(null);
  const { data: genres, isPending: isGenresPending } = useQuery(getGenresQuery());
  const isMobile = useIsMobile();

  const filters = { genreId };

  const { data, isLoading } = useQuery(
    getPaginatedArtistsQuery({ ...pagination, ...filters, search: debouncedSearchValue })
  );

  const onGenreSelect = (selectedGenreId) => setGenreId(selectedGenreId || null);

  const clearFilters = () => {
    setGenreId(null);
  };

  return (
    <>
      <PageHeader title="Artists" description="Manage Artists and their content.">
        <Button
          size={isMobile ? 'sm' : 'default'}
          className="bg-blue-500 text-white hover:bg-blue-600"
        >
          <PlusIcon /> Add Artist
        </Button>
      </PageHeader>
      <KpiCardWrapper data={kpiInfos} />
      <SearchInput
        placeholder="Search by artist name..."
        value={searchedValue}
        onChange={(e) => setSearchedValue(e.target.value)}
      />
      <FilterBar filters={filters} onClearAll={clearFilters}>
        <FilterComboBox
          filterName="Genres"
          placeholder="Select a genre"
          options={genres}
          isPending={isGenresPending}
          valueKey="title"
          onChange={onGenreSelect}
          value={genreId}
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

export default Artists;
