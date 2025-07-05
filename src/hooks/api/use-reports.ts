import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { apiClient } from '@/shared/api/client'
import { Report } from '@/shared/types/api'

// 리포트 목록 조회
export function useReports() {
  return useQuery({
    queryKey: ['reports'],
    queryFn: async () => {
      return apiClient.get<Report[]>('/api/reports')
    },
  })
}

// 특정 리포트 조회
export function useReport(id: string) {
  return useQuery({
    queryKey: ['reports', id],
    queryFn: async () => {
      return apiClient.get<Report>(`/api/reports/${id}`)
    },
    enabled: !!id,
  })
}

// 리포트 생성
export function useCreateReport() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: async (reportData: Partial<Report>) => {
      return apiClient.post<Report>('/api/reports', reportData)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reports'] })
    },
  })
}

// 리포트 수정
export function useUpdateReport(id: string) {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: async (data: Partial<Report>) => {
      return apiClient.put<Report>(`/api/reports/${id}`, data)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reports'] })
      queryClient.invalidateQueries({ queryKey: ['reports', id] })
    },
  })
}

// 리포트 삭제
export function useDeleteReport() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: async (id: string) => {
      await apiClient.delete(`/api/reports/${id}`)
      return id
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reports'] })
    },
  })
}

// 회사별 리포트 조회
export function useReportsByCompany(companyId: string) {
  return useQuery({
    queryKey: ['reports', 'company', companyId],
    queryFn: async () => {
      return apiClient.get<Report[]>(`/api/reports?company_id=${companyId}`)
    },
    enabled: !!companyId,
  })
}

// 프레임워크별 리포트 조회
export function useReportsByFramework(framework: string) {
  return useQuery({
    queryKey: ['reports', 'framework', framework],
    queryFn: async () => {
      return apiClient.get<Report[]>(`/api/reports?framework=${framework}`)
    },
    enabled: !!framework,
  })
} 