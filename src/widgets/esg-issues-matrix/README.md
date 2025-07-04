# EsgIssuesMatrix (ESG 이슈 매트릭스)

## 📖 Overview
- 기업의 주요 ESG 이슈들을 **이중 중대성(Double Materiality)** 관점에서 시각화하는 위젯입니다.
- 각 이슈를 **사업 영향도**와 **이해관계자 관심도** 두 축으로 평가하여 2x2 매트릭스에 배치합니다.
- 이를 통해 '핵심', '전략', '중점', '모니터링' 등 이슈의 우선순위를 직관적으로 파악할 수 있습니다.

### Preview
<!-- 실제 스크린샷은 docs/screenshot.png 등에 추가 후 아래 경로로 삽입하세요. -->
<!-- ![Widget Screenshot](./docs/screenshot.png) -->

## 🚀 Quick Start

```tsx
import { EsgIssuesMatrix } from '@/widgets/esg-issues-matrix';

const issues = [
  // ESGIssue[] 타입의 이슈 데이터 배열
];

<EsgIssuesMatrix issues={issues} />
```

- **props 설명**
  - `issues`: ESG 이슈 정보 배열 (필수) 