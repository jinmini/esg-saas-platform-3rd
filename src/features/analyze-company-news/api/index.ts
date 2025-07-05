import { apiClient } from '@/shared/api/client';
import { NewsAnalysisResponse, NewsAnalysisParams } from '@/shared/types/api';

const basePath = '/api/analyze-company-news';

export const analyzeCompanyNews = async (params: NewsAnalysisParams): Promise<NewsAnalysisResponse> => {
  const queryParams = new URLSearchParams();
  
  queryParams.append('company', params.company);
  if (params.start) queryParams.append('start', params.start.toString());
  if (params.display) queryParams.append('display', params.display.toString());
  if (params.sort) queryParams.append('sort', params.sort);
  if (params.period) queryParams.append('period', params.period);

  return apiClient.get<NewsAnalysisResponse>(`${basePath}/analyze-company?${queryParams.toString()}`);
}; 