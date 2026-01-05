import RootLayout from '@components/Layouts/RootLayout';
import Dashboard from '@/pages/Dashboard/Dashboard';
import Songs from '@/pages/Songs/Songs';
import Albums from '@/pages/Albums/Albums';
import Playlists from '@/pages/Playlists/Playlists';
import Artists from '@/pages/Artists/Artists';
import Genres from '@/pages/Genres/Genres';
import Users from '@/pages/Users/Users';
import Analytics from '@/pages/Analytics/Analytics';
import Settings from '@/pages/Settings/Settings';
import AuthLayout from '@components/Layouts/AuthLayout/AuthLayout';
import SignIn from '@/pages/SignIn/SignIn';
import ProtectedRoute from '@components/shared/ProtectedRoute/ProtectedRoute';
import { Navigate } from 'react-router';

const routes = [
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <RootLayout />
      </ProtectedRoute>
    ),
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
        path: '/analytics',
        element: <Analytics />,
      },
      {
        path: '/settings',
        element: <Settings />,
      },
    ],
  },
  {
    path: '/auth',
    element: <AuthLayout />,
    children: [
      { index: true, element: <Navigate to="/auth/sign-in" replace /> },
      { path: 'sign-in', element: <SignIn /> },
    ],
  },
];

export default routes;
