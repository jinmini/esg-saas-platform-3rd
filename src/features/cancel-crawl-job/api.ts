import { apiClient } from '@/shared/api/client';

// 크롤링 작업 취소
export async function cancelCrawlJob(jobId: string): Promise<void> {
  return apiClient.post(`/crawl-jobs/${jobId}/cancel`).then(() => undefined);
} 