// ESG 통합 관리 대시보드

'use client';

import { useState, useEffect } from 'react';

import { WorkflowOverview } from '@/widgets/workflow-overview';
import { ProjectDetailWorkflow } from '@/widgets/materiality-assessment-flow';
import { 
  mockProjectPipelines
} from '@/shared/lib/mocks/dashboard-mock-data';
import { 
  useDashboardWorkflows
} from '@/hooks/api/use-dashboard';

export default function DashboardPage() {
  // 🚀 API 훅 사용 - 핵심 위젯만 연동
  const { isLoading: workflowsLoading } = useDashboardWorkflows();
  
  // 프로젝트 선택 상태 관리
  const [selectedProjectId, setSelectedProjectId] = useState<string>();
  
  // 선택된 프로젝트 찾기
  const selectedProject = selectedProjectId 
    ? mockProjectPipelines.find(p => p.id === selectedProjectId)
    : undefined;
  
  // 초기 로드 시 첫 번째 프로젝트 자동 선택
  useEffect(() => {
    if (!selectedProjectId && mockProjectPipelines.length > 0) {
      setSelectedProjectId(mockProjectPipelines[0].id);
    }
  }, [selectedProjectId]);

  return (
    <div className="container mx-auto max-w-7xl space-y-6">
      {/* 헤더 */}
      <div className="px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold tracking-tight">ESG 통합 관리 대시보드</h1>
        <p className="text-muted-foreground mt-2">
          담당 기업의 ESG 보고서 진행 상황과 이슈를 통합 관리합니다.
        </p>
      </div>

      {/* 메인 콘텐츠 영역 - 통일된 너비 적용 */}
      <div className="px-4 sm:px-6 lg:px-8 space-y-6">
        {/* 프로젝트 파이프라인 위젯 */}
        <div className="w-full">
          <WorkflowOverview 
            pipelines={mockProjectPipelines}
            isLoading={workflowsLoading}
            selectedProjectId={selectedProjectId}
            onProjectSelect={setSelectedProjectId}
          />
        </div>

        {/* 프로젝트 상세 워크플로우 위젯 (ESG 매트릭스 포함) */}
        {selectedProject && (
          <div className="w-full">
            <ProjectDetailWorkflow 
              selectedProject={selectedProject}
              isLoading={workflowsLoading}
            />
          </div>
        )}
      </div>
    </div>
  );
}
