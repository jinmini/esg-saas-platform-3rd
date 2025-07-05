// Company 관련 비즈니스 로직 설정 파일
// 예시: 산업별 위험 가중치, 등급 평가 기준 등

export const COMPANY_CONFIG: {
  industryRiskWeights: { [key: string]: number };
} = {
  // 향후 확장될 설정 값들을 이곳에 정의합니다.
  industryRiskWeights: {
    '제조업': 1.2,
    'IT': 0.9,
    '금융': 1.1,
  },
}; 