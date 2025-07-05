# 실시간 분석 피드 위젯 (Realtime Feed Widget)

## 설명

`RealtimeFeed` 위젯은 최근 분석된 뉴스 항목의 실시간 피드를 표시합니다. 각 항목은 감성 분석(긍정, 부정, 중립) 및 ESG 카테고리에 따라 시각적으로 구분됩니다.

## 컴포넌트

### RealtimeFeed

실시간 피드 데이터를 자체적으로 조회하고 렌더링하는 메인 컴포넌트입니다. 별도의 Props를 받지 않습니다.

### 사용 예시

```tsx
import { RealtimeFeed } from '@/widgets/realtime-feed';

function MyDashboard() {
  return <RealtimeFeed />;
}
```

## Hooks

### `useRealtimeFeed`

실시간 분석 피드 데이터를 조회하기 위한 React Query 훅입니다.

#### 파라미터

| 파라미터 | 타입     | 설명                                       |
| -------- | -------- | ------------------------------------------ |
| `limit`  | `number` | (선택) 조회할 피드의 최대 개수. 기본값은 10입니다. |

#### 반환값

다음 속성을 포함하는 `useQuery` 결과 객체를 반환합니다:

-   `data`: `AnalyzedNews[]` - 분석된 뉴스 항목의 배열.
-   `isLoading`: `boolean`
-   `error`: `Error | null`

#### 사용 예시

```tsx
import { useRealtimeFeed } from '@/widgets/realtime-feed';

function CustomFeedComponent() {
  const { data: feedItems, isLoading, error } = useRealtimeFeed(5);

  if (isLoading) return <p>로딩 중...</p>;
  if (error) return <p>에러: {error.message}</p>;

  return (
    <ul>
      {feedItems?.map(item => <li key={item.news_item.news_id}>{item.news_item.title}</li>)}
    </ul>
  );
}
```

## API

### `getRealtimeFeed`

서버에서 실시간 분석 피드 목록을 조회합니다.

-   **Endpoint**: `GET /dashboard/feed`
-   **Parameters**: `limit`
-   **Returns**: `Promise<RealtimeFeedResponse>`

## 타입

### `AnalyzedNews`

분석된 단일 뉴스 항목을 나타내는 타입입니다. (세부 구조는 `entities/analysis/__mocks__/mock.ts`의 `mockAnalysisResponse` 참조)

### `RealtimeFeedResponse`

```ts
interface RealtimeFeedResponse {
  items: AnalyzedNews[];
}
``` 