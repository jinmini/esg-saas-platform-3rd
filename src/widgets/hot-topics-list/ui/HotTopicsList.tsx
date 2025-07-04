'use client';

import { useHotTopics } from '../model';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/Card';
import { Skeleton } from '@/shared/ui/Skeleton';
import { Badge } from '@/shared/ui/Badge';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { cn } from '@/shared/lib';

const trendIcon = {
  up: <TrendingUp className="h-4 w-4 text-red-500" />,
  down: <TrendingDown className="h-4 w-4 text-blue-500" />,
  stable: <Minus className="h-4 w-4 text-gray-500" />,
};

export function HotTopicsList() {
  const { data: topics, isLoading, error } = useHotTopics();

  return (
    <Card>
      <CardHeader>
        <CardTitle>핫 토픽</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading &&
          Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-10 w-full mb-2" />
          ))}
        {error && <p className="text-red-500">데이터를 불러오는 중 오류가 발생했습니다.</p>}
        <ul className="space-y-3">
          {topics?.map((topic) => (
            <li key={topic.keyword} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {trendIcon[topic.trend]}
                <span className="font-medium">{topic.keyword}</span>
              </div>
              <Badge variant="secondary">{topic.count} 언급</Badge>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
} 