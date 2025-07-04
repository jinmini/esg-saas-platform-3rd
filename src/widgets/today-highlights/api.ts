import { apiClient } from '@/shared/api/client';

// 오늘의 주요 이슈
export async function getTodayHighlights(): Promise<{
  newArticles: number;
  highRiskAlerts: number;
  topIssue: {
    title: string;
    company: string;
    riskScore: number;
  };
  keyFindings: string[];
}> {
  const response = await apiClient.get('/dashboard/today-highlights');
  return response.data;
} 