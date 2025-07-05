// 크롤링 작업 관련 타입 정의

export interface CrawlJob {
  id: string;
  status: 'pending' | 'running' | 'completed' | 'failed';
  source_id: string;
  source_name: string;
  started_at: string;
  completed_at?: string;
  total_articles: number;
  new_articles: number;
  error_message?: string;
}

export interface CrawlStats {
  totalJobs: number;
  completedJobs: number;
  failedJobs: number;
  totalArticles: number;
  todayArticles: number;
  avgProcessingTime: number;
} 