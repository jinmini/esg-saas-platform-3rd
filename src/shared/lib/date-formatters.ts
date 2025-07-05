import { format, formatDistance, formatRelative, isToday, isYesterday } from 'date-fns';
import { ko } from 'date-fns/locale';
import { toDate } from './date-utils';

/**
 * 한국어 날짜 포맷팅
 * @param date 포맷팅할 날짜
 * @param formatStr 포맷 문자열 (기본값: 'yyyy-MM-dd')
 * @returns 한국어로 포맷된 날짜 문자열
 */
export function formatKoreanDate(date: Date | string, formatStr: string = 'yyyy-MM-dd'): string {
  const d = toDate(date);
  if (!d) return '';
  
  return format(d, formatStr, { locale: ko });
}

/**
 * 한국어 상대적 시간 표시 (예: 3시간 전)
 * @param date 기준 날짜
 * @returns 상대적 시간 문자열
 */
export function formatKoreanTimeAgo(date: Date | string): string {
  const d = toDate(date);
  if (!d) return '';
  
  return formatDistance(d, new Date(), { addSuffix: true, locale: ko });
}

/**
 * 한국어 상대적 날짜 표시 (예: 어제 오후 3시)
 * @param date 기준 날짜
 * @returns 상대적 날짜 문자열
 */
export function formatKoreanRelativeDate(date: Date | string): string {
  const d = toDate(date);
  if (!d) return '';
  
  return formatRelative(d, new Date(), { locale: ko });
}

/**
 * 한국어 날짜 시간 포맷팅 (오늘/어제 고려)
 * @param date 포맷팅할 날짜
 * @returns 한국어 날짜 시간 문자열
 */
export function formatKoreanDateTime(date: Date | string): string {
  const d = toDate(date);
  if (!d) return '';
  
  if (isToday(d)) {
    return `오늘 ${format(d, 'HH:mm', { locale: ko })}`;
  }
  
  if (isYesterday(d)) {
    return `어제 ${format(d, 'HH:mm', { locale: ko })}`;
  }
  
  return format(d, 'yyyy년 MM월 dd일 HH:mm', { locale: ko });
}

/**
 * 한국어 짧은 날짜 포맷
 * @param date 포맷팅할 날짜
 * @returns 짧은 날짜 문자열 (MM/dd)
 */
export function formatKoreanShortDate(date: Date | string): string {
  const d = toDate(date);
  if (!d) return '';
  
  return format(d, 'MM/dd', { locale: ko });
}

/**
 * 한국어 월 포맷
 * @param date 포맷팅할 날짜
 * @returns 월 문자열 (yyyy년 MM월)
 */
export function formatKoreanMonth(date: Date | string): string {
  const d = toDate(date);
  if (!d) return '';
  
  return format(d, 'yyyy년 MM월', { locale: ko });
}

/**
 * 한국어 날짜 범위 텍스트
 * @param startDate 시작 날짜
 * @param endDate 종료 날짜
 * @returns 날짜 범위 문자열
 */
export function formatKoreanDateRange(startDate: Date | string, endDate: Date | string): string {
  const start = toDate(startDate);
  const end = toDate(endDate);
  
  if (!start || !end) return '';
  
  return `${format(start, 'yyyy.MM.dd', { locale: ko })} - ${format(end, 'yyyy.MM.dd', { locale: ko })}`;
} 