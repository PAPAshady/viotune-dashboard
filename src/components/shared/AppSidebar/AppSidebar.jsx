import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
} from '@/components/ui/sidebar';
import {
  LayoutDashboardIcon,
  MusicIcon,
  DiscIcon,
  ListMusicIcon,
  MicVocalIcon,
  TagIcon,
  UsersIcon,
  ChartColumnIcon,
  SettingsIcon,
} from 'lucide-react';

import logo from '@/assets/images/logo/logo.png';
import SidebarItem from './SidebarItem';

const sidebarLinks = [
  { id: 1, title: 'Dashboard', icon: <LayoutDashboardIcon />, href: '/' },
  { id: 2, title: 'Songs', icon: <MusicIcon />, href: '/songs' },
  { id: 3, title: 'Albums', icon: <DiscIcon />, href: '/albums' },
  { id: 4, title: 'Playlists', icon: <ListMusicIcon />, href: '/playlists' },
  { id: 5, title: 'Artists', icon: <MicVocalIcon />, href: '/artists' },
  { id: 6, title: 'Genres', icon: <TagIcon />, href: '/genres' },
  { id: 7, title: 'Users', icon: <UsersIcon />, href: '/users' },
  { id: 8, title: 'Analytics', icon: <ChartColumnIcon />, href: '/analytics' },
  { id: 9, title: 'Settings', icon: <SettingsIcon />, href: '/settings' },
];

function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader className="border-b">
        <div className="flex items-center gap-3 px-4 py-2.25 md:py-2.75">
          <img src={logo} className="size-7 object-cover" alt="" />
          <p className="text-xl font-semibold">Viotune</p>
        </div>
      </SidebarHeader>
      <nav>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu className="p-2">
                {sidebarLinks.map((link) => (
                  <SidebarItem key={link.id} {...link} />
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </nav>
    </Sidebar>
  );
}

export default AppSidebar;
