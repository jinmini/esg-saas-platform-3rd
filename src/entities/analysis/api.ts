// 분석 엔티티 관련 CRUD API (FSD 구조)

import { apiClient } from '@/shared/api/client';
import { AnalysisResult, AnalysisFilter, PaginatedResponse, PaginationParams } from '@/shared/types';

// 분석 결과 목록 조회
export async function getAnalyses(
  params: PaginationParams & AnalysisFilter
): Promise<PaginatedResponse<AnalysisResult>> {
  // NOTE: 필터 변환 로직은 features/filter-analysis에서 처리하는 것이 바람직
  return apiClient.get<PaginatedResponse<AnalysisResult>>('/analysis', params);
}

// 분석 결과 상세 조회
export async function getAnalysisById(id: string): Promise<AnalysisResult> {
  return apiClient.get<AnalysisResult>(`/analysis/${id}`);
}

// 텍스트 분석 요청 (생성)
export async function analyzeText(text: string): Promise<AnalysisResult> {
  return apiClient.post<AnalysisResult>('/analysis/analyze-text', { text });
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
