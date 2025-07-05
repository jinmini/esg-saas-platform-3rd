# HighRiskCompaniesList (고위험 기업 목록)

## 📖 개요
- **고위험 기업** 목록을 조회하고 표시하는 위젯입니다.
- 내부적으로 `useHighRiskCompanies` 훅을 사용하여 TanStack Query로 비동기 데이터를 관리합니다.
- 각 기업의 리스크 정보는 `RiskScoreCard` 위젯을 통해 표시됩니다.
- 데이터 로딩 및 오류 상태에 대한 UI 처리가 포함되어 있습니다.

### Preview
<!-- 실제 스크린샷은 docs/screenshot.png 등에 추가 후 아래 경로로 삽입하세요. -->
<!-- ![Widget Screenshot](./docs/screenshot.png) -->

## 🚀 빠른 시작

```tsx
import { HighRiskCompaniesList } from '@/widgets/high-risk-companies-list';

// 이 컴포넌트는 별도의 props 없이 자체적으로 데이터를 가져옵니다.
<HighRiskCompaniesList />
```

## ⚙️ 주요 로직

- **데이터 페칭**: `useHighRiskCompanies` 훅을 호출하여 고위험 기업 목록 데이터를 가져옵니다.
- **상태 관리**: `isLoading` 상태일 때 스켈레톤 UI를 표시하고, `error` 상태일 때 오류 메시지를 표시합니다.
- **렌더링**: 성공적으로 데이터를 가져오면, `companies` 배열을 순회하며 각 기업에 대한 `RiskScoreCard`를 렌더링합니다.

## 🔮 향후 개선 사항
- **props 확장**: `limit`과 같은 API 파라미터를 props로 받아 목록에 표시할 기업 수를 동적으로 제어하는 기능을 추가할 수 있습니다.
- **사용자 상호작용**: 목록의 각 항목을 클릭했을 때 해당 기업의 상세 페이지로 이동하는 기능을 추가할 수 있습니다. 