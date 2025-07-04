import { useQuery } from '@tanstack/react-query';
import { getIndustryComparison } from '../api';
import { CompanyRisk } from '@/shared/types';

export interface IndustryComparisonData {
  industry: string;
  avgRiskScore: number;
  companies: CompanyRisk[];
}

export function useIndustryComparison(industry: string) {
  return useQuery<IndustryComparisonData, Error>({
    queryKey: ['industryComparison', industry],
    queryFn: () => getIndustryComparison(industry),
    enabled: !!industry,
  });
} 