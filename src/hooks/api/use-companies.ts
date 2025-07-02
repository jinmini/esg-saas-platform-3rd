import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { httpClient } from '@/lib/api/http-client'
import { Company, ApiResponse } from '@/types/api'

// 회사 목록 조회
export function useCompanies() {
  return useQuery({
    queryKey: ['companies'],
    queryFn: async (): Promise<Company[]> => {
      const response = await httpClient.get<ApiResponse<Company[]>>('/api/companies')
      return response.data
    },
    staleTime: 5 * 60 * 1000, // 5분
  })
}

// 특정 회사 조회
export function useCompany(id: string) {
  return useQuery({
    queryKey: ['companies', id],
    queryFn: async (): Promise<Company> => {
      const response = await httpClient.get<ApiResponse<Company>>(`/api/companies/${id}`)
      return response.data
    },
    enabled: !!id,
    staleTime: 5 * 60 * 1000, // 5분
  })
}

// 회사 추가 (향후 구현)
export function useCreateCompany() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (companyData: Partial<Company>): Promise<Company> => {
      const response = await httpClient.post<ApiResponse<Company>>('/api/companies', companyData)
      return response.data
    },
    onSuccess: () => {
      // 회사 목록 쿼리 무효화하여 다시 fetching
      queryClient.invalidateQueries({ queryKey: ['companies'] })
    },
  })
}

// 회사 업데이트 (향후 구현)
export function useUpdateCompany() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<Company> }): Promise<Company> => {
      const response = await httpClient.put<ApiResponse<Company>>(`/api/companies/${id}`, data)
      return response.data
    },
    onSuccess: (updatedCompany) => {
      // 특정 회사 쿼리 업데이트
      queryClient.setQueryData(['companies', updatedCompany.id], updatedCompany)
      // 회사 목록 쿼리 무효화
      queryClient.invalidateQueries({ queryKey: ['companies'] })
    },
  })
}

// 회사 삭제 (향후 구현)
export function useDeleteCompany() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (id: string): Promise<void> => {
      await httpClient.delete(`/api/companies/${id}`)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['companies'] })
    },
  })
} 