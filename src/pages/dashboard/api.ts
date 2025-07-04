import { apiClient } from '@/shared/api/client';
import { DashboardStats } from '@/shared/types';

// 대시보드 통계 조회
export async function getDashboardStats(): Promise<DashboardStats> {
  const response = await apiClient.get<DashboardStats>('/dashboard/stats');
  return response.data;
}

// 대시보드 위젯 데이터 일괄 조회
export async function getDashboardWidgets(widgets: string[]): Promise<Record<string, unknown>> {
  const response = await apiClient.post<Record<string, unknown>>('/dashboard/widgets', { widgets });
  return response.data;
}

// 대시보드 레이아웃 저장
export async function saveDashboardLayout(layout: { widgets: Array<{ id: string; x: number; y: number; w: number; h: number }> }): Promise<void> {
  return apiClient.post('/dashboard/layout', { layout }).then(() => undefined);
}

// 대시보드 레이아웃 조회
export async function getDashboardLayout(): Promise<{ widgets: Array<{ id: string; x: number; y: number; w: number; h: number }> }> {
  const response = await apiClient.get<{ widgets: Array<{ id: string; x: number; y: number; w: number; h: number }> }>('/dashboard/layout');
  return response.data;
} 