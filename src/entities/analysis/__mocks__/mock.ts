export const mockAnalysisResponse = {
  search_info: {
    company: "한국중부발전",
    total: 1500,
    start: 1,
    display: 5,
    last_build_date: "Thu, 27 Jun 2024 10:30:00 +0900",
    original_count: 7,
    duplicates_removed: 2,
    deduplication_enabled: true
  },
  analyzed_news: [
    // ... (생략, 기존 mock-analysis-response.ts 내용 전체 복사)
  ],
  analysis_summary: {
    total_analyzed: 5,
    esg_distribution: {
      "환경(E)": 2,
      "사회(S)": 2,
      "지배구조(G)": 1,
      "통합ESG": 0,
      "기타": 0
    },
    "sentiment_distribution": {
      "긍정": 3,
      "부정": 1,
      "중립": 1
    }
  },
  ml_service_status: "connected"
};

export async function getCompanyAnalysisMock(companyName: string): Promise<typeof mockAnalysisResponse> {
  console.log(`[Mock API] "${companyName}"에 대한 분석 요청을 수신했습니다.`);
  return new Promise(resolve => {
    setTimeout(() => {
      console.log(`[Mock API] "${companyName}"에 대한 분석 결과를 반환합니다.`);
      resolve(mockAnalysisResponse);
    }, 1000);
  });
} 