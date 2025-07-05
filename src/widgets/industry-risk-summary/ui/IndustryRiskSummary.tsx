'use client';

import { useIndustryRiskSummary } from '../model';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/Card';
import { Skeleton } from '@/shared/ui/Skeleton';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/shared/ui/Table';

export function IndustryRiskSummary() {
  const { data: summaryData, isLoading, error } = useIndustryRiskSummary();

  if (isLoading) {
    return <Skeleton className="h-80 w-full" />;
  }

  if (error) {
    return <p className="text-red-500">데이터 로드 실패: {error.message}</p>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>산업별 리스크 요약</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>산업</TableHead>
              <TableHead className="text-right">평균 점수</TableHead>
              <TableHead className="text-right">기업 수</TableHead>
              <TableHead className="text-right">주요 이슈</TableHead>
              <TableHead className="text-right">변동률</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {summaryData?.map((item) => (
              <TableRow key={item.industry}>
                <TableCell className="font-medium">{item.industry}</TableCell>
                <TableCell className="text-right">{item.avgRiskScore.toFixed(2)}</TableCell>
                <TableCell className="text-right">{item.totalCompanies}</TableCell>
                <TableCell className="text-right">{item.criticalIssues}</TableCell>
                <TableCell className="text-right">{item.trend > 0 ? `+${item.trend}` : item.trend}%</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
} 