import { apiClient } from '@/shared/api/client';
import { TodayHighlights } from '@/shared/types';

// 오늘의 주요 이슈
export async function getTodayHighlights(): Promise<TodayHighlights> {
  return apiClient.get<TodayHighlights>('/dashboard/today-highlights');
} 