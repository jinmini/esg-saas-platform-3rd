import { describe, it, expect } from 'vitest'
import {
  getRiskLevel,
  getRiskColor,
  getRiskBgColor,
  getRiskLevelText,
  formatRiskScore,
  calculateRiskTrend,
  getRiskIcon,
  getESGCategoryWeight,
  adjustRiskByIndustry,
  getRiskLabel,
  Risk,
  RISK_CALCULATION_CONFIG
} from '@/entities/risk'

describe('리스크 유틸리티 함수', () => {
  describe('getRiskLevel', () => {
    it('점수에 따라 올바른 리스크 레벨을 반환해야 한다', () => {
      expect(getRiskLevel(0.9)).toBe('critical')
      expect(getRiskLevel(0.8)).toBe('critical')
      expect(getRiskLevel(0.7)).toBe('high')
      expect(getRiskLevel(0.6)).toBe('high')
      expect(getRiskLevel(0.5)).toBe('medium')
      expect(getRiskLevel(0.4)).toBe('medium')
      expect(getRiskLevel(0.3)).toBe('low')
      expect(getRiskLevel(0.1)).toBe('low')
      expect(getRiskLevel(0)).toBe('low')
    })

    it('경계값을 정확히 처리해야 한다', () => {
      expect(getRiskLevel(0.8)).toBe('critical')
      expect(getRiskLevel(0.79999)).toBe('high')
      expect(getRiskLevel(0.6)).toBe('high')
      expect(getRiskLevel(0.59999)).toBe('medium')
      expect(getRiskLevel(0.4)).toBe('medium')
      expect(getRiskLevel(0.39999)).toBe('low')
    })
  })

  describe('getRiskColor', () => {
    it('각 리스크 레벨에 대해 올바른 색상을 반환해야 한다', () => {
      expect(getRiskColor('low')).toBe('#10b981')
      expect(getRiskColor('medium')).toBe('#f59e0b')
      expect(getRiskColor('high')).toBe('#ef4444')
      expect(getRiskColor('critical')).toBe('#991b1b')
    })

    it('should handle edge cases', () => {
      expect(getRiskColor('low')).toBeTruthy()
      expect(getRiskColor('medium')).toBeTruthy()
      expect(getRiskColor('high')).toBeTruthy()
      expect(getRiskColor('critical')).toBeTruthy()
    })
  })

  describe('getRiskBgColor', () => {
    it('각 리스크 레벨에 대해 올바른 배경색을 반환해야 한다', () => {
      expect(getRiskBgColor('low')).toBe('#d1fae5')
      expect(getRiskBgColor('medium')).toBe('#fef3c7')
      expect(getRiskBgColor('high')).toBe('#fee2e2')
      expect(getRiskBgColor('critical')).toBe('#fca5a5')
    })
  })

  describe('getRiskLevelText', () => {
    it('각 리스크 레벨에 대해 한국어 텍스트를 반환해야 한다', () => {
      expect(getRiskLevelText('low')).toBe('낮음')
      expect(getRiskLevelText('medium')).toBe('보통')
      expect(getRiskLevelText('high')).toBe('높음')
      expect(getRiskLevelText('critical')).toBe('심각')
    })
  })

  describe('formatRiskScore', () => {
    it('점수를 퍼센트 형식으로 포맷해야 한다', () => {
      expect(formatRiskScore(0.75)).toBe('75%')
      expect(formatRiskScore(0.5)).toBe('50%')
      expect(formatRiskScore(0.123)).toBe('12%')
      expect(formatRiskScore(1)).toBe('100%')
      expect(formatRiskScore(0)).toBe('0%')
    })

    it('소수점을 반올림해야 한다', () => {
      expect(formatRiskScore(0.756)).toBe('76%')
      expect(formatRiskScore(0.123)).toBe('12%')
      expect(formatRiskScore(0.999)).toBe('100%')
    })
  })

  describe('calculateRiskTrend', () => {
    it('상승 트렌드를 올바르게 계산해야 한다', () => {
      const result = calculateRiskTrend(0.75, 0.5)
      expect(result.trend).toBe('up')
      expect(result.percentage).toBe(50)
    })

    it('하락 트렌드를 올바르게 계산해야 한다', () => {
      const result = calculateRiskTrend(0.5, 0.75)
      expect(result.trend).toBe('down')
      expect(result.percentage).toBe(33)
    })

    it('안정 트렌드를 올바르게 계산해야 한다', () => {
      const result = calculateRiskTrend(0.5, 0.505) // 1% 미만 변화
      expect(result.trend).toBe('stable')
      expect(result.percentage).toBe(1)
    })

    it('이전 값이 0이거나 없을 때 안정으로 처리해야 한다', () => {
      expect(calculateRiskTrend(0.5, 0)).toEqual({ trend: 'stable', percentage: 0 })
      expect(calculateRiskTrend(0.5, undefined as any)).toEqual({ trend: 'stable', percentage: 0 })
    })

    it('경계값을 정확히 처리해야 한다', () => {
      // 정확히 1% 변화
      expect(calculateRiskTrend(0.51, 0.5).trend).toBe('stable')
      // 1% 초과 변화
      expect(calculateRiskTrend(0.511, 0.5).trend).toBe('up')
      expect(calculateRiskTrend(0.489, 0.5).trend).toBe('down')
    })
  })

  describe('getRiskIcon', () => {
    it('각 리스크 레벨에 대해 올바른 아이콘을 반환해야 한다', () => {
      expect(getRiskIcon('low')).toBe('check-circle')
      expect(getRiskIcon('medium')).toBe('alert-circle')
      expect(getRiskIcon('high')).toBe('alert-triangle')
      expect(getRiskIcon('critical')).toBe('x-octagon')
    })
  })

  describe('getESGCategoryWeight', () => {
    it('알려진 ESG 카테고리에 대해 올바른 가중치를 반환해야 한다', () => {
      expect(getESGCategoryWeight('온실가스 배출')).toBe(1.5)
      expect(getESGCategoryWeight('대기 품질')).toBe(1.2)
      expect(getESGCategoryWeight('에너지 관리')).toBe(1.3)
      expect(getESGCategoryWeight('데이터 보안')).toBe(1.5)
      expect(getESGCategoryWeight('비즈니스 윤리')).toBe(1.5)
    })

    it('알려지지 않은 카테고리에 대해 기본값 1.0을 반환해야 한다', () => {
      expect(getESGCategoryWeight('알 수 없는 카테고리')).toBe(1.0)
      expect(getESGCategoryWeight('')).toBe(1.0)
    })

    it('중요도가 낮은 카테고리에 대해 1.0 가중치를 반환해야 한다', () => {
      expect(getESGCategoryWeight('생태계 영향')).toBe(1.0)
      expect(getESGCategoryWeight('자원 효율성')).toBe(1.0)
    })
  })

  describe('adjustRiskByIndustry', () => {
    it('에너지 산업의 리스크를 올바르게 조정해야 한다', () => {
      const baseScore = 0.5
      const result = adjustRiskByIndustry(baseScore, '에너지', '온실가스 배출')
      expect(result).toBe(1.0) // 0.5 * 2.0, but capped at 1.0
    })

    it('IT/테크 산업의 데이터 보안 리스크를 올바르게 조정해야 한다', () => {
      const baseScore = 0.3
      const result = adjustRiskByIndustry(baseScore, 'IT/테크', '데이터 보안')
      expect(result).toBe(0.6) // 0.3 * 2.0
    })

    it('제조업의 폐기물 관리 리스크를 올바르게 조정해야 한다', () => {
      const baseScore = 0.4
      const result = adjustRiskByIndustry(baseScore, '제조업', '폐기물 및 유해물질 관리')
      expect(result).toBe(0.72) // 0.4 * 1.8
    })

    it('금융업의 비즈니스 윤리 리스크를 올바르게 조정해야 한다', () => {
      const baseScore = 0.3
      const result = adjustRiskByIndustry(baseScore, '금융', '비즈니스 윤리')
      expect(result).toBe(0.51) // 0.3 * 1.7
    })

    it('알려지지 않은 산업이나 카테고리에 대해 기본값을 적용해야 한다', () => {
      const baseScore = 0.5
      expect(adjustRiskByIndustry(baseScore, '알 수 없는 산업', '온실가스 배출')).toBe(0.5)
      expect(adjustRiskByIndustry(baseScore, '에너지', '알 수 없는 카테고리')).toBe(0.5)
    })

    it('최대값 1.0을 초과하지 않아야 한다', () => {
      const baseScore = 0.8
      const result = adjustRiskByIndustry(baseScore, '에너지', '온실가스 배출')
      expect(result).toBe(1.0) // 0.8 * 2.0 = 1.6, but capped at 1.0
    })

    it('0 점수를 올바르게 처리해야 한다', () => {
      const result = adjustRiskByIndustry(0, '에너지', '온실가스 배출')
      expect(result).toBe(0)
    })
  })
})

