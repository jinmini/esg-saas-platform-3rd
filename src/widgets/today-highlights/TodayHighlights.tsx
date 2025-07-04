'use client';

import { useTodayHighlights } from './model';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/Card';
import { Skeleton } from '@/shared/ui/Skeleton';
import { Badge } from '@/shared/ui/Badge';
import { Check } from 'lucide-react';

export function TodayHighlights() {
  const { data: highlights, isLoading, error } = useTodayHighlights();

  if (isLoading) {
    return <Skeleton className="h-64 w-full" />;
  }

  if (error) {
    return <p>오류: {error.message}</p>;
  }

  if (!highlights) {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>오늘의 주요 이슈</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col items-center justify-center rounded-lg bg-muted p-4">
            <p className="text-2xl font-bold">{highlights.newArticles}</p>
            <p className="text-sm text-muted-foreground">신규 기사</p>
          </div>
          <div className="flex flex-col items-center justify-center rounded-lg bg-muted p-4">
            <p className="text-2xl font-bold text-red-500">
              {highlights.highRiskAlerts}
            </p>
            <p className="text-sm text-muted-foreground">고위험 알림</p>
          </div>
        </div>

        <div>
          <h4 className="font-semibold mb-2">핵심 이슈</h4>
          <div className="rounded-lg border p-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="font-semibold">{highlights.topIssue.title}</p>
                <p className="text-sm text-muted-foreground">
                  {highlights.topIssue.company}
                </p>
              </div>
              <Badge variant={highlights.topIssue.riskScore > 75 ? 'destructive' : 'secondary'}>
                {highlights.topIssue.riskScore}
              </Badge>
            </div>
          </div>
        </div>

        <div>
          <h4 className="font-semibold mb-2">주요 발견사항</h4>
          <ul className="space-y-2">
            {highlights.keyFindings.map((finding, index) => (
              <li key={index} className="flex items-start">
                <Check className="h-4 w-4 mr-2 mt-1 flex-shrink-0 text-green-500" />
                <span>{finding}</span>
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
} 