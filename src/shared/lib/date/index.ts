// 순수 유틸리티 함수들
export * from '../date-utils';

// 한국어 특화 포맷터들
export * from '../date-formatters';

// 차트 관련 포맷터들
export * from '../chart-date-formatters';

// 하위 호환성을 위한 레거시 함수들 (deprecated)
import { 
  formatKoreanDate, 
  formatKoreanTimeAgo, 
  formatKoreanRelativeDate, 
  formatKoreanDateTime, 
  formatKoreanShortDate, 
  formatKoreanMonth, 
  formatKoreanDateRange 
} from '../date-formatters';
import { formatChartDate } from '../chart-date-formatters';
import { 
  getCurrentDate, 
  getYesterday, 
  getDaysAgo, 
  getWeekStart, 
  getMonthStart, 
  toISODateString 
} from '../date-utils';

/**
 * @deprecated Use formatKoreanDate instead
 */
export const formatDate = formatKoreanDate;

/**
 * @deprecated Use formatKoreanTimeAgo instead
 */
export const formatTimeAgo = formatKoreanTimeAgo;

/**
 * @deprecated Use formatKoreanRelativeDate instead
 */
export const formatRelativeDate = formatKoreanRelativeDate;

/**
 * @deprecated Use formatKoreanDateTime instead
 */
export const formatDateTime = formatKoreanDateTime;

/**
 * @deprecated Use formatKoreanShortDate instead
 */
export const formatShortDate = formatKoreanShortDate;

/**
 * @deprecated Use formatKoreanMonth instead
 */
export const formatMonth = formatKoreanMonth;

/**
 * @deprecated Use formatChartDate instead
 */
export { formatChartDate };

/**
 * @deprecated Use formatKoreanDateRange instead
 */
export const formatDateRange = formatKoreanDateRange;

/**
 * @deprecated Use getCurrentDate instead
 */
export const getToday = getCurrentDate;

/**
 * @deprecated Use getYesterday instead
 */
export { getYesterday };

/**
 * @deprecated Use getDaysAgo instead
 */
export { getDaysAgo };

/**
 * @deprecated Use getWeekStart instead
 */
export const getThisWeekStart = getWeekStart;

/**
 * @deprecated Use getMonthStart instead
 */
export const getThisMonthStart = getMonthStart;

/**
 * @deprecated Use toISODateString instead
 */
export { toISODateString }; 