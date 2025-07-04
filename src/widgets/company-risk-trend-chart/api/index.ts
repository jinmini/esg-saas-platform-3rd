import { apiClient } from '@/shared/api/client';
import { RiskTrendData, RiskScore } from '@/shared/types';

export async function getCompanyRiskScore(companyId: string): Promise<RiskScore> {
  const response = await apiClient.get<RiskScore>(`/companies/${companyId}/risk-score`);
  return response.data;
}

export async function getCompanyRiskTrend(
  companyId: string,
  params: {
    startDate: string;
    endDate: string;
    interval?: 'daily' | 'weekly' | 'monthly';
  }
): Promise<RiskTrendData[]> {
  const response = await apiClient.get<RiskTrendData[]>(
    `/companies/${companyId}/risk-trend`,
    params
  );
  return response.data;
} 