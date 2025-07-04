import { useQuery } from '@tanstack/react-query';
import { getRiskTrend } from '../api';
import { RiskTrendData } from '@/shared/types';

export function useOverallRiskTrend(
  params: {
    startDate: string;
    endDate: string;
    interval?: 'daily' | 'weekly' | 'monthly';
  }
) {
  return useQuery<RiskTrendData[], Error>({
    queryKey: ['overallRiskTrend', params],
    queryFn: () => getRiskTrend(params),
  });
} 