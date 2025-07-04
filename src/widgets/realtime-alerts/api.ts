import { apiClient } from '@/shared/api/client';

// 실시간 알림 조회
export async function getRealtimeAlerts(limit: number = 10): Promise<Array<{
  id: string;
  type: 'high_risk' | 'new_issue' | 'trend_change';
  title: string;
  message: string;
  timestamp: string;
  companyId?: string;
  analysisId?: string;
}>> {
  const response = await apiClient.get<{ items: Array<{
    id: string;
    type: 'high_risk' | 'new_issue' | 'trend_change';
    title: string;
    message: string;
    timestamp: string;
    companyId?: string;
    analysisId?: string;
  }> }>('/dashboard/alerts', {
    limit: limit.toString(),
  });
  return response.data.items;
} 