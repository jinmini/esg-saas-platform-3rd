'use client';

import { useHighRiskCompanies } from '../model';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/Card';
import { Skeleton } from '@/shared/ui/Skeleton';
import { RiskScoreCard } from '@/widgets/risk-score-card';

export function HighRiskCompaniesList() {
  const { data: companies, isLoading, error } = useHighRiskCompanies();

  return (
    <Card>
      <CardHeader>
        <CardTitle>고위험 기업 목록</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {isLoading &&
          Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-28 w-full" />
          ))}
        {error && <p className="text-red-500">데이터를 불러오는 중 오류가 발생했습니다.</p>}
        {companies?.items?.map((company: any) => (
          <RiskScoreCard key={company.company.id} companyId={company.company.id} />
        ))}
      </CardContent>
    </Card>
  );
} 