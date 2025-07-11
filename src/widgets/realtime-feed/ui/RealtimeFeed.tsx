// 실시간 분석 피드 컴포넌트

'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/Card';
import { Badge } from '@/shared/ui/Badge';
import { Skeleton } from '@/shared/ui/Skeleton';
import { ScrollArea } from '@/shared/ui/ScrollArea';
import { formatTimeAgo, cn } from '@/shared/lib';
import { useRealtimeFeed } from '../model';
import { Alert, AlertDescription, AlertTitle } from '@/shared/ui/Alert';
import { AlertCircle } from 'lucide-react';



const sentimentBorderColor: Record<string, string> = {
  '긍정': 'border-l-blue-500',
  '부정': 'border-l-red-500',
  '중립': 'border-l-gray-400',
};

const esgCategoryBadgeColor: Record<string, string> = {
    '환경(E)': 'bg-green-100 text-green-800',
    '사회(S)': 'bg-blue-100 text-blue-800',
    '지배구조(G)': 'bg-purple-100 text-purple-800',
}

export function RealtimeFeed() {
  const { data: newsItems, isLoading, error } = useRealtimeFeed();

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>분석 뉴스 피드</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 p-4">
          {[...Array(5)].map((_, i) => (
            <Skeleton key={i} className="h-24 w-full" />
          ))}
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>분석 뉴스 피드</CardTitle>
        </CardHeader>
        <CardContent>
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error.message}</AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>분석 뉴스 피드</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-[400px]">
          <div className="space-y-4 p-4">
            {newsItems?.map((item, index) => (
              <Card 
                key={index}
                className={cn(
                  "p-4 border-l-4 hover:bg-gray-50 transition-colors",
                  sentimentBorderColor[item.sentiment_analysis.sentiment] || 'border-l-gray-300'
                )}
              >
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-semibold text-base line-clamp-2 pr-4">
                    {item.news_item.title}
                  </h4>
                  <Badge className={cn("whitespace-nowrap", esgCategoryBadgeColor[item.esg_classification.esg_category])}>
                    {item.esg_classification.esg_category}
                  </Badge>
                </div>

                <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                  {item.news_item.description}
                </p>

                <div className="flex justify-between items-center text-xs text-muted-foreground">
                  <span>{formatTimeAgo(item.news_item.pub_date)}</span>
                  <div className="flex items-center gap-2">
                     <span>신뢰도:</span>
                     <span className="font-medium text-gray-800">
                        {Math.round(item.esg_classification.confidence_score * 100)}%
                    </span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
} 