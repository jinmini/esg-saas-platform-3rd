// 크롤링 관련 API

import { apiClient } from './client';
import { CrawlJob } from '@/types';

// 크롤링 작업 시작
export async function startCrawlJob(params: {
  keywords: string[];
  pages?: number;
}): Promise<CrawlJob> {
  return apiClient.post<CrawlJob>('/crawl-jobs', params);
}

// 크롤링 작업 상태 조회
export async function getCrawlJobStatus(jobId: string): Promise<CrawlJob> {
  return apiClient.get<CrawlJob>(`/crawl-jobs/${jobId}`);
}

// 크롤링 작업 목록 조회
export async function getCrawlJobs(params?: {
  status?: CrawlJob['status'];
  limit?: number;
}): Promise<CrawlJob[]> {
  const response = await apiClient.get<{ items: CrawlJob[] }>('/crawl-jobs', params);
  return response.items;
}

// 크롤링 작업 취소
export async function cancelCrawlJob(jobId: string): Promise<void> {
  return apiClient.post(`/crawl-jobs/${jobId}/cancel`);
}

// 크롤링 스케줄 설정
export async function scheduleCrawl(params: {
  keywords: string[];
  interval: 'hourly' | 'daily' | 'weekly';
  time?: string;
}): Promise<{ scheduleId: string }> {
  return apiClient.post('/crawl-jobs/schedule', params);
}

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

// 크롤링 스케줄 삭제
export async function deleteCrawlSchedule(scheduleId: string): Promise<void> {
  return apiClient.delete(`/crawl-jobs/schedules/${scheduleId}`);
}

// 크롤링 통계 조회
export async function getCrawlStats(): Promise<{
  totalJobs: number;
  completedJobs: number;
  failedJobs: number;
  totalArticles: number;
  todayArticles: number;
  avgProcessingTime: number;
}> {
  return apiClient.get('/crawl-jobs/stats');
}

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

// 뉴스 소스 활성화/비활성화
export async function toggleNewsSource(
  sourceId: string,
  enabled: boolean
): Promise<void> {
  return apiClient.put(`/crawl-jobs/sources/${sourceId}`, { enabled });
}
