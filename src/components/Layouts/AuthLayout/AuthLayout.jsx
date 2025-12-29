import { Outlet } from 'react-router';

import logo from '@assets/images/logo/logo.png';

function AuthLayout() {
  return (
    <div className="flex min-h-dvh items-center justify-center px-3 py-12">
      <div className="w-full max-w-md">
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
        <p className="text-muted-foreground mt-6 text-center text-xs">
          All rights reserved &copy; {new Date().getFullYear()}
        </p>
      </div>
    </div>
  );
}

export default AuthLayout;
