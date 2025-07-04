import { apiClient } from '@/shared/api/client';
import { CrawlJob, CrawlStats } from './model/types';

// 크롤링 작업 상태 조회
export async function getCrawlJobStatus(jobId: string): Promise<CrawlJob> {
  const response = await apiClient.get<CrawlJob>(`/crawl-jobs/${jobId}`);
  return response.data;
}

// 크롤링 작업 목록 조회
export async function getCrawlJobs(params?: {
  status?: CrawlJob['status'];
  limit?: number;
}): Promise<CrawlJob[]> {
  const response = await apiClient.get<{ items: CrawlJob[] }>('/crawl-jobs', params);
  return response.data.items;
}

// 크롤링 통계 조회
export async function getCrawlStats(): Promise<CrawlStats> {
  const response = await apiClient.get<CrawlStats>('/crawl-jobs/stats');
  return response.data;
} 