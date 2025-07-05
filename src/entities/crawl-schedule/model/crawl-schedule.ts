import { CrawlSchedule } from './types';

/**
 * 다음 실행 시간을 사용자가 읽기 쉬운 형태로 변환합니다.
 * @param schedule - 크롤링 스케줄 객체
 * @returns 변환된 시간 문자열
 */
export function formatNextRunTime(schedule: CrawlSchedule): string {
  const date = new Date(schedule.nextRun);
  return date.toLocaleString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
} 