import { apiClient } from '@/shared/api/client';

export async function getTopCompanies(): Promise<any[]> {
  const response = await apiClient.get<{ items: any[] }>('/widgets/top-companies');
  return response.items || [];
} 