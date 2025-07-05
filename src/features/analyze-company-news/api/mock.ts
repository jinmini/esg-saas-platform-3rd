import { NewsAnalysisResponse } from '@/shared/types/api';

export function getFallbackNewsAnalysis(company: string): NewsAnalysisResponse {
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
          duplicate_links: ["https://news.naver.com/..."] ,
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
  };
} 