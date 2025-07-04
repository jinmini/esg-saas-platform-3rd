# 종합 리스크 트렌드 위젯 (Overall Risk Trend Chart Widget)

## 설명

`OverallRiskTrendChart` 위젯은 주어진 기간 동안의 종합 리스크 트렌드와 환경(E), 사회(S), 지배구조(G) 카테고리별 트렌드를 시각화하는 라인 차트를 표시합니다.

## 컴포넌트

### OverallRiskTrendChart

리스크 트렌드 데이터를 조회하고 렌더링하는 메인 컴포넌트입니다.

### Props

| Prop        | 타입     | 설명                               |
| ----------- | -------- | ---------------------------------- |
| `startDate` | `string` | 데이터 조회 시작일 (예: 'YYYY-MM-DD'). |
| `endDate`   | `string` | 데이터 조회 종료일 (예: 'YYYY-MM-DD'). |

### 사용 예시

```tsx
import { OverallRiskTrendChart } from '@/widgets/overall-risk-trend-chart';

function MyDashboard() {
  return (
    <OverallRiskTrendChart startDate="2023-01-01" endDate="2023-12-31" />
  );
}
```

## Hooks

### `useOverallRiskTrend`

종합 리스크 트렌드 데이터를 조회하기 위한 React Query 훅입니다.

#### 파라미터

다음 속성을 포함하는 객체입니다:

| 파라미터    | 타입                                   | 설명                                                 |
| ----------- | -------------------------------------- | ---------------------------------------------------- |
| `startDate` | `string`                               | 데이터 조회 시작일 (예: 'YYYY-MM-DD').               |
| `endDate`   | `string`                               | 데이터 조회 종료일 (예: 'YYYY-MM-DD').               |
| `interval`  | `'daily' \| 'weekly' \| 'monthly'` | (선택) 데이터의 시간 간격. 기본값은 'daily'입니다. |

#### 반환값

다음 속성을 포함하는 `useQuery` 결과 객체를 반환합니다:

-   `data`: `RiskTrendData[]` - 리스크 트렌드 데이터 포인트 배열.
-   `isLoading`: `boolean`
-   `error`: `Error | null`

#### 사용 예시

```tsx
import { useOverallRiskTrend } from '@/widgets/overall-risk-trend-chart';

function MyCustomTrendComponent() {
  const { data, isLoading, error } = useOverallRiskTrend({
    startDate: '2023-01-01',
    endDate: '2023-01-31',
    interval: 'daily',
  });

  if (isLoading) return <p>로딩 중...</p>;
  if (error) return <p>에러: {error.message}</p>;

  // 데이터로 컴포넌트 렌더링
}
```

## API

### `getRiskTrend`

서버에서 종합 리스크 트렌드 데이터를 조회합니다.

-   **Endpoint**: `GET /dashboard/risk-trend`
-   **Parameters**: `startDate`, `endDate`, `interval`
-   **Returns**: `Promise<RiskTrendData[]>` 