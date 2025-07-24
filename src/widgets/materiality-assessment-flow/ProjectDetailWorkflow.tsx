// 선택된 프로젝트의 상세 워크플로우 위젯

'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/Card';
import { Badge } from '@/shared/ui/Badge';
import { Button } from '@/shared/ui/Button';
import { ESGIssuesMatrix } from '@/widgets/esg-issues-matrix';
import { 
  ProjectPipeline, 
  detailedWorkflows,
  mockCompaniesOverview 
} from '@/shared/lib/mocks/dashboard-mock-data';
import { 
  CheckCircle, 
  Clock, 
  AlertTriangle, 
  Target,
  ArrowRight,
  Play,
  Save,
  ExternalLink,
  Calendar,
  User
} from 'lucide-react';

interface ProjectDetailWorkflowProps {
  selectedProject?: ProjectPipeline;
  isLoading?: boolean;
}

// 스테퍼 단계 상태 아이콘
const getStageIcon = (stageKey: string, project: ProjectPipeline) => {
  const stage = project.stages[stageKey as keyof typeof project.stages];
  switch (stage.status) {
    case 'completed':
      return <CheckCircle className="h-5 w-5 text-green-600" />;
    case 'in_progress':
      return <Clock className="h-5 w-5 text-blue-600" />;
    case 'pending':
      return <AlertTriangle className="h-5 w-5 text-gray-400" />;
    default:
      return <Target className="h-5 w-5 text-gray-400" />;
  }
};

// 세부 스텝 상태 아이콘
const getStepIcon = (status: string) => {
  switch (status) {
    case 'completed':
      return <CheckCircle className="h-4 w-4 text-green-600" />;
    case 'in_progress':
      return <Clock className="h-4 w-4 text-blue-600" />;
    case 'blocked':
      return <AlertTriangle className="h-4 w-4 text-red-600" />;
    default:
      return <Target className="h-4 w-4 text-gray-400" />;
  }
};

// 현재 활성 단계 찾기
const getCurrentStage = (project: ProjectPipeline): keyof ProjectPipeline['stages'] => {
  const stages = ['materialityAssessment', 'reportWriting', 'reviewApproval', 'completion'] as const;
  
  // in_progress인 단계 찾기
  for (const stageKey of stages) {
    if (project.stages[stageKey].status === 'in_progress') {
      return stageKey;
    }
  }
  
  // 첫 번째 not_started나 pending 단계 찾기
  for (const stageKey of stages) {
    if (['not_started', 'pending'].includes(project.stages[stageKey].status)) {
      return stageKey;
    }
  }
  
  return 'materialityAssessment'; // fallback
};

