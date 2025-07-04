import { apiClient } from '@/shared/api/client';
import type { TodayHighlights } from '@/shared/types';

// 오늘의 주요 이슈
export async function getTodayHighlights(): Promise<TodayHighlights> {
  const response = await apiClient.get<TodayHighlights>(
    '/dashboard/today-highlights'
  );
  return response.data;
} 