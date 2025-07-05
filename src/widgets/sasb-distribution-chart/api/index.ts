import { apiClient } from '@/shared/api/client';

export interface SASBDistribution {
  category: string;
  count: number;
  avgRiskScore: number;
  topCompanies: string[];
}

// SASB 카테고리별 이슈 분포
export async function getSASBDistribution(): Promise<{ items: SASBDistribution[] }> {
  return apiClient.get<{ items: SASBDistribution[] }>('/dashboard/sasb-distribution');
} 