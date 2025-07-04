// 리스크 엔티티 공개 API

// 타입
export type { 
  RiskLevel, 
  RiskScore, 
  RiskTrendData, 
  RiskCalculationConfig, 
  RiskDisplayConfig 
} from './model/types';

// 엔티티 클래스
export { Risk } from './model/risk';

// 설정
export { RISK_CALCULATION_CONFIG, RISK_DISPLAY_CONFIG } from './model/config';

// 유틸리티 함수
export {
  getRiskColor,
  getRiskBackgroundColor,
  getRiskLabel,
  getRiskIcon,
  formatRiskScore,
  getRiskLevel,
  calculateRiskTrend,
} from './lib/utils'; 