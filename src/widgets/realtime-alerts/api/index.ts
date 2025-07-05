import { apiClient } from '@/shared/api/client';

export interface RealtimeAlert {
  id: string;
  type: 'high_risk' | 'new_issue' | 'trend_change';
  title: string;
  message: string;
  timestamp: string;
  companyId?: string;
  analysisId?: string;
}

// 실시간 알림 조회
export async function getRealtimeAlerts(limit: number = 10): Promise<{ items: RealtimeAlert[] }> {
  return apiClient.get<{ items: RealtimeAlert[] }>('/dashboard/realtime-alerts', {
    limit,
  });
} 