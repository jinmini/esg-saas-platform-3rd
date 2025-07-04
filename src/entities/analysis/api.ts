// 분석 엔티티 관련 CRUD API (FSD 구조)

import { apiClient } from '@/shared/api/client';
import { PaginatedResponse, PaginationParams } from '@/shared/types';
import { AnalysisResult, AnalysisFilter, AnalysisStats } from './model/types';

// 분석 결과 목록 조회
export async function getAnalyses(
  params: PaginationParams & AnalysisFilter
): Promise<PaginatedResponse<AnalysisResult>> {
  // NOTE: 필터 변환 로직은 features/filter-analysis에서 처리하는 것이 바람직
  const response = await apiClient.get<PaginatedResponse<AnalysisResult>>('/analysis', params);
  return response.data;
}

// 분석 결과 상세 조회
export async function getAnalysisById(id: string): Promise<AnalysisResult> {
  const response = await apiClient.get<AnalysisResult>(`/analysis/${id}`);
  return response.data;
}

// 텍스트 분석 요청 (생성)
export async function analyzeText(text: string): Promise<AnalysisResult> {
  const response = await apiClient.post<AnalysisResult>('/analysis/analyze-text', { text });
  return response.data;
}

// 분석 통계 조회
export async function getAnalysisStats(): Promise<AnalysisStats> {
  const response = await apiClient.get<AnalysisStats>('/analysis/stats');
  return response.data;
}

// 최근 분석 목록 조회
export async function getRecentAnalyses(limit: number = 10): Promise<AnalysisResult[]> {
  const response = await apiClient.get<{ items: AnalysisResult[] }>('/analysis/recent', {
    limit: limit.toString(),
  });
  return response.data.items;
}

// 고위험 분석 목록 조회
export async function getHighRiskAnalyses(threshold: number = 0.7): Promise<AnalysisResult[]> {
  const response = await apiClient.get<AnalysisResult[]>('/analysis/high-risk', {
    threshold,
  });
  return response.data;
}
