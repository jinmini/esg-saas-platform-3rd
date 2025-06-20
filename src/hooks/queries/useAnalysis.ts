// 분석 관련 React Query 훅

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { analysisApi } from '@/lib/api';
import { AnalysisFilter, PaginationParams } from '@/types';
import { toast } from 'sonner';

// Query Keys
const QUERY_KEYS = {
  analyses: 'analyses',
  analysis: 'analysis',
  recentAnalyses: 'recentAnalyses',
  highRiskAnalyses: 'highRiskAnalyses',
  analysisStats: 'analysisStats',
  companyAnalyses: 'companyAnalyses',
  sasbAnalyses: 'sasbAnalyses',
} as const;

// 분석 목록 조회
export function useAnalyses(params: PaginationParams & AnalysisFilter) {
  return useQuery({
    queryKey: [QUERY_KEYS.analyses, params],
    queryFn: () => analysisApi.getAnalyses(params),
    staleTime: 1000 * 60 * 5, // 5분
  });
}

// 분석 상세 조회
export function useAnalysis(id: string) {
  return useQuery({
    queryKey: [QUERY_KEYS.analysis, id],
    queryFn: () => analysisApi.getAnalysisById(id),
    enabled: !!id,
    staleTime: 1000 * 60 * 10, // 10분
  });
}

// 최근 분석 조회
export function useRecentAnalyses(limit: number = 10) {
  return useQuery({
    queryKey: [QUERY_KEYS.recentAnalyses, limit],
    queryFn: () => analysisApi.getRecentAnalyses(limit),
    staleTime: 1000 * 60 * 2, // 2분
    refetchInterval: 1000 * 60 * 2, // 2분마다 자동 갱신
  });
}

// 고위험 분석 조회
export function useHighRiskAnalyses(threshold: number = 0.7) {
  return useQuery({
    queryKey: [QUERY_KEYS.highRiskAnalyses, threshold],
    queryFn: () => analysisApi.getHighRiskAnalyses(threshold),
    staleTime: 1000 * 60 * 5, // 5분
  });
}

// 분석 통계 조회
export function useAnalysisStats() {
  return useQuery({
    queryKey: [QUERY_KEYS.analysisStats],
    queryFn: () => analysisApi.getAnalysisStats(),
    staleTime: 1000 * 60 * 10, // 10분
  });
}

// 기업별 분석 조회
export function useCompanyAnalyses(companyId: string, params: PaginationParams) {
  return useQuery({
    queryKey: [QUERY_KEYS.companyAnalyses, companyId, params],
    queryFn: () => analysisApi.getAnalysesByCompany(companyId, params),
    enabled: !!companyId,
    staleTime: 1000 * 60 * 5, // 5분
  });
}

// SASB 카테고리별 분석 조회
export function useSASBAnalyses(category: string, params: PaginationParams) {
  return useQuery({
    queryKey: [QUERY_KEYS.sasbAnalyses, category, params],
    queryFn: () => analysisApi.getAnalysesBySASB(category, params),
    enabled: !!category,
    staleTime: 1000 * 60 * 5, // 5분
  });
}

// 텍스트 분석 요청
export function useAnalyzeText() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (text: string) => analysisApi.analyzeText(text),
    onSuccess: (data) => {
      // 관련 쿼리 무효화
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.analyses] });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.recentAnalyses] });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.analysisStats] });
      
      toast.success('텍스트 분석이 완료되었습니다');
    },
    onError: (error: Error) => {
      toast.error(`분석 중 오류가 발생했습니다: ${error.message}`);
    },
  });
}

// 분석 결과 내보내기
export function useExportAnalyses() {
  return useMutation({
    mutationFn: ({
      format,
      filters,
    }: {
      format: 'csv' | 'excel' | 'pdf';
      filters?: AnalysisFilter;
    }) => analysisApi.exportAnalyses(format, filters),
    onSuccess: (blob, variables) => {
      // 파일 다운로드
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `esg-analysis-${new Date().toISOString()}.${variables.format}`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      
      toast.success('내보내기가 완료되었습니다');
    },
    onError: (error: Error) => {
      toast.error(`내보내기 중 오류가 발생했습니다: ${error.message}`);
    },
  });
}

// 분석 데이터 프리페치
export function usePrefetchAnalysis(id: string) {
  const queryClient = useQueryClient();
  
  return () => {
    queryClient.prefetchQuery({
      queryKey: [QUERY_KEYS.analysis, id],
      queryFn: () => analysisApi.getAnalysisById(id),
      staleTime: 1000 * 60 * 10, // 10분
    });
  };
}
