# IndustryRiskComparison (산업별 리스크 비교)

## 📖 개요
- **특정 산업 내 기업들의 리스크**를 비교하여 보여주는 위젯입니다.
- 산업 평균 리스크 점수와 함께, 해당 산업에 속한 개별 기업들의 리스크 정보를 `RiskScoreCard` 형태로 나열합니다.
- `industry`를 props로 받아 해당 산업의 데이터만 동적으로 조회합니다.
- 내부적으로 `useIndustryComparison` 훅을 사용하여 TanStack Query로 비동기 데이터를 관리합니다.

### Preview
<!-- 실제 스크린샷은 docs/screenshot.png 등에 추가 후 아래 경로로 삽입하세요. -->
<!-- ![Widget Screenshot](./docs/screenshot.png) -->

## 🚀 빠른 시작

```tsx
import { IndustryRiskComparison } from '@/widgets/industry-risk-comparison';

// "반도체" 산업의 리스크 비교 정보를 표시합니다.
<IndustryRiskComparison industry="반도체" />
```

- **props 설명**
  - `industry`: 리스크를 비교할 산업명 (필수)

## ⚙️ 주요 로직

- **데이터 페칭**: `industry` prop이 변경될 때마다 `useIndustryComparison` 훅을 호출하여 해당 산업의 리스크 비교 데이터를 가져옵니다.
- **상태 관리**: `isLoading` 상태일 때 스켈레톤 UI를 표시하고, `error` 상태일 때 오류 메시지를 표시합니다.
- **렌더링**: 성공적으로 데이터를 가져오면, `companies` 배열을 순회하며 각 기업의 정보를 `RiskScoreCard`로 렌더링하고, 상단에는 산업명과 평균 리스크 점수를 표시합니다.

## 🔮 향후 개선 사항
- **시각화 강화**: 단순 카드 나열 방식 외에, 막대 차트 등을 이용해 기업별 리스크 점수를 시각적으로 비교하는 기능을 추가할 수 있습니다.
- **산업 선택 연동**: 사용자가 직접 산업을 선택할 수 있는 드롭다운이나 검색 컴포넌트와 연동할 수 있습니다.
- **정렬/필터링**: 리스크 점수가 높은 순/낮은 순으로 정렬하거나, 특정 조건에 따라 기업을 필터링하는 기능을 추가할 수 있습니다. 