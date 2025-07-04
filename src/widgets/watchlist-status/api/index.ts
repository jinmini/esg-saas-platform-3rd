import { apiClient } from '@/shared/api/client';
import { CompanyRisk } from '@/shared/types';

// 워치리스트 기업 현황
export async function getWatchlistStatus(): Promise<CompanyRisk[]> {
  const response = await apiClient.get<{ items: CompanyRisk[] }>('/dashboard/watchlist');
  return response.data.items;
} 