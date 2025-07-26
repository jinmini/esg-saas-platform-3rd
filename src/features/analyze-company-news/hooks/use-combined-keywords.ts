import { useQuery } from '@tanstack/react-query';
import { fetchCombinedKeywords } from '../api/combined-keywords';
import { CombinedKeywordsParams, CombinedKeywordsResponse } from '@/shared/types/api';

// 조합 키워드 검색 Hook
export const useCombinedKeywords = (params: CombinedKeywordsParams = {}) => {
  return useQuery<CombinedKeywordsResponse, Error>({
    queryKey: ['combined-keywords', params],
    queryFn: () => fetchCombinedKeywords(params),
    staleTime: 5 * 60 * 1000, // 5분간 캐시 유지
    refetchOnWindowFocus: false,
    retry: 2, // 실패 시 2번 재시도
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000), // 지수적 백오프
  });
};

// 자동 리프레시를 위한 Hook (실시간 업데이트용)
export const useCombinedKeywordsWithRefresh = (
  params: CombinedKeywordsParams = {},
  refreshInterval?: number // ms 단위
) => {
  return useQuery<CombinedKeywordsResponse, Error>({
    queryKey: ['combined-keywords-realtime', params],
    queryFn: () => fetchCombinedKeywords(params),
    refetchInterval: refreshInterval || 5 * 60 * 1000, // 기본 5분마다 리프레시
    refetchIntervalInBackground: false,
    staleTime: 1 * 60 * 1000, // 실시간이므로 1분만 캐시 유지
    refetchOnWindowFocus: true,
    retry: 2,
  });
}; 