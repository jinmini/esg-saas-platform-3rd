// 분석 관련 API

import { apiClient, buildPaginationParams } from '@/shared/api/client';
import { mockAnalysisResponse } from '@/lib/api/mock-analysis-response';
import {
  AnalysisResult,
  AnalysisFilter,
  PaginatedResponse,
  PaginationParams,
} from '@/shared/types';
import { BackendNewsAnalysisResponse, DashboardStatusResponse, SASBCombinedKeywordsResponse, SASBCompanyCombinedResponse, MaterialityAnalysisResponse, MaterialityAnalysisParams } from '@/shared/types/api';

// 분석 결과 목록 조회
export async function getAnalyses(
  params: PaginationParams & AnalysisFilter
): Promise<PaginatedResponse<AnalysisResult>> {
  const { page, limit, sortBy, sortOrder, ...filters } = params;
  
  // 배열 타입을 문자열로 변환
  const processedFilters: Record<string, string | number | boolean> = {};
  Object.entries(filters).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      processedFilters[key] = value.join(',');
    } else if (value !== undefined) {
      processedFilters[key] = value;
    }
  });
  
  const queryParams = {
    ...buildPaginationParams({ page, limit, sortBy, sortOrder }),
    ...processedFilters,
  };
  
  const response = await apiClient.get<PaginatedResponse<AnalysisResult>>('/analysis', queryParams);
  return response.data;
}

// 분석 결과 상세 조회
export async function getAnalysisById(id: string): Promise<AnalysisResult> {
  const response = await apiClient.get<AnalysisResult>(`/analysis/${id}`);
  return response.data;
}

// 텍스트 분석 요청
export async function analyzeText(text: string): Promise<AnalysisResult> {
  const response = await apiClient.post<AnalysisResult>('/analysis/analyze-text', { text });
  return response.data;
}

// 기업별 분석 결과 조회
export async function getAnalysesByCompany(
  companyId: string,
  params: PaginationParams
): Promise<PaginatedResponse<AnalysisResult>> {
  const queryParams = buildPaginationParams(params);
  
  const response = await apiClient.get<PaginatedResponse<AnalysisResult>>(
    `/analysis/company/${companyId}`,
    queryParams
  );
  return response.data;
}

// SASB 카테고리별 분석 결과 조회
export async function getAnalysesBySASB(
  category: string,
  params: PaginationParams
): Promise<PaginatedResponse<AnalysisResult>> {
  const queryParams = buildPaginationParams(params);
  
  const response = await apiClient.get<PaginatedResponse<AnalysisResult>>(
    `/analysis/sasb/${category}`,
    queryParams
  );
  return response.data;
}

// 최근 분석 결과 조회
export async function getRecentAnalyses(limit: number = 10): Promise<AnalysisResult[]> {
  const response = await apiClient.get<{ items: AnalysisResult[] }>('/analysis/recent', {
    limit: limit.toString(),
  });
  
  return response.data.items;
}

// 고위험 분석 결과 조회
export async function getHighRiskAnalyses(
  threshold: number = 0.7
): Promise<AnalysisResult[]> {
  const response = await apiClient.get<{ items: AnalysisResult[] }>('/analysis/high-risk', {
    threshold: threshold.toString(),
  });
  
  return response.data.items;
}

// 분석 통계 조회
export async function getAnalysisStats(): Promise<{
  total: number;
  byRiskLevel: Record<string, number>;
  bySentiment: Record<string, number>;
  bySASB: Record<string, number>;
  avgRiskScore: number;
}> {
  const response = await apiClient.get<Awaited<ReturnType<typeof getAnalysisStats>>>('/analysis/stats');
  return response.data;
}

// [MOCK] 기업 분석 결과 조회 (테스트용)
export async function getCompanyAnalysisMock(companyName: string): Promise<typeof mockAnalysisResponse> {
  console.log(`[Mock API] "${companyName}"에 대한 분석 요청을 수신했습니다.`);
  
  return new Promise(resolve => {
    setTimeout(() => {
      console.log(`[Mock API] "${companyName}"에 대한 분석 결과를 반환합니다.`);
      resolve(mockAnalysisResponse);
    }, 1000); // 1초 딜레이
  });
}

