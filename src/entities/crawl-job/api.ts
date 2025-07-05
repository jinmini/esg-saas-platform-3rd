import { apiClient } from '@/shared/api/client';
import { CrawlJob, CrawlStats } from './model/types';

// 크롤링 작업 상태 조회
export async function getCrawlJobStatus(jobId: string): Promise<CrawlJob> {
  return await apiClient.get<CrawlJob>(`/crawl-jobs/${jobId}`);
}

// 크롤링 작업 목록 조회
export async function getCrawlJobs(params?: {
  status?: CrawlJob['status'];
  limit?: number;
}): Promise<CrawlJob[]> {
  const response = await apiClient.get<{ items: CrawlJob[] }>('/crawl-jobs', params);
  return response.items;
}

// 크롤링 통계 조회
export async function getCrawlStats(): Promise<CrawlStats> {
  return await apiClient.get<CrawlStats>('/crawl-jobs/stats');
} 