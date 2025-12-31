import { Outlet } from 'react-router';

import logo from '@assets/images/logo/logo.png';
import backgroundImage from '@assets/images/auth-background.jpg';

function AuthLayout() {
  return (
    <div className="relative flex min-h-dvh items-center justify-center px-3 py-6">
      <div
        className="absolute inset-0 size-full bg-cover bg-center bg-no-repeat opacity-80"
        style={{
          backgroundImage: `url(${backgroundImage})`,
        }}
      ></div>
      <div className="z-1 w-full max-w-md">
        <div className="mb-4 text-center">
          <div className="mb-2 flex items-center justify-center gap-2">
            <div className="rounded-lg p-2">
              <img src={logo} className="h-12 w-15" alt="" />
            </div>
            <h1 className="text-2xl font-bold">VioTune</h1>
          </div>
          <p className="text-muted-foreground text-sm">Admin Dashboard for Music Streaming</p>
        </div>
        <Outlet />

      </div>
    </div>
  );
}

export default AuthLayout;
