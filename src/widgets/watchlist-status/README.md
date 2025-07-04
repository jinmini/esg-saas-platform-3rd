# 워치리스트 현황 (WatchlistStatus)

## 📖 개요
사용자의 워치리스트에 등록된 기업들의 현재 리스크 현황을 테이블 형태로 보여주는 위젯입니다. 각 기업의 이름, 산업, 그리고 현재 리스크 점수를 한눈에 파악할 수 있습니다.

### Preview
![Widget Screenshot](./docs/screenshot.png)

## 🚀 빠른 시작

```tsx
import { WatchlistStatus } from '@/widgets/watchlist-status';

// 기본 사용법
<WatchlistStatus />
```

## Component Dependencies
- `@/shared/ui/Card`
- `@/shared/ui/Skeleton`
- `@/shared/ui/Table`
- `@/shared/ui/RiskBadge`
- `@/entities/risk`

## Hooks
- `useWatchlistStatus`
  - `@/widgets/watchlist-status/model`에서 import
  - 워치리스트에 등록된 기업들의 리스크 현황 데이터를 API로부터 가져옵니다. 인자는 필요 없습니다.

## 주요 로직
- `useWatchlistStatus` 훅을 사용하여 데이터를 비동기적으로 로드합니다.
- 로딩 중에는 스켈레톤 UI를, 오류 발생 시에는 오류 메시지를 표시합니다.
- 가져온 기업 목록 데이터를 테이블 형태로 렌더링합니다.
- 각 기업의 리스크 점수는 `RiskBadge` 컴포넌트를 사용하여 시각적으로 표현합니다. 