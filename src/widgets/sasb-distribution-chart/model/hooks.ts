import { useQuery } from '@tanstack/react-query';
import { getSASBDistribution } from '../api';

export interface SASBDistribution {
  category: string;
  count: number;
  avgRiskScore: number;
  topCompanies: string[];
}

export function useSASBDistribution() {
  return useQuery<SASBDistribution[], Error>({
    queryKey: ['sasbDistribution'],
    queryFn: getSASBDistribution,
  });
} 