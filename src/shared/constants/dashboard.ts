export const DEFAULT_COMPANY_NAME = '삼성전자';
export const NEWS_LIST_LIMIT = 10;
export const LABELS = {
  totalArticles: '전체 기사',
  sentiment: '감정 분석',
  period: '수집 기간',
  system: '시스템 상태',
  news: '최근 뉴스',
  collected: '수집한 뉴스 기사',
  analyzed: '분석된 기사별 감정',
  periodDesc: '데이터 수집 완료 시각',
  systemDesc: '모니터링 중인 회사',
};
export const SENTIMENT_LABELS = {
  긍정: '긍정',
  중립: '중립',
  부정: '부정',
};

export function mapESGCategory(category: string): string {
  const mapping: Record<string, string> = {
    'E': '환경(E)',
    'S': '사회(S)',
    'G': '지배구조(G)',
    '재무정보': '재무정보',
    '환경(E)': '환경(E)',
    '사회(S)': '사회(S)',
    '지배구조(G)': '지배구조(G)',
    '통합ESG': '통합ESG',
    '기타': '기타',
  };
  return mapping[category] || category;
}

export function formatDateTime(dateString: string): string {
  const date = new Date(dateString);
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  const hh = String(date.getHours()).padStart(2, '0');
  const mm = String(date.getMinutes()).padStart(2, '0');
  const ss = String(date.getSeconds()).padStart(2, '0');
  return `${y}년 ${m}월 ${d}일 ${hh}:${mm}:${ss}`;
} 