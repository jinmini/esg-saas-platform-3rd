// 분석 엔티티 관련 CRUD API (FSD 구조)

import { apiClient, buildPaginationParams } from '@/shared/api/client';
import { PaginatedResponse, PaginationParams } from '@/shared/types';
import { AnalysisResult, AnalysisFilter, AnalysisStats } from './model/types';

// 분석 결과 목록 조회 (페이지네이션)
export async function getAnalyses(params: Partial<PaginationParams> & AnalysisFilter): Promise<PaginatedResponse<AnalysisResult>> {
  const paginationParams = buildPaginationParams(params);
  const queryParams = { ...paginationParams };
  
  // 필터 조건 추가
  if (params.risk_level) queryParams.risk_level = params.risk_level;
  if (params.sentiment) queryParams.sentiment = params.sentiment;
  if (params.start_date) queryParams.start_date = params.start_date;
  if (params.end_date) queryParams.end_date = params.end_date;
  
  return apiClient.get<PaginatedResponse<AnalysisResult>>('/analysis', queryParams);
}

// 특정 분석 결과 조회
export async function getAnalysisById(id: string): Promise<AnalysisResult> {
  return apiClient.get<AnalysisResult>(`/analysis/${id}`);
}

// 분석 결과 생성
export async function createAnalysis(data: Partial<AnalysisResult>): Promise<AnalysisResult> {
  return apiClient.post<AnalysisResult>('/analysis', data);
}

// 분석 통계 조회
export async function getAnalysisStats(): Promise<AnalysisStats> {
  return apiClient.get<AnalysisStats>('/analysis/stats');
}

// 최근 분석 결과 조회
export async function getRecentAnalyses(limit: number = 10): Promise<AnalysisResult[]> {
  const response = await apiClient.get<{ items: AnalysisResult[] }>('/analysis/recent', { limit: limit.toString() });
  return response.items;
}

// 분석 결과 삭제
export async function deleteAnalysis(id: string): Promise<void> {
  await apiClient.delete(`/analysis/${id}`);
}

// 고위험 분석 목록 조회
export async function getHighRiskAnalyses(threshold: number = 0.7): Promise<AnalysisResult[]> {
  return await apiClient.get<AnalysisResult[]>('/analysis/high-risk', {
    threshold,
  });
}

// 텍스트 분석 함수 추가
export async function analyzeText(text: string): Promise<AnalysisResult> {
  return await apiClient.post<AnalysisResult>('/analysis/text', { text });
}
