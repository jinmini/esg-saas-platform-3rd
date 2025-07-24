// 프로젝트 파이프라인 위젯 (CRM 스타일)

'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/Card';
import { Badge } from '@/shared/ui/Badge';
import { Clock, AlertTriangle } from 'lucide-react';
import { formatDate } from '@/shared/lib';
import { ProjectPipeline } from '@/shared/lib/mocks/dashboard-mock-data';
import { cn } from '@/shared/lib/cn';

interface ProjectPipelineProps {
  pipelines: ProjectPipeline[];
  isLoading?: boolean;
  selectedProjectId?: string;
  onProjectSelect?: (projectId: string) => void;
}

// 리스크 레벨에 따른 배지 스타일
const getRiskBadgeVariant = (riskLevel: 'low' | 'medium' | 'high') => {
  switch (riskLevel) {
    case 'low':
      return 'text-green-700 bg-green-50 border-green-200';
    case 'medium':
      return 'text-yellow-700 bg-yellow-50 border-yellow-200';
    case 'high':
      return 'text-red-700 bg-red-50 border-red-200';
    default:
      return 'text-gray-700 bg-gray-50 border-gray-200';
  }
};

const getRiskLabel = (riskLevel: 'low' | 'medium' | 'high') => {
  switch (riskLevel) {
    case 'low':
      return '낮음';
    case 'medium':
      return '보통';
    case 'high':
      return '높음';
    default:
      return '알 수 없음';
  }
};

// 진행률에 따른 progress bar 색상
const getProgressColor = (progress: number) => {
  if (progress === 0) return 'bg-gray-200';
  if (progress < 30) return 'bg-red-500';
  if (progress < 70) return 'bg-yellow-500';
  return 'bg-green-500';
};

// 단계별 progress bar 컴포넌트
const StageProgress = ({ 
  stage, 
  onClick 
}: { 
  stage: { progress: number; actionUrl?: string };
  onClick?: (e?: React.MouseEvent) => void;
}) => {
  const progressColor = getProgressColor(stage.progress);
  
  return (
    <div className="flex items-center space-x-2">
      <div 
        className={cn(
          "w-16 h-2 bg-gray-200 rounded-full overflow-hidden cursor-pointer hover:opacity-80 transition-opacity",
          onClick && "hover:scale-105 transform transition-transform"
        )}
        onClick={onClick}
      >
        <div 
          className={cn("h-full transition-all duration-300", progressColor)}
          style={{ width: `${stage.progress}%` }}
        />
      </div>
      <span className="text-xs text-gray-600 min-w-[30px]">
        {stage.progress}%
      </span>
    </div>
  );
};

