// 분석 관련 React Query 훅

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { analysisApi } from '@/lib/api';
import { AnalysisFilter, PaginationParams } from '@/shared/types';
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
  sasbCombinedKeywords: 'sasbCombinedKeywords',
  sasbCompanyCombined: 'sasbCompanyCombined',
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

// [MOCK] 기업 분석 조회 (테스트용)
export function useCompanyAnalysisMock(companyName: string) {
  return useQuery({
    queryKey: [QUERY_KEYS.companyAnalyses, companyName],
    queryFn: () => analysisApi.getCompanyAnalysisMock(companyName),
    enabled: !!companyName, // companyName이 있을 때만 쿼리 실행
    staleTime: Infinity, // Mock 데이터이므로 stale 타임 무한 설정
  });
}

// 실제 백엔드 API - 기업 뉴스 분석 조회
export function useCompanyAnalysis(companyName: string) {
  return useQuery({
    queryKey: [QUERY_KEYS.companyAnalyses, 'real', companyName],
    queryFn: () => analysisApi.getCompanyAnalysis(companyName),
    enabled: !!companyName, // companyName이 있을 때만 쿼리 실행
    staleTime: 1000 * 60 * 5, // 5분
    retry: 2, // 실패 시 2번 재시도
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
    onSuccess: () => {
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

// 대시보드 상태 조회
export function useDashboardStatus() {
  return useQuery({
    queryKey: ['dashboardStatus'],
    queryFn: () => analysisApi.getDashboardStatus(),
    staleTime: 1000 * 30, // 30초
    refetchInterval: 1000 * 60, // 1분마다 자동 갱신
    retry: 2,
  });
}

// n8n 구글시트 내보내기
export function useExportToGoogleSheets() {
  return useMutation({
    mutationFn: ({
      companyName,
      analyzedNews,
    }: {
      companyName: string;
      analyzedNews: any[];
    }) => analysisApi.exportToGoogleSheets(companyName, analyzedNews),
    onSuccess: () => {
      toast.success('구글 시트로 내보내기 요청을 성공적으로 보냈습니다.');
    },
    onError: (error: Error) => {
      toast.error(`구글 시트 내보내기 중 오류 발생: ${error.message}`);
    },
  });
}

// 새로운 SASB 조합 키워드 분석 조회
export function useSASBCombinedKeywords(maxResults: number = 100, enabled: boolean = true) {
  return useQuery({
    queryKey: [QUERY_KEYS.sasbCombinedKeywords, maxResults],
    queryFn: () => analysisApi.getSASBCombinedKeywords(maxResults),
    enabled,
    staleTime: 1000 * 60 * 10, // 10분 (산업 뉴스는 자주 바뀌지 않음)
    retry: 2,
  });
}

// 새로운 SASB 회사별 조합 검색 조회
export function useSASBCompanyCombined(company: string, maxResults: number = 100, enabled: boolean = true) {
  return useQuery({
    queryKey: [QUERY_KEYS.sasbCompanyCombined, company, maxResults],
    queryFn: () => analysisApi.getSASBCompanyCombined(company, maxResults),
    enabled: enabled && !!company, // 회사명이 있고 enabled가 true일 때만 실행
    staleTime: 1000 * 60 * 10, // 10분
    retry: 2,
  });
}

/**
 * 기업별 중대성 분석 훅
 */
export function useMaterialityAnalysis(
  companyName: string,
  params: any = {},
  enabled: boolean = false
) {
  return useQuery({
    queryKey: ['materiality-analysis', companyName, params],
    queryFn: () => analysisApi.getMaterialityAnalysis(companyName, params),
    enabled: enabled && !!companyName && companyName !== 'all',
    staleTime: 5 * 60 * 1000, // 5분간 캐시 유지
    retry: 2,
  });
}
