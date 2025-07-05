import { useQuery } from '@tanstack/react-query';
import { getSentimentTrend } from '../api';
import type { SentimentTrendData } from '@/shared/types';

export function useSentimentTrend(params: {
  startDate: string;
  endDate: string;
  companyId?: string;
}) {
  return useQuery<SentimentTrendData[], Error>({
    queryKey: ['sentimentTrend', params],
    queryFn: () => getSentimentTrend(params),
    enabled: !!params.startDate && !!params.endDate,
  });
} 