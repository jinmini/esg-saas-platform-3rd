// 리스크 스코어 카드 컴포넌트

'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { getRiskLevel, getRiskLevelText, formatRiskScore } from '@/lib/utils/risk';
import { cn } from '@/lib/utils';

interface RiskScoreCardProps {
  companyName: string;
  score: number;
  trend: number;
  category?: string;
  lastUpdated?: string;
  onClick?: () => void;
}

export function RiskScoreCard({
  companyName,
  score,
  trend,
  category,
  lastUpdated,
  onClick,
}: RiskScoreCardProps) {
  const riskLevel = getRiskLevel(score);
  const riskLevelText = getRiskLevelText(riskLevel);
  
  const getTrendIcon = () => {
    if (trend > 0) return <TrendingUp className="h-4 w-4" />;
    if (trend < 0) return <TrendingDown className="h-4 w-4" />;
    return <Minus className="h-4 w-4" />;
  };
  
  const getTrendColor = () => {
    if (trend > 0) return 'text-red-500';
    if (trend < 0) return 'text-green-500';
    return 'text-gray-500';
  };
  
  const getBadgeVariant = () => {
    switch (riskLevel) {
      case 'critical':
        return 'destructive';
      case 'high':
        return 'destructive';
      case 'medium':
        return 'default';
      case 'low':
        return 'secondary';
      default:
        return 'default';
    }
  };

  return (
    <Card 
      className={cn(
        "hover:shadow-lg transition-all duration-200 cursor-pointer",
        onClick && "hover:scale-[1.02]"
      )}
      onClick={onClick}
    >
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium line-clamp-1">
          {companyName}
        </CardTitle>
        <Badge variant={getBadgeVariant() as any}>
          {riskLevelText}
        </Badge>
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
