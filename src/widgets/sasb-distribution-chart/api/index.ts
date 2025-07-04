import { apiClient } from '@/shared/api/client';

// SASB 카테고리별 이슈 분포
export async function getSASBDistribution(): Promise<Array<{
  category: string;
  count: number;
  avgRiskScore: number;
  topCompanies: string[];
}>> {
  const response = await apiClient.get<{ items: Array<{
    category: string;
    count: number;
    avgRiskScore: number;
    topCompanies: string[];
  }> }>('/dashboard/sasb-distribution');
  return response.data.items;
} 