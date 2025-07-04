'use client';

import { useIndustryComparison } from '../model';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/ui/Card';
import { Skeleton } from '@/shared/ui/Skeleton';
import { RiskScoreCard } from '@/widgets/risk-score-card';

interface IndustryRiskComparisonProps {
  industry: string;
}

export function IndustryRiskComparison({ industry }: IndustryRiskComparisonProps) {
  const { data, isLoading, error } = useIndustryComparison(industry);

  if (isLoading) {
    return <Skeleton className="h-60 w-full" />;
  }

  if (error) {
    return <p className="text-red-500">데이터 로드 실패: {error.message}</p>;
  }

  if (!data) {
    return <p>데이터가 없습니다.</p>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{data.industry} 산업 리스크 비교</CardTitle>
        <CardDescription>
          평균 리스크 점수: {data.avgRiskScore.toFixed(2)}
        </CardDescription>
      </CardHeader>
      <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {data.companies.map((companyRisk) => (
          <RiskScoreCard key={companyRisk.company.id} companyId={companyRisk.company.id} />
        ))}
      </CardContent>
    </Card>
  );
} 