// ESG 뉴스 크롤링 및 분석 페이지

'use client';

import { useState } from 'react';
import { useCompanyAnalysisMock } from '@/hooks/queries/useAnalysis';
import { AnalysisForm } from '@/components/dashboard/forms/analysis-form';
import { ESGRiskChart } from '@/components/dashboard/widgets/esg-risk-chart';
import { RealtimeFeed } from '@/components/dashboard/widgets/realtime-feed';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/Card';
import { Alert, AlertDescription, AlertTitle } from '@/shared/ui/Alert';
import { Terminal } from 'lucide-react';
import { Skeleton } from '@/shared/ui/Skeleton';

export default function CrawlerPage() {
  const [companyToAnalyze, setCompanyToAnalyze] = useState<string>('');

  const { data: analysisResult, isLoading, isError, error } = useCompanyAnalysisMock(companyToAnalyze);

  const handleAnalyze = (companyName: string) => {
    setCompanyToAnalyze(companyName);
  };

  const renderContent = () => {
    if (isLoading) {
      return <CrawlerSkeleton />;
    }

    if (isError) {
      return (
        <Alert variant="destructive">
          <Terminal className="h-4 w-4" />
          <AlertTitle>오류 발생</AlertTitle>
          <AlertDescription>
            데이터를 불러오는 중 문제가 발생했습니다: {error.message}
          </AlertDescription>
        </Alert>
      );
    }

    if (!analysisResult) {
       return (
        <div className="text-center py-10">
          <p className="text-muted-foreground">분석할 회사를 입력하고 '분석' 버튼을 눌러주세요.</p>
        </div>
      );
    }

    const { analysis_summary, analyzed_news } = analysisResult;
    
    // ESG Risk Chart에 맞는 데이터 형태로 변환
    const chartData = Object.entries(analysis_summary.esg_distribution).map(([key, value]) => ({
      name: key,
      value: value,
    }));

    return (
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <ESGRiskChart
            data={chartData}
            isLoading={false}
            chartType="pie"
          />
        </div>
        
        <div className="lg:col-span-1">
          <Card>
             <CardHeader>
              <CardTitle>종합 감성 분석</CardTitle>
            </CardHeader>
            <CardContent>
              {/* 여기에 감성 분석 차트 추가 예정 */}
              <pre className="text-sm p-4 bg-gray-100 rounded-md">
                {JSON.stringify(analysis_summary.sentiment_distribution, null, 2)}
              </pre>
            </CardContent>
          </Card>
        </div>
        
        <div className="lg:col-span-3">
          <RealtimeFeed
            newsItems={analyzed_news}
            isLoading={false}
          />
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">ESG 뉴스 크롤링 & 분석</h1>
        <p className="text-muted-foreground mt-2">
          기업의 ESG 관련 뉴스를 실시간으로 크롤링하고 AI 분석을 수행합니다.
        </p>
      </div>

      <AnalysisForm onAnalyze={handleAnalyze} isLoading={isLoading} />
      
      <div className="mt-6">
        {renderContent()}
      </div>
    </div>
  );
}

function CrawlerSkeleton() {
  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <div className="lg:col-span-2">
        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-1/2" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-64 w-full" />
          </CardContent>
        </Card>
      </div>
      <div className="lg:col-span-1">
        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-3/4" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-64 w-full" />
          </CardContent>
        </Card>
      </div>
      <div className="lg:col-span-3">
        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-1/4" />
          </CardHeader>
          <CardContent className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <Skeleton key={i} className="h-16 w-full" />
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 