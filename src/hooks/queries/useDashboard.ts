// 대시보드 관련 React Query 훅

import { useQuery } from '@tanstack/react-query';
import { dashboardApi } from '@/lib/api';

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
    queryFn: () => dashboardApi.getDashboardStats(),
    staleTime: 1000 * 60 * 2, // 2분
    refetchInterval: 1000 * 60 * 5, // 5분마다 자동 갱신
  });
}

// 리스크 추이
export function useRiskTrend(params: {
  startDate: string;
  endDate: string;
  interval?: 'daily' | 'weekly' | 'monthly';
}) {
  return useQuery({
    queryKey: [QUERY_KEYS.riskTrend, params],
    queryFn: () => dashboardApi.getRiskTrend(params),
    staleTime: 1000 * 60 * 10, // 10분
  });
}

// 실시간 알림
export function useRealtimeAlerts(limit: number = 10) {
  return useQuery({
    queryKey: [QUERY_KEYS.realtimeAlerts, limit],
    queryFn: () => dashboardApi.getRealtimeAlerts(limit),
    staleTime: 1000 * 30, // 30초
    refetchInterval: 1000 * 60, // 1분마다 자동 갱신
  });
}

// 산업별 리스크 요약
export function useIndustryRiskSummary() {
  return useQuery({
    queryKey: [QUERY_KEYS.industryRiskSummary],
    queryFn: () => dashboardApi.getIndustryRiskSummary(),
    staleTime: 1000 * 60 * 15, // 15분
  });
}

// SASB 카테고리별 분포
export function useSASBDistribution() {
  return useQuery({
    queryKey: [QUERY_KEYS.sasbDistribution],
    queryFn: () => dashboardApi.getSASBDistribution(),
    staleTime: 1000 * 60 * 10, // 10분
  });
}

// 오늘의 하이라이트
export function useTodayHighlights() {
  return useQuery({
    queryKey: [QUERY_KEYS.todayHighlights],
    queryFn: () => dashboardApi.getTodayHighlights(),
    staleTime: 1000 * 60 * 5, // 5분
    refetchInterval: 1000 * 60 * 10, // 10분마다 자동 갱신
  });
}

// 워치리스트 현황
export function useWatchlistStatus() {
  return useQuery({
    queryKey: [QUERY_KEYS.watchlistStatus],
    queryFn: () => dashboardApi.getWatchlistStatus(),
    staleTime: 1000 * 60 * 5, // 5분
  });
}

// 감성 분석 트렌드
export function useSentimentTrend(params: {
  startDate: string;
  endDate: string;
  companyId?: string;
}) {
  return useQuery({
    queryKey: [QUERY_KEYS.sentimentTrend, params],
    queryFn: () => dashboardApi.getSentimentTrend(params),
    staleTime: 1000 * 60 * 10, // 10분
    enabled: !!params.startDate && !!params.endDate,
  });
}

// 핫 토픽
export function useHotTopics(limit: number = 20) {
  return useQuery({
    queryKey: [QUERY_KEYS.hotTopics, limit],
    queryFn: () => dashboardApi.getHotTopics(limit),
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
export function usePeriodDashboardData(startDate: string, endDate: string) {
  const riskTrend = useRiskTrend({ startDate, endDate });
  const sentimentTrend = useSentimentTrend({ startDate, endDate });
  
  return {
    riskTrend,
    sentimentTrend,
    isLoading: riskTrend.isLoading || sentimentTrend.isLoading,
    isError: riskTrend.isError || sentimentTrend.isError,
  };
}
