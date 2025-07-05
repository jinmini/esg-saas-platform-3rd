// ESG 뉴스 크롤링 및 분석 페이지

'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Input } from '@/shared/ui/Input';
import { Button } from '@/shared/ui/Button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/ui/Card';
import { AnalysisResult } from '@/entities/analysis';
import { Skeleton } from '@/shared/ui/Skeleton';

// 모의 API 호출을 흉내 내는 함수
const fetchCompanyAnalysisMock = async (companyName: string): Promise<AnalysisResult> => {
  console.log(`Fetching mock analysis for: ${companyName}`);
  // 실제 API 호출 대신, 딜레이를 주어 비동기 동작을 시뮬레이션합니다.
  await new Promise(resolve => setTimeout(resolve, 500));
  
  if (!companyName || companyName.trim() === '') {
    throw new Error('Company name is required');
  }

  return {
    id: `mock-${Date.now()}`,
    company_name: companyName,
    article_id: 'mock-article-123',
    article_title: `${companyName}, 지속가능경영 보고서 발간`,
    article_content: `${companyName}는 최근 ESG 경영 성과를 담은 지속가능경영 보고서를 발간했다고 밝혔다. 보고서에 따르면...`,
    analysis_date: new Date().toISOString(),
    risk_score: Math.floor(Math.random() * 80) + 10, // 10 ~ 90
    sentiment: ['positive', 'negative', 'neutral'][Math.floor(Math.random() * 3)] as 'positive' | 'negative' | 'neutral',
    esg_topics: ['지배구조', '환경', '사회'].sort(() => 0.5 - Math.random()).slice(0, 2),
    summary: `${companyName}의 ESG 활동은 긍정적으로 평가되나, 일부 환경 규제 관련 리스크가 존재합니다.`,
  };
};

// 페이지 내에서 사용할 간단한 모의 훅
const useCompanyAnalysisMock = (companyName: string) => {
  return useQuery({
    queryKey: ['companyAnalysisMock', companyName],
    queryFn: () => fetchCompanyAnalysisMock(companyName),
    enabled: !!companyName,
    staleTime: Infinity,
    retry: false,
  });
};

export default function CrawlerTestPage() {
  const [companyName, setCompanyName] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const { data: analysis, error, isFetching } = useCompanyAnalysisMock(searchTerm);

  const handleSearch = () => {
    setSearchTerm(companyName);
  };

  return (
    <div className="container mx-auto p-4 space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">크롤러 및 분석 API 테스트</h1>
        <p className="text-muted-foreground">
          이 페이지는 크롤링 및 분석 API의 모의(Mock) 테스트를 위한 페이지입니다.
        </p>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>기업 분석 테스트</CardTitle>
          <CardDescription>
            기업 이름을 입력하고 분석 시작 버튼을 누르면 모의(Mock) 분석 결과를 반환합니다.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex gap-2">
          <Input
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            placeholder="기업 이름 입력 (예: 삼성전자)"
          />
          <Button onClick={handleSearch} disabled={isFetching}>
            {isFetching ? '분석 중...' : '분석 시작'}
          </Button>
        </CardContent>
      </Card>

      {isFetching && (
        <Card>
          <CardHeader>
             <Skeleton className="h-6 w-1/2" />
          </CardHeader>
          <CardContent className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </CardContent>
        </Card>
      )}

      {error && !isFetching && <p className="text-red-500">오류: {(error as Error).message}</p>}
      
      {analysis && !isFetching && (
        <Card>
          <CardHeader>
            <CardTitle>{analysis.company_name} 분석 결과</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <p><strong>기사 제목:</strong> {analysis.article_title}</p>
            <p><strong>분석 요약:</strong> {analysis.summary}</p>
            <p><strong>위험도 점수:</strong> {analysis.risk_score}</p>
            <p><strong>감성 분석:</strong> {analysis.sentiment}</p>
            <p><strong>ESG 토픽:</strong> {analysis.esg_topics.join(', ')}</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
} 