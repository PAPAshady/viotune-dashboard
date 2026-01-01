import { useIsMobile } from '@hooks/use-mobile';
import { PlusIcon } from 'lucide-react';
import { Button } from '@components/ui/button';
import { useQuery } from '@tanstack/react-query';

import PageHeader from '@components/shared/PageHeader/PageHeader';
import KpiCardWrapper from '@components/KpiCardWrapper/KpiCardWrapper';
import SearchInput from '@components/SearchInput/SearchInput';
import GenreCard from '@components/GenreCard/GenreCard';
import { getGenresQuery } from '@/queries/genres';

const kpiInfos = [
  { id: 1, value: 2, title: 'Total Genres' },
  { id: 2, value: 200, title: 'Most Played Genre' },
  { id: 3, value: 0, title: 'Avg Plays per Genre' },
  { id: 4, value: 15, title: 'Genres with Zero Songs' },
];

function Genres() {
  const { data: genres } = useQuery(getGenresQuery());
  const isMobile = useIsMobile();
  
  return (
    <>
      <PageHeader title="Genres" description="Manage music genres and categories.">
        <Button
          size={isMobile ? 'sm' : 'default'}
          className="bg-blue-500 text-white hover:bg-blue-600"
        >
          <PlusIcon /> Add Artist
        </Button>
      </PageHeader>
      <SearchInput placeholder="Search by genre name..." />
      <KpiCardWrapper data={kpiInfos} />
      <div className="mt-4 grid grid-cols-1 gap-4 px-4 min-[480px]:grid-cols-2 min-[480px]:px-0 lg:grid-cols-3 xl:grid-cols-4">
        {genres?.map((genre) => (
          <GenreCard key={genre.id} {...genre} />
        ))}
      </div>
    </>
  );
}

export default Genres;
