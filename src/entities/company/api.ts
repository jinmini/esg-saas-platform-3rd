import { apiClient, buildPaginationParams } from '@/shared/api/client';
import { PaginatedResponse, PaginationParams } from '@/shared/types';
import { Company, CompanyStats } from './model/types';

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
  const response = await apiClient.get<PaginatedResponse<Company>>('/companies', queryParams);
  return response.data;
}

// 기업 상세 조회
export async function getCompanyById(id: string): Promise<Company> {
  const response = await apiClient.get<Company>(`/companies/${id}`);
  return response.data;
}

// 기업 생성
export async function createCompany(companyData: Omit<Company, 'id'>): Promise<Company> {
  const response = await apiClient.post<Company>('/companies', companyData);
  return response.data;
}

// 기업 수정
export async function updateCompany(id: string, data: Partial<Company>): Promise<Company> {
  const response = await apiClient.put<Company>(`/companies/${id}`, data);
  return response.data;
}

// 기업 삭제
export async function deleteCompany(id: string): Promise<void> {
  await apiClient.delete(`/companies/${id}`);
}

// 기업 통계
export async function getCompanyStats(): Promise<CompanyStats> {
  const response = await apiClient.get<CompanyStats>('/companies/stats');
  return response.data;
}

// 고위험 기업 목록 조회
export async function getHighRiskCompanies(limit: number = 10): Promise<Company[]> {
  const response = await apiClient.get<{ items: Company[] }>('/companies/high-risk', {
    limit,
  });
  return response.data.items;
}

// 기업 검색
export async function searchCompanies(query: string): Promise<Company[]> {
  const response = await apiClient.get<{ items: Company[] }>('/companies/search', {
    q: query,
  });
  return response.data.items;
} 