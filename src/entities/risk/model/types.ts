// 리스크 엔티티 타입 정의

export type RiskLevel = 'low' | 'medium' | 'high' | 'critical';

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

export interface RiskTrendData {
  date: string;
  environmental: number;
  social: number;
  governance: number;
  overall: number;
}

export interface RiskCalculationConfig {
  categoryWeights: Record<string, number>;
  industryWeights: Record<string, Record<string, number>>;
  levelThresholds: {
    critical: number;
    high: number;
    medium: number;
  };
}

export interface RiskDisplayConfig {
  colors: Record<RiskLevel, string>;
  backgroundColors: Record<RiskLevel, string>;
  labels: Record<RiskLevel, string>;
  icons: Record<RiskLevel, string>;
} 