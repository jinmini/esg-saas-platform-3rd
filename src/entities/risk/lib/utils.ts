// 리스크 엔티티 유틸리티 함수

import { RiskLevel } from '../model/types';
import { RISK_DISPLAY_CONFIG } from '../model/config';

/**
 * 리스크 레벨에 따른 색상 반환
 */
export function getRiskColor(level: RiskLevel): string {
  return RISK_DISPLAY_CONFIG.colors[level];
}

/**
 * 리스크 레벨에 따른 배경색 반환
 */
export function getRiskBackgroundColor(level: RiskLevel): string {
  return RISK_DISPLAY_CONFIG.backgroundColors[level];
}

/**
 * 리스크 레벨의 한글 라벨 반환
 */
export function getRiskLabel(level: RiskLevel): string {
  return RISK_DISPLAY_CONFIG.labels[level];
}

/**
 * 리스크 레벨에 따른 아이콘 반환
 */
export function getRiskIcon(level: RiskLevel): string {
  return RISK_DISPLAY_CONFIG.icons[level];
}

/**
 * 리스크 점수를 백분율로 포맷팅
 */
export function formatRiskScore(score: number): string {
  return `${Math.round(score * 100)}%`;
}

/**
 * 리스크 점수를 레벨로 변환 (레거시 호환성)
 */
export function getRiskLevel(score: number): RiskLevel {
  if (score >= 0.8) return 'critical';
  if (score >= 0.6) return 'high';
  if (score >= 0.4) return 'medium';
  return 'low';
}

/**
 * 리스크 트렌드 계산 (레거시 호환성)
 */
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