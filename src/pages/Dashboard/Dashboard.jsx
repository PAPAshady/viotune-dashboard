import PageHeader from '@/components/shared/PageHeader/PageHeader';
import { MusicIcon, AlbumIcon, ListMusicIcon, UsersIcon } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';

import StatCard from '@/components/StatCard/StatCard';
import TotalPlaysChart from '@/components/Charts/TotalPlaysChart/TotalPlaysChart';
import UsersChart from '@/components/Charts/UsersChart/UsersChart';
import SessionDurationChart from '@/components/Charts/SessionDurationChart/SessionDurationChart';
import RecentActivityTable from '@/components/Tables/RecentActivityTable/RecentActivityTable';
import { getMonthlySongsStatsQuery } from '@/queries/songs';
import { getMonthlyAlbumsStatsQuery } from '@/queries/albums';
import { getMonthlyPlaylistsStatsQuery } from '@/queries/playlists';
import { getUsersStatsQuery } from '@/queries/users';

function Dashboard() {
  const { data: songsStats } = useQuery(getMonthlySongsStatsQuery());
  const { data: albumsStats } = useQuery(getMonthlyAlbumsStatsQuery());
  const { data: playlistsStats } = useQuery(getMonthlyPlaylistsStatsQuery());
  const { data: usersStats } = useQuery(getUsersStatsQuery(30));

  const stats = [
    {
      id: 1,
      title: 'Songs',
      icon: MusicIcon,
      total: songsStats?.total,
      total30DaysAgo: songsStats?.total30DaysAgo,
    },
    {
      id: 2,
      title: 'Albums',
      icon: AlbumIcon,
      total: albumsStats?.total,
      total30DaysAgo: albumsStats?.total30DaysAgo,
    },
    {
      id: 3,
      title: 'Playlists',
      icon: ListMusicIcon,
      total: playlistsStats?.total,
      total30DaysAgo: playlistsStats?.total30DaysAgo,
    },
    {
      id: 4,
      title: 'Users',
      icon: UsersIcon,
      total: usersStats?.total,
      total30DaysAgo: usersStats?.totalBefore,
    },
  ];

  return (
    <>
      <PageHeader title="Dashboard" description="Welcome back! Here's your overview." />
      <div className="space-y-6">
        <div className="xs:grid-cols-2 grid grid-cols-1 gap-3 min-[1180px]:grid-cols-4! lg:grid-cols-3">
          {stats?.map((stat) => (
            <StatCard key={stat?.id} {...stat} />
          ))}
        </div>
        <TotalPlaysChart />
        <div className="flex flex-col gap-6 lg:flex-row lg:gap-4">
          <UsersChart />
          <SessionDurationChart />
        </div>
        <RecentActivityTable />
      </div>
    </>
  );
}

export default Dashboard;
