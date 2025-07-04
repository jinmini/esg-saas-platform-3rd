import { apiClient } from '@/shared/api/client';

// 감성 분석 트렌드
export async function getSentimentTrend(params: {
  startDate: string;
  endDate: string;
  companyId?: string;
}): Promise<Array<{
  date: string;
  positive: number;
  negative: number;
  neutral: number;
}>> {
  const response = await apiClient.get('/dashboard/sentiment-trend', params);
  return response.data;
} 