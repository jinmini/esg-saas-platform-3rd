import { apiClient } from '@/shared/api/client';
import { CompanyRisk } from '@/shared/types';

// 산업별 리스크 비교 데이터 타입
interface IndustryComparison {
  industry: string;
  avgRiskScore: number;
  companies: CompanyRisk[];
}

export async function getIndustryComparison(
  industry: string
): Promise<IndustryComparison> {
  const response = await apiClient.get(`/companies/industry/${industry}/comparison`);
  return response as IndustryComparison;
} 