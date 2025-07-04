# SASB 카테고리별 이슈 분포 차트 위젯 (SASB Distribution Chart Widget)

## 설명

`SasbDistributionChart` 위젯은 SASB(Sustainability Accounting Standards Board) 카테고리별로 발생한 이슈의 분포를 바 차트로 시각화하여 표시합니다.

## 컴포넌트

### SasbDistributionChart

SASB 분포 데이터를 자체적으로 조회하고 렌더링하는 메인 컴포넌트입니다. 별도의 Props를 받지 않습니다.

### 사용 예시

```tsx
import { SasbDistributionChart } from '@/widgets/sasb-distribution-chart';

function MyDashboard() {
  return (
    <div>
      <h3>SASB 분포</h3>
      <SasbDistributionChart />
    </div>
  );
}
```

## Hooks

### `useSASBDistribution`

SASB 분포 데이터를 조회하기 위한 React Query 훅입니다.

#### 파라미터

없음

#### 반환값

다음 속성을 포함하는 `useQuery` 결과 객체를 반환합니다:

-   `data`: `SASBDistribution[]` - SASB 카테고리별 데이터 배열.
-   `isLoading`: `boolean`
-   `error`: `Error | null`

#### 사용 예시

```tsx
import { useSASBDistribution } from '@/widgets/sasb-distribution-chart';

function CustomDistributionComponent() {
  const { data, isLoading, error } = useSASBDistribution();

  if (isLoading) return <p>로딩 중...</p>;
  if (error) return <p>에러: {error.message}</p>;

  // 데이터로 커스텀 컴포넌트 렌더링
}
```

## API

### `getSASBDistribution`

서버에서 SASB 분포 데이터를 조회합니다.

-   **Endpoint**: `GET /dashboard/sasb-distribution`
-   **Returns**: `Promise<SASBDistribution[]>`

## 타입

### `SASBDistribution`

```ts
interface SASBDistribution {
  category: string;
  count: number;
  avgRiskScore: number;
  topCompanies: string[];
}
``` 