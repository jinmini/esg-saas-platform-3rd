// 상위 고위험 기업 컴포넌트

'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/Card';
import { Badge } from '@/shared/ui/Badge';
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
import { formatRiskScore, getRiskLevel, getRiskLevelText, cn } from '@/shared/lib';

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
        <CardContent className="flex items-center justify-center h-64">
          <div className="text-center">
            <AlertTriangle className="h-8 w-8 text-destructive mx-auto mb-2" />
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
          <CardTitle className="text-lg font-semibold">고위험 기업</CardTitle>
          {onViewAll && (
            <Button variant="ghost" size="sm" onClick={onViewAll}>
              전체보기
              <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          )}
        </div>
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
                    <div className="flex-1">
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
                            <Badge key={idx} variant="outline" className="text-xs">
                              {issue}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* 리스크 점수 */}
                    <div className="text-right">
                      <div className="flex items-center gap-2">
                        <Badge 
                          variant={
                            riskLevel === 'critical' || riskLevel === 'high'
                              ? 'destructive'
                              : 'default'
                          }
                        >
                          {formatRiskScore(companyRisk.riskScore.score)}
                        </Badge>
                        {trendIcon && (
                          <div className={cn(
                            "flex items-center gap-1 text-xs",
                            companyRisk.riskScore.trend > 0 
                              ? "text-red-500" 
                              : "text-green-500"
                          )}>
                            {trendIcon}
                            <span>{Math.abs(companyRisk.riskScore.trend)}%</span>
                          </div>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        {getRiskLevelText(riskLevel)}
                      </p>
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
