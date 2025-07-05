import { useQuery } from '@tanstack/react-query';
import { getTopCompanies } from '../api';

export function useTopCompanies() {
  return useQuery({
    queryKey: ['top-companies'],
    queryFn: getTopCompanies,
    staleTime: 5 * 60 * 1000, // 5분
    gcTime: 10 * 60 * 1000, // 10분 (React Query v5에서 cacheTime → gcTime)
  });
} 