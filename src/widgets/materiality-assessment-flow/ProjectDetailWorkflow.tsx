// 선택된 프로젝트의 상세 워크플로우 위젯

'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/Card';
import { Badge } from '@/shared/ui/Badge';
import { Button } from '@/shared/ui/Button';
import { ESGIssuesMatrix } from '@/widgets/esg-issues-matrix';
import { 
  ProjectPipeline, 
  mockCompaniesOverview 
} from '@/shared/lib/mocks/dashboard-mock-data';
import { 
  CheckCircle, 
  Clock,
  Target,
  ArrowRight,
  Play,
  Save,
  Calendar,
  User
} from 'lucide-react';

interface ProjectDetailWorkflowProps {
  selectedProject?: ProjectPipeline;
  isLoading?: boolean;
}

// 현재 활성 단계 찾기
const getCurrentStage = (project: ProjectPipeline): keyof ProjectPipeline['stages'] => {
  const stages = ['materialityAssessment', 'reportWriting', 'reviewApproval', 'completion'] as const;
  for (const stage of stages) {
    if (project.stages[stage].status === 'in_progress') {
      return stage;
    }
  }
  // 기본값: 첫 번째 미완료 단계
  for (const stage of stages) {
    if (project.stages[stage].status !== 'completed') {
      return stage;
    }
  }
  return 'materialityAssessment';
};

// 상위 단계 정보 정의
const getStageDisplayInfo = (stageKey: keyof ProjectPipeline['stages']) => {
  const stageMap = {
    materialityAssessment: { name: '이중중대성 평가', shortName: '중대성 평가', icon: '🎯' },
    reportWriting: { name: '보고서 작성', shortName: '보고서 작성', icon: '📝' },
    reviewApproval: { name: '검토/승인', shortName: '검토/승인', icon: '✅' },
    completion: { name: '완료', shortName: '완료', icon: '🏁' }
  };
  return stageMap[stageKey];
};

