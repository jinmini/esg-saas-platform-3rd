// 리스크 엔티티 설정

import { RiskCalculationConfig, RiskDisplayConfig } from './types';

// 리스크 계산 설정
export const RISK_CALCULATION_CONFIG: RiskCalculationConfig = {
  levelThresholds: {
    critical: 0.8,
    high: 0.6,
    medium: 0.4,
  },
  categoryWeights: {
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
  },
  industryWeights: {
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
  },
};

// 리스크 표시 설정
export const RISK_DISPLAY_CONFIG: RiskDisplayConfig = {
  colors: {
    low: '#10b981',      // green-500
    medium: '#f59e0b',   // amber-500
    high: '#ef4444',     // red-500
    critical: '#991b1b', // red-800
  },
  backgroundColors: {
    low: '#d1fae5',      // green-100
    medium: '#fef3c7',   // amber-100
    high: '#fee2e2',     // red-100
    critical: '#fca5a5', // red-300
  },
  labels: {
    low: '낮음',
    medium: '보통',
    high: '높음',
    critical: '심각',
  },
  icons: {
    low: 'check-circle',
    medium: 'alert-circle',
    high: 'alert-triangle',
    critical: 'x-octagon',
  },
}; 