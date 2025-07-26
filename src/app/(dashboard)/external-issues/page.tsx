// ESG 외부 이슈 분석 페이지 - 조합 키워드 검색

'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/ui/Card';
import { Skeleton } from '@/shared/ui/Skeleton';
import { Badge } from '@/shared/ui/Badge';
import { Button } from '@/shared/ui/Button';
import { Input } from '@/shared/ui/Input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/ui/Select';
import { ExternalLink, RefreshCw, TrendingUp, Search, Building2 } from 'lucide-react';
import { useCombinedKeywords } from '@/features/analyze-company-news/hooks/use-combined-keywords';
import { useCompanyCombined } from '@/features/analyze-company-news/hooks/use-company-combined';
import { CombinedKeywordArticle, SUPPORTED_COMPANIES } from '@/shared/types/api';

// 감정 분석 결과에 따른 배지 스타일
const getSentimentBadge = (sentiment: string, confidence: number) => {
  const variants = {
    '긍정': 'bg-green-100 text-green-800 border-green-200',
    '부정': 'bg-red-100 text-red-800 border-red-200',
    '중립': 'bg-gray-100 text-gray-800 border-gray-200',
  };
  
  return (
    <Badge className={variants[sentiment as keyof typeof variants] || variants['중립']}>
      {sentiment} ({Math.round(confidence * 100)}%)
    </Badge>
  );
};