describe('Risk Entity', () => {
  describe('Risk Class', () => {
    it('should create risk with correct level', () => {
      const lowRisk = Risk.fromScore(0.2)
      expect(lowRisk.getLevel()).toBe('low')
      expect(lowRisk.getScore()).toBe(0.2)

      const mediumRisk = Risk.fromScore(0.5)
      expect(mediumRisk.getLevel()).toBe('medium')

      const highRisk = Risk.fromScore(0.7)
      expect(highRisk.getLevel()).toBe('high')

      const criticalRisk = Risk.fromScore(0.9)
      expect(criticalRisk.getLevel()).toBe('critical')
    })

    it('should calculate trend correctly', () => {
      const currentRisk = Risk.fromScore(0.7)
      const previousRisk = Risk.fromScore(0.5)
      
      const trend = currentRisk.calculateTrend(previousRisk)
      expect(trend.trend).toBe('up')
      expect(trend.percentage).toBe(40)
    })

    it('should apply category weights', () => {
      const baseRisk = Risk.fromScore(0.5)
      const weightedRisk = baseRisk.applyESGCategoryWeight('온실가스 배출')
      
      expect(weightedRisk.getScore()).toBe(0.75) // 0.5 * 1.5
      expect(weightedRisk.getLevel()).toBe('high')
    })
  })

  describe('getRiskLabel', () => {
    it('should return correct Korean labels', () => {
      expect(getRiskLabel('low')).toBe('낮음')
      expect(getRiskLabel('medium')).toBe('보통')
      expect(getRiskLabel('high')).toBe('높음')
      expect(getRiskLabel('critical')).toBe('심각')
    })
  })

  describe('Configuration', () => {
    it('should have correct category weights', () => {
      const { categoryWeights } = RISK_CALCULATION_CONFIG
      expect(categoryWeights['온실가스 배출']).toBe(1.5)
      expect(categoryWeights['대기 품질']).toBe(1.2)
      expect(categoryWeights['에너지 관리']).toBe(1.3)
      expect(categoryWeights['데이터 보안']).toBe(1.5)
      expect(categoryWeights['비즈니스 윤리']).toBe(1.5)
    })

    it('should have correct level thresholds', () => {
      const { levelThresholds } = RISK_CALCULATION_CONFIG
      expect(levelThresholds.critical).toBe(0.8)
      expect(levelThresholds.high).toBe(0.6)
      expect(levelThresholds.medium).toBe(0.4)
    })
  })
}) 