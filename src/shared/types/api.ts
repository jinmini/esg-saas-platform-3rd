// API 공통 타입
export interface ApiResponse<T> {
  success: boolean
  data: T
  message?: string
  error?: string
}

// 뉴스 분석 관련 타입 (crawler.json 기반)
export interface NewsSearchInfo {
  company: string
  total: number
  start: number
  display: number
  last_build_date: string
  original_count: number
  duplicates_removed: number
  deduplication_enabled: boolean
}

export interface NewsItem {
  title: string
  original_link: string
  link: string
  description: string
  pub_date: string
  mention_count: number
  duplicate_links: string[]
  similarity_score: number
}

export interface ESGClassification {
  esg_category: 'E' | 'S' | 'G' | '환경(E)' | '사회(S)' | '지배구조(G)' | '통합ESG' | '기타' | '재무정보'
  confidence_score: number
  keywords: string[]
  classification_method: string
}

export interface SentimentAnalysis {
  sentiment: '긍정' | '부정' | '중립'
  confidence_score: number
  positive: number
  negative: number
  neutral: number
  analysis_method: string
}

export interface AnalyzedNewsItem {
  news_item: NewsItem
  esg_classification: ESGClassification
  sentiment_analysis: SentimentAnalysis
}

export interface ESGDistribution {
  '환경(E)': number
  '사회(S)': number
  '지배구조(G)': number
  '통합ESG': number
  '기타': number
}

export interface SentimentDistribution {
  '긍정': number
  '부정': number
  '중립': number
}

export interface AnalysisSummary {
  total_analyzed: number
  esg_distribution: ESGDistribution
  sentiment_distribution: SentimentDistribution
}

export interface NewsAnalysisResponse {
  search_info: NewsSearchInfo
  analyzed_news: AnalyzedNewsItem[]
  analysis_summary: AnalysisSummary
  ml_service_status: 'connected' | 'fallback'
}

// 새로운 백엔드 API 응답 타입
export interface BackendNewsAnalysisResponse {
  company: string
  status: 'success' | 'error'
  analyzed_at: string
  analysis_result: NewsAnalysisResponse
  cache_key?: string
}

// 새로운 SASB 조합 키워드 API 응답 타입
export interface SASBCombinedKeywordsResponse {
  task_id: string
  status: 'completed' | 'running' | 'failed'
  searched_keywords: string[]
  total_articles_found: number
  analysis_type: 'combined_keywords' | 'company_combined'
  analyzed_articles: SASBAnalyzedArticle[]
}

// 회사별 조합 검색 응답 타입 (기본적으로 같은 구조)
export interface SASBCompanyCombinedResponse extends SASBCombinedKeywordsResponse {
  analysis_type: 'company_combined'
  company: string // 추가된 필드
}

export interface SASBAnalyzedArticle {
  title: string
  description: string
  sentiment: {
    sentiment: '긍정' | '부정' | '중립'
    confidence: number
  }
  // 뉴스 링크 필드들 (실제 API에서 제공될 가능성 있는 필드들)
  url?: string
  link?: string
  original_url?: string
  original_link?: string
  // 기타 메타데이터
  published_at?: string
  source?: string
  author?: string
  // 매칭된 키워드 (새로 추가)
  matched_keywords?: string[]
}

// 대시보드 상태 API 응답 타입
export interface CompanyAnalysisStatus {
  status: 'success' | 'error'
  company: string
  analyzed_at: string
  news_count: number
  analysis_method: string
}

export interface DashboardStatusResponse {
  status: 'running' | 'stopped' | 'error'
  redis_connected: boolean
  monitored_companies: string[]
  last_analysis_at: string
  analysis_results: Record<string, CompanyAnalysisStatus>
  total_success: number
  total_error: number
}

// 뉴스 분석 API 요청 파라미터
export interface NewsAnalysisParams {
  company: string
  start?: number
  display?: number
  sort?: 'date' | 'sim'
  period?: '1d' | '1w' | '1m' | '3m' | '6m' | '1y'
}

