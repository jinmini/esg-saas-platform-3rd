// Company 엔티티의 핵심 비즈니스 로직

import { Company } from './types';
import { COMPANY_CONFIG } from './config';

/**
 * Company 관련 비즈니스 로직을 처리하는 클래스 (또는 함수 모음)
 */
export class CompanyEntity {
  private readonly company: Company;

  constructor(company: Company) {
    this.company = company;
  }

  /**
   * 산업별 가중치를 적용한 리스크 점수를 계산합니다.
   * (이 로직은 예시이며, 실제 구현은 달라질 수 있습니다.)
   */
  getWeightedRiskScore(): number {
    const weight = COMPANY_CONFIG.industryRiskWeights[this.company.industry] || 1.0;
    // esg_score가 0-100 범위라고 가정하고 0-1로 정규화
    const normalizedScore = this.company.esg_score / 100;
    return Math.min(normalizedScore * weight, 1.0);
  }

  /**
   * 회사의 전체적인 프로필을 요약해서 반환합니다.
   */
  getProfileSummary(): string {
    return `${this.company.name}은(는) ${this.company.industry} 산업에 속한 기업으로, ${this.company.founded_year}년에 설립되었습니다.`;
  }
} 