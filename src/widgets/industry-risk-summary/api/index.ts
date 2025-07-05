import { apiClient } from '@/shared/api/client';

export interface IndustryRiskSummary {
  industry: string;
  avgRiskScore: number;
  totalCompanies: number;
  criticalIssues: number;
  trend: number;
}

// 산업별 리스크 요약
export async function getIndustryRiskSummary(): Promise<{ items: IndustryRiskSummary[] }> {
  return apiClient.get<{ items: IndustryRiskSummary[] }>('/dashboard/industry-risk-summary');
} 