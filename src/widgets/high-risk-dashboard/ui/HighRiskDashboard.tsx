'use client';

import { useHighRiskAnalyses } from '../model';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/shared/ui/Table';
import { Badge } from '@/shared/ui/Badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/Card';
import { Skeleton } from '@/shared/ui/Skeleton';
import { getRiskLevel } from '@/entities/analysis';

export function HighRiskDashboard() {
  const { data: analyses, isLoading, error } = useHighRiskAnalyses();

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>고위험 분석</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-red-500">데이터를 불러오는 중 오류가 발생했습니다: {error.message}</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>고위험 분석</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>기업</TableHead>
              <TableHead>기사</TableHead>
              <TableHead>위험도 점수</TableHead>
              <TableHead>위험 수준</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading
              ? Array.from({ length: 5 }).map((_, i) => (
                  <TableRow key={i}>
                    <TableCell>
                      <Skeleton className="h-4 w-24" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-4 w-48" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-4 w-16" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-6 w-20" />
                    </TableCell>
                  </TableRow>
                ))
              : analyses?.map(analysis => (
                  <TableRow key={analysis.id}>
                    <TableCell>{analysis.company_name}</TableCell>
                    <TableCell className="max-w-xs truncate">{analysis.article_title}</TableCell>
                    <TableCell>{analysis.risk_score.toFixed(2)}</TableCell>
                    <TableCell>
                      <Badge variant={getRiskLevel(analysis) === 'High' ? 'destructive' : 'default'}>
                        {getRiskLevel(analysis)}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
} 