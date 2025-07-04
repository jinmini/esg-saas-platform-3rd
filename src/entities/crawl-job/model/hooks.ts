import { useQuery } from '@tanstack/react-query';
import * as api from '../api';
import { CrawlJob } from './types';

const crawlJobKeys = {
  all: ['crawlJobs'] as const,
  lists: () => [...crawlJobKeys.all, 'list'] as const,
  list: (filters: { status?: CrawlJob['status']; limit?: number }) => [...crawlJobKeys.lists(), filters] as const,
  details: () => [...crawlJobKeys.all, 'detail'] as const,
  detail: (id: string) => [...crawlJobKeys.details(), id] as const,
  stats: () => [...crawlJobKeys.all, 'stats'] as const,
};

export const useCrawlJobs = (params?: { status?: CrawlJob['status']; limit?: number }) => {
  return useQuery({
    queryKey: crawlJobKeys.list(params || {}),
    queryFn: () => api.getCrawlJobs(params),
  });
};

export const useCrawlJobStatus = (jobId: string) => {
  return useQuery({
    queryKey: crawlJobKeys.detail(jobId),
    queryFn: () => api.getCrawlJobStatus(jobId),
    enabled: !!jobId,
    // 5초마다 refetch
    refetchInterval: 5000,
  });
};

export const useCrawlStats = () => {
  return useQuery({
    queryKey: crawlJobKeys.stats(),
    queryFn: api.getCrawlStats,
  });
}; 