import { SidebarProvider } from '@/components/ui/sidebar';
import { Outlet } from 'react-router';

import Header from '@/components/shared/Header/Header';
import AppSidebar from '@/components/shared/AppSidebar/AppSidebar';

function RootLayout() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="grow">
        <Header />
        <div className="container py-4 md:py-6">
          <Outlet />
        </div>
      </main>
    </SidebarProvider>
  );
}

export default RootLayout;
