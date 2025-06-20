// ESG 리스크 대시보드 페이지

'use client';

import { Suspense } from 'react';
import { StatsCards } from '@/components/dashboard/stats-cards';
import { RealtimeFeed } from '@/components/dashboard/realtime-feed';
import { TopCompanies } from '@/components/dashboard/top-companies';
import { ESGRiskChart } from '@/components/dashboard/esg-risk-chart';
import { useDashboardStats, useRiskTrend } from '@/hooks/queries/useDashboard';
import { getDaysAgo, toISODateString, getToday } from '@/lib/utils/date';
import { useRouter } from 'next/navigation';
import { Skeleton } from '@/components/ui/skeleton';
import { Card } from '@/components/ui/card';

function DashboardContent() {
  const router = useRouter();
  const { data: stats, isLoading: statsLoading } = useDashboardStats();
  
  // 30일간의 리스크 추이
  const startDate = toISODateString(getDaysAgo(30));
  const endDate = toISODateString(getToday());
  const { data: riskTrend, isLoading: trendLoading } = useRiskTrend({
    startDate,
    endDate,
    interval: 'daily'
  });

  const handleAnalysisClick = (analysisId: string) => {
    router.push(`/analysis/${analysisId}`);
  };

  const handleCompanyClick = (companyId: string) => {
    router.push(`/companies/${companyId}`);
  };

  const handleViewAllCompanies = () => {
    router.push('/companies');
  };

  return (
    <div className="space-y-6">
      {/* 페이지 헤더 */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">ESG 리스크 대시보드</h1>
        <p className="text-muted-foreground mt-2">
          실시간 ESG 리스크 모니터링 및 분석
        </p>
      </div>

      {/* 통계 카드 */}
      <StatsCards 
        stats={stats} 
        isLoading={statsLoading}
      />

      {/* 차트와 고위험 기업 */}
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <ESGRiskChart
            data={riskTrend || []}
            isLoading={trendLoading}
            interval="daily"
            chartType="area"
          />
        </div>
        
        <div>
          <TopCompanies
            limit={5}
            onCompanyClick={handleCompanyClick}
            onViewAll={handleViewAllCompanies}
          />
        </div>
      </div>

      {/* 실시간 피드와 추가 정보 */}
      <div className="grid gap-6 lg:grid-cols-2">
        <div>
          <h2 className="text-xl font-semibold mb-4">실시간 분석</h2>
          <RealtimeFeed
            limit={10}
            onItemClick={handleAnalysisClick}
          />
        </div>
        
        <div className="space-y-6">
          {/* 오늘의 하이라이트 */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">오늘의 주요 이슈</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">신규 기사</span>
                <span className="font-medium">{stats?.totalArticles || 0}건</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">고위험 알림</span>
                <span className="font-medium text-destructive">{stats?.criticalIssues || 0}건</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">평균 리스크</span>
                <span className="font-medium">{Math.round((stats?.avgRiskScore || 0) * 100)}%</span>
              </div>
            </div>
          </Card>

          {/* 빠른 작업 */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">빠른 작업</h3>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => router.push('/analysis/new')}
                className="p-3 text-sm font-medium text-center rounded-lg border hover:bg-accent transition-colors"
              >
                텍스트 분석
              </button>
              <button
                onClick={() => router.push('/crawler/new')}
                className="p-3 text-sm font-medium text-center rounded-lg border hover:bg-accent transition-colors"
              >
                크롤링 시작
              </button>
              <button
                onClick={() => router.push('/reports')}
                className="p-3 text-sm font-medium text-center rounded-lg border hover:bg-accent transition-colors"
              >
                리포트 생성
              </button>
              <button
                onClick={() => router.push('/settings')}
                className="p-3 text-sm font-medium text-center rounded-lg border hover:bg-accent transition-colors"
              >
                설정
              </button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <Suspense fallback={
      <div className="space-y-6">
        <Skeleton className="h-10 w-64" />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <Card key={i} className="p-6">
              <Skeleton className="h-4 w-24 mb-2" />
              <Skeleton className="h-8 w-20" />
            </Card>
          ))}
        </div>
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <Card className="p-6">
              <Skeleton className="h-[300px]" />
            </Card>
          </div>
          <Card className="p-6">
            <Skeleton className="h-[300px]" />
          </Card>
        </div>
      </div>
    }>
      <DashboardContent />
    </Suspense>
  );
}
