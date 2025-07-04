# SASB 보고서 빌더 위젯 (SASB Report Builder Widget)

## 설명

`SasbReportBuilder` 위젯은 사용자가 SASB(Sustainability Accounting Standards Board) 표준에 따라 지속가능성 보고서를 단계별로 작성할 수 있도록 도와주는 대화형 인터페이스를 제공합니다.

## UI 컴포넌트

### `SasbReportBuilder`

산업 분류 및 세부 업종 선택, 지표별 데이터 입력, 보고서 미리보기 기능을 포함하는 전체 보고서 빌더의 메인 컨테이너 컴포넌트입니다. `IndustrySelector`, `MetricForm`, `ReportPreview`를 조합하여 전체 빌더 UI를 구성하며, 자체적으로 데이터 조회 및 상태 관리를 수행하므로 별도의 Props가 필요 없습니다.

### `IndustrySelector`

사용자가 SASB 산업 분류와 세부 업종을 선택할 수 있는 인터페이스를 제공합니다.

### `MetricForm`

선택된 업종에 해당하는 SASB 지표들을 표시하고, 사용자가 각 지표에 대한 데이터를 입력할 수 있는 폼을 제공합니다.

### `ReportPreview`

사용자가 입력한 내용을 바탕으로 최종 보고서의 미리보기를 생성하여 보여줍니다.

### 사용 예시

```tsx
import { SasbReportBuilder } from '@/widgets/sasb-report-builder';

function ReportBuilderPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">SASB 보고서 생성</h1>
      <SasbReportBuilder />
    </div>
  );
}
```

## Hooks

### `useSasbFramework`

SASB 산업 분류 및 지표 프레임워크 데이터를 조회하는 React Query 훅입니다.

-   **반환값**: `useQuery` 결과 객체 (`data`: `Framework`)

### `useSasbReport`

보고서 빌더의 상태(선택된 산업/업종, 지표별 응답 등)와 관련 핸들러 함수를 관리하는 훅입니다.

-   **파라미터**: `framework: Framework | undefined`
-   **반환값**: `{ selectedIndustry, selectedSector, responses, handleIndustrySelect, ... }`

## API

### `getSasbFramework`

서버 또는 정적 소스에서 SASB 프레임워크 데이터를 가져옵니다.

-   **Returns**: `Promise<Framework>`

## 타입

### `Framework`

전체 SASB 산업 및 지표 구조를 나타내는 객체 타입입니다.

### `Industry`

개별 산업 분류의 데이터 타입을 나타냅니다.

### `Sector`

개별 세부 업종의 데이터 타입을 나타냅니다.

### `Metric`

개별 지표의 데이터 타입을 나타냅니다.

### `Responses`

지표 응답 데이터를 저장하는 객체 타입입니다 (`Record<string, string>`). 