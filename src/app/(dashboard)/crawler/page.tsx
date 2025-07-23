// ESG 뉴스 크롤링 및 분석 페이지

'use client';

import { useState } from 'react';
import { useSASBCombinedKeywords, useSASBCompanyCombined, useMaterialityAnalysis } from '@/hooks/queries/useAnalysis';
import { Alert, AlertDescription, AlertTitle } from '@/shared/ui/Alert';
import { Button } from '@/shared/ui/Button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/ui/Card';
import { Badge } from '@/shared/ui/Badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/ui/Select';
import { RefreshCw, BarChart3, Building2, Target } from 'lucide-react';

// MVP 단계에서 지원하는 회사 목록
const SUPPORTED_COMPANIES = [
  { value: 'all', label: '전체 산업 (기본값)' },
  { value: 'LS ELECTRIC', label: 'LS ELECTRIC' },
  { value: '두산퓨얼셀', label: '두산퓨얼셀' }
] as const;

export default function CrawlerPage() {
  const [maxResults, setMaxResults] = useState<number>(50);
  const [selectedCompany, setSelectedCompany] = useState<string>('all'); // 기본값: 'all' (전체 산업)
  const [showMaterialityAnalysis, setShowMaterialityAnalysis] = useState<boolean>(false);
  
  // SASB API들 - selectedCompany가 'all'인지에 따라 다른 API 호출
  const { data: industryData, isLoading: industryLoading, isError: industryError, error: industryErrorMsg, refetch: refetchIndustry } = useSASBCombinedKeywords(maxResults, selectedCompany === 'all');
  const { data: companyData, isLoading: companyLoading, isError: companyError, error: companyErrorMsg, refetch: refetchCompany } = useSASBCompanyCombined(selectedCompany, maxResults, selectedCompany !== 'all');
  
  // 중대성평가 API - 회사 모드일 때만 활성화
  const { data: materialityData, isLoading: materialityLoading, isError: materialityError, error: materialityErrorMsg, refetch: refetchMaterialityAnalysis } = useMaterialityAnalysis(selectedCompany, { max_articles: maxResults }, showMaterialityAnalysis && selectedCompany !== 'all');
  
  const handleRefresh = () => {
    if (selectedCompany !== 'all') {
      refetchCompany();
    } else {
      refetchIndustry();
    }
  };

  // 현재 모드와 회사 선택에 따른 데이터와 상태
  const isCompanyMode = selectedCompany !== 'all';
  const currentData = isCompanyMode ? companyData : industryData;
  const isLoading = isCompanyMode ? companyLoading : industryLoading;
  const isError = isCompanyMode ? companyError : industryError;
  const error = isCompanyMode ? companyErrorMsg : industryErrorMsg;

  // 404 에러인지 확인 (데이터 없음)
  const isNoData = error?.message?.includes('404') || error?.message?.includes('not found') || error?.message?.includes('해당 회사의 데이터를 가져오지 못했습니다');

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">🚀 SASB 산업별 ESG 이슈 모니터링</h1>
            <p className="text-muted-foreground mt-2">산업 키워드와 SASB 이슈 키워드 조합으로 관련성 높은 ESG 뉴스를 수집합니다</p>
          </div>
        </div>
        <Card>
          <CardContent className="flex items-center justify-center py-10">
            <div className="text-center">
              <RefreshCw className="h-8 w-8 animate-spin mx-auto mb-4 text-blue-500" />
              <p className="text-lg font-medium">SASB 분석 중...</p>
              <p className="text-sm text-muted-foreground">산업별 ESG 이슈를 수집하고 있습니다</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              🚀 SASB {isCompanyMode ? `${selectedCompany}` : '산업별'} ESG 이슈 모니터링
            </h1>
          </div>
        </div>
        
        {isNoData ? (
          // 데이터 없음 상태 (404 등)
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-16">
              <div className="text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Building2 className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold mb-2">아직 수집한 데이터가 없습니다</h3>
                <p className="text-muted-foreground mb-4 max-w-md">
                  {isCompanyMode 
                    ? `${selectedCompany}와 관련된 ESG 뉴스 데이터가 아직 수집되지 않았습니다.`
                    : '해당 산업군의 ESG 뉴스 데이터가 아직 수집되지 않았습니다.'
                  }
                </p>
                <p className="text-sm text-muted-foreground mb-6">
                  데이터 수집 작업이 진행 중일 수 있습니다. 다른 옵션을 선택해 보세요.
                </p>
                <div className="flex justify-center">
                  {isCompanyMode ? (
                    <Button 
                      onClick={() => setSelectedCompany('all')} 
                      variant="outline"
                    >
                      <BarChart3 className="h-4 w-4 mr-2" />
                      전체 산업 보기
                    </Button>
                  ) : (
                    <Button 
                      onClick={() => setSelectedCompany('LS ELECTRIC')} 
                      variant="outline"
                    >
                      <Building2 className="h-4 w-4 mr-2" />
                      LS ELECTRIC 보기
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ) : (
          // 일반 에러 상태
          <Alert variant="destructive">
            <RefreshCw className="h-4 w-4" />
            <AlertTitle>오류 발생</AlertTitle>
            <AlertDescription>
              데이터를 불러오는 중 문제가 발생했습니다: {error?.message || '알 수 없는 오류'}
            </AlertDescription>
          </Alert>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* 헤더 */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            🚀 SASB {isCompanyMode ? `${selectedCompany}` : '산업별'} ESG 이슈 모니터링
          </h1>
          <p className="text-muted-foreground mt-2">
            {isCompanyMode ? 
              `${selectedCompany}의 SASB 기반 ESG 이슈와 관련된 뉴스를 수집합니다` :
              '산업 키워드와 SASB 이슈 키워드 조합으로 관련성 높은 ESG 뉴스를 수집합니다'
            }
          </p>
        </div>
        <div className="flex items-center gap-3">
          {isCompanyMode && (
            <Button 
              onClick={() => {
                setShowMaterialityAnalysis(true);
                if (!materialityData) {
                  refetchMaterialityAnalysis();
                }
              }}
              disabled={materialityLoading}
              variant="secondary"
            >
              <Target className={`h-4 w-4 mr-2 ${materialityLoading ? 'animate-spin' : ''}`} />
              중대성평가
            </Button>
          )}
          <Button onClick={handleRefresh} disabled={isLoading}>
            <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
            새로고침
          </Button>
        </div>
      </div>

      {/* 설정 카드 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            {isCompanyMode ? <Building2 className="h-5 w-5" /> : <BarChart3 className="h-5 w-5" />}
            SASB 분석 설정
          </CardTitle>
          <CardDescription>
            회사를 선택하여 특정 기업 분석으로 전환하거나, 전체 산업 분석을 확인할 수 있습니다
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 flex-wrap">
            <label className="text-sm font-medium">분석 대상:</label>
            <Select value={selectedCompany} onValueChange={setSelectedCompany}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {SUPPORTED_COMPANIES.map((company) => (
                  <SelectItem key={company.value} value={company.value}>
                    {company.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <label className="text-sm font-medium">최대 결과 수:</label>
            <select 
              value={maxResults} 
              onChange={(e) => setMaxResults(Number(e.target.value))}
              className="px-3 py-1 border rounded-md"
            >
              <option value={25}>25개</option>
              <option value={50}>50개</option>
              <option value={100}>100개</option>
              <option value={200}>200개</option>
            </select>
            <Button size="sm" onClick={handleRefresh}>적용</Button>
          </div>
        </CardContent>
      </Card>

      {/* 중대성평가 로딩 */}
      {showMaterialityAnalysis && materialityLoading && (
        <Card>
          <CardContent className="flex items-center justify-center py-10">
            <div className="text-center">
              <Target className="h-8 w-8 animate-spin mx-auto mb-4 text-blue-500" />
              <p className="text-lg font-medium">중대성평가 분석 중...</p>
              <p className="text-sm text-muted-foreground">{selectedCompany}의 중대성 분석을 수행하고 있습니다</p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* 중대성평가 결과 */}
      {showMaterialityAnalysis && !materialityLoading && materialityData && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                {selectedCompany} 중대성평가 결과
              </div>
              <Button 
                onClick={() => setShowMaterialityAnalysis(false)}
                variant="ghost"
                size="sm"
              >
                ✕ 닫기
              </Button>
            </CardTitle>
            <CardDescription>
              {materialityData.analysis_metadata?.analysis_type} 분석 결과 ({materialityData.analysis_metadata?.analysis_date?.split('T')[0]})
              • 상태: {materialityData.analysis_metadata?.status}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {/* 분석 개요 */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold text-sm mb-2">분석 개요</h4>
                  <p className="text-sm mb-1">기준연도: {materialityData.analysis_metadata?.base_year}년</p>
                  <p className="text-sm">분석연도: {materialityData.analysis_metadata?.analysis_year}년</p>
                </div>
                
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold text-sm mb-2">뉴스 분석 결과</h4>
                  <p className="text-sm mb-1">분석 기사: {materialityData.news_analysis_summary?.total_articles_analyzed || 0}개</p>
                  <p className="text-sm">업데이트 필요성: {materialityData.news_analysis_summary?.update_necessity}</p>
                </div>
              </div>

              {/* 토픽 변화 분석 */}
              {materialityData.change_analysis?.existing_topics && materialityData.change_analysis.existing_topics.length > 0 && (
                <div>
                                      <div className="flex items-center justify-between mb-4">
                      <h4 className="font-semibold">🔍 토픽 변화 분석</h4>
                      <div className="flex gap-2 text-sm flex-wrap">
                        <Badge variant="outline">총 토픽: {materialityData.change_analysis.topic_analysis_summary?.total_topics_analyzed}</Badge>
                        <Badge variant="destructive">중요한 변화: {materialityData.change_analysis.topic_analysis_summary?.topics_with_significant_change}</Badge>
                        {materialityData.change_analysis.change_distribution && (
                          <>
                            <Badge variant="destructive" className="text-xs">상승: {materialityData.change_analysis.change_distribution.emerging}</Badge>
                            <Badge variant="secondary" className="text-xs">하락: {materialityData.change_analysis.change_distribution.declining}</Badge>
                            {materialityData.change_analysis.change_distribution.ongoing && (
                              <Badge variant="default" className="text-xs">지속: {materialityData.change_analysis.change_distribution.ongoing}</Badge>
                            )}
                            {materialityData.change_analysis.change_distribution.maturing && (
                              <Badge variant="outline" className="text-xs">성숙: {materialityData.change_analysis.change_distribution.maturing}</Badge>
                            )}
                          </>
                        )}
                      </div>
                    </div>
                  <div className="grid gap-3 max-h-96 overflow-y-auto">
                                         {materialityData.change_analysis.existing_topics.slice(0, 10).map((topic: any, index: number) => (
                       <div key={index} className="p-3 border rounded-lg hover:shadow-sm transition-shadow">
                         <div className="flex items-start justify-between mb-2">
                           <div className="flex-1">
                             <div className="flex items-center gap-2 mb-1">
                               <h5 className="font-medium">{topic.topic_name}</h5>
                               <Badge variant="outline" className="text-xs">기존 #{topic.current_priority}위</Badge>
                               {topic.priority_analysis && (
                                 <Badge variant="outline" className="text-xs">
                                   언급 #{topic.priority_analysis.current_mention_rank}위
                                 </Badge>
                               )}
                             </div>
                             {topic.priority_analysis && (
                               <p className="text-xs text-muted-foreground mb-1">
                                 {topic.priority_analysis.rank_change_description} (언급 {topic.priority_analysis.mention_count}건)
                               </p>
                             )}
                             <p className="text-sm text-muted-foreground">{topic.rationale}</p>
                           </div>
                           <div className="flex flex-col items-end gap-1">
                             <Badge 
                               variant={
                                 topic.change_type === 'emerging' ? 'destructive' : 
                                 topic.change_type === 'declining' ? 'secondary' :
                                 topic.change_type === 'ongoing' ? 'default' : 'outline'
                               }
                               className="text-xs"
                             >
                               {topic.change_type}
                             </Badge>
                             {topic.priority_analysis && topic.priority_analysis.priority_shift !== 0 && (
                               <div className="text-xs text-muted-foreground">
                                 {topic.priority_analysis.priority_shift > 0 ? '+' : ''}{topic.priority_analysis.priority_shift} 순위
                               </div>
                             )}
                           </div>
                         </div>
                       </div>
                     ))}
                  </div>
                </div>
              )}

              {/* 권장사항 */}
              {materialityData.recommendations && materialityData.recommendations.length > 0 && (
                <div>
                  <h4 className="font-semibold mb-3">💡 권장사항</h4>
                  <div className="space-y-3 max-h-64 overflow-y-auto">
                    {materialityData.recommendations.filter((rec: any) => rec.topic_name).slice(0, 5).map((rec: any, index: number) => (
                      <div key={index} className="p-3 border rounded-lg">
                        <div className="mb-2">
                          <div className="flex items-center gap-2 mb-1">
                            <h5 className="font-medium">{rec.topic_name}</h5>
                            {rec.priority_shift_details && rec.priority_shift_details.priority_shift !== 0 && (
                              <Badge 
                                variant={rec.priority_shift_details.priority_shift > 0 ? "destructive" : "secondary"}
                                className="text-xs"
                              >
                                {rec.priority_shift_details.priority_shift > 0 ? '+' : ''}{rec.priority_shift_details.priority_shift} 순위
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm">{rec.suggested_action}</p>
                        </div>
                        <p className="text-xs text-muted-foreground">{rec.rationale}</p>
                        {rec.priority_shift_details && (
                          <div className="mt-2 text-xs text-muted-foreground">
                            순위 변화: {rec.priority_shift_details.previous_priority}위 → {rec.priority_shift_details.current_mention_rank}위 (언급 {rec.priority_shift_details.mention_count}건)
                          </div>
                        )}
                        {rec.news_evidence && (
                          <div className="mt-1 text-xs text-muted-foreground">
                            관련 뉴스: {rec.news_evidence.relevant_articles}/{rec.news_evidence.total_articles}개 (감정: {rec.news_evidence.avg_sentiment})
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}





              {/* 면책조항 */}
              <div className="p-3 border rounded-lg">
                <p className="text-xs text-muted-foreground">
                  ⚠️ {materialityData.analysis_metadata?.disclaimer || '뉴스 분석 결과는 참고용입니다.'}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* 중대성평가 에러 상태 */}
      {showMaterialityAnalysis && !materialityLoading && materialityError && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                중대성평가 결과
              </div>
              <Button 
                onClick={() => setShowMaterialityAnalysis(false)}
                variant="ghost"
                size="sm"
              >
                ✕ 닫기
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Alert variant="destructive">
              <Target className="h-4 w-4" />
              <AlertTitle>중대성평가 오류</AlertTitle>
              <AlertDescription>
                중대성평가를 불러오는 중 문제가 발생했습니다: {materialityErrorMsg?.message || '알 수 없는 오류'}
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>
      )}

      {/* SASB 분석 결과 */}
      {currentData && (
        <>
          {currentData.analyzed_articles && currentData.analyzed_articles.length > 0 ? (
            /* SASB 기사 목록 */
            <Card>
              <CardHeader>
                <CardTitle>📰 SASB 기반 ESG 이슈 분석 결과</CardTitle>
                <CardDescription>
                  {isCompanyMode 
                    ? `${selectedCompany}와 관련된 총 ${currentData.analyzed_articles.length}개의 ESG 뉴스가 발견되었습니다`
                    : `총 ${currentData.analyzed_articles.length}개의 관련성 높은 ESG 뉴스가 발견되었습니다`
                  }
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {currentData.analyzed_articles.map((article, index) => {
                    // 여러 가능한 링크 필드 중 사용 가능한 것 찾기
                    const articleUrl = article.url || article.link || article.original_url || article.original_link;
                    
                    return (
                      <div key={index} className="p-4 border rounded-lg hover:shadow-sm transition-shadow">
                        <div className="flex items-start justify-between mb-2">
                          {articleUrl ? (
                            <a 
                              href={articleUrl} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="font-semibold text-lg hover:text-blue-600 transition-colors cursor-pointer flex-1 mr-4 line-clamp-2"
                            >
                              {article.title}
                            </a>
                          ) : (
                            <h3 className="font-semibold text-lg flex-1 mr-4 line-clamp-2">
                              {article.title}
                            </h3>
                          )}
                          <Badge 
                            variant={
                              article.sentiment.sentiment === '긍정' ? 'default' : 
                              article.sentiment.sentiment === '부정' ? 'destructive' : 
                              'secondary'
                            }
                            className="shrink-0"
                          >
                            {article.sentiment.sentiment}
                          </Badge>
                        </div>
                        
                        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{article.description}</p>
                        
                        {/* 매칭된 키워드 표시 */}
                        {article.matched_keywords && article.matched_keywords.length > 0 && (
                          <div className="mb-3">
                            <div className="flex flex-wrap gap-1">
                              {article.matched_keywords.map((keyword: string, keywordIndex: number) => (
                                <Badge 
                                  key={keywordIndex} 
                                  variant="outline" 
                                  className="text-xs px-2 py-1 bg-orange-50 text-orange-700 border-orange-200"
                                >
                                  {keyword}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}
                        
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <div className="flex items-center gap-2">
                            {article.source && (
                              <>
                                <span>출처: {article.source}</span>
                                <span>•</span>
                              </>
                            )}
                            {article.published_at && (
                              <>
                                <span>{new Date(article.published_at).toLocaleDateString('ko-KR')}</span>
                                <span>•</span>
                              </>
                            )}
                            {article.author && (
                              <span>기자: {article.author}</span>
                            )}
                          </div>
                          
                          {articleUrl && (
                            <a 
                              href={articleUrl} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center gap-1"
                            >
                              <span>원문 보기</span>
                              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                              </svg>
                            </a>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          ) : (
            /* 데이터는 있지만 기사가 없는 경우 */
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-16">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Building2 className="h-8 w-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">수집된 뉴스가 없습니다</h3>
                  <p className="text-muted-foreground mb-4 max-w-md">
                    {isCompanyMode 
                      ? `${selectedCompany}와 관련된 ESG 뉴스가 현재 없습니다.`
                      : '해당 조건에 맞는 ESG 뉴스가 현재 없습니다.'
                    }
                  </p>
                  <div className="flex justify-center">
                    {isCompanyMode ? (
                      <Button 
                        onClick={() => setSelectedCompany('all')} 
                        variant="outline"
                      >
                        <BarChart3 className="h-4 w-4 mr-2" />
                        전체 산업 보기
                      </Button>
                    ) : (
                      <Button 
                        onClick={() => setSelectedCompany('LS ELECTRIC')} 
                        variant="outline"
                      >
                        <Building2 className="h-4 w-4 mr-2" />
                        LS ELECTRIC 보기
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </>
      )}
    </div>
  );
} 