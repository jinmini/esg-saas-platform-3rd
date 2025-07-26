// API 공통 타입
export interface ApiResponse<T> {
  success: boolean
  data: T
  message?: string
  error?: string
}

// 페이지네이션 요청 파라미터
export interface PaginationParams {
  page?: number
  limit?: number
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
}

// 페이지네이션 응답 타입은 shared/types/index.ts에서 import 사용

// 리스크 관련 타입들
export interface RiskScore {
  companyId: string;
  score: number;
  level: 'low' | 'medium' | 'high' | 'critical';
  lastUpdated: string;
}

export interface RiskTrendData {
  date: string;
  score: number;
  level: 'low' | 'medium' | 'high' | 'critical';
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
  esg_category: '환경(E)' | '사회(S)' | '지배구조(G)' | '통합ESG' | '기타'
  confidence_score: number
  keywords: string[]
  classification_method: string
}

export interface SentimentAnalysis {
  sentiment: '긍정' | '부정' | '중립';
  confidence: number;
  analysis_method: 'keyword_based' | 'ml_based';
}

export interface CombinedKeywordArticle {
  title: string;
  description: string;
  link: string;
  sentiment: SentimentAnalysis;
  matched_keywords?: string[]; // 해당 기사를 찾은 키워드 조합
}

export interface CombinedKeywordsResponse {
  task_id: string;
  status: 'completed' | 'in_progress' | 'failed';
  searched_keywords: string[];
  total_articles_found: number;
  analysis_type: 'combined_keywords';
  analyzed_articles: CombinedKeywordArticle[];
}

// 조합 키워드 검색 API 요청 파라미터
export interface CombinedKeywordsParams {
  max_results?: number;
}

// 회사별 조합 검색 API 응답 타입
export interface CompanyCombinedResponse {
  task_id: string;
  status: 'completed' | 'in_progress' | 'failed';
  company: string;
  searched_keywords: string[];
  total_articles_found: number;
  analysis_type: 'company_combined';
  analyzed_articles: CombinedKeywordArticle[];
}

// 회사별 조합 검색 API 요청 파라미터
export interface CompanyCombinedParams {
  company: string;
  max_results?: number;
}

// MVP 지원 회사 목록
export const SUPPORTED_COMPANIES = [
  '두산퓨얼셀',
  'LS ELECTRIC', 
  '한국중부발전'
] as const;

export type SupportedCompany = typeof SUPPORTED_COMPANIES[number];

// 중대성 분석 API 관련 타입 (실제 API 응답 구조에 맞게 수정)
export interface MaterialityAnalysisMetadata {
  company_name: string;
  analysis_year: number;
  base_year: number;
  analysis_date: string;
  analysis_type: string;
  status: string;
  disclaimer: string;
}

export interface NewsAnalysisSummary {
  total_articles_analyzed: number;
  analysis_period: string;
  overall_trend: string;
  update_necessity: string;
  confidence_level: number;
}

export interface ExistingTopic {
  topic_name: string;
  current_priority: number;
  suggested_direction: string;
  suggested_change: number;
  rationale: string;
  confidence: number;
  change_type: string;
  supporting_evidence: string[];
}

export interface TopicAnalysisSummary {
  total_topics_analyzed: number;
  topics_with_significant_change: number;
  average_confidence: number;
  news_coverage: {
    total_articles_analyzed: number;
    analysis_period: string;
  };
}

export interface ChangeDistribution {
  moderate_decrease: number;
  stable: number;
  emerging: number;
  declining: number;
}

export interface ChangeAnalysis {
  existing_topics: ExistingTopic[];
  topic_analysis_summary: TopicAnalysisSummary;
  change_distribution: ChangeDistribution;
  significant_changes: number;
}

export interface MaterialityRecommendation {
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
}

export interface ActionItem {
  type: string;
  title: string;
  description: string;
  urgency: string;
  estimated_effort: string;
}

export interface ConfidenceAssessment {
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
}

export interface MaterialityAnalysisResponse {
  analysis_metadata: MaterialityAnalysisMetadata;
  news_analysis_summary: NewsAnalysisSummary;
  change_analysis: ChangeAnalysis;
  recommendations: MaterialityRecommendation[];
  action_items: ActionItem[];
  confidence_assessment: ConfidenceAssessment;
}

// 중대성 분석 API 요청 파라미터
export interface MaterialityAnalysisParams {
  company_name: string;
  year?: number;
  include_news?: boolean;
  max_articles?: number;
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