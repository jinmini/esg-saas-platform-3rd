import { apiClient } from '@/shared/api/client';

export async function toggleCompanyWatchlist(
  companyId: string,
  isWatched: boolean
): Promise<void> {
  await apiClient.post(`/companies/${companyId}/watchlist`, { isWatched });
} 