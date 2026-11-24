import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Layout } from './components/layout';
import {
  HomePage,
  MovieDetailPage,
  FilterPage,
  SearchPage,
  FavoritesPage,
  HistoryPage,
  NotFoundPage,
} from './pages';

// Create a single QueryClient with optimal caching settings
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 4 * 60 * 1000, // 4 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes cache preservation
      refetchOnWindowFocus: false, // Prevent unnecessary refetches when switching tabs
      retry: 2, // Retry twice on transient network error
    },
  },
});

// Helper to scroll to top on every route change
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="phim/:slug" element={<MovieDetailPage />} />
            <Route path="danh-sach/:slug" element={<FilterPage />} />
            <Route path="kham-pha" element={<FilterPage />} />
            <Route path="tim-kiem" element={<SearchPage />} />
            <Route path="yeu-thich" element={<FavoritesPage />} />
            <Route path="lich-su" element={<HistoryPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
