'use client';

import { useRecentAnalyses } from '@/entities/analysis/model/hooks';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/shared/ui/Card';
import { Button } from '@/shared/ui/Button';
import { Skeleton } from '@/shared/ui/Skeleton';
import Link from 'next/link';

export function RecentAnalysesList() {
  const { data: analyses, isLoading, error } = useRecentAnalyses();

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>최근 분석</CardTitle>
          <CardDescription>최근 분석 목록을 불러오는 중 오류가 발생했습니다.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-red-500">{error.message}</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>최근 분석</CardTitle>
        <CardDescription>최근에 수행된 분석 목록입니다.</CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {isLoading
            ? Array.from({ length: 5 }).map((_, i) => <Skeleton key={i} className="h-12 w-full" />)
            : analyses?.map(analysis => (
                <li key={analysis.id} className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold">{analysis.article_title}</p>
                    <p className="text-sm text-gray-500">
                      {analysis.company_name} - {new Date(analysis.analysis_date).toLocaleDateString()}
                    </p>
                  </div>
                  <Button asChild variant="outline" size="sm">
                    <Link href={`/analysis/${analysis.id}`}>상세 보기</Link>
                  </Button>
                </li>
              ))}
        </ul>
      </CardContent>
    </Card>
  );
} 