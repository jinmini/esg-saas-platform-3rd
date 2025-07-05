import { apiClient } from '@/shared/api/client';

export interface RiskScoreData {
  companyName: string;
  score: number;
  trend: number; // 변화율 (-100 ~ 100)
  category: string;
  lastUpdated: string;
  currentScore: number;
  previousScore: number;
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
  breakdown: {
    environmental: number;
    social: number;
    governance: number;
  };
}

// 개별 기업 리스크 스코어 조회
export async function getRiskScoreData(companyId: string): Promise<RiskScoreData> {
  return apiClient.get<RiskScoreData>(`/companies/${companyId}/risk-score-data`);
} 