// 새로운 SASB 조합 키워드 분석 API
export async function getSASBCombinedKeywords(maxResults: number = 100): Promise<SASBCombinedKeywordsResponse> {
  const gatewayUrl = process.env.NEXT_PUBLIC_NEWS_SERVICE_URL || 'http://localhost:8080/gateway/v1';
  const url = `${gatewayUrl}/sasb/api/v1/workers/results/combined-keywords?max_results=${maxResults}`;
  
  console.log(`[Real API] SASB 조합 키워드 분석 요청: ${url}`);
  
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`API 요청 실패: ${response.status} ${response.statusText}`);
  }

  const data: SASBCombinedKeywordsResponse = await response.json();
  console.log(`[Real API] SASB 조합 키워드 분석 결과를 받았습니다. 총 ${data.total_articles_found}개 기사`);
  
  return data;
}

// 새로운 SASB 회사별 조합 검색 API
export async function getSASBCompanyCombined(company: string, maxResults: number = 100): Promise<SASBCompanyCombinedResponse> {
  const gatewayUrl = process.env.NEXT_PUBLIC_NEWS_SERVICE_URL || 'http://localhost:8080/gateway/v1';
  const url = `${gatewayUrl}/sasb/api/v1/workers/results/company-combined/${encodeURIComponent(company)}?max_results=${maxResults}`;
  
  console.log(`[Real API] SASB 회사별 조합 검색 요청: ${url}`);
  
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`API 요청 실패: ${response.status} ${response.statusText}`);
  }

  const data: SASBCompanyCombinedResponse = await response.json();
  console.log(`[Real API] ${company} SASB 회사별 분석 결과를 받았습니다. 총 ${data.total_articles_found}개 기사`);
  
  return data;
}

// 레거시: 기존 기업 뉴스 분석 (호환성 유지용 - 추후 제거 예정)
export async function getCompanyAnalysis(companyName: string): Promise<BackendNewsAnalysisResponse> {
  console.warn(`[Deprecated] getCompanyAnalysis는 더 이상 사용되지 않습니다. getSASBCombinedKeywords를 사용하세요.`);
  
  // 임시로 새로운 API를 호출하고 기존 형태로 변환
  const sasbData = await getSASBCombinedKeywords();
  
  // 기존 형태로 변환 (임시 호환성)
  const converted: BackendNewsAnalysisResponse = {
    company: companyName,
    status: sasbData.status === 'completed' ? 'success' : 'error',
    analyzed_at: new Date().toISOString(),
    analysis_result: {
      search_info: {
        company: companyName,
        total: sasbData.total_articles_found,
        start: 1,
        display: sasbData.analyzed_articles.length,
        last_build_date: new Date().toISOString(),
        original_count: sasbData.total_articles_found,
        duplicates_removed: 0,
        deduplication_enabled: false
      },
      analyzed_news: sasbData.analyzed_articles.map(article => ({
        news_item: {
          title: article.title,
          original_link: article.url || '',
          link: article.url || '',
          description: article.description,
          pub_date: article.published_at || new Date().toISOString(),
          mention_count: 1,
          duplicate_links: [],
          similarity_score: 0.9
        },
        esg_classification: {
          esg_category: '통합ESG',
          confidence_score: 0.8,
          keywords: [],
          classification_method: 'sasb_combined'
        },
        sentiment_analysis: {
          sentiment: article.sentiment.sentiment,
          confidence_score: article.sentiment.confidence,
          positive: article.sentiment.sentiment === '긍정' ? article.sentiment.confidence : 0,
          negative: article.sentiment.sentiment === '부정' ? article.sentiment.confidence : 0,
          neutral: article.sentiment.sentiment === '중립' ? article.sentiment.confidence : 0,
          analysis_method: 'sasb_sentiment'
        }
      })),
      analysis_summary: {
        total_analyzed: sasbData.analyzed_articles.length,
        esg_distribution: {
          '환경(E)': Math.floor(sasbData.analyzed_articles.length * 0.4),
          '사회(S)': Math.floor(sasbData.analyzed_articles.length * 0.3),
          '지배구조(G)': Math.floor(sasbData.analyzed_articles.length * 0.2),
          '통합ESG': Math.floor(sasbData.analyzed_articles.length * 0.1),
          '기타': 0
        },
        sentiment_distribution: {
          '긍정': sasbData.analyzed_articles.filter(a => a.sentiment.sentiment === '긍정').length,
          '부정': sasbData.analyzed_articles.filter(a => a.sentiment.sentiment === '부정').length,
          '중립': sasbData.analyzed_articles.filter(a => a.sentiment.sentiment === '중립').length
        }
      },
      ml_service_status: 'connected'
    }
  };
  
  return converted;
}

