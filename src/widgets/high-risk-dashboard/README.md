# HighRiskDashboard (고위험 분석 대시보드)

## 📖 개요
- **고위험 분석 결과**를 조회하여 대시보드 형태로 표시하는 위젯입니다.
- 특정 임계값(threshold) 이상의 리스크 점수를 가진 분석 결과를 필터링하여 보여줍니다.
- 내부적으로 `useHighRiskAnalyses` 훅을 사용하여 TanStack Query로 비동기 데이터를 관리합니다.
- 데이터 로딩 및 오류 상태에 대한 UI 처리가 포함되어 있습니다.

### Preview
<!-- 실제 스크린샷은 docs/screenshot.png 등에 추가 후 아래 경로로 삽입하세요. -->
<!-- ![Widget Screenshot](./docs/screenshot.png) -->

## 🚀 빠른 시작

```tsx
import { HighRiskDashboard } from '@/widgets/high-risk-dashboard';

// 이 컴포넌트는 별도의 props 없이 자체적으로 데이터를 가져옵니다.
<HighRiskDashboard />
```

## ⚙️ 주요 로직

- **데이터 페칭**: `useHighRiskAnalyses` 훅을 호출하여 고위험 분석 결과 목록을 가져옵니다.
- **상태 관리**: `isLoading` 상태일 때 스켈레톤 UI를 표시하고, `error` 상태일 때 오류 메시지를 담은 Alert 컴포넌트를 표시합니다.
- **렌더링**: 성공적으로 데이터를 가져오면, `analyses` 배열을 순회하며 각 분석 결과에 대한 정보를 카드 형태로 렌더링합니다. 결과가 없을 경우 메시지를 표시합니다.

## 🔮 향후 개선 사항
- **props 확장**: `threshold` 값을 props로 받아 리스크 임계값을 동적으로 조절하는 기능을 추가할 수 있습니다.
- **상세 정보 표시**: 각 분석 카드를 클릭하면 상세 내용을 볼 수 있는 모달이나 페이지로 이동하는 기능을 추가할 수 있습니다.
- **시각화 강화**: 단순 목록 형태가 아닌, 차트나 그래프를 활용하여 데이터를 시각적으로 더 풍부하게 표현할 수 있습니다. 