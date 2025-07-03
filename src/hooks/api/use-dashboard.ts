'use client';

import { useQuery } from '@tanstack/react-query'
import { httpClient } from '@/shared/api/http-client'
import { DashboardStats, ApiResponse, WorkflowStatus, CompanyFinancials } from '@/shared/types/api'

// 대시보드 통계 조회
export function useDashboardStats() {
  return useQuery({
    queryKey: ['dashboard', 'stats'],
    queryFn: async () => {
      const response = await httpClient.get<ApiResponse<DashboardStats>>('/api/dashboard/stats')
      return response.data
    },
    refetchInterval: 30000, // 30초마다 갱신
  })
}

// 워크플로우 목록 조회
export function useDashboardWorkflows() {
  return useQuery({
    queryKey: ['dashboard', 'workflows'],
    queryFn: async () => {
      const response = await httpClient.get<ApiResponse<WorkflowStatus[]>>('/api/dashboard/workflows')
      return response.data
    },
    refetchInterval: 60000, // 1분마다 갱신
  })
}

// 기업 재무 정보 조회
export function useDashboardFinancials() {
  return useQuery({
    queryKey: ['dashboard', 'financials'],
    queryFn: async () => {
      const response = await httpClient.get<ApiResponse<CompanyFinancials[]>>('/api/dashboard/financials')
      return response.data
    },
    refetchInterval: 300000, // 5분마다 갱신 (재무 정보는 자주 변하지 않음)
  })
}

// 대시보드 피드 조회
export function useDashboardFeed() {
  return useQuery({
    queryKey: ['dashboard', 'feed'],
    queryFn: async () => {
      const response = await httpClient.get<ApiResponse<any[]>>('/api/dashboard/feed')
      return response.data
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
      const response = await httpClient.get<ApiResponse<any[]>>('/api/dashboard/notifications')
      return response.data
    },
    staleTime: 1 * 60 * 1000, // 1분
    refetchInterval: 2 * 60 * 1000, // 2분마다 자동 갱신
  })
} 