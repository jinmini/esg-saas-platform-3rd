import { useQuery } from '@tanstack/react-query';
import { getHotTopics } from '../api';

export interface HotTopic {
  keyword: string;
  count: number;
  trend: 'up' | 'down' | 'stable';
  relatedCompanies: string[];
}

export function useHotTopics(limit: number = 20) {
  return useQuery<HotTopic[], Error>({
    queryKey: ['hotTopics', limit],
    queryFn: () => getHotTopics(limit),
  });
} 