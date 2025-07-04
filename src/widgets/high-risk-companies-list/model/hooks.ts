import { useQuery } from '@tanstack/react-query';
import { getHighRiskCompanies } from '../api';

export function useHighRiskCompanies(limit: number = 10) {
  return useQuery({
    queryKey: ['high-risk-companies', limit],
    queryFn: () => getHighRiskCompanies(limit),
  });
} 