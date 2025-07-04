import { apiClient } from '@/shared/api/client';
import { AnalysisResult } from '@/shared/types';

export async function getHighRiskAnalyses(threshold: number = 0.7): Promise<AnalysisResult[]> {
  const response = await apiClient.get<{ items: AnalysisResult[] }>('/analysis/high-risk', {
    threshold: threshold.toString(),
  });
  return response.items;
} 