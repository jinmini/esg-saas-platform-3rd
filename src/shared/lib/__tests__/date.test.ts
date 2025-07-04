import { describe, it, expect, beforeEach, vi } from 'vitest'
import {
  // 레거시 함수들 (하위 호환성)
  formatDate,
  formatTimeAgo,
  formatDateTime,
  formatShortDate,
  formatMonth,
  formatChartDate,
  formatDateRange,
  getToday,
  getYesterday,
  getDaysAgo,
  getThisWeekStart,
  getThisMonthStart,
  toISODateString,
  // 새로운 함수들
  parseDate,
  toDate,
  formatKoreanDate,
  formatKoreanTimeAgo,
  formatKoreanDateTime,
  getCurrentDate,
  getWeekStart,
  getMonthStart
} from '../date'

describe('날짜 유틸리티 함수', () => {
  const testDate = new Date('2025-01-15T10:30:00Z')
  const testDateString = '2025-01-15T10:30:00Z'

  beforeEach(() => {
    // 테스트 시간을 고정하여 일관된 결과 보장
    vi.setSystemTime(testDate)
  })

  describe('parseDate (새로운 함수)', () => {
    it('유효한 ISO 날짜를 파싱해야 한다', () => {
      const result = parseDate(testDateString)
      expect(result).toBeInstanceOf(Date)
      expect(result?.getTime()).toBe(testDate.getTime())
    })

    it('유효한 일반 날짜를 파싱해야 한다', () => {
      const result = parseDate('2025-01-15')
      expect(result).toBeInstanceOf(Date)
    })

    it('잘못된 날짜에 대해 null을 반환해야 한다', () => {
      const result = parseDate('invalid-date')
      expect(result).toBeNull()
    })
  })

  describe('toDate (새로운 함수)', () => {
    it('Date 객체를 그대로 반환해야 한다', () => {
      const result = toDate(testDate)
      expect(result).toBe(testDate)
    })

    it('유효한 날짜 문자열을 Date로 변환해야 한다', () => {
      const result = toDate(testDateString)
      expect(result).toBeInstanceOf(Date)
      expect(result?.getTime()).toBe(testDate.getTime())
    })

    it('잘못된 Date 객체에 대해 null을 반환해야 한다', () => {
      const invalidDate = new Date('invalid')
      const result = toDate(invalidDate)
      expect(result).toBeNull()
    })
  })

  describe('formatKoreanDate (새로운 함수)', () => {
    it('기본 형식으로 날짜를 포맷해야 한다', () => {
      const result = formatKoreanDate(testDate)
      expect(result).toBe('2025-01-15')
    })

    it('잘못된 날짜에 대해 빈 문자열을 반환해야 한다', () => {
      const result = formatKoreanDate('invalid-date')
      expect(result).toBe('')
    })
  })

  describe('레거시 함수들 (하위 호환성)', () => {
    describe('formatDate', () => {
      it('기본 형식으로 날짜를 포맷해야 한다', () => {
        const result = formatDate(testDate)
        expect(result).toBe('2025-01-15')
      })

      it('커스텀 형식으로 날짜를 포맷해야 한다', () => {
        const result = formatDate(testDate, 'yyyy년 MM월 dd일')
        expect(result).toBe('2025년 01월 15일')
      })

      it('문자열 날짜를 처리해야 한다', () => {
        const result = formatDate(testDateString)
        expect(result).toBe('2025-01-15')
      })

      it('잘못된 날짜에 대해 빈 문자열을 반환해야 한다', () => {
        const result = formatDate('invalid-date')
        expect(result).toBe('')
      })
    })

    describe('formatTimeAgo', () => {
      it('시간 차이를 한국어로 표시해야 한다', () => {
        const oneHourAgo = new Date(testDate.getTime() - 60 * 60 * 1000)
        const result = formatTimeAgo(oneHourAgo)
        expect(result).toContain('시간') // "1시간 전" 형태
      })

      it('미래 시간에 대해서도 처리해야 한다', () => {
        const oneHourLater = new Date(testDate.getTime() + 60 * 60 * 1000)
        const result = formatTimeAgo(oneHourLater)
        expect(result).toContain('후') // "1시간 후" 형태
      })
    })

    describe('formatDateTime', () => {
      it('오늘 날짜는 "오늘 HH:mm" 형식으로 표시해야 한다', () => {
        const result = formatDateTime(testDate)
        expect(result).toMatch(/^오늘 \d{2}:\d{2}$/)
      })

      it('어제 날짜는 "어제 HH:mm" 형식으로 표시해야 한다', () => {
        const yesterday = new Date(testDate.getTime() - 24 * 60 * 60 * 1000)
        const result = formatDateTime(yesterday)
        expect(result).toMatch(/^어제 \d{2}:\d{2}$/)
      })

      it('오래된 날짜는 전체 형식으로 표시해야 한다', () => {
        const oldDate = new Date('2024-12-01T10:30:00Z')
        const result = formatDateTime(oldDate)
        expect(result).toBe('2024년 12월 01일 10:30')
      })
    })

    describe('formatShortDate', () => {
      it('MM/dd 형식으로 표시해야 한다', () => {
        const result = formatShortDate(testDate)
        expect(result).toBe('01/15')
      })
    })

    describe('formatMonth', () => {
      it('yyyy년 MM월 형식으로 표시해야 한다', () => {
        const result = formatMonth(testDate)
        expect(result).toBe('2025년 01월')
      })
    })

    describe('formatChartDate', () => {
      it('daily 간격으로 MM/dd 형식을 반환해야 한다', () => {
        const result = formatChartDate(testDate, 'daily')
        expect(result).toBe('01/15')
      })

      it('weekly 간격으로 MM/dd 형식을 반환해야 한다', () => {
        const result = formatChartDate(testDate, 'weekly')
        expect(result).toBe('01/15')
      })

      it('monthly 간격으로 yyyy/MM 형식을 반환해야 한다', () => {
        const result = formatChartDate(testDate, 'monthly')
        expect(result).toBe('2025/01')
      })
    })

    describe('formatDateRange', () => {
      it('날짜 범위를 올바른 형식으로 표시해야 한다', () => {
        const startDate = new Date('2025-01-01')
        const endDate = new Date('2025-01-31')
        const result = formatDateRange(startDate, endDate)
        expect(result).toBe('2025.01.01 - 2025.01.31')
      })
    })

    describe('날짜 생성 함수들', () => {
      it('getToday는 현재 날짜를 반환해야 한다', () => {
        const result = getToday()
        expect(result.toDateString()).toBe(testDate.toDateString())
      })

      it('getYesterday는 어제 날짜를 반환해야 한다', () => {
        const result = getYesterday()
        const expected = new Date(testDate)
        expected.setDate(expected.getDate() - 1)
        expect(result.toDateString()).toBe(expected.toDateString())
      })

      it('getDaysAgo는 N일 전 날짜를 반환해야 한다', () => {
        const result = getDaysAgo(7)
        const expected = new Date(testDate)
        expected.setDate(expected.getDate() - 7)
        expect(result.toDateString()).toBe(expected.toDateString())
      })

      it('getThisWeekStart는 이번 주 월요일을 반환해야 한다', () => {
        const result = getThisWeekStart(testDate)
        expect(result.getDay()).toBe(1) // 월요일 = 1
      })

      it('getThisMonthStart는 이번 달 1일을 반환해야 한다', () => {
        const result = getThisMonthStart(testDate)
        expect(result.getDate()).toBe(1)
        expect(result.getMonth()).toBe(testDate.getMonth())
      })
    })

    describe('toISODateString', () => {
      it('yyyy-MM-dd 형식의 ISO 문자열을 반환해야 한다', () => {
        const result = toISODateString(testDate)
        expect(result).toBe('2025-01-15')
      })
    })
  })
}) 