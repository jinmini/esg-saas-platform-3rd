'use client';

import { useWatchlistStatus } from './model';
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
import { RiskBadge } from '@/shared/ui/RiskBadge';
import { getRiskLevel } from '@/entities/risk';

export function WatchlistStatus() {
  const { data: companies, isLoading, error } = useWatchlistStatus();

  if (isLoading) {
    return <Skeleton className="h-80 w-full" />;
  }

  if (error) {
    return <p>오류: {error.message}</p>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>워치리스트 현황</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>회사명</TableHead>
              <TableHead>산업</TableHead>
              <TableHead className="text-right">리스크 점수</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {companies?.map((companyRisk) => (
              <TableRow key={companyRisk.company.id}>
                <TableCell className="font-medium">{companyRisk.company.name}</TableCell>
                <TableCell>{companyRisk.company.industry}</TableCell>
                <TableCell className="text-right">
                  <RiskBadge level={getRiskLevel(companyRisk.riskScore.score)} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
} 