import { apiClient } from '@/shared/api/client';

// 산업별 리스크 요약
export async function getIndustryRiskSummary(): Promise<Array<{
  industry: string;
  avgRiskScore: number;
  totalCompanies: number;
  criticalIssues: number;
  trend: number;
}>> {
  const response = await apiClient.get<{ items: Array<{
    industry: string;
    avgRiskScore: number;
    totalCompanies: number;
    criticalIssues: number;
    trend: number;
  }> }>('/dashboard/industry-summary');
  return response.data.items;
} 