// 기사 카드 컴포넌트
const ArticleCard = ({ 
  article, 
  isCompanyMode = false, 
  companyName = '' 
}: { 
  article: CombinedKeywordArticle;
  isCompanyMode?: boolean;
  companyName?: string;
}) => {
  // 회사별 검색 모드에서는 해당 회사명을 키워드에서 제거
  const getFilteredKeywords = (keywords: string[] | undefined) => {
    if (!keywords || !isCompanyMode || !companyName) return keywords;
    
    return keywords.filter(keyword => 
      keyword.toLowerCase() !== companyName.toLowerCase()
    );
  };

  const filteredKeywords = getFilteredKeywords(article.matched_keywords);

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start gap-3">
          <CardTitle className="text-base leading-tight line-clamp-2">
            {article.title}
          </CardTitle>
          {getSentimentBadge(article.sentiment.sentiment, article.sentiment.confidence)}
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <p className="text-sm text-muted-foreground mb-3 line-clamp-3">
          {article.description}
        </p>
        <div className="flex justify-between items-center">
          <div className="text-xs text-muted-foreground max-w-[60%]">
            {filteredKeywords && filteredKeywords.length > 0 ? (
              <span>
                <strong>검색 키워드:</strong> {filteredKeywords.join(', ')}
              </span>
            ) : (
              <span>
                분석 방법: {article.sentiment.analysis_method === 'keyword_based' ? '키워드 기반' : 'ML 기반'}
              </span>
            )}
          </div>
          <Button variant="outline" size="sm" asChild>
            <a href={article.link} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="h-3 w-3 mr-1" />
              원문 보기
            </a>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default function ExternalIssuesPage() {
  const [maxResults, setMaxResults] = useState<string>('100');
  const [searchMode, setSearchMode] = useState<'general' | 'company'>('general');
  const [selectedCompany, setSelectedCompany] = useState<string>('');
  const [searchTriggered, setSearchTriggered] = useState(false);
  
  // 일반 조합 키워드 검색 (첫 화면)
  const { 
    data: generalData, 
    error: generalError, 
    isLoading: generalLoading, 
    refetch: refetchGeneral 
  } = useCombinedKeywords({ 
    max_results: parseInt(maxResults) || 100 
  });

  // 회사별 검색
  const { 
    data: companyData, 
    error: companyError, 
    isLoading: companyLoading, 
    refetch: refetchCompany 
  } = useCompanyCombined(
    { 
      company: selectedCompany, 
      max_results: parseInt(maxResults) || 100 
    },
    searchMode === 'company' && searchTriggered && !!selectedCompany
  );

  // 현재 표시할 데이터 결정
  const currentData = searchMode === 'company' && searchTriggered ? companyData : generalData;
  const currentError = searchMode === 'company' && searchTriggered ? companyError : generalError;
  const currentLoading = searchMode === 'company' && searchTriggered ? companyLoading : generalLoading;

  const handleRefresh = () => {
    if (searchMode === 'company' && searchTriggered) {
      refetchCompany();
    } else {
      refetchGeneral();
    }
  };

  const handleMaxResultsChange = (value: string) => {
    setMaxResults(value);
    if (value && !isNaN(parseInt(value))) {
      if (searchMode === 'company' && searchTriggered) {
        refetchCompany();
      } else {
        refetchGeneral();
      }
    }
  };

  const handleCompanySearch = () => {
    if (selectedCompany) {
      setSearchMode('company');
      setSearchTriggered(true);
    }
  };

  const handleBackToGeneral = () => {
    setSearchMode('general');
    setSearchTriggered(false);
    setSelectedCompany('');
  };

  return (
    <div className="container mx-auto p-4 space-y-6">
      {/* 헤더 섹션 */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <TrendingUp className="h-8 w-8 text-blue-600" />
          외부 이슈 분석
        </h1>
        <p className="text-muted-foreground">
          {searchMode === 'company' && searchTriggered 
            ? `"${selectedCompany}" 회사의 ESG 관련 뉴스를 분석합니다.`
            : '산업별 SASB 이슈 키워드 조합으로 관련성 높은 ESG 뉴스를 실시간 분석합니다.'
          }
        </p>
      </div>

      {/* 검색 모드 전환 및 컨트롤 패널 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            검색 설정
          </CardTitle>
          <CardDescription>
            전체 이슈 분석 또는 특정 회사 검색을 선택할 수 있습니다.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* 검색 모드 선택 */}
          <div className="flex gap-2">
            <Button 
              variant={searchMode === 'general' ? 'default' : 'outline'}
              onClick={handleBackToGeneral}
              className="flex-1"
            >
              <TrendingUp className="h-4 w-4 mr-2" />
              전체 이슈 분석
            </Button>
            <Button 
              variant={searchMode === 'company' ? 'default' : 'outline'}
              onClick={() => setSearchMode('company')}
              className="flex-1"
            >
              <Building2 className="h-4 w-4 mr-2" />
              회사별 검색
            </Button>
          </div>

          {/* 회사 검색 섹션 */}
          {searchMode === 'company' && (
            <div className="space-y-3 p-4 bg-gray-50 rounded-lg">
              <div className="flex gap-3 items-end">
                <div className="flex-1">
                  <label className="text-sm font-medium mb-1 block">회사 선택</label>
                  <Select value={selectedCompany} onValueChange={setSelectedCompany}>
                    <SelectTrigger>
                      <SelectValue placeholder="회사를 선택하세요" />
                    </SelectTrigger>
                    <SelectContent>
                      {SUPPORTED_COMPANIES.map((company) => (
                        <SelectItem key={company} value={company}>
                          {company}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <Button 
                  onClick={handleCompanySearch} 
                  disabled={!selectedCompany || companyLoading}
                >
                  <Search className="h-4 w-4 mr-2" />
                  검색
                </Button>
              </div>
              
              <div className="text-xs text-muted-foreground">
                <strong>MVP 단계:</strong> 현재 {SUPPORTED_COMPANIES.join(', ')} 회사만 지원됩니다.
              </div>
            </div>
          )}

          {/* 공통 설정 */}
          <div className="flex gap-3 items-end">
            <div className="flex-1">
              <label className="text-sm font-medium mb-1 block">최대 결과 수</label>
              <Input
                type="number"
                value={maxResults}
                onChange={(e) => handleMaxResultsChange(e.target.value)}
                placeholder="100"
                min="1"
                max="500"
                className="w-32"
              />
            </div>
            <Button onClick={handleRefresh} disabled={currentLoading}>
              <RefreshCw className={`h-4 w-4 mr-2 ${currentLoading ? 'animate-spin' : ''}`} />
              새로고침
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* 분석 결과 요약 */}
      {currentData && !currentLoading && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              분석 결과 요약
              {searchMode === 'company' && searchTriggered && (
                <Badge variant="outline" className="ml-2">
                  <Building2 className="h-3 w-3 mr-1" />
                  {selectedCompany}
                </Badge>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">
                  {currentData.total_articles_found}
                </div>
                <div className="text-sm text-muted-foreground">총 발견 기사</div>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">
                  {currentData.searched_keywords.length}
                </div>
                <div className="text-sm text-muted-foreground">검색 키워드 조합</div>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">
                  {currentData.status === 'completed' ? '완료' : '진행중'}
                </div>
                <div className="text-sm text-muted-foreground">분석 상태</div>
              </div>
            </div>
            
            {/* 검색 키워드 표시 */}
            <div className="mt-4">
              <h4 className="text-sm font-medium mb-2">활용된 조합 키워드:</h4>
              <div className="flex flex-wrap gap-2">
                {currentData.searched_keywords.map((keyword, index) => (
                  <Badge key={index} variant="outline">
                    {keyword}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* 로딩 상태 */}
      {currentLoading && (
        <div className="space-y-4">
          <Skeleton className="h-32 w-full" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[...Array(6)].map((_, i) => (
              <Skeleton key={i} className="h-48 w-full" />
            ))}
          </div>
        </div>
      )}

      {/* 에러 상태 */}
      {currentError && !currentLoading && (
        <Card className="border-red-200 bg-red-50">
          <CardHeader>
            <CardTitle className="text-red-600">오류 발생</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-red-700 mb-3">{currentError.message}</p>
            <Button onClick={handleRefresh} variant="outline">
              다시 시도
            </Button>
          </CardContent>
        </Card>
      )}

      {/* 분석된 기사 목록 */}
      {currentData?.analyzed_articles && currentData.analyzed_articles.length > 0 && !currentLoading && (
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">
            분석된 기사 ({currentData.analyzed_articles.length}개)
            {searchMode === 'company' && searchTriggered && (
              <span className="text-lg text-muted-foreground ml-2">- {selectedCompany}</span>
            )}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {currentData.analyzed_articles.map((article, index) => (
              <ArticleCard 
                key={index} 
                article={article} 
                isCompanyMode={searchMode === 'company' && searchTriggered} 
                companyName={selectedCompany} 
              />
            ))}
          </div>
        </div>
      )}

      {/* 데이터 없음 상태 */}
      {currentData?.analyzed_articles && currentData.analyzed_articles.length === 0 && !currentLoading && (
        <Card>
          <CardContent className="text-center py-8">
            <p className="text-muted-foreground">
              {searchMode === 'company' && searchTriggered
                ? `"${selectedCompany}" 회사의 분석된 기사가 없습니다.`
                : '현재 분석된 기사가 없습니다. 나중에 다시 확인해주세요.'
              }
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
} 