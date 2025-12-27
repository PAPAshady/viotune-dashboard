import { useState } from 'react';

import { useIsMobile } from '@hooks/use-mobile';
import { PlusIcon, MoreHorizontalIcon, PencilIcon, EyeOffIcon, Trash2Icon } from 'lucide-react';

import { Button } from '@components/ui/button';
import { useQuery } from '@tanstack/react-query';
import { Checkbox } from '@components/ui/checkbox';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenuSeparator,
} from '@components/ui/dropdown-menu';

import PageHeader from '@components/shared/PageHeader/PageHeader';
import KpiCard from '@components/KpiCard/KpiCard';
import SearchInput from '@/components/SearchInput/SearchInput';
import FilterBar from '@components/FilterBar/FilterBar';
import FilterSelectBox from '@components/FilterSelectBox/FilterSelectBox';
import FilterSearchBox from '@components/FilterSearchBox/FilterSearchBox';
import PrimaryTable from '@components/Tables/PrimaryTable/PrimaryTable';
import { getPlaylistsQuery } from '@/queries/playlists';
import defaultCover from '@assets/images/default-cover.jpg';

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
    accessorKey: 'user_id',
    header: 'Creator',
    cell: ({ getValue }) => <span className="text-muted-foreground">{getValue()}</span>,
  },
  { accessorKey: 'totaltracks', header: 'Tracks' },
  { accessorKey: 'genre_title', header: 'Genre' },
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

function Playlists() {
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 5 });
  const [filterSearchValue, setFilterSearchValue] = useState();
  const [visibility, setVisibility] = useState();
  const [type, setType] = useState();
  const isMobile = useIsMobile();
  const { data } = useQuery(getPlaylistsQuery(pagination));

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
    </>
  );
}

export default Playlists;
