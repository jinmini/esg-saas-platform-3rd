import { httpClient } from '@/shared/api/http-client';
import { NewsAnalysisParams, NewsAnalysisResponse } from '@/shared/types/api';

const basePath = '/api/v1/news';

export async function analyzeCompanyNewsApi(params: NewsAnalysisParams): Promise<NewsAnalysisResponse> {
  const queryParams = new URLSearchParams();
  queryParams.append('company', params.company);
  if (params.start !== undefined) queryParams.append('start', params.start.toString());
  if (params.display !== undefined) queryParams.append('display', params.display.toString());
  if (params.sort) queryParams.append('sort', params.sort);
  if (params.period) queryParams.append('period', params.period);
  return httpClient.get<NewsAnalysisResponse>(`${basePath}/analyze-company?${queryParams.toString()}`);
} 