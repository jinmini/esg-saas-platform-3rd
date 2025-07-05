import { apiClient } from '@/shared/api/client';
import { CompanyRisk } from '@/shared/types';

export async function getHighRiskCompanies(limit: number = 10): Promise<{ items: CompanyRisk[] }> {
  return apiClient.get<{ items: CompanyRisk[] }>('/companies/high-risk', { limit });
} 