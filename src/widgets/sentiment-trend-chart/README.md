# 감성 분석 트렌드 (SentimentTrendChart)

## 📖 개요
특정 기간 동안의 긍정, 부정, 중립 뉴스 기사의 감성 추세를 시각화하는 위젯입니다. 사용자는 날짜 범위를 선택하여 해당 기간의 트렌드를 확인할 수 있습니다.

### Preview
![Widget Screenshot](./docs/screenshot.png)

## 🚀 빠른 시작

```tsx
import { SentimentTrendChart } from '@/widgets/sentiment-trend-chart';

// 기본 사용법
<SentimentTrendChart />
```

## Component Dpendencies
- `@/shared/ui/Card`
- `@/shared/ui/Skeleton`
- `@/shared/ui/DatePickerWithRange`

## Hooks
- `useSentimentTrend`
  - `@/widgets/sentiment-trend-chart/model`에서 import
  - 선택된 기간에 대한 감성 분석 데이터를 가져옵니다.
  - `startDate`, `endDate`, `companyId` (선택 사항)를 인자로 받습니다.

## 주요 로직
- `useState`를 사용하여 `DateRange` 상태를 관리합니다.
- `useSentimentTrend` 훅을 호출하여 데이터를 가져옵니다.
- `recharts` 라이브러리를 사용하여 시계열 라인 차트를 렌더링합니다.
- 로딩 및 오류 상태를 처리하여 사용자에게 피드백을 제공합니다. 