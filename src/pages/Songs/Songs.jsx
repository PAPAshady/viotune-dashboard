import { useState } from 'react';

import { Button } from '@components/ui/button';
import {
  UploadIcon,
  SearchIcon,
  MoreHorizontalIcon,
  PencilIcon,
  EyeOffIcon,
  Trash2Icon,
} from 'lucide-react';
import { useIsMobile } from '@hooks/use-mobile';
import { InputGroup, InputGroupInput, InputGroupAddon } from '@components/ui/input-group';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenuSeparator,
} from '@components/ui/dropdown-menu';
import { Checkbox } from '@components/ui/checkbox';
import { useQuery, keepPreviousData } from '@tanstack/react-query';

import { getSongsQuery } from '@/queries/songs';
import PageHeader from '@components/shared/PageHeader/PageHeader';
import FilterBar from '@components/FilterBar/FilterBar';
import FilterComboBox from '@components/FilterComboBox/FilterComboBox';
import FilterSelectBox from '@components/FilterSelectBox/FilterSelectBox';
import SongsKpi from '@components/SongsKpi/SongsKpi';
import { formatTime } from '@/utils';
import PrimaryTable from '@components/Tables/PrimaryTable/PrimaryTable';
import MostPlayedSongsChart from '@components/MostPlayedSongsChart/MostPlayedSongsChart';
import defaultCover from '@assets/images/default-cover.jpg';

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
    id: 'song',
    header: 'Song',
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <img
          src={row.original.cover || defaultCover}
          alt={row.original.title}
          className="size-12 rounded-md object-cover"
        />
        <div className="space-y-1">
          <p className="text-base font-semibold">{row.original.title}</p>
          <p className="text-muted-foreground">{row.original.album}</p>
        </div>
      </div>
    ),
  },
  { header: 'Artist', accessorKey: 'artist' },
  { header: 'Genre', accessorKey: 'genre_name' },
  { header: 'Plays', accessorKey: 'play_count' },
  { header: 'Duration', accessorKey: 'duration', cell: ({ getValue }) => formatTime(getValue()) },
  {
    header: 'Uploaded',
    accessorKey: 'created_at',
    cell: ({ getValue }) => (
      <span className="text-muted-foreground">
        {new Date(getValue()).toLocaleString('en-CA', { hour12: false }).replace(/-/g, '/')}
      </span>
    ),
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

function Songs() {
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 5 });
  const { data } = useQuery({
    ...getSongsQuery(pagination),
    placeholderData: keepPreviousData, // don't have 0 rows flash while changing pages/loading next page
  });
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
      <PrimaryTable
        columns={columns}
        rows={data}
        pagination={pagination}
        setPagination={setPagination}
      />
      <MostPlayedSongsChart />
    </div>
  );
}

export default Songs;
