import { apiClient } from '@/shared/api/client';

export async function getGRIData(): Promise<any> {
  return apiClient.get<any>('/gri/data');
}

export async function generateGRIReport(data: any): Promise<any> {
  return apiClient.post<any>('/gri/generate', data);
} 