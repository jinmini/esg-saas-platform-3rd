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
  return await apiClient.post<RiskScore>(`/companies/${companyId}/esg-score`, scores);
} 