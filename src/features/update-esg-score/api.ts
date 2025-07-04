import { apiClient } from '@/shared/api/client';
import { RiskScore } from '@/shared/types';

export async function updateCompanyESGScore(
  companyId: string,
  scores: {
    environmental: number;
    social: number;
    governance: number;
  }
): Promise<RiskScore> {
  const response = await apiClient.post<RiskScore>(`/companies/${companyId}/esg-score`, scores);
  return response.data;
} 