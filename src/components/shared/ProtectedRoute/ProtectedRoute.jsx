import { Navigate } from 'react-router';

import useAuth from '@/store/useAuth';
import useMediaQuery from '@hooks/useMediaQuery';
import Logo from '@components/Logo/Logo';

function ProtectedRoute({ children }) {
  const isDesktop = useMediaQuery('(min-width: 1024px)');
  const user = useAuth((state) => state.user);
  const isLoading = useAuth((state) => state.isLoading);

  if (isLoading)
    return (
      <div className="relative">
        <div
          className={`fixed inset-0 z-20 grid h-dvh w-full place-content-center backdrop-blur-md transition-all duration-300`}
        >
          <Logo size={isDesktop ? 'xl' : 'lg'} isLoading showText />
        </div>
        {children}
      </div>
    );

  if (!user) return <Navigate to="/auth/sign-in" />;

  return children;
}

export default ProtectedRoute;
