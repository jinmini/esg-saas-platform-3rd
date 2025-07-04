# 고위험 기업 목록 (TopCompanies)

## 📖 개요
리스크 점수가 가장 높은 상위 기업 목록을 보여주는 위젯입니다. 각 기업의 순위, 이름, 산업, 이슈 건수, 리스크 점수 및 추세를 표시하여 사용자가 고위험 기업을 빠르게 식별할 수 있도록 돕습니다.

### Preview
![Widget Screenshot](./docs/screenshot.png)

## 🚀 빠른 시작

```tsx
import { TopCompanies } from '@/widgets/top-companies';

// 기본 사용법
<TopCompanies 
  limit={5}
  onCompanyClick={(companyId) => console.log(companyId)}
  onViewAll={() => console.log('View all clicked')}
/>
```

## Component Dependencies
- `@/shared/ui/Card`
- `@/shared/ui/RiskBadge`
- `@/shared/ui/Skeleton`
- `@/shared/ui/Button`
- `@/shared/ui/ScrollArea`
- `@/shared/ui/Badge`
- `@/entities/company`
- `@/entities/risk`

## Hooks
- `useHighRiskCompanies`
  - `@/entities/company`에서 import
  - 상위 고위험 기업 목록 데이터를 API로부터 가져옵니다.
  - `limit` (목록에 표시할 기업 수)을 인자로 받습니다.

## Props
- `limit` (선택 사항): 표시할 최대 기업 수 (기본값: 5).
- `onCompanyClick` (선택 사항): 기업 목록 항목 클릭 시 호출될 콜백 함수. `companyId`를 인자로 받습니다.
- `onViewAll` (선택 사항): '전체보기' 버튼 클릭 시 호출될 콜백 함수.

## 주요 로직
- `useHighRiskCompanies` 훅을 사용하여 데이터를 비동기적으로 로드합니다.
- 로딩 중에는 스켈레톤 UI를, 오류 발생 시에는 오류 메시지를 표시합니다.
- 리스크 레벨(`critical`, `high`)에 따라 각 항목 왼쪽에 색상 테두리를 표시합니다.
- 리스크 점수 추세(상승/하락)를 아이콘으로 시각화합니다.
- `ScrollArea` 컴포넌트를 사용하여 내용이 길어질 경우 스크롤을 지원합니다. 