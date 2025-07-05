# GRI 리포트 빌더 위젯

## 📖 개요
GRI(Global Reporting Initiative) 표준을 준수하는 지속가능성 보고서 작성을 돕는 위젯입니다. 단계별 가이드를 통해 GRI 표준 선택부터 데이터 통합, 공시 항목 작성, 최종 보고서 export까지 전 과정을 지원합니다.

AI 기반 작성 지원 및 스마트 데이터 통합 기능을 활용하여 보고 프로세스를 간소화하고 정확성과 효율성을 보장합니다.

### Preview
<!-- 위젯 스크린샷은 docs/screenshot.png 등에 추가 후 아래 경로로 삽입하세요. -->
<!-- ![Widget Screenshot](./docs/screenshot.png) -->

## 📦 주요 컴포넌트
이 위젯은 여러 모듈식 UI 컴포넌트로 구성됩니다.

### 1. `ProgressTracker`
-   **파일**: `ui/ProgressTracker/index.tsx`
-   **설명**: GRI 표준의 전체 구조를 보여주고 사용자의 작성 진행 상황을 추적하는 사이드바 컴포넌트입니다. 보고서의 여러 섹션 간 쉬운 탐색을 가능하게 합니다.

### 2. `CascadeSelector`
-   **파일**: `ui/CascadeSelector/index.tsx`
-   **설명**: 보고서 작성의 첫 단계로, 사용자가 GRI 표준 카테고리(예: Universal, Economic, Environmental, Social)와 특정 표준을 선택할 수 있도록 합니다.

### 3. `DataIntegration`
-   **파일**: `ui/DataIntegration/index.tsx`
-   **설명**: 공시 항목이 선택되면, 이 컴포넌트는 관련된 내부 데이터를 찾아 매핑을 시도합니다. 데이터 출처와 신뢰도 점수를 보여주며, 양식의 일부를 자동으로 채울 수 있습니다.

### 4. `DynamicForm`
-   **파일**: `ui/DynamicForm/index.tsx`
-   **설명**: 선택된 GRI 공시 항목의 특정 요구사항에 맞춰진 양식을 렌더링합니다. 텍스트, 정량 데이터, 날짜, 파일 업로드 등 다양한 필드 유형을 지원합니다.

### 5. `SmartTextarea`
-   **파일**: `ui/SmartTextarea/index.tsx`
-   **설명**: `DynamicForm` 내에서 서술형 항목 입력을 위해 사용되는 향상된 텍스트 영역 컴포넌트입니다. `useESGAssistant` 훅을 활용하여 AI 기반 제안, 텍스트 실시간 분석(예: ESG 카테고리, 길이), 유효성 검사 등을 제공합니다.

### 6. `ReportPreview`
-   **파일**: `ui/ReportPreview/index.tsx`
-   **설명**: 사용자 입력을 기반으로 생성된 보고서의 실시간 미리보기를 표시합니다. 완료된 모든 공시를 취합하여 전문적인 형식의 보고서로 만듭니다. 최종 보고서를 PDF로 내보내는 기능이 포함되어 있습니다.

## 💨 데이터 흐름
1.  사용자는 메인 GRI 빌더 페이지(`app/reports/builder/gri/page.tsx`)에서 시작합니다.
2.  `ProgressTracker`가 모든 GRI 카테고리와 함께 표시됩니다.
3.  사용자는 `ProgressTracker` 또는 `CascadeSelector`를 사용하여 카테고리, 표준, 공시를 선택합니다.
4.  선택된 공시에 대해 `DataIntegration` 컴포넌트가 실행되어 관련 데이터를 찾습니다.
5.  해당 공시에 필요한 특정 필드를 보여주는 `DynamicForm`이 표시됩니다. 사용자는 텍스트 기반 필드를 위해 `SmartTextarea`의 도움을 받아 양식을 작성합니다.
6.  사용자 입력은 상위 페이지 컴포넌트에서 관리하는 상태에 저장됩니다.
7.  `ProgressTracker`는 완료된 섹션을 반영하여 실시간으로 업데이트됩니다.
8.  `ReportPreview` 탭에는 모든 응답을 바탕으로 컴파일된 보고서가 표시됩니다.
9.  완료되면 사용자는 `ReportPreview` 컴포넌트에서 보고서를 내보낼 수 있습니다.

## 🔮 향후 개선 사항
-   **백엔드 연동**: 현재 플레이스홀더인 `api/` 및 `model/` 디렉터리를 실제 백엔드와 연동해야 합니다. 이를 통해 실시간 GRI 표준 정의 가져오기, 사용자 진행 상황 저장, 모의 데이터 대신 실제 회사 데이터 소스와의 데이터 통합을 수행해야 합니다.
-   **상태 관리**: 대규모 보고서의 상태를 보다 안정적으로 처리하기 위해 Zustand나 Jotai 같은 전용 상태 관리 라이브러리나 React Context를 사용하여 보고서 작성 상태를 중앙에서 관리하는 것을 고려할 수 있습니다. 