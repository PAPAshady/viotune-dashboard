import { Navigate } from 'react-router';

import useAuth from '@/store/useAuth';

function ProtectedRoute({ children }) {
  const user = useAuth((state) => state.user);
  const isLoading = useAuth((state) => state.isLoading);

  if (isLoading) return 'Loading...';

  if (!user) return <Navigate to="/auth/sign-in" />;

  return children;
}

export default ProtectedRoute;
