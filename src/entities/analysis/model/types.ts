// analysis 엔티티 관련 타입 정의

export interface AnalysisResult {
  id: string;
  company_name: string;
  article_id: string;
  article_title: string;
  article_content: string;
  analysis_date: string;
  risk_score: number;
  sentiment: 'positive' | 'negative' | 'neutral';
  esg_topics: string[];
  summary: string;
}

export interface AnalysisFilter {
  risk_level?: 'low' | 'medium' | 'high' | 'critical';
  sentiment?: 'positive' | 'negative' | 'neutral';
  start_date?: string;
  end_date?: string;
}

export interface AnalysisStats {
  total: number;
  byRiskLevel: Record<string, number>;
  bySentiment: Record<string, number>;
  bySASB: Record<string, number>;
  avgRiskScore: number;
} 