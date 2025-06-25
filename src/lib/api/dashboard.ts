// 대시보드 관련 API

import { apiClient } from './client';
import { DashboardStats, RiskTrendData, CompanyRisk } from '@/types';

// 대시보드 통계 조회
export async function getDashboardStats(): Promise<DashboardStats> {
  return apiClient.get<DashboardStats>('/dashboard/stats');
}

// 리스크 추이 조회 (전체)
export async function getRiskTrend(params: {
  startDate: string;
  endDate: string;
  interval?: 'daily' | 'weekly' | 'monthly';
}): Promise<RiskTrendData[]> {
  return apiClient.get<RiskTrendData[]>('/dashboard/risk-trend', params);
}

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
  const response = await apiClient.get<{ items: any[] }>('/dashboard/alerts', {
    limit: limit.toString(),
  });
  return response.items;
}

// 산업별 리스크 요약
export async function getIndustryRiskSummary(): Promise<Array<{
  industry: string;
  avgRiskScore: number;
  totalCompanies: number;
  criticalIssues: number;
  trend: number;
}>> {
  const response = await apiClient.get<{ items: any[] }>('/dashboard/industry-summary');
  return response.items;
}

// SASB 카테고리별 이슈 분포
export async function getSASBDistribution(): Promise<Array<{
  category: string;
  count: number;
  avgRiskScore: number;
  topCompanies: string[];
}>> {
  const response = await apiClient.get<{ items: any[] }>('/dashboard/sasb-distribution');
  return response.items;
}

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
  return apiClient.get('/dashboard/today-highlights');
}

// 워치리스트 기업 현황
export async function getWatchlistStatus(): Promise<CompanyRisk[]> {
  const response = await apiClient.get<{ items: CompanyRisk[] }>('/dashboard/watchlist');
  return response.items;
}

// 감성 분석 트렌드
export async function getSentimentTrend(params: {
  startDate: string;
  endDate: string;
  companyId?: string;
}): Promise<Array<{
  date: string;
  positive: number;
  negative: number;
  neutral: number;
}>> {
  return apiClient.get('/dashboard/sentiment-trend', params);
}

// 핫 토픽 키워드
export async function getHotTopics(limit: number = 20): Promise<Array<{
  keyword: string;
  count: number;
  trend: 'up' | 'down' | 'stable';
  relatedCompanies: string[];
}>> {
  const response = await apiClient.get<{ items: any[] }>('/dashboard/hot-topics', {
    limit: limit.toString(),
  });
  return response.items;
}

// 대시보드 위젯 데이터 일괄 조회
export async function getDashboardWidgets(widgets: string[]): Promise<Record<string, any>> {
  return apiClient.post('/dashboard/widgets', { widgets });
}

// 대시보드 레이아웃 저장
export async function saveDashboardLayout(layout: any): Promise<void> {
  return apiClient.post('/dashboard/layout', { layout });
}

// 대시보드 레이아웃 조회
export async function getDashboardLayout(): Promise<any> {
  return apiClient.get('/dashboard/layout');
}
