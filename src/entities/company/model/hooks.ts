import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import * as companiesApi from '../api'
import { Company, PaginatedResponse, PaginationParams } from '@/shared/types'

// 회사 목록 조회
export function useCompanies(params?: PaginationParams & { search?: string; industry?: string }) {
  const defaultParams = { page: 1, limit: 10, ...params };
  return useQuery<PaginatedResponse<Company>, Error>({
    queryKey: ['companies', defaultParams],
    queryFn: () => companiesApi.getCompanies(defaultParams),
    staleTime: 5 * 60 * 1000, // 5분
  })
}

// 특정 회사 조회
export function useCompany(id: string) {
  return useQuery<Company, Error>({
    queryKey: ['companies', id],
    queryFn: () => companiesApi.getCompanyById(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000, // 5분
  })
}

// 회사 추가 (향후 구현)
export function useCreateCompany() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (companyData: Omit<Company, 'id'>) => companiesApi.createCompany(companyData as any),
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
    mutationFn: ({ id, data }: { id: string; data: Partial<Company> }) =>
      companiesApi.updateCompany(id, data),
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
    mutationFn: companiesApi.deleteCompany,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['companies'] })
    },
  })
}

// 고위험 기업 목록 조회
export function useHighRiskCompanies(limit: number = 10) {
  return useQuery<Company[], Error>({
    queryKey: ['highRiskCompanies', limit],
    queryFn: () => companiesApi.getHighRiskCompanies(limit),
    staleTime: 1000 * 60 * 5, // 5분
  })
} 