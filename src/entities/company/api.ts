import { apiClient, buildPaginationParams } from '@/shared/api/client';
import { PaginatedResponse, PaginationParams } from '@/shared/types';
import { Company, CompanyFilter, CompanyStats } from './model/types';

// 회사 목록 조회 (페이지네이션)
export async function getCompanies(params: PaginationParams & CompanyFilter): Promise<PaginatedResponse<Company>> {
  const queryParams = buildPaginationParams(params);
  
  // 필터 조건 추가
  if (params.industry) queryParams.industry = params.industry;
  if (params.riskLevel) queryParams.riskLevel = params.riskLevel;
  if (params.searchTerm) queryParams.searchTerm = params.searchTerm;
  if (params.size) queryParams.size = params.size;
  
  return apiClient.get<PaginatedResponse<Company>>('/companies', queryParams);
}

// 특정 회사 조회
export async function getCompanyById(id: string): Promise<Company> {
  return apiClient.get<Company>(`/companies/${id}`);
}

// 회사 생성
export async function createCompany(data: Omit<Company, 'id'>): Promise<Company> {
  return apiClient.post<Company>('/companies', data);
}

// 회사 수정
export async function updateCompany(id: string, data: Partial<Company>): Promise<Company> {
  return apiClient.put<Company>(`/companies/${id}`, data);
}

// 회사 삭제
export async function deleteCompany(id: string): Promise<void> {
  await apiClient.delete(`/companies/${id}`);
}

// 회사 통계 조회
export async function getCompanyStats(): Promise<CompanyStats> {
  return apiClient.get<CompanyStats>('/companies/stats');
}

// 회사 검색 (자동완성용)
export async function searchCompanies(query: string): Promise<Company[]> {
  const response = await apiClient.get<{ items: Company[] }>('/companies/search', { q: query });
  return response.items;
}

// 고위험 회사 목록 조회
export async function getHighRiskCompanies(limit: number = 10): Promise<Company[]> {
  const response = await apiClient.get<{ items: Company[] }>('/companies/high-risk', { limit });
  return response.items;
}

// 회사 리스크 스코어 조회
export async function getCompanyRiskScore(companyId: string): Promise<any> {
  return apiClient.get<any>(`/companies/${companyId}/risk-score`);
}

// 회사 리스크 트렌드 조회
export async function getCompanyRiskTrend(companyId: string, params?: any): Promise<any> {
  return apiClient.get<any>(`/companies/${companyId}/risk-trend`, params);
}

// 리스크 트렌드 조회 (전체)
export async function getRiskTrend(params?: { period?: string }): Promise<any> {
  return apiClient.get<any>('/dashboard/risk-trend', params);
}

// 감성 분석 트렌드 조회
export async function getSentimentTrend(params?: { period?: string }): Promise<any> {
  return apiClient.get<any>('/dashboard/sentiment-trend', params);
}

// 회사 워치리스트 토글
export async function toggleCompanyWatchlist(companyId: string, isWatched?: boolean): Promise<any> {
  return apiClient.post<any>(`/companies/${companyId}/watchlist/toggle`, { isWatched });
}

// 산업별 비교 조회
export async function getIndustryComparison(industry: string): Promise<any> {
  return apiClient.get<any>(`/companies/industry/${industry}/comparison`);
}

// ESG 점수 업데이트
export async function updateCompanyESGScore(companyId: string, scores: { environmental: number; social: number; governance: number }): Promise<any> {
  return apiClient.post<any>(`/companies/${companyId}/esg-score`, scores);
} 