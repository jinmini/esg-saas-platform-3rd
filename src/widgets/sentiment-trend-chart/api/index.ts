import { apiClient } from '@/shared/api/client';

export interface SentimentTrendData {
  date: string;
  positive: number;
  negative: number;
  neutral: number;
}

// 감성 분석 트렌드
export async function getSentimentTrend(params?: {
  startDate?: string;
  endDate?: string;
  companyId?: string;
}): Promise<SentimentTrendData[]> {
  return apiClient.get<SentimentTrendData[]>('/dashboard/sentiment-trend', params);
} 