// 향후 필요한 API 타입들 (미구현, Mock용)
export interface Company {
  id: string
  name: string
  industry: string
  size: 'large' | 'medium' | 'small'
  esg_score: number
  risk_level: 'low' | 'medium' | 'high' | 'critical'
  last_updated: string
}

export interface Report {
  id: string
  company_id: string
  framework: 'gri' | 'sasb' | 'tcfd' | 'integrated'
  title: string
  data: any
  status: 'draft' | 'in_review' | 'completed' | 'published'
  created_at: string
  updated_at: string
}

export interface DashboardStats {
  totalArticles: number
  analyzedArticles: number
  avgRiskScore: number
  criticalIssues: number
}

// 워크플로우 상태
export interface WorkflowStatus {
  id: string;
  companyName: string;
  reportType: 'GRI' | 'SASB' | 'TCFD';
  currentStage: '초안 작성' | '검토' | '승인' | '발행';
  progress: number; // 0-100
  deadline: string;
  lastUpdated: string;
  assignee: string;
}

// 기업 재무 정보
export interface CompanyFinancials {
  id: string;
  companyName: string;
  revenue: number; // 매출 (억원)
  operatingProfit: number; // 영업이익 (억원)
  debtRatio: number; // 부채비율 (%)
  lastUpdated: string;
  trend: 'up' | 'down' | 'stable';
}

export interface AuthUser {
  id: string
  email: string
  name: string
  role: 'admin' | 'user'
  company_id?: string
}

export interface LoginRequest {
  email: string
  password: string
}

export interface LoginResponse {
  user: AuthUser
  access_token: string
  refresh_token: string
  expires_in: number
} 

// 중대성평가 API 응답 타입 (실제 Swagger 응답 구조)
export interface MaterialityAnalysisResponse {
  analysis_metadata: {
    company_name: string;
    analysis_year: number;
    base_year: number;
    analysis_date: string;
    analysis_type: string;
    status: string;
    disclaimer: string;
  };
  news_analysis_summary: {
    total_articles_analyzed: number;
    analysis_period: string;
    overall_trend: string;
    update_necessity: string;
    confidence_level: number;
  };
  change_analysis: {
    existing_topics: Array<{
      topic_name: string;
      current_priority: number;
      suggested_direction: string;
      suggested_change: number;
      rationale: string;
      confidence: number;
      change_type: string;
      supporting_evidence: string[];
      priority_analysis: {
        previous_priority: number;
        current_mention_rank: number;
        priority_shift: number;
        rank_change_description: string;
        mention_count: number;
        relevant_articles: number;
      };
    }>;
    topic_analysis_summary: {
      total_topics_analyzed: number;
      topics_with_significant_change: number;
      average_confidence: number;
      news_coverage: {
        total_articles_analyzed: number;
        analysis_period: string;
      };
    };
    change_distribution: {
      emerging: number;
      declining: number;
      ongoing?: number;
      maturing?: number;
    };
    significant_changes: number;
  };
  recommendations: Array<{
    type: string;
    topic_name?: string;
    current_priority?: number;
    suggested_action: string;
    rationale: string;
    confidence: number;
    news_evidence?: {
      total_articles: number;
      relevant_articles: number;
      avg_sentiment: string;
    };
    scope?: string;
    priority_shift_details?: {
      previous_priority: number;
      current_mention_rank: number;
      priority_shift: number;
      mention_count: number;
      change_type: string;
    };
  }>;
  action_items: Array<{
    type: string;
    title: string;
    description: string;
    urgency: string;
    estimated_effort: string;
  }>;
  confidence_assessment: {
    overall_confidence_score: number;
    confidence_grade: string;
    data_confidence: number;
    analysis_confidence: number;
    confidence_factors: {
      article_count: number;
      analysis_depth: number;
      data_recency: string;
    };
    recommendations: string[];
  };
}

export interface MaterialityAnalysisParams {
  company_name: string;
  year?: number;
  include_news?: boolean;
  max_articles?: number;
} 