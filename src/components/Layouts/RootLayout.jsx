import { SidebarProvider } from '@/components/ui/sidebar';

import Header from '@/components/shared/Header/Header';
import AppSidebar from '@/components/shared/AppSidebar/AppSidebar';

function RootLayout() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="grow">
        <Header />
      </main>
    </SidebarProvider>
  );
}

export default RootLayout;
