// 리스크 관련 유틸리티 함수

import { RiskLevel } from '@/types';

// 리스크 점수를 레벨로 변환
export function getRiskLevel(score: number): RiskLevel {
  if (score >= 0.8) return 'critical';
  if (score >= 0.6) return 'high';
  if (score >= 0.4) return 'medium';
  return 'low';
}

// 리스크 레벨별 색상
export function getRiskColor(level: RiskLevel): string {
  const colors = {
    low: '#10b981',      // green-500
    medium: '#f59e0b',   // amber-500
    high: '#ef4444',     // red-500
    critical: '#991b1b', // red-800
  };
  return colors[level];
}

// 리스크 레벨별 배경색 (연한 색)
export function getRiskBgColor(level: RiskLevel): string {
  const colors = {
    low: '#d1fae5',      // green-100
    medium: '#fef3c7',   // amber-100
    high: '#fee2e2',     // red-100
    critical: '#fca5a5', // red-300
  };
  return colors[level];
}

// 리스크 레벨 한글 표시
export function getRiskLevelText(level: RiskLevel): string {
  const texts = {
    low: '낮음',
    medium: '보통',
    high: '높음',
    critical: '심각',
  };
  return texts[level];
}

// 리스크 점수 포맷팅
export function formatRiskScore(score: number): string {
  return `${Math.round(score * 100)}%`;
}

// 리스크 트렌드 계산
export function calculateRiskTrend(current: number, previous: number): {
  trend: 'up' | 'down' | 'stable';
  percentage: number;
} {
  if (!previous || previous === 0) {
    return { trend: 'stable', percentage: 0 };
  }
  
  const change = ((current - previous) / previous) * 100;
  const trend = change > 1 ? 'up' : change < -1 ? 'down' : 'stable';
  
  return {
    trend,
    percentage: Math.abs(Math.round(change)),
  };
}

// 리스크 점수별 아이콘
export function getRiskIcon(level: RiskLevel): string {
  const icons = {
    low: 'check-circle',
    medium: 'alert-circle',
    high: 'alert-triangle',
    critical: 'x-octagon',
  };
  return icons[level];
}

// ESG 카테고리별 리스크 가중치
export function getESGCategoryWeight(category: string): number {
  const weights: Record<string, number> = {
    '온실가스 배출': 1.5,
    '대기 품질': 1.2,
    '에너지 관리': 1.3,
    '용수 및 폐수 관리': 1.1,
    '폐기물 및 유해물질 관리': 1.2,
    '생태계 영향': 1.0,
    '인적 자본 관리': 1.2,
    '제품 안전 및 품질': 1.4,
    '고객 개인정보 보호': 1.4,
    '데이터 보안': 1.5,
    '비즈니스 윤리': 1.5,
    '경쟁 행위': 1.3,
    '규제 준수': 1.4,
    '리스크 관리': 1.2,
    '공급망 관리': 1.1,
    '자원 효율성': 1.0,
  };
  
  return weights[category] || 1.0;
}

// 산업별 리스크 조정
export function adjustRiskByIndustry(baseScore: number, industry: string, category: string): number {
  const industryWeights: Record<string, Record<string, number>> = {
    '에너지': {
      '온실가스 배출': 2.0,
      '대기 품질': 1.8,
      '에너지 관리': 1.5,
    },
    'IT/테크': {
      '데이터 보안': 2.0,
      '고객 개인정보 보호': 1.8,
      '비즈니스 윤리': 1.5,
    },
    '제조업': {
      '폐기물 및 유해물질 관리': 1.8,
      '제품 안전 및 품질': 1.6,
      '용수 및 폐수 관리': 1.5,
    },
    '금융': {
      '데이터 보안': 1.8,
      '비즈니스 윤리': 1.7,
      '규제 준수': 1.6,
    },
  };
  
  const weight = industryWeights[industry]?.[category] || 1.0;
  return Math.min(baseScore * weight, 1.0);
}
