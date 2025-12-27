import { useState } from 'react';

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenuSeparator,
} from '@components/ui/dropdown-menu';
import { InputGroup, InputGroupInput, InputGroupAddon } from '@components/ui/input-group';
import { Checkbox } from '@components/ui/checkbox';
import {
  PlusIcon,
  SearchIcon,
  MoreHorizontalIcon,
  PencilIcon,
  EyeOffIcon,
  Trash2Icon,
} from 'lucide-react';
import { Button } from '@components/ui/button';
import { useIsMobile } from '@hooks/use-mobile';
import { useQuery } from '@tanstack/react-query';

import PageHeader from '@components/shared/PageHeader/PageHeader';
import FilterBar from '@components/FilterBar/FilterBar';
import FilterComboBox from '@components/FilterComboBox/FilterComboBox';
import FilterSelectBox from '@components/FilterSelectBox/FilterSelectBox';
import { getAlbumsQuery } from '@/queries/albums';
import PrimaryTable from '@components/Tables/PrimaryTable/PrimaryTable';
import defaultCover from '@assets/images/default-cover.jpg';

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

const columns = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={table.toggleAllPageRowsSelected}
      />
    ),
    cell: ({ row }) => (
      <Checkbox checked={row.getIsSelected()} onCheckedChange={row.getToggleSelectedHandler()} />
    ),
  },
  {
    id: 'title_and_cover',
    header: 'Title',
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <img
          src={row.original.cover || defaultCover}
          alt={row.original.title}
          className="size-12 rounded-md object-cover"
        />
        <p className="text-base font-semibold">{row.original.title}</p>
      </div>
    ),
  },
  {
    accessorKey: 'artist',
    header: 'Artist',
    cell: ({ getValue }) => <span className="text-muted-foreground">{getValue()}</span>,
  },
  { accessorKey: 'totaltracks', header: 'Tracks' },
  { accessorKey: 'play_count', header: 'Plays' },
  { accessorKey: 'genre_title', header: 'Genre' },
  {
    accessorKey: 'release_date',
    header: 'Release Date',
    cell: ({ getValue }) => getValue().replace(/-/g, '/'),
  },
  {
    header: 'Actions',
    id: 'actions',
    cell: () => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="size-8 p-0" variant="ghost">
            <MoreHorizontalIcon />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem>
            <PencilIcon className="me-2 size-4" />
            Edit metadata
          </DropdownMenuItem>
          <DropdownMenuItem>
            <EyeOffIcon className="me-2 size-4" />
            Hide / Unpublish
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="text-destructive">
            <Trash2Icon className="me-2 size-4" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
];

function Albums() {
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 5 });
  const isMobile = useIsMobile();
  const [visibility, setVisibility] = useState();
  const [releaseYear, setReleaseYear] = useState();
  const { data } = useQuery(getAlbumsQuery(pagination));

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
      <PrimaryTable
        columns={columns}
        rows={data}
        pagination={pagination}
        setPagination={setPagination}
      />
    </>
  );
}

export default Albums;
