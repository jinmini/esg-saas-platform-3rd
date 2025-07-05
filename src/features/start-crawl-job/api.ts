import { apiClient } from '@/shared/api/client';
import { CrawlJob } from '@/shared/types';

// 크롤링 작업 시작
export async function startCrawlJob(params: {
  keywords: string[];
  pages?: number;
}): Promise<CrawlJob> {
  return await apiClient.post<CrawlJob>('/crawl-jobs', params);
} 