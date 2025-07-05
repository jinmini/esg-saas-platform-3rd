# 리스크 스코어 카드 위젯 (Risk Score Card Widget)

## 설명

`RiskScoreCard` 위젯은 특정 기업의 리스크 스코어, 트렌드, 카테고리 등 주요 정보를 요약하여 표시하는 카드 형태의 컴포넌트입니다.

## 컴포넌트

### RiskScoreCard

`companyId`를 받아 해당 기업의 리스크 스코어 데이터를 자체적으로 조회하고 렌더링하는 컨테이너 컴포넌트입니다.

### Props

| Prop        | 타입                    | 설명                                  |
| ----------- | ----------------------- | ------------------------------------- |
| `companyId` | `string`                | 조회할 기업의 고유 ID.                |
| `onClick`   | `(companyId) => void` | (선택) 카드를 클릭했을 때 실행될 콜백 함수. |

### 사용 예시

```tsx
import { RiskScoreCard } from '@/widgets/risk-score-card';

function CompanyDashboard({ companyId }) {
  const handleCardClick = (id) => {
    console.log(`Card for company ${id} clicked!`);
    // 페이지 이동 등 로직 구현
  };

  return (
    <RiskScoreCard companyId={companyId} onClick={handleCardClick} />
  );
}
```

## Hooks

### `useRiskScore`

특정 기업의 리스크 스코어 데이터를 조회하기 위한 React Query 훅입니다.

#### 파라미터

| 파라미터    | 타입     | 설명             |
| ----------- | -------- | ---------------- |
| `companyId` | `string` | 조회할 기업의 ID. |

#### 반환값

다음 속성을 포함하는 `useQuery` 결과 객체를 반환합니다:

-   `data`: `RiskScoreData` - 리스크 스코어 데이터 객체.
-   `isLoading`: `boolean`
-   `error`: `Error | null`

#### 사용 예시

```tsx
import { useRiskScore } from '@/widgets/risk-score-card';

function CustomScoreComponent({ companyId }) {
  const { data, isLoading, error } = useRiskScore(companyId);

  if (isLoading) return <p>로딩 중...</p>;
  if (error) return <p>에러: {error.message}</p>;

  return (
    <div>
      <h1>{data.companyName}</h1>
      <p>Score: {data.score}</p>
    </div>
  );
}
```

## API

### `getRiskScore`

서버에서 특정 기업의 리스크 스코어 데이터를 조회합니다.

-   **Endpoint**: `GET /company/{companyId}/risk-score`
-   **Returns**: `Promise<RiskScoreData>`

## 타입

### `RiskScoreData`

```ts
interface RiskScoreData {
  companyId: string;
  companyName: string;
  score: number;
  trend: number;
  category?: string;
  lastUpdated?: string;
}
``` 