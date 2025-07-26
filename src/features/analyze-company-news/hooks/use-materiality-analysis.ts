import { useMutation } from '@tanstack/react-query';
import { fetchMaterialityAnalysis } from '../api/materiality-analysis';
import { MaterialityAnalysisParams, MaterialityAnalysisResponse } from '@/shared/types/api';

// 중대성 분석 실행 Hook (POST 요청이므로 mutation 사용)
export const useMaterialityAnalysis = () => {
  return useMutation<MaterialityAnalysisResponse, Error, MaterialityAnalysisParams>({
    mutationFn: fetchMaterialityAnalysis,
    retry: 1, // 분석 요청은 시간이 오래 걸릴 수 있으므로 재시도 최소화
    retryDelay: 5000, // 5초 후 재시도
  });
};

// 결과 캐싱을 위한 Hook (분석 완료 후 결과를 캐시에서 가져올 때 사용)
export const useCachedMaterialityAnalysis = (
  params: MaterialityAnalysisParams
) => {
  const mutation = useMutation<MaterialityAnalysisResponse, Error, MaterialityAnalysisParams>({
    mutationFn: fetchMaterialityAnalysis,
    retry: false, // 캐시된 결과를 가져올 때는 재시도하지 않음
  });

  return {
    ...mutation,
    execute: () => mutation.mutate(params),
    isExecuting: mutation.isPending,
    result: mutation.data,
    error: mutation.error,
  };
}; 