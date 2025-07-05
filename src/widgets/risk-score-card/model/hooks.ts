import { useQuery } from '@tanstack/react-query';
import { getRiskScoreData, RiskScoreData } from '../api';

export function useRiskScore(companyId: string) {
  return useQuery<RiskScoreData, Error>({
    queryKey: ['riskScore', companyId],
    queryFn: () => getRiskScoreData(companyId),
    enabled: !!companyId, // companyId가 있을 때만 쿼리 실행
  });
}
