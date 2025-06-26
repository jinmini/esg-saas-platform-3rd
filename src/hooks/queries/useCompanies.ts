// 기업 관련 React Query 훅

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { companiesApi } from '@/lib/api';
import { PaginationParams } from '@/types';
import { toast } from 'sonner';

// Query Keys
const QUERY_KEYS = {
  companies: 'companies',
  company: 'company',
  companyRiskScore: 'companyRiskScore',
  companyRiskTrend: 'companyRiskTrend',
  highRiskCompanies: 'highRiskCompanies',
  industryComparison: 'industryComparison',
  companyStats: 'companyStats',
} as const;

// 기업 목록 조회
export function useCompanies(params?: PaginationParams & {
  search?: string;
  industry?: string;
}) {
  return useQuery({
    queryKey: [QUERY_KEYS.companies, params],
    queryFn: () => companiesApi.getCompanies(params),
    staleTime: 1000 * 60 * 5, // 5분
  });
}

// 기업 상세 조회
export function useCompany(id: string) {
  return useQuery({
    queryKey: [QUERY_KEYS.company, id],
    queryFn: () => companiesApi.getCompanyById(id),
    enabled: !!id,
    staleTime: 1000 * 60 * 10, // 10분
  });
}

// 기업 리스크 점수 조회
export function useCompanyRiskScore(companyId: string) {
  return useQuery({
    queryKey: [QUERY_KEYS.companyRiskScore, companyId],
    queryFn: () => companiesApi.getCompanyRiskScore(companyId),
    enabled: !!companyId,
    staleTime: 1000 * 60 * 5, // 5분
  });
}

// 기업 리스크 추이 조회
export function useCompanyRiskTrend(
  companyId: string,
  params: {
    startDate: string;
    endDate: string;
    interval?: 'daily' | 'weekly' | 'monthly';
  }
) {
  return useQuery({
    queryKey: [QUERY_KEYS.companyRiskTrend, companyId, params],
    queryFn: () => companiesApi.getCompanyRiskTrend(companyId, params),
    enabled: !!companyId && !!params.startDate && !!params.endDate,
    staleTime: 1000 * 60 * 10, // 10분
  });
}

// 고위험 기업 목록 조회
export function useHighRiskCompanies(limit: number = 10) {
  return useQuery({
    queryKey: [QUERY_KEYS.highRiskCompanies, limit],
    queryFn: () => companiesApi.getHighRiskCompanies(limit),
    staleTime: 1000 * 60 * 5, // 5분
  });
}

// 산업별 비교 조회
export function useIndustryComparison(industry: string) {
  return useQuery({
    queryKey: [QUERY_KEYS.industryComparison, industry],
    queryFn: () => companiesApi.getIndustryComparison(industry),
    enabled: !!industry,
    staleTime: 1000 * 60 * 15, // 15분
  });
}

// 기업 통계 조회
export function useCompanyStats() {
  return useQuery({
    queryKey: [QUERY_KEYS.companyStats],
    queryFn: () => companiesApi.getCompanyStats(),
    staleTime: 1000 * 60 * 10, // 10분
  });
}

// 기업 검색
export function useSearchCompanies(query: string) {
  return useQuery({
    queryKey: [QUERY_KEYS.companies, 'search', query],
    queryFn: () => companiesApi.searchCompanies(query),
    enabled: !!query && query.length >= 2,
    staleTime: 1000 * 60 * 5, // 5분
  });
}

// 기업 생성
export function useCreateCompany() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: companiesApi.createCompany,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.companies] });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.companyStats] });
      toast.success('기업이 추가되었습니다');
    },
    onError: (error: Error) => {
      toast.error(`기업 추가 중 오류가 발생했습니다: ${error.message}`);
    },
  });
}

// 기업 수정
export function useUpdateCompany() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<{ name: string; industry: string; ticker?: string; description?: string; logoUrl?: string }> }) =>
      companiesApi.updateCompany(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.companies] });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.company, variables.id] });
      toast.success('기업 정보가 수정되었습니다');
    },
    onError: (error: Error) => {
      toast.error(`기업 정보 수정 중 오류가 발생했습니다: ${error.message}`);
    },
  });
}

// 기업 삭제
export function useDeleteCompany() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: companiesApi.deleteCompany,
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.companies] });
      queryClient.removeQueries({ queryKey: [QUERY_KEYS.company, id] });
      toast.success('기업이 삭제되었습니다');
    },
    onError: (error: Error) => {
      toast.error(`기업 삭제 중 오류가 발생했습니다: ${error.message}`);
    },
  });
}

// 관심 기업 토글
export function useToggleCompanyWatchlist() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ companyId, isWatched }: { companyId: string; isWatched: boolean }) =>
      companiesApi.toggleCompanyWatchlist(companyId, isWatched),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.company, variables.companyId] });
      toast.success(
        variables.isWatched ? '관심 기업에 추가되었습니다' : '관심 기업에서 제거되었습니다'
      );
    },
    onError: (error: Error) => {
      toast.error(`관심 기업 설정 중 오류가 발생했습니다: ${error.message}`);
    },
  });
}

// ESG 점수 업데이트
export function useUpdateCompanyESGScore() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      companyId,
      scores,
    }: {
      companyId: string;
      scores: { environmental: number; social: number; governance: number };
    }) => companiesApi.updateCompanyESGScore(companyId, scores),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.companyRiskScore, variables.companyId] });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.companyRiskTrend, variables.companyId] });
      toast.success('ESG 점수가 업데이트되었습니다');
    },
    onError: (error: Error) => {
      toast.error(`ESG 점수 업데이트 중 오류가 발생했습니다: ${error.message}`);
    },
  });
}
