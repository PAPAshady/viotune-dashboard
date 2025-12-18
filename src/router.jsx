import RootLayout from './components/Layouts/RootLayout';
import Dashboard from './pages/Dashboard/Dashboard';
import Songs from './pages/Songs/Songs';
import Albums from './pages/Albums/Albums';
import Playlists from './pages/Playlists/Playlists';
import Artists from './pages/Artists/Artists';
import Genres from './pages/Genres/Genres';
import Users from './pages/Users/Users';
import Admins from './pages/Analytics/Analytics';
import Analytics from './pages/Admins/Admins';
import Settings from './pages/Settings/Settings';

const routes = [
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        path: '/',
        element: <Dashboard />,
      },
      {
        path: '/songs',
        element: <Songs />,
      },
      {
        path: '/albums',
        element: <Albums />,
      },
      {
        path: '/playlists',
        element: <Playlists />,
      },
      {
        path: '/artists',
        element: <Artists />,
      },
      {
        path: '/genres',
        element: <Genres />,
      },
      {
        path: '/users',
        element: <Users />,
      },
      {
        path: '/admins',
        element: <Admins />,
      },
      {
        path: '/analytics',
        element: <Analytics />,
      },
      {
        path: '/settings',
        element: <Settings />,
      },
    ],
  },
];

export default routes;
