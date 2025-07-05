import { useQuery } from '@tanstack/react-query';
import { getRealtimeFeed, AnalyzedNews } from '../api';

export function useRealtimeFeed(limit: number = 10) {
  return useQuery<AnalyzedNews[], Error>({
    queryKey: ['realtimeFeed', limit],
    queryFn: async () => {
      const response = await getRealtimeFeed(limit);
      return response.analyzed_news;
    },
  });
}
