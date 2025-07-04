import { apiClient } from '@/shared/api/client';

// 크롤링 스케줄 목록 조회
export async function getCrawlSchedules(): Promise<Array<{
  id: string;
  keywords: string[];
  interval: string;
  nextRun: string;
  enabled: boolean;
}>> {
  const response = await apiClient.get<{ items: Array<{
    id: string;
    keywords: string[];
    interval: string;
    nextRun: string;
    enabled: boolean;
  }> }>('/crawl-jobs/schedules');
  return response.items;
} 