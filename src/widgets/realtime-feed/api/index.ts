import { apiClient } from '@/shared/api/client';

export interface AnalyzedNews {
  news_item: any;
  sentiment_analysis: any;
  esg_classification: any;
}

export interface RealtimeFeedResponse {
  analyzed_news: AnalyzedNews[];
}

// 실시간 분석 피드 조회
export async function getRealtimeFeed(limit?: number): Promise<RealtimeFeedResponse> {
  const params = limit ? { limit } : undefined;
  return apiClient.get<RealtimeFeedResponse>('/dashboard/realtime-feed', params);
} 