# 통계 카드 (StatsCards)

## 📖 개요
대시보드의 핵심 통계를 표시하는 위젯입니다. 전체 기사 수, 분석 완료된 기사 수, 평균 리스크 점수, 주요 이슈 건수 등 주요 지표를 한눈에 파악할 수 있도록 도와줍니다.

### Preview
![Widget Screenshot](./docs/screenshot.png)

## 🚀 빠른 시작

```tsx
import { StatsCards } from '@/widgets/stats-cards';

// 기본 사용법
<StatsCards 
  stats={currentStats}
  previousStats={previousStats}
  isLoading={false}
/>
```

## Component Dependencies
- `@/shared/ui/Card`
- `@/shared/ui/Skeleton`
- `@/entities/risk`
- `@/shared/lib`

## Props
- `stats`: 현재 기간의 통계 데이터 객체.
  - `totalArticles`: number
  - `analyzedArticles`: number
  - `avgRiskScore`: number
  - `criticalIssues`: number
- `previousStats` (선택 사항): 이전 기간의 통계 데이터 객체. 추세(%)를 계산하는 데 사용됩니다.
- `isLoading` (선택 사항): 데이터 로딩 상태를 표시합니다.

## 주요 로직
- `stats`와 `previousStats`를 비교하여 각 항목의 변화율(추세)을 계산합니다.
- 리스크 점수와 주요 이슈는 수치가 낮을수록 긍정적인 추세(`isPositive: true`)로 간주합니다.
- 각 통계 항목을 `StatCard`라는 내부 컴포넌트로 렌더링합니다.
- `isLoading` 상태일 때 스켈레톤 UI를 표시하여 사용자 경험을 향상시킵니다. 