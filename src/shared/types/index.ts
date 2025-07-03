// ESG Risk Analyzer 타입 정의

// 기본 타입
export interface Company {
  id: string;
  name: string;
  industry: string;
  ticker?: string;
  description?: string;
  logoUrl?: string;
}

// SASB 분류
export interface SASBClassification {
  category: string;
  score: number;
  description?: string;
}

// 감성 분석
export interface SentimentAnalysis {
  sentiment: '긍정' | '부정' | '중립';
  score: number;
  confidence: string;
  risk_score: number;
}

// 개체명
export interface Entity {
  text: string;
  type: string;
  start?: number;
  end?: number;
}

// 기사 분석 결과
export interface AnalysisResult {
  id: string;
  articleId: string;
  title: string;
  content: string;
  url: string;
  source: string;
  publishedAt: string;
  analyzedAt: string;
  
  // 분석 결과
  sasbClassifications: SASBClassification[];
  sentiment: SentimentAnalysis;
  entities: Entity[];
  overallRiskScore: number;
  
  // 기업 정보
  companies: string[];
  primaryCompany?: string;
}

// 리스크 레벨
export type RiskLevel = 'low' | 'medium' | 'high' | 'critical';

// 리스크 점수
export interface RiskScore {
  score: number;
  level: RiskLevel;
  trend: number; // 변화율 (-100 ~ 100)
  factors: {
    environmental: number;
    social: number;
    governance: number;
  };
}

// 대시보드 통계
export interface DashboardStats {
  totalArticles: number;
  analyzedArticles: number;
  avgRiskScore: number;
  criticalIssues: number;
  topRiskCompanies: CompanyRisk[];
  recentAnalyses: AnalysisResult[];
  riskTrend: RiskTrendData[];
}

// 기업별 리스크
export interface CompanyRisk {
  company: Company;
  riskScore: RiskScore;
  issueCount: number;
  lastAnalyzedAt: string;
  topIssues: string[];
}

// 리스크 추이 데이터
export interface RiskTrendData {
  date: string;
  environmental: number;
  social: number;
  governance: number;
  overall: number;
}

// 크롤링 작업
export interface CrawlJob {
  id: string;
  status: 'pending' | 'running' | 'completed' | 'failed';
  keywords: string[];
  pages: number;
  startedAt?: string;
  completedAt?: string;
  totalArticles: number;
  analyzedArticles: number;
  error?: string;
}

// API 응답
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// 페이지네이션
export interface PaginationParams {
  page: number;
  limit: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}

// 필터
export interface AnalysisFilter {
  companies?: string[];
  startDate?: string;
  endDate?: string;
  riskLevel?: RiskLevel[];
  sasbCategories?: string[];
  sentiment?: ('긍정' | '부정' | '중립')[];
  sources?: string[];
}

// 차트 데이터
export interface ChartDataPoint {
  name: string;
  value: number;
  [key: string]: string | number;
}

// 알림
export interface Notification {
  id: string;
  type: 'info' | 'warning' | 'error' | 'success';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  link?: string;
}

// 사용자 설정
export interface UserPreferences {
  theme: 'light' | 'dark' | 'system';
  language: 'ko' | 'en';
  notifications: {
    email: boolean;
    browser: boolean;
    riskThreshold: number;
  };
  dashboard: {
    defaultView: 'grid' | 'list';
    refreshInterval: number; // seconds
  };
}
