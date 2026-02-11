import { createBrowserRouter, RouterProvider } from 'react-router';
import { QueryClientProvider } from '@tanstack/react-query';
import queryClient from './QueryClient';
import { Toaster } from '@components/ui/sonner';

import useInitlizeAuth from '@/hooks/useInitlizeAuth';
import routes from './router';
import './App.css';

const router = createBrowserRouter(routes);

function App() {
  useInitlizeAuth(); // initialize auth

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