export function ProjectDetailWorkflow({ 
  selectedProject, 
  isLoading = false 
}: ProjectDetailWorkflowProps) {
  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>프로젝트 상세 워크플로우</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse space-y-4">
            <div className="h-16 bg-gray-200 rounded"></div>
            <div className="h-12 bg-gray-200 rounded"></div>
            <div className="h-40 bg-gray-200 rounded"></div>
            <div className="h-32 bg-gray-200 rounded"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!selectedProject) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>프로젝트 상세 워크플로우</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12 text-muted-foreground">
            <Target className="h-12 w-12 mx-auto mb-4 text-gray-400" />
            <p className="text-lg font-medium mb-2">프로젝트를 선택해주세요</p>
            <p className="text-sm">상단 파이프라인에서 프로젝트를 클릭하면 상세 워크플로우가 표시됩니다.</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  // 현재 활성 단계와 상세 워크플로우 가져오기
  const currentStageKey = getCurrentStage(selectedProject);
  const currentStageWorkflow = detailedWorkflows[selectedProject.id]?.[currentStageKey];
  
  // 전체 단계 정의
  const allStages = [
    { key: 'materialityAssessment', name: '이중중대성 평가' },
    { key: 'reportWriting', name: '보고서 작성' },
    { key: 'reviewApproval', name: '검토/승인' },
    { key: 'completion', name: '완료' }
  ];

  // 프로젝트 ESG 이슈 가져오기
  const projectIssues = mockCompaniesOverview
    .find(company => company.name === selectedProject.companyName)?.activeIssues || [];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Target className="h-5 w-5 mr-2" />
          {selectedProject.companyName} 워크플로우
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* 프로젝트 헤더 정보 */}
        <div className="bg-blue-50 p-4 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-medium text-lg">{selectedProject.companyName} 2024 ESG 보고서</h4>
            <Badge variant="outline">{selectedProject.industry}</Badge>
          </div>
          <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-2" />
              마감일: {selectedProject.deadline}
            </div>
            <div className="flex items-center">
              <User className="h-4 w-4 mr-2" />
              담당자: {selectedProject.assignee}
            </div>
          </div>
          <div className="mt-2">
            <div className="flex items-center justify-between text-sm mb-1">
              <span>전체 진행률</span>
              <span className="font-medium">{selectedProject.overallProgress}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="h-2 rounded-full bg-blue-500"
                style={{ width: `${selectedProject.overallProgress}%` }}
              />
            </div>
          </div>
        </div>

        {/* 단계별 스테퍼 */}
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          {allStages.map((stage, index) => {
            const isActive = stage.key === currentStageKey;
            const isCompleted = selectedProject.stages[stage.key as keyof typeof selectedProject.stages].status === 'completed';
            
            return (
              <div key={stage.key} className="flex items-center">
                <div className={`flex flex-col items-center ${isActive ? 'text-blue-600' : isCompleted ? 'text-green-600' : 'text-gray-400'}`}>
                  <div className={`flex items-center justify-center w-8 h-8 rounded-full border-2 ${
                    isActive ? 'border-blue-600 bg-blue-50' : 
                    isCompleted ? 'border-green-600 bg-green-50' : 
                    'border-gray-300 bg-white'
                  }`}>
                    {getStageIcon(stage.key, selectedProject)}
                  </div>
                  <span className={`text-xs mt-1 font-medium ${isActive ? 'text-blue-800' : ''}`}>
                    {stage.name}
                  </span>
                </div>
                {index < allStages.length - 1 && (
                  <ArrowRight className="h-4 w-4 text-gray-400 mx-3" />
                )}
              </div>
            );
          })}
        </div>

        {/* 현재 단계의 상세 워크플로우 */}
        {currentStageWorkflow && (
          <div>
            <h5 className="font-medium mb-4 text-lg">
              {currentStageWorkflow.stageName} 세부 진행 현황
            </h5>
            
            {/* 세부 스텝들 */}
            <div className="space-y-3 mb-6">
              {currentStageWorkflow.steps.map((step, index) => {
                const isCurrentStep = index === currentStageWorkflow.currentStepIndex;
                
                return (
                  <div key={step.id} className={`p-4 border rounded-lg ${
                    isCurrentStep ? 'border-blue-500 bg-blue-50' : 
                    step.status === 'completed' ? 'border-green-300 bg-green-50' :
                    'border-gray-200 bg-white'
                  }`}>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center">
                        {getStepIcon(step.status)}
                        <span className={`ml-2 font-medium ${isCurrentStep ? 'text-blue-800' : ''}`}>
                          Step {index + 1}: {step.name}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        {step.estimatedHours && (
                          <Badge variant="outline" className="text-xs">
                            {step.estimatedHours}시간
                          </Badge>
                        )}
                        <span className="text-sm font-medium">{step.progress}%</span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{step.description}</p>
                    
                    {/* 진행률 바 */}
                    <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                      <div 
                        className={`h-2 rounded-full ${
                          step.status === 'completed' ? 'bg-green-500' :
                          step.status === 'in_progress' ? 'bg-blue-500' :
                          'bg-gray-300'
                        }`}
                        style={{ width: `${step.progress}%` }}
                      />
                    </div>

                    {/* 다음 액션 (현재 진행 중인 스텝에만 표시) */}
                    {isCurrentStep && step.nextAction && (
                      <div className="bg-yellow-100 border border-yellow-300 rounded p-3 mt-3">
                        <div className="flex items-start justify-between">
                          <div>
                            <p className="text-sm font-medium text-yellow-800">다음 할 일</p>
                            <p className="text-sm text-yellow-700">{step.nextAction}</p>
                          </div>
                          {step.actionUrl && (
                            <Button size="sm" className="ml-4">
                              <Play className="h-3 w-3 mr-1" />
                              시작하기
                            </Button>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* 즉시 실행 가능한 액션들 */}
            {currentStageWorkflow.nextActions.length > 0 && (
              <div className="bg-gray-50 p-4 rounded-lg">
                <h6 className="font-medium mb-3">가능한 액션들</h6>
                <div className="flex flex-wrap gap-2">
                  {currentStageWorkflow.nextActions.map((action, index) => (
                    <Button key={index} variant="outline" size="sm">
                      <ExternalLink className="h-3 w-3 mr-1" />
                      {action}
                    </Button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* 현재 단계가 이중중대성 평가이고 이슈가 있으면 매트릭스 표시 */}
        {currentStageKey === 'materialityAssessment' && projectIssues.length > 0 && (
          <div>
            <h5 className="font-medium mb-3">ESG 이슈 매트릭스</h5>
            <ESGIssuesMatrix 
              issues={projectIssues}
              selectedCompany={selectedProject.companyName}
              isLoading={false}
            />
          </div>
        )}

        {/* 하단 액션 버튼들 */}
        <div className="flex justify-between pt-4 border-t">
          <div className="text-sm text-gray-500">
            최종 업데이트: {selectedProject.lastUpdated}
          </div>
          <div className="space-x-2">
            <Button variant="outline" size="sm">
              <Save className="h-3 w-3 mr-1" />
              임시 저장
            </Button>
            <Button size="sm">
              <ArrowRight className="h-3 w-3 mr-1" />
              다음 단계로
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 