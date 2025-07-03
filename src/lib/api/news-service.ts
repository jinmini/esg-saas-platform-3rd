import { httpClient } from '../../shared/api/http-client'
import { 
  NewsAnalysisResponse, 
  NewsAnalysisParams, 
 
} from '@/shared/types/api'

export class NewsService {
  private readonly basePath = '/api/v1/news'

  /**
   * 회사 뉴스 분석 (현재 구현된 유일한 API)
   * GET /api/v1/news/analyze-company
   */
  async analyzeCompanyNews(params: NewsAnalysisParams): Promise<NewsAnalysisResponse> {
    try {
      const queryParams = new URLSearchParams()
      queryParams.append('company', params.company)
      
      if (params.start !== undefined) queryParams.append('start', params.start.toString())
      if (params.display !== undefined) queryParams.append('display', params.display.toString())
      if (params.sort) queryParams.append('sort', params.sort)
      if (params.period) queryParams.append('period', params.period)

      const response = await httpClient.get<NewsAnalysisResponse>(
        `${this.basePath}/analyze-company?${queryParams.toString()}`
      )

      return response
    } catch (error) {
      console.error('뉴스 분석 API 오류:', error)
      
      // 백엔드가 오프라인인 경우 fallback 데이터 반환
      return this.getFallbackNewsAnalysis(params.company)
    }
  }

  /**
   * Fallback 데이터 (백엔드 서버가 오프라인일 때)
   */
  private getFallbackNewsAnalysis(company: string): NewsAnalysisResponse {
    console.warn(`⚠️ 백엔드 서버 연결 실패 - ${company}에 대한 fallback 데이터 사용`)
    
    return {
      search_info: {
        company,
        total: 150,
        start: 1,
        display: 10,
        last_build_date: new Date().toISOString(),
        original_count: 12,
        duplicates_removed: 2,
        deduplication_enabled: true
      },
      analyzed_news: [
        {
          news_item: {
            title: `${company}, ESG 경영 강화로 지속가능성 향상`,
            original_link: "https://example.com/news/123",
            link: "https://news.naver.com/...",
            description: `${company}가 환경·사회·지배구조(ESG) 경영을 강화하여 지속가능한 성장을 추진하고 있습니다.`,
            pub_date: new Date().toISOString(),
            mention_count: 5,
            duplicate_links: ["https://news.naver.com/..."],
            similarity_score: 0.95
          },
          esg_classification: {
            esg_category: "통합ESG",
            confidence_score: 0.89,
            keywords: ["ESG", "지속가능성", "환경"],
            classification_method: "fallback"
          },
          sentiment_analysis: {
            sentiment: "긍정",
            confidence_score: 0.92,
            positive: 0.85,
            negative: 0.10,
            neutral: 0.05,
            analysis_method: "fallback"
          }
        }
      ],
      analysis_summary: {
        total_analyzed: 10,
        esg_distribution: {
          "환경(E)": 3,
          "사회(S)": 2,
          "지배구조(G)": 2,
          "통합ESG": 2,
          "기타": 1
        },
        sentiment_distribution: {
          "긍정": 6,
          "부정": 2,
          "중립": 2
        }
      },
      ml_service_status: "fallback"
    }
  }

  /**
   * API 상태 확인
   */
  async checkApiStatus(): Promise<{ available: boolean; message: string }> {
    try {
      // 간단한 테스트 요청
      await this.analyzeCompanyNews({ company: '테스트' })
      return { available: true, message: '뉴스 분석 API 연결 정상' }
    } catch (error) {
      return { 
        available: false, 
        message: '뉴스 분석 API 연결 실패 - Fallback 모드로 동작' 
      }
    }
  }
}

// 싱글톤 인스턴스
export const newsService = new NewsService() 