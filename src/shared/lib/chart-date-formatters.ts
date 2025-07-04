import { formatKoreanDate } from './date-formatters';

export type ChartInterval = 'daily' | 'weekly' | 'monthly';

/**
 * 차트 간격에 따른 날짜 포맷 문자열 반환
 * @param interval 차트 간격
 * @returns 포맷 문자열
 */
export function getChartDateFormat(interval: ChartInterval): string {
  switch (interval) {
    case 'daily':
      return 'MM/dd';
    case 'weekly':
      return 'MM/dd';
    case 'monthly':
      return 'yyyy/MM';
    default:
      return 'MM/dd';
  }
}

/**
 * 차트용 날짜 포맷팅
 * @param date 포맷팅할 날짜
 * @param interval 차트 간격
 * @returns 포맷된 날짜 문자열
 */
export function formatChartDate(date: Date | string, interval: ChartInterval): string {
  const formatStr = getChartDateFormat(interval);
  return formatKoreanDate(date, formatStr);
} 