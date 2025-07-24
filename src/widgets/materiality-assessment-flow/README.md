# ProjectDetailWorkflow Widget

선택된 프로젝트의 상세 워크플로우를 관리하는 CRM 스타일 위젯입니다.

## 주요 기능

- **선택된 프로젝트 집중**: 상단 파이프라인에서 선택한 단일 프로젝트의 상세 진행 현황
- **단계별 스테퍼**: 전체 프로세스 진행 상황을 시각적으로 표시 (①→②→③→④)
- **세부 워크플로우**: 현재 단계의 구체적인 과업들과 진행률
- **다음 할 일 가이드**: 즉시 실행 가능한 액션과 링크 제공
- **ESG 이슈 매트릭스 통합**: 이중중대성 평가 단계에서 기존 컴포넌트 연동

## 사용 방법

```tsx
import { ProjectDetailWorkflow } from '@/widgets/materiality-assessment-flow';

<ProjectDetailWorkflow 
  selectedProject={selectedProject}
  isLoading={false}
/>
```

## Props

- `selectedProject`: ProjectPipeline | undefined - 선택된 프로젝트 데이터
- `isLoading`: boolean - 로딩 상태

## 특징

- 프로젝트를 선택하지 않으면 "프로젝트를 선택해주세요" 메시지 표시
- 현재 진행 중인 단계의 세부 스텝들을 상세히 표시
- 각 스텝별 진행률, 예상 소요 시간, 다음 액션 제공
- 즉시 실행 가능한 액션 버튼들로 실제 업무 연결 