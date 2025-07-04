import { AnalysisResult } from './types';

/**
 * 분석 결과의 위험도를 평가합니다.
 * @param analysis - 분석 결과 객체
 * @returns 'High' | 'Medium' | 'Low'
 */
export function getRiskLevel(analysis: AnalysisResult): 'High' | 'Medium' | 'Low' {
  if (analysis.risk_score > 70) {
    return 'High';
  }
  if (analysis.risk_score > 40) {
    return 'Medium';
  }
  return 'Low';
} 