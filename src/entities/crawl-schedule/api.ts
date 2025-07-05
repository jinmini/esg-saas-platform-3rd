import { apiClient } from '@/shared/api/client';
import { CrawlSchedule } from './model/types';

// 크롤링 스케줄 목록 조회
export async function getCrawlSchedules(): Promise<CrawlSchedule[]> {
  const response = await apiClient.get<{ items: CrawlSchedule[] }>('/crawl-jobs/schedules');
  return response.items;
} 