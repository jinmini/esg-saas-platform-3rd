import { apiClient } from '@/shared/api/client';

// 뉴스 소스 목록 조회
export async function getNewsSources(): Promise<Array<{
  id: string;
  name: string;
  url: string;
  enabled: boolean;
  lastCrawled?: string;
  articleCount: number;
}>> {
  const response = await apiClient.get<{ items: Array<{
    id: string;
    name: string;
    url: string;
    enabled: boolean;
    lastCrawled?: string;
    articleCount: number;
  }> }>('/crawl-jobs/sources');
  return response.items;
} 