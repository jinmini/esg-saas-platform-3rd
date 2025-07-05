import { useQuery } from '@tanstack/react-query';
import { getRealtimeAlerts } from '../api';

export interface RealtimeAlert {
  id: string;
  type: 'high_risk' | 'new_issue' | 'trend_change';
  title: string;
  message: string;
  timestamp: string;
  companyId?: string;
  analysisId?: string;
}

export function useRealtimeAlerts(limit: number = 10) {
  return useQuery<RealtimeAlert[], Error>({
    queryKey: ['realtimeAlerts', limit],
    queryFn: async () => {
      const response = await getRealtimeAlerts(limit);
      return response.items;
    },
  });
} 