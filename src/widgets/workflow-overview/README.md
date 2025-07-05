# 워크플로우 개요 (WorkflowOverview)

## 📖 개요
진행 중인 보고서 작업들의 현황을 보여주는 위젯입니다. 각 작업의 회사명, 보고서 종류, 현재 단계, 진행률, 마감 기한 등을 표시하여 사용자가 전체 워크플로우를 쉽게 파악할 수 있도록 돕습니다.

### Preview
![Widget Screenshot](./docs/screenshot.png)

## 🚀 빠른 시작

```tsx
import { WorkflowOverview } from '@/widgets/workflow-overview';
import { mockWorkflows } from '@/shared/lib/mocks/dashboard-mock-data';

// 기본 사용법
<WorkflowOverview 
  workflows={mockWorkflows}
  isLoading={false}
/>
```

## Component Dependencies
- `@/shared/ui/Card`
- `@/shared/ui/Progress`
- `@/shared/ui/Badge`
- `@/shared/lib` (formatTimeAgo, formatDate)
- `@/shared/lib/mocks/dashboard-mock-data` (WorkflowStatus, getWorkflowStatusColor)

## Props
- `workflows`: 표시할 워크플로우 상태 객체의 배열 (`WorkflowStatus[]`).
- `isLoading` (선택 사항): 데이터 로딩 상태를 표시합니다.

## 주요 로직
- `workflows` 배열을 받아 각 항목을 순회하며 보고서 작업 카드를 렌더링합니다.
- 마감 기한이 7일 이내로 남은 작업을 '긴급'으로 표시하여 사용자의 주의를 환기시킵니다.
- `isLoading` 상태일 때 스켈레톤 UI를 표시하여 사용자 경험을 향상시킵니다.
- 작업이 없을 경우 "진행 중인 보고서 작업이 없습니다." 메시지를 표시합니다. 