import { QueryClient } from '@tanstack/react-query';

/**
 * TanStack Query client configuration
 * Used for managing server/async state like wood species database,
 * reference libraries, and future cloud sync features
 */
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Cache data for 5 minutes by default
      staleTime: 1000 * 60 * 5,
      // Keep unused data in cache for 10 minutes
      gcTime: 1000 * 60 * 10,
      // Retry failed requests once
      retry: 1,
      // Don't refetch on window focus (mobile app doesn't have window focus)
      refetchOnWindowFocus: false,
    },
    mutations: {
      // Retry failed mutations once
      retry: 1,
    },
  },
});

