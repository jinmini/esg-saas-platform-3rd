// 뉴스 소스 관련 타입 정의

export interface NewsSource {
  id: string;
  name: string;
  url: string;
  enabled: boolean;
  lastCrawled?: string;
  articleCount: number;
} 