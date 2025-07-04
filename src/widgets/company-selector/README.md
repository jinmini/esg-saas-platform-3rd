# CompanySelector (기업 선택 위젯)

## 📖 Overview
- 여러 기업 중 하나를 선택할 수 있는 드롭다운 UI 위젯입니다.
- 기업 리스트, 산업, 위험도, ESG 점수 등 주요 정보를 함께 표시하며, 선택 시 상세 정보와 빠른 액션 버튼을 제공합니다.
- props로 기업 목록과 선택/콜백을 받아, 대시보드 등 다양한 곳에서 재사용할 수 있습니다.

### Preview
<!-- 실제 스크린샷은 docs/screenshot.png 등에 추가 후 아래 경로로 삽입하세요. -->
<!-- ![Widget Screenshot](./docs/screenshot.png) -->

## 🚀 Quick Start

```tsx
import { CompanySelector } from '@/widgets/company-selector';

const companies = [
  // CompanyOverview[] 타입의 기업 데이터 배열
];

<CompanySelector
  companies={companies}
  selectedCompanyId={selectedId}
  onCompanySelect={setSelectedId}
  isLoading={false}
/>
```

- **props 설명**
  - `companies`: 기업 정보 배열 (필수)
  - `selectedCompanyId`: 선택된 기업 id (선택)
  - `onCompanySelect`: 기업 선택 시 호출되는 콜백 (필수)
  - `isLoading`: 로딩 상태 표시 (선택)
  - `onGotoGRIReport`: GRI 보고서 버튼 클릭 시 호출되는 콜백 (선택)
  - `onGotoNewsAnalysis`: 뉴스 분석 버튼 클릭 시 호출되는 콜백 (선택)
  - `onGotoDetail`: 상세 보기 버튼 클릭 시 호출되는 콜백 (선택) 