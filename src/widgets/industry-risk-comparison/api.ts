import { apiClient } from '@/shared/api/client';
import { CompanyRisk } from '@/shared/types';

export async function getIndustryComparison(
  industry: string
): Promise<{
  industry: string;
  avgRiskScore: number;
  companies: CompanyRisk[];
}> {
  const response = await apiClient.get(`/companies/industry/${industry}/comparison`);
  return response.data;
} 