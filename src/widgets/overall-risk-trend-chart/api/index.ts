import { apiClient } from '@/shared/api/client';
import { RiskTrendData } from '@/shared/types';

// 리스크 추이 조회 (전체)
export async function getOverallRiskTrend(params?: {
  startDate?: string;
  endDate?: string;
  interval?: 'daily' | 'weekly' | 'monthly';
}): Promise<RiskTrendData[]> {
  return apiClient.get<RiskTrendData[]>('/dashboard/overall-risk-trend', params);
}

// 리스크 추이 조회 (호환성을 위한 별칭)
export async function getRiskTrend(params?: {
  startDate?: string;
  endDate?: string;
  interval?: 'daily' | 'weekly' | 'monthly';
}): Promise<RiskTrendData[]> {
  return getOverallRiskTrend(params);
} 