# 오늘의 주요 이슈 (TodayHighlights)

## 📖 개요
대시보드에 오늘의 주요 이슈를 요약하여 보여주는 위젯입니다. 신규 기사 수, 고위험 알림 건수, 가장 중요한 핵심 이슈, 그리고 주요 발견 사항들을 간결하게 제공합니다.

### Preview
![Widget Screenshot](./docs/screenshot.png)

## 🚀 빠른 시작

```tsx
import { TodayHighlights } from '@/widgets/today-highlights';

// 기본 사용법
<TodayHighlights />
```

## Component Dependencies
- `@/shared/ui/Card`
- `@/shared/ui/Skeleton`
- `@/shared/ui/Badge`

## Hooks
- `useTodayHighlights`
  - `@/widgets/today-highlights/model`에서 import
  - 오늘의 주요 이슈 데이터를 API로부터 가져옵니다. 인자는 필요 없습니다.

## 주요 로직
- `useTodayHighlights` 훅을 사용하여 데이터를 비동기적으로 로드합니다.
- 데이터 로딩 중에는 스켈레톤 UI를, 오류 발생 시에는 오류 메시지를 표시합니다.
- 가져온 데이터를 바탕으로 신규 기사, 고위험 알림, 핵심 이슈, 주요 발견사항 섹션을 구성하여 렌더링합니다. 