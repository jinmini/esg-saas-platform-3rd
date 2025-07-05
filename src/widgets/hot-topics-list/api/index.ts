import { apiClient } from '@/shared/api/client';

export interface HotTopic {
  keyword: string;
  count: number;
  trend: 'up' | 'down' | 'stable';
  relatedCompanies: string[];
}

export async function getHotTopics(
  limit: number = 10,
  timeframe: 'day' | 'week' | 'month' = 'day'
): Promise<{ items: HotTopic[] }> {
  return apiClient.get<{ items: HotTopic[] }>('/hot-topics', {
    limit,
    timeframe,
  });
} 