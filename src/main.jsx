import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './index.css';
import App from './App.jsx';

// Setup QueryClient dengan default options yang optimal
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Default staleTime: data dianggap fresh selama 5 menit
      staleTime: 5 * 60 * 1000,
      // Default cacheTime: data disimpan di cache selama 10 menit
      gcTime: 10 * 60 * 1000, // gcTime adalah nama baru untuk cacheTime di v5
      // Retry logic
      retry: 1,
      // Refetch on window focus (bisa dimatikan jika tidak perlu)
      refetchOnWindowFocus: false,
    },
  },
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </StrictMode>
);
