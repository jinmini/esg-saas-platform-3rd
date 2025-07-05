// Company 관련 타입 정의
export interface Company {
  id: string;
  name: string;
  industry: string;
  location: string;
  founded_year: number;
  description: string;
  website: string;
  contact: string;
  size: 'small' | 'medium' | 'large';
  esg_score: number;
  risk_level: 'low' | 'medium' | 'high' | 'critical';
  last_updated: string;
}

export interface CompanyFilter {
  industry?: string;
  riskLevel?: 'low' | 'medium' | 'high' | 'critical';
  searchTerm?: string;
  size?: 'small' | 'medium' | 'large';
}

export interface CompanyStats {
  total: number;
  byIndustry: Record<string, number>;
  byRiskLevel: Record<string, number>;
  avgRiskScore: number;
} 