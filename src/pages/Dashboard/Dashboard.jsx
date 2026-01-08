import PageHeader from '@/components/shared/PageHeader/PageHeader';
import { MusicIcon, DiscIcon, ListMusicIcon, UsersIcon } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';

import StatCard from '@/components/StatCard/StatCard';
import StatCardSkeleton from '@/components/StatCard/StatCardSkeleton';
import TotalPlaysChart from '@/components/Charts/TotalPlaysChart/TotalPlaysChart';
import UsersChart from '@/components/Charts/UsersChart/UsersChart';
import SessionDurationChart from '@/components/Charts/SessionDurationChart/SessionDurationChart';
import RecentActivityTable from '@/components/Tables/RecentActivityTable/RecentActivityTable';

import { getCurrentStatsQuery, getStatsByDaysAgoQuery } from '@/queries/stats';

function Dashboard() {
  const { data: currentStats, isPending: isCurrentStatsPending } = useQuery(getCurrentStatsQuery());
  const { data: prevStats, isPending: isPrevStatsPending } = useQuery(getStatsByDaysAgoQuery(30));
  const isPending = isCurrentStatsPending || isPrevStatsPending;

  const stats = [
    {
      id: 1,
      title: 'Songs',
      icon: MusicIcon,
      total: currentStats?.songs,
      prevTotal: prevStats?.total_songs,
    },
    {
      id: 2,
      title: 'Albums',
      icon: DiscIcon,
      total: currentStats?.albums,
      prevTotal: prevStats?.total_albums,
    },
    {
      id: 3,
      title: 'Playlists',
      icon: ListMusicIcon,
      total: currentStats?.playlists,
      prevTotal: prevStats?.total_playlists,
    },
    {
      id: 4,
      title: 'Users',
      icon: UsersIcon,
      total: currentStats?.users,
      prevTotal: prevStats?.total_users,
    },
  ];

  return (
    <>
      <PageHeader title="Dashboard" description="Welcome back! Here's your overview." />
      <div className="space-y-6">
        <div className="xs:grid-cols-2 grid grid-cols-1 gap-3 min-[1180px]:grid-cols-4! lg:grid-cols-3">
          {isPending
            ? Array(4)
                .fill()
                .map((_, index) => <StatCardSkeleton key={index} />)
            : stats.map((stat) => <StatCard key={stat?.id} {...stat} />)}
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
