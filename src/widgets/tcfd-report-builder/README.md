# TCFD 보고서 빌더 위젯 (TCFD Report Builder Widget)

## 설명

`TcfdReportBuilder` 위젯은 사용자가 TCFD(Task Force on Climate-related Financial Disclosures) 프레임워크의 4가지 핵심 요소(거버넌스, 전략, 위험 관리, 지표 및 목표)에 따라 기후 관련 재무 정보를 체계적으로 작성하고 보고서를 생성할 수 있도록 지원하는 인터페이스입니다.

## 아키텍처

### `api`

-   `getTcfdFramework()`: TCFD 프레임워크의 전체 구조(핵심 요소, 권장 사항, 질문 등) 데이터를 비동기적으로 가져옵니다.

### `model`

-   `types.ts`: 위젯에서 사용되는 주요 데이터 타입(Framework, Pillar, Recommendation, Responses 등)을 정의합니다.
-   `hooks.ts`:
    -   `useTcfdFramework()`: `getTcfdFramework` API를 호출하여 TCFD 프레임워크 데이터를 가져오는 React Query 훅입니다. 데이터 캐싱, 로딩 및 에러 상태를 관리합니다.
    -   `useTcfdReport()`: 보고서 작성과 관련된 상태(선택된 요소, 응답 내용 등)와 로직(선택 핸들러, 응답 변경 등)을 관리하는 훅입니다.

### `ui`

-   `TcfdReportBuilder.tsx`: 데이터 조회 훅과 상태 관리 훅을 사용하여 전체 빌더 UI를 구성하고 orchestrate하는 메인 컨테이너 컴포넌트입니다.
-   `PillarSelector/index.tsx`: 사용자가 4가지 TCFD 핵심 요소와 세부 권장 사항을 선택할 수 있는 사이드바 UI를 제공합니다.
-   `RecommendationForm/index.tsx`: 선택된 권장 사항에 대한 주요 질문과 가이드라인을 보여주고, 사용자가 관련 정보를 입력할 수 있는 폼을 제공합니다.
-   `ReportPreview/index.tsx`: 사용자가 입력한 내용을 바탕으로 최종 보고서의 미리보기를 생성합니다.

## 사용 예시

`TcfdReportBuilder`는 자체적으로 데이터 로딩과 상태 관리를 모두 처리하므로, 페이지에 간단하게 삽입하여 사용할 수 있습니다.

```tsx
import { TcfdReportBuilder } from '@/widgets/tcfd-report-builder';

function TCFDReportPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">TCFD 보고서 생성</h1>
      <TcfdReportBuilder />
    </div>
  );
} 