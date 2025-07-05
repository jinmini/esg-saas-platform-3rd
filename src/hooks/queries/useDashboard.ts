// 대시보드 관련 React Query 훅

import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/shared/api/client';
import { DashboardStats } from '@/shared/types/api';

// Query Keys
const QUERY_KEYS = {
  dashboardStats: 'dashboardStats',
  riskTrend: 'riskTrend',
  realtimeAlerts: 'realtimeAlerts',
  industryRiskSummary: 'industryRiskSummary',
  sasbDistribution: 'sasbDistribution',
  todayHighlights: 'todayHighlights',
  watchlistStatus: 'watchlistStatus',
  sentimentTrend: 'sentimentTrend',
  hotTopics: 'hotTopics',
} as const;

// 대시보드 통계
export function useDashboardStats() {
  return useQuery({
    queryKey: [QUERY_KEYS.dashboardStats],
    queryFn: () => apiClient.get<DashboardStats>('/dashboard/stats'),
    staleTime: 1000 * 60 * 2, // 2분
    refetchInterval: 1000 * 60 * 5, // 5분마다 자동 갱신
  });
}

// 리스크 추이
export function useRiskTrend(params?: { period?: string }) {
  return useQuery({
    queryKey: [QUERY_KEYS.riskTrend, params],
    queryFn: () => apiClient.get<any>('/dashboard/risk-trend', params),
    staleTime: 1000 * 60 * 10, // 10분
  });
}

// 실시간 알림
export function useRealtimeAlerts(limit: number = 10) {
  return useQuery({
    queryKey: [QUERY_KEYS.realtimeAlerts, limit],
    queryFn: () => apiClient.get<any[]>('/dashboard/alerts', { limit }),
    staleTime: 1000 * 30, // 30초
    refetchInterval: 1000 * 60, // 1분마다 자동 갱신
  });
}

// 산업별 리스크 요약
export function useIndustryRiskSummary() {
  return useQuery({
    queryKey: [QUERY_KEYS.industryRiskSummary],
    queryFn: () => apiClient.get<any>('/dashboard/industry-risk-summary'),
    staleTime: 1000 * 60 * 15, // 15분
  });
}

// SASB 카테고리별 분포
export function useSASBDistribution() {
  return useQuery({
    queryKey: [QUERY_KEYS.sasbDistribution],
    queryFn: () => apiClient.get<any>('/dashboard/sasb-distribution'),
    staleTime: 1000 * 60 * 10, // 10분
  });
}

// 오늘의 하이라이트
export function useTodayHighlights() {
  return useQuery({
    queryKey: [QUERY_KEYS.todayHighlights],
    queryFn: () => apiClient.get<any>('/dashboard/today-highlights'),
    staleTime: 1000 * 60 * 5, // 5분
    refetchInterval: 1000 * 60 * 10, // 10분마다 자동 갱신
  });
}

// 워치리스트 현황
export function useWatchlistStatus() {
  return useQuery({
    queryKey: [QUERY_KEYS.watchlistStatus],
    queryFn: () => apiClient.get<any>('/dashboard/watchlist-status'),
    staleTime: 1000 * 60 * 5, // 5분
  });
}

// 감성 분석 트렌드
export function useSentimentTrend(params?: { period?: string }) {
  return useQuery({
    queryKey: [QUERY_KEYS.sentimentTrend, params],
    queryFn: () => apiClient.get<any>('/dashboard/sentiment-trend', params),
    staleTime: 1000 * 60 * 10, // 10분
  });
}

// 핫 토픽
export function useHotTopics(limit: number = 20) {
  return useQuery({
    queryKey: [QUERY_KEYS.hotTopics, limit],
    queryFn: () => apiClient.get<any[]>('/dashboard/hot-topics', { limit }),
    staleTime: 1000 * 60 * 15, // 15분
  });
}

// 대시보드 데이터 일괄 조회를 위한 훅
export function useDashboardData() {
  const stats = useDashboardStats();
  const alerts = useRealtimeAlerts();
  const highlights = useTodayHighlights();
  const watchlist = useWatchlistStatus();
  
  return {
    stats,
    alerts,
    highlights,
    watchlist,
    isLoading: stats.isLoading || alerts.isLoading || highlights.isLoading || watchlist.isLoading,
    isError: stats.isError || alerts.isError || highlights.isError || watchlist.isError,
  };
}

// 특정 기간의 대시보드 데이터를 위한 훅
export function usePeriodDashboardData(period?: string) {
  const riskTrend = useRiskTrend({ period });
  const sentimentTrend = useSentimentTrend({ period });
  
  return {
    riskTrend,
    sentimentTrend,
    isLoading: riskTrend.isLoading || sentimentTrend.isLoading,
    isError: riskTrend.isError || sentimentTrend.isError,
  };
}
