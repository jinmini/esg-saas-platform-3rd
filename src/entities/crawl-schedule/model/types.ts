// 크롤링 스케줄 관련 타입 정의

export interface CrawlSchedule {
  id: string;
  keywords: string[];
  interval: string;
  nextRun: string;
  enabled: boolean;
} 