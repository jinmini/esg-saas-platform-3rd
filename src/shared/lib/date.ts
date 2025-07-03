// 날짜 관련 유틸리티 함수

import { format, formatDistance, formatRelative, isToday, isYesterday, parseISO } from 'date-fns';
import { ko } from 'date-fns/locale';

// 안전한 날짜 파싱 함수 (ISO, RFC 822, 일반 형식 지원)
function safeParsDate(date: Date | string): Date {
  if (typeof date !== 'string') {
    return date;
  }
  
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
  
  // 모든 파싱이 실패하면 현재 시간 반환
  return new Date();
}

// 날짜 포맷팅
export function formatDate(date: Date | string, formatStr: string = 'yyyy-MM-dd'): string {
  const d = safeParsDate(date);
  return format(d, formatStr, { locale: ko });
}

// 상대적 시간 표시 (예: 3시간 전)
export function formatTimeAgo(date: Date | string): string {
  const d = safeParsDate(date);
  return formatDistance(d, new Date(), { addSuffix: true, locale: ko });
}

// 상대적 날짜 표시 (예: 어제 오후 3시)
export function formatRelativeDate(date: Date | string): string {
  const d = safeParsDate(date);
  return formatRelative(d, new Date(), { locale: ko });
}

// 날짜 시간 포맷팅
export function formatDateTime(date: Date | string): string {
  const d = safeParsDate(date);
  
  if (isToday(d)) {
    return `오늘 ${format(d, 'HH:mm', { locale: ko })}`;
  }
  
  if (isYesterday(d)) {
    return `어제 ${format(d, 'HH:mm', { locale: ko })}`;
  }
  
  return format(d, 'yyyy년 MM월 dd일 HH:mm', { locale: ko });
}

// 짧은 날짜 포맷
export function formatShortDate(date: Date | string): string {
  const d = safeParsDate(date);
  return format(d, 'MM/dd', { locale: ko });
}

// 월 포맷
export function formatMonth(date: Date | string): string {
  const d = safeParsDate(date);
  return format(d, 'yyyy년 MM월', { locale: ko });
}

// 차트용 날짜 포맷
export function formatChartDate(date: Date | string, interval: 'daily' | 'weekly' | 'monthly'): string {
  const d = safeParsDate(date);
  
  switch (interval) {
    case 'daily':
      return format(d, 'MM/dd', { locale: ko });
    case 'weekly':
      return format(d, 'MM/dd', { locale: ko });
    case 'monthly':
      return format(d, 'yyyy/MM', { locale: ko });
    default:
      return format(d, 'MM/dd', { locale: ko });
  }
}

// 날짜 범위 텍스트
export function formatDateRange(startDate: Date | string, endDate: Date | string): string {
  const start = safeParsDate(startDate);
  const end = safeParsDate(endDate);
  
  return `${format(start, 'yyyy.MM.dd', { locale: ko })} - ${format(end, 'yyyy.MM.dd', { locale: ko })}`;
}

// 오늘 날짜 가져오기
export function getToday(): Date {
  return new Date();
}

// 어제 날짜 가져오기
export function getYesterday(): Date {
  const date = new Date();
  date.setDate(date.getDate() - 1);
  return date;
}

// N일 전 날짜 가져오기
export function getDaysAgo(days: number): Date {
  const date = new Date();
  date.setDate(date.getDate() - days);
  return date;
}

// 이번 주 시작일 (월요일)
export function getThisWeekStart(): Date {
  const date = new Date();
  const day = date.getDay();
  const diff = date.getDate() - day + (day === 0 ? -6 : 1);
  return new Date(date.setDate(diff));
}

// 이번 달 시작일
export function getThisMonthStart(): Date {
  const date = new Date();
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

// 날짜를 ISO 문자열로 변환
export function toISODateString(date: Date): string {
  return format(date, 'yyyy-MM-dd');
}
