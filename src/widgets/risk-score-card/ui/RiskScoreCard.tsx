// 리스크 스코어 카드 컴포넌트

'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/Card';
import { RiskBadge } from '@/shared/ui/RiskBadge';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { getRiskLevel, formatRiskScore } from '@/entities/risk';
import { cn } from '@/shared/lib';
import { useRiskScore } from '../model';
import { Skeleton } from '@/shared/ui/Skeleton';
import { Alert, AlertDescription, AlertTitle } from '@/shared/ui/Alert';
import { AlertCircle } from 'lucide-react';

export interface RiskScoreCardProps {
  companyId: string;
  onClick?: (companyId: string) => void;
}

export function RiskScoreCard({
  companyId,
  onClick,
}: RiskScoreCardProps) {
  const { data: scoreData, isLoading, error } = useRiskScore(companyId);

  if (isLoading) {
    return <Skeleton className="h-[124px] w-full" />;
  }

  if (error) {
    return (
      <Card className="flex items-center justify-center h-[124px]">
        <Alert variant="destructive" className="w-auto">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>오류</AlertTitle>
          <AlertDescription>데이터를 불러올 수 없습니다.</AlertDescription>
        </Alert>
      </Card>
    )
  }

  if (!scoreData) {
    return null;
  }
  
  const { companyName, score, trend, category, lastUpdated } = scoreData;
  const riskLevel = getRiskLevel(score);

  const getTrendIcon = () => {
    if (trend > 0) return <TrendingUp className="h-4 w-4" />;
    if (trend < 0) return <TrendingDown className="h-4 w-4" />;
    return <Minus className="h-4 w-4" />;
  };

  const getTrendColor = () => {
    if (trend > 0) return "text-red-500"; // 리스크 증가는 나쁨
    if (trend < 0) return "text-green-500"; // 리스크 감소는 좋음
    return "text-gray-500";
  };

  return (
    <Card 
      className={cn(
        "hover:shadow-lg transition-all duration-200",
        onClick && "cursor-pointer hover:scale-[1.02]"
      )}
      onClick={() => onClick?.(companyId)}
    >
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium line-clamp-1">
          {companyName}
        </CardTitle>
        <RiskBadge level={riskLevel} />
      </CardHeader>
      <CardContent>
        <div className="flex items-baseline justify-between">
          <div>
            <div className="text-2xl font-bold">
              {formatRiskScore(score)}
            </div>
            {category && (
              <p className="text-xs text-muted-foreground mt-1">
                {category}
              </p>
            )}
          </div>
          
          <div className={cn("flex items-center gap-1", getTrendColor())}>
            {getTrendIcon()}
            <span className="text-sm font-medium">
              {Math.abs(trend)}%
            </span>
          </div>
        </div>
        
        {lastUpdated && (
          <p className="text-xs text-muted-foreground mt-2">
            업데이트: {lastUpdated}
          </p>
        )}
      </CardContent>
    </Card>
  );
} 