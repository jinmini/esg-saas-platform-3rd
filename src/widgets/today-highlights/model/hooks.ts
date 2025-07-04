import { useQuery } from '@tanstack/react-query';
import { getTodayHighlights } from '../api';
import type { TodayHighlights } from '@/shared/types';

export function useTodayHighlights() {
  return useQuery<TodayHighlights, Error>({
    queryKey: ['todayHighlights'],
    queryFn: getTodayHighlights,
  });
} 