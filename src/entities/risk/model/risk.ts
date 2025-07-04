// 리스크 엔티티 핵심 로직

import { RiskLevel } from './types';
import { RISK_CALCULATION_CONFIG } from './config';

/**
 * 리스크 엔티티 클래스
 * 리스크 점수 계산과 레벨 결정의 핵심 비즈니스 로직을 담당
 */
export class Risk {
  private readonly score: number;
  private readonly level: RiskLevel;

  constructor(score: number) {
    this.score = Math.max(0, Math.min(1, score)); // 0-1 범위로 제한
    this.level = this.calculateLevel(this.score);
  }

  /**
   * 리스크 점수를 기반으로 레벨을 계산
   */
  private calculateLevel(score: number): RiskLevel {
    const { levelThresholds } = RISK_CALCULATION_CONFIG;
    
    if (score >= levelThresholds.critical) return 'critical';
    if (score >= levelThresholds.high) return 'high';
    if (score >= levelThresholds.medium) return 'medium';
    return 'low';
  }

  /**
   * 리스크 점수 반환
   */
  getScore(): number {
    return this.score;
  }

  /**
   * 리스크 레벨 반환
   */
  getLevel(): RiskLevel {
    return this.level;
  }

  /**
   * 두 리스크 간의 트렌드 계산
   */
  calculateTrend(previousRisk: Risk | null): {
    trend: 'up' | 'down' | 'stable';
    percentage: number;
  } {
    if (!previousRisk || previousRisk.score === 0) {
      return { trend: 'stable', percentage: 0 };
    }
    
    const change = ((this.score - previousRisk.score) / previousRisk.score) * 100;
    const trend = change > 1 ? 'up' : change < -1 ? 'down' : 'stable';
    
    return {
      trend,
      percentage: Math.abs(Math.round(change)),
    };
  }

  /**
   * ESG 카테고리 가중치 적용
   */
  applyESGCategoryWeight(category: string): Risk {
    const { categoryWeights } = RISK_CALCULATION_CONFIG;
    const weight = categoryWeights[category] || 1.0;
    const weightedScore = Math.min(this.score * weight, 1.0);
    
    return new Risk(weightedScore);
  }

  /**
   * 산업별 가중치 적용
   */
  applyIndustryWeight(industry: string, category: string): Risk {
    const { industryWeights } = RISK_CALCULATION_CONFIG;
    const weight = industryWeights[industry]?.[category] || 1.0;
    const weightedScore = Math.min(this.score * weight, 1.0);
    
    return new Risk(weightedScore);
  }

  /**
   * 리스크 비교
   */
  isHigherThan(other: Risk): boolean {
    return this.score > other.score;
  }

  /**
   * 리스크 등급 비교
   */
  isSameLevelAs(other: Risk): boolean {
    return this.level === other.level;
  }

  /**
   * 정적 팩토리 메서드들
   */
  static fromScore(score: number): Risk {
    return new Risk(score);
  }

  static fromPercentage(percentage: number): Risk {
    return new Risk(percentage / 100);
  }

  static low(): Risk {
    return new Risk(0.2);
  }

  static medium(): Risk {
    return new Risk(0.5);
  }

  static high(): Risk {
    return new Risk(0.7);
  }

  static critical(): Risk {
    return new Risk(0.9);
  }
} 