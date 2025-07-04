import { CrawlJob } from './types';

/**
 * 크롤링 작업의 진행률을 계산합니다. (완료되었을 경우)
 * @param job - 크롤링 작업 객체
 * @returns 0-100 사이의 숫자, 또는 계산 불가 시 null
 */
export function calculateJobProgress(job: CrawlJob): number | null {
  if (job.status === 'completed') {
    return 100;
  }
  // 'running' 상태일 때 더 정교한 계산이 가능하다면 여기에 로직 추가
  // 예: if (job.status === 'running' && job.total_articles > 0) { ... }
  return null;
} 