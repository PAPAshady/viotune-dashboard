import { useState } from 'react';

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
import AlbumSheet from '@components/Sheets/Albums/AlbumSheet';
import { getGenresQuery } from '@/queries/genres';

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
  const { data: artists, isPending: isArtistsPending } = useQuery(getArtistsQuery());
  const { data: genres, isPending: isGenresPending } = useQuery(getGenresQuery());
  const [searchValue, setSearchValue] = useState('');
  const debouncedSearchValue = useDebounce(searchValue);
  const [status, setStatus] = useState(null);
  const [releaseYear, setReleaseYear] = useState(null);
  const [artistId, setArtistId] = useState(null);
  const [genreId, setGenreId] = useState(null);

  const filters = {
    status,
    releaseYear,
    artistId,
    genreId,
  };

  const { data, isLoading } = useQuery(
    getPeginatedAlbumsQuery({ ...pagination, ...filters, search: debouncedSearchValue })
  );

  const onArtistSelect = (selectedArtistId) => setArtistId(selectedArtistId || null);
  const onGenreSelect = (selectedGenreId) => setGenreId(selectedGenreId || null);
  const onStatusChange = (e) => setStatus(e.target.value || null);
  const onReleaseYearChange = (e) => setReleaseYear(e.target.value || null);

  const clearFilters = () => {
    setArtistId(null);
    setGenreId(null);
    setStatus('');
    setReleaseYear('');
  };

  return (
    <>
      <PageHeader title="Albums" description="Manage all albums in your platform.">
        <AlbumSheet artists={artists} genres={genres} />
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
        <FilterComboBox
          filterName="Genres"
          placeholder="Select a genre"
          options={genres}
          isPending={isGenresPending}
          valueKey="title"
          onChange={onGenreSelect}
          value={genreId}
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
