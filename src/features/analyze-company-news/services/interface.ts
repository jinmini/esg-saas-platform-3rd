import { NewsAnalysisParams, NewsAnalysisResponse } from '@/shared/types/api';

export interface INewsAnalysisService {
  analyzeCompanyNews(params: NewsAnalysisParams): Promise<NewsAnalysisResponse>;
  checkApiStatus(): Promise<{ available: boolean; message: string }>;
} 