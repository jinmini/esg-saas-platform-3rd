# 최근 분석 목록 위젯 (Recent Analyses List Widget)

## 설명

`RecentAnalysesList` 위젯은 최근에 수행된 분석 작업 목록을 표시합니다. 각 항목은 분석 제목, 대상 기업, 분석 날짜를 포함하며, 상세 보기 버튼을 제공합니다.

## 컴포넌트

### RecentAnalysesList

최근 분석 목록 데이터를 자체적으로 조회하고 렌더링하는 메인 컴포넌트입니다. 별도의 Props를 받지 않습니다.

### 사용 예시

```tsx
import { RecentAnalysesList } from '@/widgets/recent-analyses-list';

function DashboardPage() {
  return (
    <section>
      <h2>최근 분석</h2>
      <RecentAnalysesList />
    </section>
  );
}
```

## Hooks

### `useRecentAnalyses`

최근 분석 목록 데이터를 조회하기 위한 React Query 훅입니다.

#### 파라미터

| 파라미터 | 타입     | 설명                                       |
| -------- | -------- | ------------------------------------------ |
| `limit`  | `number` | (선택) 조회할 분석의 최대 개수. 기본값은 10입니다. |

#### 반환값

다음 속성을 포함하는 `useQuery` 결과 객체를 반환합니다:

-   `data`: `AnalysisResult[]` - 분석 결과 객체의 배열.
-   `isLoading`: `boolean`
-   `error`: `Error | null`

#### 사용 예시

```tsx
import { useRecentAnalyses } from '@/widgets/recent-analyses-list';

function CustomAnalysesComponent() {
  const { data: analyses, isLoading, error } = useRecentAnalyses(5);

  if (isLoading) return <p>로딩 중...</p>;
  if (error) return <p>에러: {error.message}</p>;

  return (
    <ul>
      {analyses?.map(analysis => <li key={analysis.id}>{analysis.title}</li>)}
    </ul>
  );
}
```

## API

### `getRecentAnalyses`

서버에서 최근 분석 목록을 조회합니다.

-   **Endpoint**: `GET /analysis/recent`
-   **Parameters**: `limit`
-   **Returns**: `Promise<AnalysisResult[]>`

## 타입

### `AnalysisResult`

`@/shared/types`에 정의된 분석 결과 타입입니다. 