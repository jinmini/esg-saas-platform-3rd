import { useQuery, useMutation } from '@tanstack/react-query'
import { analyzeCompanyNews } from '@/features/analyze-company-news/api'
import { NewsAnalysisParams, NewsAnalysisResponse } from '@/shared/types/api'
import { apiClient } from '@/shared/api/client'

// 뉴스 서비스 객체
export const newsService = {
  analyzeCompanyNews,
  checkApiStatus: async () => {
    return apiClient.get<{ status: string }>('/news/status')
  }
}

// 회사 뉴스 분석 조회
export function useCompanyNewsAnalysis(params: NewsAnalysisParams) {
  return useQuery<NewsAnalysisResponse>({
    queryKey: ['news', 'analysis', params],
    queryFn: () => newsService.analyzeCompanyNews(params),
    enabled: !!params.company,
    staleTime: 5 * 60 * 1000, // 5분
  })
}

// 회사 뉴스 분석 실행 (mutation)
export function useAnalyzeCompanyNews() {
  return useMutation({
    mutationFn: (params: NewsAnalysisParams) => newsService.analyzeCompanyNews(params),
  })
}

// API 상태 확인
export function useNewsApiStatus() {
  return useQuery({
    queryKey: ['news', 'status'],
    queryFn: () => newsService.checkApiStatus(),
    refetchInterval: 30000, // 30초마다 확인
  })
}

// 뉴스 분석 (별칭)
export const useNewsAnalysis = useCompanyNewsAnalysis; 