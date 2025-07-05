import { apiClient } from '@/shared/api/client';
import { RiskScore, RiskTrendData } from '@/shared/types/api';

export async function getCompanyRiskScore(companyId: string): Promise<RiskScore> {
  return apiClient.get<RiskScore>(`/companies/${companyId}/risk-score`);
}

export async function getCompanyRiskTrend(companyId: string, params?: {
  startDate?: string;
  endDate?: string;
  interval?: 'daily' | 'weekly' | 'monthly';
}): Promise<RiskTrendData[]> {
  return apiClient.get<RiskTrendData[]>(`/companies/${companyId}/risk-trend`, params);
} 