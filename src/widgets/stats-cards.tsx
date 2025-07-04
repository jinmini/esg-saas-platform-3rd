// 대시보드 통계 카드 컴포넌트

'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/Card';
import { Skeleton } from '@/shared/ui/Skeleton';
import { 
  FileText, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle,
  ArrowUp,
  ArrowDown,
  Minus
} from 'lucide-react';
import { formatRiskScore } from '@/entities/risk';
import { cn } from '@/shared/lib';

interface StatCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon: React.ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  isLoading?: boolean;
}

function StatCard({ 
  title, 
  value, 
  description, 
  icon, 
  trend,
  isLoading 
}: StatCardProps) {
  if (isLoading) {
    return (
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-8 w-8 rounded" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-8 w-20 mb-1" />
          <Skeleton className="h-3 w-32" />
        </CardContent>
      </Card>
    );
  }

  const getTrendIcon = () => {
    if (!trend) return null;
    if (trend.value > 0) return <ArrowUp className="h-3 w-3" />;
    if (trend.value < 0) return <ArrowDown className="h-3 w-3" />;
    return <Minus className="h-3 w-3" />;
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className="text-muted-foreground">{icon}</div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          {description && <span>{description}</span>}
          {trend && (
            <div className={cn(
              "flex items-center gap-1",
              trend.isPositive ? "text-green-600" : "text-red-600"
            )}>
              {getTrendIcon()}
              <span>{Math.abs(trend.value)}%</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

interface StatsCardsProps {
  stats?: {
    totalArticles: number;
    analyzedArticles: number;
    avgRiskScore: number;
    criticalIssues: number;
  };
  previousStats?: {
    totalArticles: number;
    analyzedArticles: number;
    avgRiskScore: number;
    criticalIssues: number;
  };
  isLoading?: boolean;
}

export function StatsCards({ stats, previousStats, isLoading }: StatsCardsProps) {
  const calculateTrend = (current: number, previous?: number) => {
    if (!previous || previous === 0) return undefined;
    const change = ((current - previous) / previous) * 100;
    return {
      value: Math.round(Math.abs(change)),
      isPositive: change > 0,
    };
  };

  const statsConfig = [
    {
      title: '전체 기사',
      value: stats?.totalArticles.toLocaleString() || '0',
      description: '수집된 뉴스 기사',
      icon: <FileText className="h-4 w-4" />,
      trend: previousStats ? calculateTrend(stats?.totalArticles || 0, previousStats.totalArticles) : undefined,
    },
    {
      title: '분석 완료',
      value: stats?.analyzedArticles.toLocaleString() || '0',
      description: `${stats ? Math.round((stats.analyzedArticles / stats.totalArticles) * 100) : 0}% 완료`,
      icon: <CheckCircle className="h-4 w-4" />,
      trend: previousStats ? calculateTrend(stats?.analyzedArticles || 0, previousStats.analyzedArticles) : undefined,
    },
    {
      title: '평균 리스크',
      value: formatRiskScore(stats?.avgRiskScore || 0),
      description: '전체 평균 점수',
      icon: <TrendingUp className="h-4 w-4" />,
      trend: previousStats ? {
        value: Math.round(Math.abs(((stats?.avgRiskScore || 0) - previousStats.avgRiskScore) * 100)),
        isPositive: (stats?.avgRiskScore || 0) < previousStats.avgRiskScore, // 리스크는 낮을수록 좋음
      } : undefined,
    },
    {
      title: '주요 이슈',
      value: stats?.criticalIssues || 0,
      description: '고위험 항목',
      icon: <AlertTriangle className="h-4 w-4" />,
      trend: previousStats ? {
        value: Math.round(Math.abs(((stats?.criticalIssues || 0) - previousStats.criticalIssues) / previousStats.criticalIssues * 100)),
        isPositive: (stats?.criticalIssues || 0) < previousStats.criticalIssues, // 이슈는 적을수록 좋음
      } : undefined,
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {statsConfig.map((stat, index) => (
        <StatCard
          key={index}
          {...stat}
          isLoading={isLoading}
        />
      ))}
    </div>
  );
}
