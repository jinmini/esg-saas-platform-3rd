import { apiClient } from '@/shared/api/client';
import type { SentimentTrendData } from '@/shared/types';

// 감성 분석 트렌드
export async function getSentimentTrend(params: {
  startDate: string;
  endDate: string;
  companyId?: string;
}): Promise<SentimentTrendData[]> {
  const response = await apiClient.get<SentimentTrendData[]>(
    '/dashboard/sentiment-trend',
    params
  );
  return response.data;
} 