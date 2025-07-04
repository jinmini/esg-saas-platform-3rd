import { apiClient } from '@/shared/api/client';

export interface RiskScoreData {
  companyId: string;
  companyName: string;
  score: number;
  trend: number;
  category?: string;
  lastUpdated?: string;
}

// 개별 기업 리스크 스코어 조회
export async function getRiskScore(companyId: string): Promise<RiskScoreData> {
  const response = await apiClient.get<RiskScoreData>(`/company/${companyId}/risk-score`);
  return response.data;
} 