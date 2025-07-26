import { useQuery } from '@tanstack/react-query';
import { fetchCompanyCombined } from '../api/company-combined';
import { CompanyCombinedParams, CompanyCombinedResponse } from '@/shared/types/api';
import { useQueryClient } from '@tanstack/react-query';

// 회사별 조합 검색 Hook
export const useCompanyCombined = (params: CompanyCombinedParams, enabled: boolean = true) => {
  return useQuery<CompanyCombinedResponse, Error>({
    queryKey: ['company-combined', params.company, params.max_results],
    queryFn: () => fetchCompanyCombined(params),
    enabled: enabled && !!params.company, // 회사명이 있고 enabled가 true일 때만 실행
    staleTime: 5 * 60 * 1000, // 5분간 캐시 유지
    refetchOnWindowFocus: false,
    retry: 2, // 실패 시 2번 재시도
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000), // 지수적 백오프
  });
};

// 수동 트리거용 Hook (검색 버튼 클릭 시 사용)
export const useCompanyCombinedLazy = () => {
  const queryClient = useQueryClient();
  
  const searchCompany = async (params: CompanyCombinedParams): Promise<CompanyCombinedResponse> => {
    const result = await queryClient.fetchQuery({
      queryKey: ['company-combined', params.company, params.max_results],
      queryFn: () => fetchCompanyCombined(params),
      staleTime: 5 * 60 * 1000,
    });
    
    return result;
  };
  
  return { searchCompany };
}; 