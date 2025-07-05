import { apiClient, buildPaginationParams } from '@/shared/api/client';
import { AnalysisResult, PaginatedResponse, PaginationParams } from '@/shared/types';

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