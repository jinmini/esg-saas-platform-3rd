// 기업 관련 API

import { apiClient, buildPaginationParams } from './client';
import {
  Company,
  CompanyRisk,
  RiskScore,
  RiskTrendData,
  PaginatedResponse,
  PaginationParams,
} from '@/types';

// 기업 목록 조회
export async function getCompanies(
  params?: PaginationParams & {
    search?: string;
    industry?: string;
  }
): Promise<PaginatedResponse<Company>> {
  const queryParams = params ? {
    ...buildPaginationParams(params),
    ...(params.search && { search: params.search }),
    ...(params.industry && { industry: params.industry }),
  } : {};
  
  return apiClient.get<PaginatedResponse<Company>>('/companies', queryParams);
}

// 기업 상세 조회
export async function getCompanyById(id: string): Promise<Company> {
  return apiClient.get<Company>(`/companies/${id}`);
}

// 기업 생성
export async function createCompany(data: Omit<Company, 'id'>): Promise<Company> {
  return apiClient.post<Company>('/companies', data);
}

// 기업 수정
export async function updateCompany(id: string, data: Partial<Company>): Promise<Company> {
  return apiClient.put<Company>(`/companies/${id}`, data);
}

// 기업 삭제
export async function deleteCompany(id: string): Promise<void> {
  return apiClient.delete(`/companies/${id}`);
}

// 기업별 리스크 점수 조회
export async function getCompanyRiskScore(companyId: string): Promise<RiskScore> {
  return apiClient.get<RiskScore>(`/companies/${companyId}/risk-score`);
}

// 기업별 리스크 추이 조회
export async function getCompanyRiskTrend(
  companyId: string,
  params: {
    startDate: string;
    endDate: string;
    interval?: 'daily' | 'weekly' | 'monthly';
  }
): Promise<RiskTrendData[]> {
  return apiClient.get<RiskTrendData[]>(
    `/companies/${companyId}/risk-trend`,
    params
  );
}

// 고위험 기업 목록 조회
export async function getHighRiskCompanies(
  limit: number = 10
): Promise<CompanyRisk[]> {
  const response = await apiClient.get<{ items: CompanyRisk[] }>('/companies/high-risk', {
    limit: limit.toString(),
  });
  
  return response.items;
}

// 산업별 기업 리스크 비교
export async function getIndustryComparison(
  industry: string
): Promise<{
  industry: string;
  avgRiskScore: number;
  companies: CompanyRisk[];
}> {
  return apiClient.get(`/companies/industry/${industry}/comparison`);
}

// 기업 검색
export async function searchCompanies(query: string): Promise<Company[]> {
  const response = await apiClient.get<{ items: Company[] }>('/companies/search', {
    q: query,
  });
  
  return response.items;
}

// 기업 통계
export async function getCompanyStats(): Promise<{
  total: number;
  byIndustry: Record<string, number>;
  byRiskLevel: Record<string, number>;
  avgRiskScore: number;
}> {
  return apiClient.get('/companies/stats');
}

// 기업 ESG 점수 업데이트
export async function updateCompanyESGScore(
  companyId: string,
  scores: {
    environmental: number;
    social: number;
    governance: number;
  }
): Promise<RiskScore> {
  return apiClient.post<RiskScore>(`/companies/${companyId}/esg-score`, scores);
}

// 기업 관심 목록 추가/제거
export async function toggleCompanyWatchlist(
  companyId: string,
  isWatched: boolean
): Promise<void> {
  return apiClient.post(`/companies/${companyId}/watchlist`, { isWatched });
}