export function WorkflowOverview({ 
  pipelines, 
  isLoading = false, 
  selectedProjectId,
  onProjectSelect 
}: ProjectPipelineProps) {
  // 마감일 순으로 정렬
  const sortedPipelines = [...pipelines].sort((a, b) => 
    new Date(a.deadline).getTime() - new Date(b.deadline).getTime()
  );

  // 긴급 프로젝트 (7일 이내 마감) 계산
  const urgentProjects = sortedPipelines.filter(pipeline => {
    const deadline = new Date(pipeline.deadline);
    const today = new Date();
    const diffDays = Math.ceil((deadline.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    return diffDays <= 7;
  });

  const handleStageClick = (actionUrl?: string) => {
    if (actionUrl) {
      // TODO: 실제 라우팅 구현 시 사용
      console.log('Navigate to:', actionUrl);
      // router.push(actionUrl);
    }
  };

  if (isLoading) {
      return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>클라이언트 프로젝트 파이프라인</CardTitle>
          {urgentProjects.length > 0 && (
            <div className="flex items-center space-x-2">
              <AlertTriangle className="h-4 w-4 text-red-500" />
              <Badge variant="outline" className="text-red-700 bg-red-50 border-red-200">
                긴급 {urgentProjects.length}건
              </Badge>
            </div>
          )}
        </div>
      </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="animate-pulse flex items-center space-x-4 py-3">
                <div className="h-4 bg-gray-200 rounded w-24"></div>
                <div className="h-2 bg-gray-200 rounded w-16"></div>
                <div className="h-2 bg-gray-200 rounded w-16"></div>
                <div className="h-2 bg-gray-200 rounded w-16"></div>
                <div className="h-2 bg-gray-200 rounded w-16"></div>
                <div className="h-4 bg-gray-200 rounded w-12"></div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          클라이언트 프로젝트 파이프라인
          {urgentProjects.length > 0 && (
            <Badge variant="destructive" className="ml-2 flex items-center">
              <AlertTriangle className="h-3 w-3 mr-1" />
              긴급 {urgentProjects.length}건
            </Badge>
          )}
        </CardTitle>
      </CardHeader>
      
      <CardContent className="p-0">
        {/* 테이블 헤더 */}
        <div className="grid grid-cols-6 gap-4 p-4 bg-gray-50 border-b text-sm font-medium text-gray-600">
          <div>기업명</div>
          <div className="text-center">이슈 중대성 평가</div>
          <div className="text-center">보고서 작성</div>
          <div className="text-center">검토/승인</div>
          <div className="text-center">전체 진행률</div>
          <div className="text-center">리스크</div>
        </div>

        {/* 테이블 바디 */}
        <div className="divide-y divide-gray-100">
          {sortedPipelines.map((pipeline) => {
            const deadline = new Date(pipeline.deadline);
            const today = new Date();
            const diffDays = Math.ceil((deadline.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
            const isUrgent = diffDays <= 7;
            const isSelected = selectedProjectId === pipeline.id;

            return (
              <div 
                key={pipeline.id} 
                className={cn(
                  "grid grid-cols-6 gap-4 p-4 cursor-pointer transition-colors",
                  isSelected 
                    ? "bg-blue-50 border-l-4 border-l-blue-500" 
                    : "hover:bg-gray-50",
                  isUrgent && !isSelected && "bg-red-25"
                )}
                onClick={() => onProjectSelect?.(pipeline.id)}
              >
                {/* 기업명 */}
                <div className="flex flex-col">
                  <span className="font-medium text-gray-900">
                    {pipeline.companyName}
                  </span>
                  <div className="flex items-center text-xs text-gray-500 mt-1">
                    <Clock className="h-3 w-3 mr-1" />
                    <span className={isUrgent ? 'text-red-600 font-medium' : ''}>
                      {formatDate(deadline, 'MM월 dd일')}
                      {isUrgent && ` (${diffDays}일 남음)`}
                    </span>
                  </div>
                </div>

                {/* 이슈 중대성 평가 */}
                <div className="flex justify-center">
                  <StageProgress 
                    stage={pipeline.stages.materialityAssessment}
                    onClick={(e) => {
                      e?.stopPropagation();
                      handleStageClick(pipeline.stages.materialityAssessment.actionUrl);
                    }}
                  />
                </div>

                {/* 보고서 작성 */}
                <div className="flex justify-center">
                  <StageProgress 
                    stage={pipeline.stages.reportWriting}
                    onClick={(e) => {
                      e?.stopPropagation();
                      handleStageClick(pipeline.stages.reportWriting.actionUrl);
                    }}
                  />
                </div>

                {/* 검토/승인 */}
                <div className="flex justify-center">
                  <StageProgress 
                    stage={pipeline.stages.reviewApproval}
                    onClick={(e) => {
                      e?.stopPropagation();
                      handleStageClick(pipeline.stages.reviewApproval.actionUrl);
                    }}
                  />
                </div>

                {/* 전체 진행률 */}
                <div className="flex justify-center">
                  <StageProgress 
                    stage={pipeline.stages.completion}
                    onClick={(e) => {
                      e?.stopPropagation();
                      handleStageClick(pipeline.stages.completion.actionUrl);
                    }}
                  />
                </div>

                {/* 리스크 레벨 */}
                <div className="flex justify-center">
                  <Badge 
                    className={cn(
                      "text-xs border",
                      getRiskBadgeVariant(pipeline.riskLevel)
                    )}
                    variant="outline"
                  >
                    {getRiskLabel(pipeline.riskLevel)}
                  </Badge>
                </div>
              </div>
            );
          })}
        </div>

        {sortedPipelines.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            진행 중인 프로젝트가 없습니다.
          </div>
        )}
      </CardContent>
    </Card>
  );
} 