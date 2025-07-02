import { useQuery, useMutation } from '@tanstack/react-query'
import { newsService } from '@/lib/api/news-service'
import { NewsAnalysisParams } from '@/types/api'

// 회사 뉴스 분석 조회
export function useNewsAnalysis(params: NewsAnalysisParams) {
  return useQuery({
    queryKey: ['news-analysis', params.company, params.period, params.start, params.display],
    queryFn: () => newsService.analyzeCompanyNews(params),
    enabled: !!params.company, // 회사명이 있을 때만 실행
    staleTime: 10 * 60 * 1000, // 10분 (뉴스 데이터는 자주 변경되지 않음)
    retry: 2, // 실패 시 2번 재시도
  })
}

// 회사 뉴스 분석 수동 실행
export function useAnalyzeNews() {
  return useMutation({
    mutationFn: (params: NewsAnalysisParams) => newsService.analyzeCompanyNews(params),
  })
}

// API 상태 확인
export function useNewsApiStatus() {
  return useQuery({
    queryKey: ['news-api-status'],
    queryFn: () => newsService.checkApiStatus(),
    staleTime: 2 * 60 * 1000, // 2분
    refetchInterval: 5 * 60 * 1000, // 5분마다 자동 재확인
  })
} 