import { useQuery } from '@tanstack/react-query';
import * as api from '../api';

const crawlScheduleKeys = {
  all: ['crawlSchedules'] as const,
  lists: () => [...crawlScheduleKeys.all, 'list'] as const,
};

export const useCrawlSchedules = () => {
  return useQuery({
    queryKey: crawlScheduleKeys.lists(),
    queryFn: api.getCrawlSchedules,
  });
}; 