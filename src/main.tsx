import ReactDOM from 'react-dom/client';
import '@/index.css';
import { ThemeProvider } from '@/components/ui/theme-provider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { LoadingOverlayProvider } from './utils/providers/LoadingContext';
import { Toaster } from './components/ui/toaster';
import { RouterProvider } from '@tanstack/react-router';
import { router } from './routes';

const rootElement = document.getElementById('root') as HTMLElement;
const root = ReactDOM.createRoot(rootElement);

const queryClient = new QueryClient();

root.render(
  <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
    <QueryClientProvider client={queryClient}>
      <LoadingOverlayProvider>
        <Toaster />
        <RouterProvider router={router} />
      </LoadingOverlayProvider>
    </QueryClientProvider>
  </ThemeProvider>,
);
