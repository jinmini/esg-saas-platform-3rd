# ESGRiskChart (ESG 리스크 차트)

## 📖 Overview
- 기업의 ESG 리스크 구성을 **파이 또는 도넛 차트**로 시각화하는 위젯입니다.
- 환경(E), 사회(S), 지배구조(G) 등 카테고리별 리스크 분포를 한눈에 파악할 수 있습니다.
- 데이터 로딩 상태 및 데이터가 없는 경우에 대한 UI를 포함하고 있습니다.

### Preview
<!-- 실제 스크린샷은 docs/screenshot.png 등에 추가 후 아래 경로로 삽입하세요. -->
<!-- ![Widget Screenshot](./docs/screenshot.png) -->

## 🚀 Quick Start

```tsx
import { ESGRiskChart } from '@/widgets/esg-risk-chart';

const data = [
  { name: '환경(E)', value: 400 },
  { name: '사회(S)', value: 300 },
  { name: '지배구조(G)', value: 300 },
];

<ESGRiskChart
  data={data}
  title="ESG 리스크 분포"
  chartType="donut"
/>
```

- **props 설명**
  - `data`: 차트에 표시할 데이터 배열 (필수)
  - `title`: 차트 상단에 표시될 제목 (선택)
  - `isLoading`: 데이터 로딩 상태 (선택)
  - `chartType`: 차트 종류 ('pie' 또는 'donut') (선택) 