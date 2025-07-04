// 상위 고위험 기업 컴포넌트

'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/Card';
import { RiskBadge } from '@/shared/ui/RiskBadge';
import { Skeleton } from '@/shared/ui/Skeleton';
import { Button } from '@/shared/ui/Button';
import { ScrollArea } from '@/shared/ui/ScrollArea';
import { 
  Building2, 
  AlertTriangle,
  ChevronRight,
  TrendingUp,
  TrendingDown
} from 'lucide-react';
import { useHighRiskCompanies } from '@/hooks/queries/useCompanies';
import { formatRiskScore, getRiskLevel } from '@/entities/risk';
import { cn } from '@/shared/lib';

interface TopCompaniesProps {
  limit?: number;
  onCompanyClick?: (companyId: string) => void;
  onViewAll?: () => void;
}

export function TopCompanies({ 
  limit = 5, 
  onCompanyClick,
  onViewAll 
}: TopCompaniesProps) {
  const { data: companies, isLoading, error } = useHighRiskCompanies(limit);

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-red-500" />
            고위험 기업
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            데이터를 불러오는 중 오류가 발생했습니다.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <CardTitle className="flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-red-500" />
          고위험 기업
        </CardTitle>
        {onViewAll && (
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onViewAll}
            className="text-xs"
          >
            전체보기
            <ChevronRight className="h-3 w-3 ml-1" />
          </Button>
        )}
      </CardHeader>

      <CardContent>
        <ScrollArea className="h-[400px]">
          <div className="space-y-4">
            {isLoading ? (
              // 스켈레톤 로딩
              [...Array(limit)].map((_, i) => (
                <div key={i} className="flex items-center space-x-4">
                  <Skeleton className="h-12 w-12 rounded-full" />
                  <div className="space-y-2 flex-1">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-3 w-24" />
                  </div>
                  <Skeleton className="h-6 w-16" />
                </div>
              ))
            ) : (
              // 실제 데이터
              companies?.map((companyRisk, index) => {
                const riskLevel = getRiskLevel(companyRisk.riskScore.score);
                const trendIcon = companyRisk.riskScore.trend > 0 
                  ? <TrendingUp className="h-3 w-3" />
                  : companyRisk.riskScore.trend < 0
                  ? <TrendingDown className="h-3 w-3" />
                  : null;

                return (
                  <div
                    key={companyRisk.company.id}
                    className={cn(
                      "flex items-center gap-4 p-3 rounded-lg",
                      "hover:bg-accent cursor-pointer transition-colors",
                      "border-l-4",
                      riskLevel === 'critical' && "border-l-red-500",
                      riskLevel === 'high' && "border-l-orange-500"
                    )}
                    onClick={() => onCompanyClick?.(companyRisk.company.id)}
                  >
                    {/* 순위 */}
                    <div className="text-2xl font-bold text-muted-foreground w-8">
                      {index + 1}
                    </div>

                    {/* 기업 정보 */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <Building2 className="h-4 w-4 text-muted-foreground" />
                        <h4 className="font-medium">{companyRisk.company.name}</h4>
                      </div>
                      <div className="flex items-center gap-4 mt-1">
                        <span className="text-xs text-muted-foreground">
                          {companyRisk.company.industry}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          이슈 {companyRisk.issueCount}건
                        </span>
                      </div>
                      {companyRisk.topIssues.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-2">
                          {companyRisk.topIssues.slice(0, 2).map((issue, idx) => (
                            <RiskBadge key={idx} level="medium" size="sm" className="text-xs">
                              {issue}
                            </RiskBadge>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* 리스크 점수 */}
                    <div className="text-right">
                      <div className="flex items-center gap-2">
                        <div className="text-lg font-bold">
                          {formatRiskScore(companyRisk.riskScore.score)}
                        </div>
                        {trendIcon && (
                          <div className={cn(
                            "flex items-center",
                            companyRisk.riskScore.trend > 0 ? "text-red-500" : "text-green-500"
                          )}>
                            {trendIcon}
                          </div>
                        )}
                      </div>
                      <RiskBadge level={riskLevel} size="sm" />
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
