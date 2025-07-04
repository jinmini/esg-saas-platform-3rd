import { apiClient } from '@/shared/api/client';

// 크롤링 스케줄 설정
export async function scheduleCrawl(params: {
  keywords: string[];
  interval: 'hourly' | 'daily' | 'weekly';
  time?: string;
}): Promise<{ scheduleId: string }> {
  return (await apiClient.post<{ scheduleId: string }>('/crawl-jobs/schedule', params)).data;
}

// 크롤링 스케줄 삭제
export async function deleteCrawlSchedule(scheduleId: string): Promise<void> {
  return apiClient.delete(`/crawl-jobs/schedules/${scheduleId}`).then(() => undefined);
} 