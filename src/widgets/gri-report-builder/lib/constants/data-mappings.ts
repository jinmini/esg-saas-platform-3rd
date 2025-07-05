// 기존 ESG 데이터와 GRI 공시사항 매핑 정보
export const DATA_MAPPINGS = {
  "305-1": {
    name: "직접 온실가스 배출량(Scope 1)",
    mappedData: [
      { source: "실시간 환경 모니터링", value: "45,230 tCO2e", confidence: 95 },
      { source: "에너지 사용량 분석", value: "12,850 tCO2e", confidence: 88 }
    ],
    autoFillable: true,
    estimatedTime: "2분"
  },
  "305-2": {
    name: "간접 온실가스 배출량(Scope 2)",
    mappedData: [
      { source: "전력 사용량 데이터", value: "23,450 tCO2e", confidence: 92 }
    ],
    autoFillable: true,
    estimatedTime: "1분"
  },
  "302-1": {
    name: "조직 내부 에너지 소비",
    mappedData: [
      { source: "시설 에너지 모니터링", value: "125,000 GJ", confidence: 90 },
      { source: "연료 사용량 기록", value: "85,000 GJ", confidence: 85 }
    ],
    autoFillable: true,
    estimatedTime: "3분"
  },
  "201-1": {
    name: "직접적인 경제적 가치의 창출과 배분",
    mappedData: [
      { source: "재무 성과 데이터", value: "분기별 수익 정보", confidence: 75 }
    ],
    autoFillable: false,
    estimatedTime: "15분"
  }
}; 