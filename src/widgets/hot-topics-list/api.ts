import { apiClient } from '@/shared/api/client';

// 핫 토픽 키워드
export async function getHotTopics(limit: number = 20): Promise<Array<{
  keyword: string;
  count: number;
  trend: 'up' | 'down' | 'stable';
  relatedCompanies: string[];
}>> {
  const response = await apiClient.get<{ items: Array<{
    keyword: string;
    count: number;
    trend: 'up' | 'down' | 'stable';
    relatedCompanies: string[];
  }> }>('/dashboard/hot-topics', {
    limit: limit.toString(),
  });
  return response.data.items;
} 