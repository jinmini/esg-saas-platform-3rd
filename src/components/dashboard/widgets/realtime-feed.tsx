// 실시간 분석 피드 컴포넌트

'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { ScrollArea } from '@/components/ui/scroll-area';
import { formatTimeAgo } from '@/lib/utils/date';
import { getRiskLevel, formatRiskScore } from '@/lib/utils/risk';
import { useRecentAnalyses } from '@/hooks/queries/useAnalysis';
import { AlertCircle, Building2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface RealtimeFeedProps {
  limit?: number;
  onItemClick?: (analysisId: string) => void;
}

export function RealtimeFeed({ limit = 10, onItemClick }: RealtimeFeedProps) {
  const { data: analyses, isLoading, error } = useRecentAnalyses(limit);

  if (error) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center h-64">
          <div className="text-center">
            <AlertCircle className="h-8 w-8 text-destructive mx-auto mb-2" />
            <p className="text-sm text-muted-foreground">
              데이터를 불러오는 중 오류가 발생했습니다
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold">실시간 분석</CardTitle>
          <Badge variant="secondary" className="animate-pulse">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-2" />
            실시간
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-[500px]">
          <div className="space-y-3 p-4">
            {isLoading ? (
              // 스켈레톤 로딩
              [...Array(5)].map((_, i) => (
                <Card key={i} className="p-4">
                  <Skeleton className="h-4 w-3/4 mb-2" />
                  <Skeleton className="h-3 w-1/2" />
                </Card>
              ))
            ) : (
              // 실제 데이터
              analyses?.map((analysis) => {
                const riskLevel = getRiskLevel(analysis.overallRiskScore);
                
                return (
                  <Card
                    key={analysis.id}
                    className={cn(
                      "p-4 hover:shadow-md transition-all cursor-pointer",
                      "border-l-4",
                      riskLevel === 'critical' && "border-l-red-500",
                      riskLevel === 'high' && "border-l-orange-500",
                      riskLevel === 'medium' && "border-l-yellow-500",
                      riskLevel === 'low' && "border-l-green-500"
                    )}
                    onClick={() => onItemClick?.(analysis.id)}
                  >
                    <div className="space-y-2">
                      {/* 헤더 */}
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="font-medium text-sm line-clamp-2 flex-1">
                          {analysis.title}
                        </h4>
                        <Badge
                          variant={
                            riskLevel === 'critical' || riskLevel === 'high'
                              ? 'destructive'
                              : riskLevel === 'medium'
                              ? 'default'
                              : 'secondary'
                          }
                          className="ml-2 shrink-0"
                        >
                          {formatRiskScore(analysis.overallRiskScore)}
                        </Badge>
                      </div>

                      {/* 메타 정보 */}
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        {analysis.primaryCompany && (
                          <div className="flex items-center gap-1">
                            <Building2 className="h-3 w-3" />
                            <span>{analysis.primaryCompany}</span>
                          </div>
                        )}
                        <span>{formatTimeAgo(analysis.analyzedAt)}</span>
                      </div>

                      {/* SASB 카테고리 */}
                      <div className="flex flex-wrap gap-1">
                        {analysis.sasbClassifications.slice(0, 3).map((classification, idx) => (
                          <Badge
                            key={idx}
                            variant="outline"
                            className="text-xs"
                          >
                            {classification.category}
                          </Badge>
                        ))}
                        {analysis.sasbClassifications.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{analysis.sasbClassifications.length - 3}
                          </Badge>
                        )}
                      </div>

                      {/* 감성 분석 */}
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-muted-foreground">감성:</span>
                        <Badge
                          variant={
                            analysis.sentiment.sentiment === '부정'
                              ? 'destructive'
                              : analysis.sentiment.sentiment === '긍정'
                              ? 'default'
                              : 'secondary'
                          }
                          className="text-xs"
                        >
                          {analysis.sentiment.sentiment}
                        </Badge>
                      </div>
                    </div>
                  </Card>
                );
              })
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
