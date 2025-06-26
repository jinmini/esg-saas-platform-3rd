// 분석 관련 API

import { apiClient, buildPaginationParams } from './client';
import {
  AnalysisResult,
  AnalysisFilter,
  PaginatedResponse,
  PaginationParams,
} from '@/types';

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
  
  return apiClient.get<PaginatedResponse<AnalysisResult>>('/analysis', queryParams);
}

// 분석 결과 상세 조회
export async function getAnalysisById(id: string): Promise<AnalysisResult> {
  return apiClient.get<AnalysisResult>(`/analysis/${id}`);
}

// 텍스트 분석 요청
export async function analyzeText(text: string): Promise<AnalysisResult> {
  return apiClient.post<AnalysisResult>('/analysis/analyze-text', { text });
}

// 기업별 분석 결과 조회
export async function getAnalysesByCompany(
  companyId: string,
  params: PaginationParams
): Promise<PaginatedResponse<AnalysisResult>> {
  const queryParams = buildPaginationParams(params);
  
  return apiClient.get<PaginatedResponse<AnalysisResult>>(
    `/analysis/company/${companyId}`,
    queryParams
  );
}

// SASB 카테고리별 분석 결과 조회
export async function getAnalysesBySASB(
  category: string,
  params: PaginationParams
): Promise<PaginatedResponse<AnalysisResult>> {
  const queryParams = buildPaginationParams(params);
  
  return apiClient.get<PaginatedResponse<AnalysisResult>>(
    `/analysis/sasb/${category}`,
    queryParams
  );
}

// 최근 분석 결과 조회
export async function getRecentAnalyses(limit: number = 10): Promise<AnalysisResult[]> {
  const response = await apiClient.get<{ items: AnalysisResult[] }>('/analysis/recent', {
    limit: limit.toString(),
  });
  
  return response.items;
}

// 고위험 분석 결과 조회
export async function getHighRiskAnalyses(
  threshold: number = 0.7
): Promise<AnalysisResult[]> {
  const response = await apiClient.get<{ items: AnalysisResult[] }>('/analysis/high-risk', {
    threshold: threshold.toString(),
  });
  
  return response.items;
}

// 분석 통계 조회
export async function getAnalysisStats(): Promise<{
  total: number;
  byRiskLevel: Record<string, number>;
  bySentiment: Record<string, number>;
  bySASB: Record<string, number>;
  avgRiskScore: number;
}> {
  return apiClient.get('/analysis/stats');
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
