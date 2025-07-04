import { useQuery } from '@tanstack/react-query';
import { getCompanyRiskScore, getCompanyRiskTrend } from '../api';

export function useCompanyRiskScore(companyId: string, options?: { enabled?: boolean }) {
  return useQuery({
    queryKey: ['companyRiskScore', companyId],
    queryFn: () => getCompanyRiskScore(companyId),
    enabled: !!companyId && (options?.enabled ?? true),
  });
}

export function useCompanyRiskTrend(
  companyId: string,
  params: {
    startDate: string;
    endDate: string;
    interval?: 'daily' | 'weekly' | 'monthly';
  },
  options?: { enabled?: boolean }
) {
  return useQuery({
    queryKey: ['companyRiskTrend', companyId, params],
    queryFn: () => getCompanyRiskTrend(companyId, params),
    enabled: !!companyId && (options?.enabled ?? true),
  });
} 