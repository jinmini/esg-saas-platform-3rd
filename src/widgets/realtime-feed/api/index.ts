import { apiClient } from '@/shared/api/client';
import { mockAnalysisResponse } from '@/entities/analysis/__mocks__/mock';

export type AnalyzedNews = (typeof mockAnalysisResponse)['analyzed_news'][number];

export interface RealtimeFeedResponse {
  items: AnalyzedNews[];
}

// 실시간 분석 피드 조회
export async function getRealtimeFeed(limit: number = 10): Promise<RealtimeFeedResponse> {
  const response = await apiClient.get<RealtimeFeedResponse>('/dashboard/feed', {
    limit: limit.toString(),
  });
  return response.data;
} 