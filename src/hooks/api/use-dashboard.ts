'use client';

import { useQuery } from '@tanstack/react-query'
import { apiClient } from '@/shared/api/client'
import { DashboardStats, WorkflowStatus, CompanyFinancials } from '@/shared/types/api'

// 대시보드 통계 조회
export function useDashboardStats() {
  return useQuery({
    queryKey: ['dashboard', 'stats'],
    queryFn: async () => {
      return apiClient.get<DashboardStats>('/dashboard/stats') // /api 제거
    },
    refetchInterval: 30000,
  })
}

// 워크플로우 목록 조회
export function useDashboardWorkflows() {
  return useQuery({
    queryKey: ['dashboard', 'workflows'],
    queryFn: async () => {
      return apiClient.get<WorkflowStatus[]>('/dashboard/workflows') // /api 제거
    },
    refetchInterval: 60000,
  })
}

// 기업 재무 정보 조회
export function useDashboardFinancials() {
  return useQuery({
    queryKey: ['dashboard', 'financials'],
    queryFn: async () => {
      return apiClient.get<CompanyFinancials[]>('/api/dashboard/financials')
    },
    refetchInterval: 300000, // 5분마다 갱신 (재무 정보는 자주 변하지 않음)
  })
}

// 대시보드 피드 조회
export function useDashboardFeed() {
  return useQuery({
    queryKey: ['dashboard', 'feed'],
    queryFn: async () => {
      return apiClient.get<any[]>('/api/dashboard/feed')
    },
    staleTime: 2 * 60 * 1000, // 2분
    refetchInterval: 5 * 60 * 1000, // 5분마다 자동 갱신
  })
}

// 실시간 알림 데이터 (향후 WebSocket 연동 시 사용)
export function useRealtimeNotifications() {
  return useQuery({
    queryKey: ['dashboard', 'notifications'],
    queryFn: async () => {
      return apiClient.get<any[]>('/api/dashboard/notifications')
    },
    staleTime: 1 * 60 * 1000, // 1분
    refetchInterval: 2 * 60 * 1000, // 2분마다 자동 갱신
  })
} 