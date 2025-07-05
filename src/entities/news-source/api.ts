import { apiClient } from '@/shared/api/client';
import { NewsSource } from './model/types';

// 뉴스 소스 목록 조회
export async function getNewsSources(): Promise<NewsSource[]> {
  const response = await apiClient.get<{ items: NewsSource[] }>('/crawl-jobs/sources');
  return response.items;
} 