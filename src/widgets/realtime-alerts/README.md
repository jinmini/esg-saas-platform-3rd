# 실시간 알림 위젯 (Realtime Alerts Widget)

## 설명

`RealtimeAlerts` 위젯은 시스템에서 발생하는 중요한 실시간 알림을 목록 형태로 표시합니다. 알림 유형에 따라 다른 아이콘이 표시됩니다.

## 컴포넌트

### RealtimeAlerts

실시간 알림 데이터를 조회하고 목록을 렌더링하는 메인 컴포넌트입니다. 별도의 Props를 받지 않습니다.

### 사용 예시

```tsx
import { RealtimeAlerts } from '@/widgets/realtime-alerts';

function DashboardSidebar() {
  return (
    <div>
      <RealtimeAlerts />
    </div>
  );
}
```

## Hooks

### `useRealtimeAlerts`

실시간 알림 데이터를 조회하기 위한 React Query 훅입니다.

#### 파라미터

| 파라미터 | 타입     | 설명                                       |
| -------- | -------- | ------------------------------------------ |
| `limit`  | `number` | (선택) 조회할 알림의 최대 개수. 기본값은 10입니다. |

#### 반환값

다음 속성을 포함하는 `useQuery` 결과 객체를 반환합니다:

-   `data`: `RealtimeAlert[]` - 실시간 알림 객체의 배열.
-   `isLoading`: `boolean`
-   `error`: `Error | null`

#### 사용 예시

```tsx
import { useRealtimeAlerts } from '@/widgets/realtime-alerts';

function CustomAlertsComponent() {
  const { data: alerts, isLoading, error } = useRealtimeAlerts(5);

  if (isLoading) return <p>로딩 중...</p>;
  if (error) return <p>에러: {error.message}</p>;

  return (
    <ul>
      {alerts?.map(alert => <li key={alert.id}>{alert.title}</li>)}
    </ul>
  );
}
```

## API

### `getRealtimeAlerts`

서버에서 실시간 알림 목록을 조회합니다.

-   **Endpoint**: `GET /dashboard/alerts`
-   **Parameters**: `limit`
-   **Returns**: `Promise<RealtimeAlert[]>`

## 타입

### `RealtimeAlert`

```ts
interface RealtimeAlert {
  id: string;
  type: 'high_risk' | 'new_issue' | 'trend_change';
  title: string;
  message: string;
  timestamp: string;
  companyId?: string;
  analysisId?: string;
}
``` 