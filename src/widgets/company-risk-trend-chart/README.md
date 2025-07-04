# CompanyRiskTrendChart (회사 리스크 트렌드 차트)

## 📖 Overview
- 회사별 리스크 트렌드(ESG 등) 데이터를 시계열 차트로 시각화하는 위젯입니다.
- API를 통해 기간별 리스크 데이터를 조회하고, 종합/환경/사회/지배구조 등 주요 지표를 한눈에 보여줍니다.
- 데이터 로딩, 에러 처리, 반응형 UI를 지원합니다.

### Preview
<!-- 차트 스크린샷 예시를 docs/screenshot.png 등에 추가 후 아래 경로로 삽입하세요. -->
<!-- ![Widget Screenshot](./docs/screenshot.png) -->

## 🚀 Quick Start

```tsx
import { CompanyRiskTrendChart } from '@/widgets/company-risk-trend-chart';

// 필수 props: companyId, startDate, endDate
<CompanyRiskTrendChart
  companyId="123"
  startDate="2024-01-01"
  endDate="2024-06-30"
/>
```

### 커스텀 훅 사용 예시

```tsx
import { useCompanyRiskTrend } from '@/widgets/company-risk-trend-chart';

const { data, isLoading, error } = useCompanyRiskTrend('123', {
  startDate: '2024-01-01',
  endDate: '2024-06-30',
});
```
