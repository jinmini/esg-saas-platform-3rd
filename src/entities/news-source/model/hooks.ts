import { useQuery } from '@tanstack/react-query';
import * as api from '../api';

const newsSourceKeys = {
  all: ['newsSources'] as const,
  lists: () => [...newsSourceKeys.all, 'list'] as const,
};

export const useNewsSources = () => {
  return useQuery({
    queryKey: newsSourceKeys.lists(),
    queryFn: api.getNewsSources,
  });
}; 