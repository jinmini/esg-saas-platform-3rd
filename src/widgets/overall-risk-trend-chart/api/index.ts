import { apiClient } from '@/shared/api/client';
import { RiskTrendData } from '@/shared/types';

// 리스크 추이 조회 (전체)
export async function getRiskTrend(params: {
  startDate: string;
  endDate: string;
  interval?: 'daily' | 'weekly' | 'monthly';
}): Promise<RiskTrendData[]> {
  const response = await apiClient.get<RiskTrendData[]>('/dashboard/risk-trend', params);
  return response.data;
} 