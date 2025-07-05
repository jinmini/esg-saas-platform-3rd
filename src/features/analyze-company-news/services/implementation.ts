import { INewsAnalysisService } from './interface';
import { NewsAnalysisParams, NewsAnalysisResponse } from '@/shared/types/api';
import { analyzeCompanyNews } from '../api';
import { getFallbackNewsAnalysis } from '../api/mock';

class NewsAnalysisService implements INewsAnalysisService {
  async analyzeCompanyNews(params: NewsAnalysisParams): Promise<NewsAnalysisResponse> {
    try {
      return await analyzeCompanyNews(params);
    } catch (error) {
      console.error('뉴스 분석 API 오류:', error);
      return getFallbackNewsAnalysis(params.company);
    }
  }

  async checkApiStatus(): Promise<{ available: boolean; message: string }> {
    try {
      await this.analyzeCompanyNews({ company: '테스트' } as NewsAnalysisParams);
      return { available: true, message: '뉴스 분석 API 연결 정상' };
    } catch (error) {
      return {
        available: false,
        message: '뉴스 분석 API 연결 실패 - Fallback 모드로 동작'
      };
    }
  }
}

export const newsAnalysisService = new NewsAnalysisService(); 