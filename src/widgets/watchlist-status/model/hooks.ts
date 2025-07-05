import { useQuery } from '@tanstack/react-query';
import { getWatchlistStatus } from '../api';
import { CompanyRisk } from '@/shared/types';

export function useWatchlistStatus() {
  return useQuery<CompanyRisk[], Error>({
    queryKey: ['watchlistStatus'],
    queryFn: async () => {
      const response = await getWatchlistStatus();
      return response.items;
    },
  });
} 