import { apiClient } from '@/shared/api/client';

// 뉴스 소스 활성화/비활성화
export async function toggleNewsSource(
  sourceId: string,
  enabled: boolean
): Promise<void> {
  return apiClient.put(`/crawl-jobs/sources/${sourceId}`, { enabled }).then(() => undefined);
} 