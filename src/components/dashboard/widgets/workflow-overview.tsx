// 워크플로우 진행 상황 개요 위젯

'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Clock, Calendar } from 'lucide-react';
import { formatTimeAgo, formatDate } from '@/lib/utils';
import { WorkflowStatus, getWorkflowStatusColor } from '@/lib/dashboard-mock-data';

interface WorkflowOverviewProps {
  workflows: WorkflowStatus[];
  isLoading?: boolean;
}

export function WorkflowOverview({ workflows, isLoading = false }: WorkflowOverviewProps) {
  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>진행 중인 보고서 작업</CardTitle>
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

  const urgentTasks = workflows.filter(w => {
    const deadline = new Date(w.deadline);
    const today = new Date();
    const diffDays = Math.ceil((deadline.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    return diffDays <= 7;
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          진행 중인 보고서 작업
          {urgentTasks.length > 0 && (
            <Badge variant="destructive" className="ml-2">
              긴급 {urgentTasks.length}건
            </Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {workflows.map((workflow) => {
            const deadline = new Date(workflow.deadline);
            const today = new Date();
            const diffDays = Math.ceil((deadline.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
            const isUrgent = diffDays <= 7;

            return (
              <div key={workflow.id} className="border rounded-lg p-4 space-y-3">
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
                    <span>
                      {formatTimeAgo(workflow.lastUpdated)}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {workflows.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            진행 중인 보고서 작업이 없습니다.
          </div>
        )}
      </CardContent>
    </Card>
  );
} 