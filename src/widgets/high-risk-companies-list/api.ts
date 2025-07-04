import { apiClient } from '@/shared/api/client';
import { CompanyRisk } from '@/shared/types';

export async function getHighRiskCompanies(
  limit: number = 10
): Promise<CompanyRisk[]> {
  const response = await apiClient.get<{ items: CompanyRisk[] }>('/companies/high-risk', {
    limit: limit.toString(),
  });
  return response.data.items;
} 