export default function ProjectDetailWorkflow({
  selectedProject,
  isLoading = false
}: ProjectDetailWorkflowProps) {
  // 프로젝트가 선택되지 않은 경우 첫 번째 프로젝트를 기본값으로 사용
  const project = selectedProject || mockCompaniesOverview[0]?.reportStatus?.[0] as unknown as ProjectPipeline;

  if (isLoading) {
    return (
      <Card className="w-full max-w-5xl">
        <CardContent className="p-6">
          <div className="animate-pulse space-y-4">
            <div className="h-6 bg-gray-200 rounded w-1/3"></div>
            <div className="h-20 bg-gray-200 rounded"></div>
            <div className="h-40 bg-gray-200 rounded"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!project) {
    return (
      <Card className="w-full max-w-5xl">
        <CardContent className="p-6">
          <div className="text-center text-gray-500">
            프로젝트를 선택해주세요.
          </div>
        </CardContent>
      </Card>
    );
  }

  const currentStage = getCurrentStage(project);
  const currentStageData = project.stages[currentStage];
  const currentStageInfo = getStageDisplayInfo(currentStage);

  // 프로젝트와 관련된 ESG 이슈들 가져오기
  const projectCompany = mockCompaniesOverview.find(company => 
    company.name === project.companyName
  );
  const projectIssues = projectCompany?.activeIssues || [];

  return (
    <div className="w-full max-w-5xl space-y-6">
      {/* 간소화된 프로젝트 헤더 (진행률 바 제거) */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl font-bold text-gray-900">
                {project.companyName} - 지속가능성 보고서 프로젝트
              </CardTitle>
              <p className="text-sm text-gray-600 mt-1">
                {project.industry}
              </p>
            </div>
            <div className="flex items-center space-x-4 text-sm text-gray-600">
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-1" />
                마감: {new Date(project.deadline).toLocaleDateString('ko-KR')}
              </div>
              <div className="flex items-center">
                <User className="h-4 w-4 mr-1" />
                담당자: {project.assignee}
              </div>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* 메인 워크플로우 카드 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-xl">
            <span className="mr-2 text-2xl">{currentStageInfo.icon}</span>
            {currentStageInfo.name} 워크플로우
            <Badge variant="secondary" className="ml-3 bg-blue-100 text-blue-800">
              현재 진행 중
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-8">
          
          {/* Level 1: 상위 단계 진행 표시 */}
          <div className="bg-gray-50 rounded-lg p-6">
            <h4 className="font-medium text-gray-900 mb-4 text-center">프로젝트 전체 진행 상황</h4>
            <div className="flex items-center justify-between">
              {(['materialityAssessment', 'reportWriting', 'reviewApproval'] as const).map((stageKey, index) => {
                const stage = project.stages[stageKey];
                const stageInfo = getStageDisplayInfo(stageKey);
                const isActive = stageKey === currentStage;
                const isCompleted = stage.status === 'completed';
                
                return (
                  <div key={stageKey} className="flex items-center flex-1">
                    <div className="flex flex-col items-center">
                      {/* 상위 단계 원형 아이콘 */}
                      <div className={`
                        w-12 h-12 rounded-full flex items-center justify-center text-lg font-semibold
                        ${isCompleted 
                          ? 'bg-green-500 text-white' 
                          : isActive 
                            ? 'bg-blue-500 text-white'
                            : 'bg-gray-300 text-gray-600'
                        }
                      `}>
                        {isCompleted ? (
                          <CheckCircle className="h-6 w-6" />
                        ) : (
                          stageInfo.icon
                        )}
                      </div>
                      
                      {/* 상위 단계 정보 */}
                      <div className="mt-3 text-center min-w-[140px]">
                        <p className={`text-sm font-medium ${
                          isActive ? 'text-blue-700' : 
                          isCompleted ? 'text-green-700' : 
                          'text-gray-500'
                        }`}>
                          {stageInfo.shortName}
                        </p>
                        {(isActive || isCompleted) && (
                          <p className="text-xs text-gray-600 mt-1">
                            {stage.progress}% 완료
                          </p>
                        )}
                      </div>
                    </div>

                    {/* 상위 단계 연결선 */}
                    {index < 2 && (
                      <div className={`
                        flex-1 h-0.5 mx-6 mt-[-30px]
                        ${isCompleted ? 'bg-green-500' : 'bg-gray-300'}
                      `} />
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Level 2: 현재 활성 단계의 세부 워크플로우 */}
          <div className="border-l-4 border-blue-500 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-r-lg p-6">
            <h4 className="font-semibold text-blue-900 mb-6 text-lg">
              📋 {currentStageInfo.name} 세부 단계
            </h4>
            
            {/* 세부 스텝 Horizontal Stepper */}
            <div className="bg-white rounded-lg p-6 shadow-sm border border-blue-200">
              <div className="flex items-center justify-between mb-6">
                {currentStageData.steps.map((step, index) => (
                  <div key={step.id} className="flex items-center flex-1">
                    {/* 세부 스텝 원형 아이콘 */}
                    <div className="flex flex-col items-center">
                      <div className={`
                        w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold border-2
                        ${step.status === 'completed' 
                          ? 'bg-green-500 border-green-500 text-white' 
                          : step.status === 'in_progress' 
                            ? 'bg-blue-500 border-blue-500 text-white animate-pulse'
                            : 'bg-white border-gray-300 text-gray-600'
                        }
                      `}>
                        {step.status === 'completed' ? (
                          <CheckCircle className="h-5 w-5" />
                        ) : step.status === 'in_progress' ? (
                          <Clock className="h-5 w-5" />
                        ) : (
                          index + 1
                        )}
                      </div>
                      
                      {/* 세부 스텝 정보 */}
                      <div className="mt-2 text-center min-w-[120px]">
                        <p className={`text-xs font-medium ${
                          step.status === 'in_progress' ? 'text-blue-700' : 
                          step.status === 'completed' ? 'text-green-700' : 
                          'text-gray-500'
                        }`}>
                          Step {index + 1}
                        </p>
                        <p className={`text-xs leading-tight mt-1 ${
                          step.status === 'in_progress' ? 'text-blue-600' : 
                          step.status === 'completed' ? 'text-green-600' : 
                          'text-gray-400'
                        }`}>
                          {step.name}
                        </p>
                        {step.status !== 'pending' && (
                          <p className="text-xs font-semibold mt-1 text-gray-700">
                            {step.progress}%
                          </p>
                        )}
                      </div>
                    </div>

                    {/* 세부 스텝 연결선 */}
                    {index < currentStageData.steps.length - 1 && (
                      <div className={`
                        flex-1 h-0.5 mx-4 mt-[-20px]
                        ${step.status === 'completed' ? 'bg-green-500' : 'bg-gray-300'}
                      `} />
                    )}
                  </div>
                ))}
              </div>

              {/* Level 3: 현재 작업 상세 정보 */}
              {(() => {
                const currentStep = currentStageData.steps[currentStageData.currentStepIndex];
                if (!currentStep || currentStep.status === 'pending') {
                  return (
                    <div className="text-center text-gray-500 py-6">
                      아직 시작되지 않은 단계입니다.
                    </div>
                  );
                }

                return (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h5 className="font-semibold text-blue-900 mb-2 flex items-center">
                          <Target className="h-5 w-5 mr-2" />
                          현재 작업: {currentStep.name}
                        </h5>
                        <p className="text-blue-800 text-sm mb-4 leading-relaxed">
                          {currentStep.description}
                        </p>
                        
                        {/* 진행률 바 */}
                        <div className="mb-4">
                          <div className="flex justify-between text-xs text-blue-700 mb-2">
                            <span>진행률</span>
                            <span className="font-semibold">{currentStep.progress}%</span>
                          </div>
                          <div className="w-full bg-blue-200 rounded-full h-2.5">
                            <div 
                              className="bg-blue-600 h-2.5 rounded-full transition-all duration-500"
                              style={{ width: `${currentStep.progress}%` }}
                            />
                          </div>
                        </div>

                        {currentStep.nextAction && (
                          <div className="bg-white border border-blue-200 rounded p-4">
                            <p className="text-sm font-medium text-blue-900 mb-1 flex items-center">
                              <ArrowRight className="h-4 w-4 mr-1" />
                              다음 할 일:
                            </p>
                            <p className="text-sm text-blue-800">
                              {currentStep.nextAction}
                            </p>
                          </div>
                        )}
                      </div>

                      <div className="ml-6 flex flex-col space-y-3">
                        {currentStep.actionUrl && (
                          <Button size="sm" className="bg-blue-600 hover:bg-blue-700 px-4">
                            <Play className="h-4 w-4 mr-2" />
                            작업 시작
                          </Button>
                        )}
                        <Button variant="outline" size="sm" className="px-4">
                          <Save className="h-4 w-4 mr-2" />
                          임시 저장
                        </Button>
                      </div>
                    </div>
                  </div>
                );
              })()}
            </div>

            {/* 추천 다음 액션들 */}
            {currentStageData.nextActions.length > 0 && (
              <div className="mt-6 bg-white rounded-lg p-4 border border-blue-200">
                <h6 className="font-medium text-blue-900 mb-3 flex items-center">
                  💡 추천 다음 액션
                </h6>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {currentStageData.nextActions.map((action, index) => (
                    <div key={index} className="flex items-center text-sm text-blue-700 bg-blue-50 rounded px-3 py-2">
                      <ArrowRight className="h-3 w-3 mr-2 text-blue-500" />
                      {action}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* ESG 이슈 매트릭스 - 이중중대성 평가 단계에서만 표시 */}
      {currentStage === 'materialityAssessment' && projectIssues.length > 0 && (
        <div>
          <ESGIssuesMatrix 
            issues={projectIssues}
            selectedCompany={project.companyName}
            isLoading={false}
            onIssueSelect={(issue) => {
              console.log('선택된 이슈:', issue);
              // 필요시 이슈 선택 시 추가 작업 수행
            }}
            onThresholdChange={(financialThreshold, impactThreshold) => {
              console.log('임계값 변경:', { financialThreshold, impactThreshold });
              // 필요시 임계값 변경 시 추가 작업 수행
            }}
            onConfirmMaterialIssues={(materialIssues) => {
              console.log('중대 이슈 확정:', materialIssues);
              // TODO: 중대 이슈를 확정하고 다음 단계로 진행
              // 1. 중대 이슈 목록을 서버에 저장
              // 2. 현재 단계를 완료로 표시
              // 3. 다음 단계(보고서 작성)로 자동 진행
              alert(`${materialIssues.length}개의 중대 이슈가 확정되었습니다. 보고서 작성 단계로 진행합니다.`);
            }}
          />
        </div>
      )}
    </div>
  );
} 