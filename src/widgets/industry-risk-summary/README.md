# IndustryRiskSummary (산업별 리스크 요약)

## 📖 개요
- **전체 산업의 리스크 요약 정보**를 테이블 형태로 보여주는 위젯입니다.
- 각 산업별 평균 리스크 점수, 소속 기업 수, 주요 이슈 발생 건수, 리스크 변동률 등의 정보를 한눈에 파악할 수 있습니다.
- 내부적으로 `useIndustryRiskSummary` 훅을 사용하여 TanStack Query로 비동기 데이터를 관리합니다.

### Preview
<!-- 실제 스크린샷은 docs/screenshot.png 등에 추가 후 아래 경로로 삽입하세요. -->
<!-- ![Widget Screenshot](./docs/screenshot.png) -->

## 🚀 빠른 시작

```tsx
import { IndustryRiskSummary } from '@/widgets/industry-risk-summary';

// 이 컴포넌트는 별도의 props 없이 자체적으로 데이터를 가져옵니다.
<IndustryRiskSummary />
```

## ⚙️ 주요 로직

- **데이터 페칭**: `useIndustryRiskSummary` 훅을 호출하여 전체 산업의 리스크 요약 데이터를 가져옵니다.
- **상태 관리**: `isLoading` 상태일 때 스켈레톤 UI를 표시하고, `error` 상태일 때 오류 메시지를 표시합니다.
- **렌더링**: 성공적으로 데이터를 가져오면, `summaryData` 배열을 순회하며 각 산업의 요약 정보를 테이블의 행으로 렌더링합니다.

## 🔮 향후 개선 사항
- **정렬 기능**: 테이블의 각 헤더(평균 점수, 기업 수 등)를 클릭하여 데이터를 정렬하는 기능을 추가할 수 있습니다.
- **드릴다운(Drill-down)**: 각 산업 행을 클릭하면 해당 산업의 상세 리스크 정보를 보여주는 `IndustryRiskComparison` 위젯으로 이동하거나 모달을 띄우는 기능을 추가할 수 있습니다.
- **시각적 요소 추가**: 리스크 변동률에 따라 색상이나 아이콘을 다르게 표시하여 가시성을 높일 수 있습니다. 