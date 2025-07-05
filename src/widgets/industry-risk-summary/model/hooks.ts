import { useQuery } from '@tanstack/react-query';
import { getIndustryRiskSummary } from '../api';

export interface IndustryRiskSummary {
  industry: string;
  avgRiskScore: number;
  totalCompanies: number;
  criticalIssues: number;
  trend: number;
}

export function useIndustryRiskSummary() {
  return useQuery<IndustryRiskSummary[], Error>({
    queryKey: ['industryRiskSummary'],
    queryFn: async () => {
      const response = await getIndustryRiskSummary();
      return response.items;
    },
  });
} 