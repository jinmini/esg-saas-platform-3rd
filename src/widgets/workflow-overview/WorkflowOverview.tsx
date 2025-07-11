// 한국중부발전 ESG 보고서 워크플로우 관리 위젯

'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/Card';
import { Progress } from '@/shared/ui/Progress';
import { Badge } from '@/shared/ui/Badge';
import { Clock, Calendar, User, AlertTriangle, CheckCircle, Circle } from 'lucide-react';
import { formatTimeAgo, formatDate } from '@/shared/lib';
import { ESGReportWorkflow, WorkflowStatus } from '@/shared/lib/mocks/dashboard-mock-data';
import { 
  getWorkflowStatusColor, 
  getESGPhaseStatusColor, 
  getESGPhaseStatusIcon, 
  getESGPriorityColor,
  getESGPhaseLabel 
} from '@/shared/lib/ui-helpers';

interface WorkflowOverviewProps {
  // 새로운 ESG 워크플로우 (우선 사용)
  esgWorkflows?: ESGReportWorkflow[];
  // 기존 워크플로우 (하위 호환성)
  workflows?: WorkflowStatus[];
  isLoading?: boolean;
}

export function WorkflowOverview({ 
  esgWorkflows = [], 
  workflows = [], 
  isLoading = false 
}: WorkflowOverviewProps) {
  
  if (isLoading) {
    return (
      <Card className="h-full">
        <CardHeader>
          <CardTitle>ESG 보고서 진행 현황</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-2 bg-gray-200 rounded w-full mb-1"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  // 우선순위: ESG 워크플로우 사용, 없으면 기존 워크플로우
  const useESGWorkflows = esgWorkflows.length > 0;
  
  // 긴급 작업 계산
  const urgentTasks = useESGWorkflows 
    ? esgWorkflows.filter(w => {
        const deadline = new Date(w.deadline);
        const today = new Date();
        const diffDays = Math.ceil((deadline.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
        return diffDays <= 7 && w.overallProgress < 100;
      })
    : workflows.filter(w => {
        const deadline = new Date(w.deadline);
        const today = new Date();
        const diffDays = Math.ceil((deadline.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
        return diffDays <= 7 && w.progress < 100;
      });

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>ESG 보고서 진행 현황</span>
          {urgentTasks.length > 0 && (
            <Badge variant="destructive" className="ml-2">
              <AlertTriangle className="h-3 w-3 mr-1" />
              긴급 {urgentTasks.length}건
            </Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {useESGWorkflows ? (
          // 새로운 ESG 워크플로우 렌더링
          esgWorkflows.map((workflow) => (
            <ESGWorkflowCard key={workflow.id} workflow={workflow} />
          ))
        ) : (
          // 기존 워크플로우 렌더링 (하위 호환성)
          workflows.map((workflow) => (
            <LegacyWorkflowCard key={workflow.id} workflow={workflow} />
          ))
        )}

        {(useESGWorkflows ? esgWorkflows.length === 0 : workflows.length === 0) && (
          <div className="text-center py-8 text-muted-foreground">
            <Circle className="h-12 w-12 mx-auto mb-3 opacity-50" />
            <p>진행 중인 ESG 보고서 작업이 없습니다.</p>
            <p className="text-sm mt-1">새로운 보고서 작업을 시작해보세요.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

// 새로운 ESG 워크플로우 카드
function ESGWorkflowCard({ workflow }: { workflow: ESGReportWorkflow }) {
  const deadline = new Date(workflow.deadline);
  const today = new Date();
  const diffDays = Math.ceil((deadline.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
  const isUrgent = diffDays <= 7 && workflow.overallProgress < 100;
  const isOverdue = diffDays < 0;

  // 현재 진행 중인 단계 찾기
  const currentPhase = Object.entries(workflow.phases).find(
    ([_, phase]) => phase.status === 'in_progress'
  );

  return (
    <div className={`border rounded-lg p-4 space-y-4 transition-all hover:shadow-md ${
      isUrgent ? 'border-red-200 bg-red-50/30' : 'border-gray-200'
    }`}>
      {/* 헤더 */}
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h4 className="font-medium text-lg">{workflow.companyName}</h4>
            <Badge variant="outline" className="text-xs">
              {workflow.reportType} {workflow.targetYear}
            </Badge>
          </div>
          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <div className="flex items-center">
              <User className="h-3 w-3 mr-1" />
              {workflow.assignee}
            </div>
            {currentPhase && (
              <div className="flex items-center">
                <span className="text-xs">현재:</span>
                                 <Badge className={`ml-1 text-xs ${getESGPhaseStatusColor(currentPhase[1].status)}`}>
                   {getESGPhaseStatusIcon(currentPhase[1].status)} {getESGPhaseLabel(currentPhase[0] as any)}
                 </Badge>
              </div>
            )}
          </div>
        </div>
        <Badge className={getESGPriorityColor(workflow.priority)}>
          {workflow.priority === 'high' ? '높음' : workflow.priority === 'medium' ? '보통' : '낮음'}
        </Badge>
      </div>

      {/* 전체 진행률 */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span className="font-medium">전체 진행률</span>
          <span className="font-mono">{workflow.overallProgress}%</span>
        </div>
        <Progress value={workflow.overallProgress} className="h-3" />
      </div>

      {/* 단계별 진행 상황 미니 뷰 */}
      <div className="grid grid-cols-7 gap-1">
        {Object.entries(workflow.phases).map(([phaseKey, phase]) => {
          const label = getESGPhaseLabel(phaseKey as any);
          const isActive = phase.status === 'in_progress';
          
          return (
            <div key={phaseKey} className="text-center">
              <div 
                className={`h-2 rounded-full mb-1 ${
                  phase.status === 'completed' ? 'bg-green-500' :
                  phase.status === 'in_progress' ? 'bg-blue-500' :
                  phase.status === 'delayed' ? 'bg-red-500' :
                  'bg-gray-200'
                }`}
                title={`${label}: ${phase.progress}%`}
              />
              <div className={`text-xs truncate ${isActive ? 'font-medium text-blue-600' : 'text-gray-500'}`}>
                {label.replace(' ', '\n')}
              </div>
            </div>
          );
        })}
      </div>

      {/* 마감일 및 상태 정보 */}
      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center space-x-4">
          <div className="flex items-center">
            <Calendar className="h-4 w-4 mr-1" />
            <span className={
              isOverdue ? 'text-red-600 font-medium' :
              isUrgent ? 'text-orange-600 font-medium' : 
              'text-muted-foreground'
            }>
              마감: {formatDate(deadline, 'MM월 dd일')}
              {isOverdue ? ` (${Math.abs(diffDays)}일 지연)` :
               isUrgent ? ` (${diffDays}일 남음)` : ''}
            </span>
          </div>
          <div className="flex items-center text-muted-foreground">
            <Clock className="h-4 w-4 mr-1" />
            <span>{formatTimeAgo(workflow.lastUpdated)}</span>
          </div>
        </div>
        
        {workflow.overallProgress === 100 && (
          <Badge variant="secondary" className="bg-green-100 text-green-800">
            <CheckCircle className="h-3 w-3 mr-1" />
            완료
          </Badge>
        )}
      </div>

      {/* 대기 항목 (있는 경우) */}
      {currentPhase && currentPhase[1].pendingItems && currentPhase[1].pendingItems.length > 0 && (
        <div className="bg-yellow-50 border border-yellow-200 rounded p-3">
          <p className="text-sm font-medium text-yellow-800 mb-1">대기 중인 작업:</p>
          <ul className="text-sm text-yellow-700 space-y-1">
            {currentPhase[1].pendingItems.map((item, index) => (
              <li key={index} className="flex items-start">
                <span className="mr-2">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

// 기존 워크플로우 카드 (하위 호환성)
function LegacyWorkflowCard({ workflow }: { workflow: WorkflowStatus }) {
  const deadline = new Date(workflow.deadline);
  const today = new Date();
  const diffDays = Math.ceil((deadline.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
  const isUrgent = diffDays <= 7;

  return (
    <div className="border rounded-lg p-4 space-y-3">
      <div className="flex items-center justify-between">
        <div>
          <h4 className="font-medium">{workflow.companyName}</h4>
          <p className="text-sm text-muted-foreground">{workflow.reportType} 보고서</p>
        </div>
        <Badge 
          className={getWorkflowStatusColor(workflow.currentStage)}
          variant="secondary"
        >
          {workflow.currentStage}
        </Badge>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span>진행률</span>
          <span>{workflow.progress}%</span>
        </div>
        <Progress value={workflow.progress} className="h-2" />
      </div>

      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <div className="flex items-center">
          <Calendar className="h-4 w-4 mr-1" />
          <span className={isUrgent ? 'text-red-600 font-medium' : ''}>
            마감: {formatDate(deadline, 'MM월 dd일')}
            {isUrgent && ` (${diffDays}일 남음)`}
          </span>
        </div>
        <div className="flex items-center">
          <Clock className="h-4 w-4 mr-1" />
          <span>{formatTimeAgo(workflow.lastUpdated)}</span>
        </div>
      </div>
    </div>
  );
} 