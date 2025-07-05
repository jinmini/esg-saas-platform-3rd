import { format, parseISO, addDays as fnsAddDays, startOfWeek, startOfMonth } from 'date-fns';
import type { Locale } from 'date-fns';

/**
 * 안전한 날짜 파싱 함수
 * @param date 파싱할 날짜 문자열
 * @returns 파싱된 Date 객체 또는 null (실패 시)
 */
export function parseDate(date: string): Date | null {
  // ISO 형식 먼저 시도
  try {
    const isoDate = parseISO(date);
    if (!isNaN(isoDate.getTime())) {
      return isoDate;
    }
  } catch {
    // ISO 파싱 실패시 계속 진행
  }
  
  // 일반 Date 생성자 사용 (RFC 822 등 지원)
  const normalDate = new Date(date);
  if (!isNaN(normalDate.getTime())) {
    return normalDate;
  }
  
  // 모든 파싱이 실패하면 null 반환
  return null;
}

/**
 * 날짜 또는 문자열을 Date 객체로 변환
 * @param date Date 객체 또는 문자열
 * @returns Date 객체 또는 null (파싱 실패 시)
 */
export function toDate(date: Date | string): Date | null {
  if (date instanceof Date) {
    return isNaN(date.getTime()) ? null : date;
  }
  return parseDate(date);
}

/**
 * 날짜를 지정된 형식으로 포맷팅
 * @param date 포맷팅할 날짜
 * @param formatStr 포맷 문자열
 * @param locale 로케일 (선택사항)
 * @returns 포맷된 날짜 문자열
 */
export function formatDate(date: Date, formatStr: string, locale?: Locale): string {
  return format(date, formatStr, locale ? { locale } : undefined);
}

/**
 * N일 후/전 날짜 계산
 * @param date 기준 날짜
 * @param days 더할 일수 (음수면 과거)
 * @returns 계산된 날짜
 */
export function addDays(date: Date, days: number): Date {
  return fnsAddDays(date, days);
}

/**
 * 주의 시작일 계산 (월요일 기준)
 * @param date 기준 날짜
 * @returns 주의 시작일
 */
export function getWeekStart(date: Date): Date {
  return startOfWeek(date, { weekStartsOn: 1 }); // 월요일 시작
}

/**
 * 월의 시작일 계산
 * @param date 기준 날짜
 * @returns 월의 시작일
 */
export function getMonthStart(date: Date): Date {
  return startOfMonth(date);
}

/**
 * 날짜를 ISO 문자열로 변환
 * @param date 변환할 날짜
 * @returns ISO 형식 날짜 문자열 (yyyy-MM-dd)
 */
export function toISODateString(date: Date): string {
  return format(date, 'yyyy-MM-dd');
}

/**
 * 현재 날짜 가져오기
 * @returns 현재 날짜
 */
export function getCurrentDate(): Date {
  return new Date();
}

/**
 * 어제 날짜 가져오기
 * @returns 어제 날짜
 */
export function getYesterday(): Date {
  return addDays(getCurrentDate(), -1);
}

/**
 * N일 전 날짜 가져오기
 * @param days 일수
 * @returns N일 전 날짜
 */
export function getDaysAgo(days: number): Date {
  return addDays(getCurrentDate(), -days);
} 