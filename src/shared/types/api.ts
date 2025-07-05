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