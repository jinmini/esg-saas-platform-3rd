import { apiClient } from '@/shared/api/client';
import { AnalysisResult } from '@/shared/types';

export async function getRecentAnalyses(limit: number = 10): Promise<AnalysisResult[]> {
  const response = await apiClient.get<{ items: AnalysisResult[] }>('/analysis/recent', {
    limit: limit.toString(),
  });
  return response.items;
} 