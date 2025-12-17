import { SidebarProvider } from './components/ui/sidebar';

import Header from './components/shared/Header/Header';
import AppSidebar from './components/shared/AppSidebar/AppSidebar';
import './App.css';

function App() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="grow">
        <Header />
      </main>
    </SidebarProvider>
  );
}

export default App;
