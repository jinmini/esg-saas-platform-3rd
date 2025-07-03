import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { httpClient } from '@/shared/api/http-client'
import { Report, ApiResponse } from '@/shared/types/api'

// 리포트 목록 조회
export function useReports() {
  return useQuery({
    queryKey: ['reports'],
    queryFn: async (): Promise<Report[]> => {
      const response = await httpClient.get<ApiResponse<Report[]>>('/api/reports')
      return response.data
    },
    staleTime: 5 * 60 * 1000, // 5분
  })
}

// 특정 리포트 조회
export function useReport(id: string) {
  return useQuery({
    queryKey: ['reports', id],
    queryFn: async (): Promise<Report> => {
      const response = await httpClient.get<ApiResponse<Report>>(`/api/reports/${id}`)
      return response.data
    },
    enabled: !!id,
    staleTime: 5 * 60 * 1000, // 5분
  })
}

// 리포트 생성
export function useCreateReport() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (reportData: Partial<Report>): Promise<Report> => {
      const response = await httpClient.post<ApiResponse<Report>>('/api/reports', reportData)
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reports'] })
    },
  })
}

// 리포트 업데이트
export function useUpdateReport() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<Report> }): Promise<Report> => {
      const response = await httpClient.put<ApiResponse<Report>>(`/api/reports/${id}`, data)
      return response.data
    },
    onSuccess: (updatedReport) => {
      // 특정 리포트 쿼리 업데이트
      queryClient.setQueryData(['reports', updatedReport.id], updatedReport)
      // 리포트 목록 쿼리 무효화
      queryClient.invalidateQueries({ queryKey: ['reports'] })
    },
  })
}

// 리포트 삭제
export function useDeleteReport() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (id: string): Promise<void> => {
      await httpClient.delete(`/api/reports/${id}`)
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
    queryFn: async (): Promise<Report[]> => {
      const response = await httpClient.get<ApiResponse<Report[]>>(`/api/reports?company_id=${companyId}`)
      return response.data
    },
    enabled: !!companyId,
    staleTime: 5 * 60 * 1000, // 5분
  })
}

// 프레임워크별 리포트 조회
export function useReportsByFramework(framework: string) {
  return useQuery({
    queryKey: ['reports', 'framework', framework],
    queryFn: async (): Promise<Report[]> => {
      const response = await httpClient.get<ApiResponse<Report[]>>(`/api/reports?framework=${framework}`)
      return response.data
    },
    enabled: !!framework,
    staleTime: 5 * 60 * 1000, // 5분
  })
} 