// 대시보드 상태 조회
export async function getDashboardStatus(): Promise<DashboardStatusResponse> {
  const gatewayUrl = process.env.NEXT_PUBLIC_NEWS_SERVICE_URL || 'http://localhost:8080/gateway/v1';
  const url = `${gatewayUrl}/news/dashboard/status`;
  
  console.log(`[Real API] 대시보드 상태 요청: ${url}`);
  
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`대시보드 상태 API 요청 실패: ${response.status} ${response.statusText}`);
  }

  const data: DashboardStatusResponse = await response.json();
  console.log(`[Real API] 대시보드 상태를 받았습니다:`, data);
  
  return data;
}

// 분석 결과 내보내기
export async function exportAnalyses(
  format: 'csv' | 'excel' | 'pdf',
  filters?: AnalysisFilter
): Promise<Blob> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/analysis/export`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ format, filters }),
  });
  
  if (!response.ok) {
    throw new Error('Export failed');
  }
  
  return response.blob();
}

// n8n 구글 시트 연동 -> 백엔드 API를 통해 요청
export async function exportToGoogleSheets(
  companyName: string,
  analyzedNews: any[],
): Promise<{ message: string }> {
  // 백엔드 담당자 요청사항 반영
  // gatewayUrl에서 origin(http://localhost:8080)만 추출하여 사용
  const gatewayUrl = process.env.NEXT_PUBLIC_NEWS_SERVICE_URL || 'http://localhost:8080/gateway/v1';
  const baseUrl = new URL(gatewayUrl).origin;
  const exportUrl = `${baseUrl}/companies/${encodeURIComponent(companyName)}/export`;

  console.log(`[Backend API] "${companyName}" 데이터 내보내기 요청: ${exportUrl}`);

  const response = await fetch(exportUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      news: analyzedNews,
      exported_at: new Date().toISOString(),
    }),
  });

  if (!response.ok) {
    const errorBody = await response.text();
    console.error(`[Backend API] 내보내기 실패: ${response.status} ${response.statusText}`, errorBody);
    throw new Error(`백엔드 API 호출 실패: ${response.statusText}`);
  }

  const result = await response.json();
  console.log(`[Backend API] 내보내기 성공:`, result);
  return result;
}

/**
 * 기업별 중대성 분석 (핵심 기능)
 * @param companyName 기업명
 * @param params 분석 매개변수
 */
export async function getMaterialityAnalysis(
  companyName: string,
  params: Omit<MaterialityAnalysisParams, 'company_name'> = {}
): Promise<MaterialityAnalysisResponse> {
  const { year = 2025, include_news = true, max_articles = 100 } = params;
  
  const queryParams = new URLSearchParams({
    year: year.toString(),
    include_news: include_news.toString(),
    max_articles: max_articles.toString(),
  });

  const gatewayUrl = process.env.NEXT_PUBLIC_NEWS_SERVICE_URL || 'http://localhost:8080/gateway/v1';
  const url = `${gatewayUrl}/material/api/v1/materiality/companies/${encodeURIComponent(companyName)}/analyze?${queryParams}`;
  
  console.log(`[Real API] 중대성평가 분석 요청: ${url}`);
  
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`중대성평가 API 요청 실패: ${response.status} ${response.statusText}`);
  }

  const data: MaterialityAnalysisResponse = await response.json();
  console.log(`[Real API] 중대성평가 분석 결과를 받았습니다:`, data);
  
  return data;
}
