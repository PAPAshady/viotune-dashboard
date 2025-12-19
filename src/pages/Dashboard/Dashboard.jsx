import PageHeader from '@/components/shared/PageHeader/PageHeader';
import { MusicIcon, AlbumIcon, ListMusicIcon, UsersIcon } from 'lucide-react';

import StatCard from '@/components/StatCard/StatCard';
import TotalPlaysChart from '@/components/TotalPlaysChart/TotalPlaysChart';

const stats = [
  { title: 'Songs', value: '12,847', icon: MusicIcon, progress: '+12.5' },
  { title: 'Albums', value: '3,428', icon: AlbumIcon, progress: '-8.2' },
  { title: 'Playlists', value: '8,942', icon: ListMusicIcon, progress: '+15.3' },
  { title: 'Users', value: '124,583', icon: UsersIcon, progress: '-23.1' },
];

function Dashboard() {
  return (
    <div>
      <PageHeader title="Dashboard" description="Welcome back! Here's your overview." />

      <div className="space-y-6">
        <div className="xs:grid-cols-2 grid grid-cols-1 gap-3 min-[1180px]:grid-cols-4! lg:grid-cols-3">
          {stats.map((stat) => (
            <StatCard key={stat.title} {...stat} />
          ))}
        </div>
        <TotalPlaysChart />
      </div>
    </div>
  );
}

export default Dashboard;
