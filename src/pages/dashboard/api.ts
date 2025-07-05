import { apiClient } from '@/shared/api/client';
import { DashboardStats } from '@/shared/types/api';

// 대시보드 통계 조회
export async function getDashboardStats(): Promise<DashboardStats> {
  return apiClient.get<DashboardStats>('/dashboard/stats');
}

// 대시보드 위험 트렌드 조회
export async function getRiskTrend(params?: { period?: string }): Promise<any> {
  return apiClient.get<any>('/dashboard/risk-trend', params);
}

// 대시보드 레이아웃 조회
export async function getDashboardLayout(): Promise<any> {
  return apiClient.get<any>('/dashboard/layout');
}

// 실시간 알림 조회
export async function getRealtimeAlerts(limit: number = 10): Promise<any[]> {
  return apiClient.get<any[]>('/dashboard/alerts', { limit });
}

// 산업별 위험 요약 조회
export async function getIndustryRiskSummary(): Promise<any> {
  return apiClient.get<any>('/dashboard/industry-risk-summary');
}

// SASB 분포 조회
export async function getSASBDistribution(): Promise<any> {
  return apiClient.get<any>('/dashboard/sasb-distribution');
}

// 오늘의 하이라이트 조회
export async function getTodayHighlights(): Promise<any> {
  return apiClient.get<any>('/dashboard/today-highlights');
}

// 관심목록 상태 조회
export async function getWatchlistStatus(): Promise<any> {
  return apiClient.get<any>('/dashboard/watchlist-status');
}

// 감정 트렌드 조회
export async function getSentimentTrend(params?: { period?: string }): Promise<any> {
  return apiClient.get<any>('/dashboard/sentiment-trend', params);
}

// 핫 토픽 조회
export async function getHotTopics(limit: number = 10): Promise<any[]> {
  return apiClient.get<any[]>('/dashboard/hot-topics', { limit });
}

// API 서비스 객체 생성
export const dashboardApi = {
  getDashboardStats,
  getRiskTrend,
  getDashboardLayout,
  getRealtimeAlerts,
  getIndustryRiskSummary,
  getSASBDistribution,
  getTodayHighlights,
  getWatchlistStatus,
  getSentimentTrend,
  getHotTopics,
}; 