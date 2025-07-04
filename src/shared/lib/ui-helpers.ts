import { WorkflowStatus, ESGIssue } from './mocks/dashboard-mock-data';

// 유틸리티 함수들
export function getWorkflowStatusColor(stage: WorkflowStatus['currentStage']): string {
  switch (stage) {
    case '초안 작성': return 'bg-yellow-100 text-yellow-800';
    case '검토': return 'bg-blue-100 text-blue-800';
    case '승인': return 'bg-purple-100 text-purple-800';
    case '발행': return 'bg-green-100 text-green-800';
    default: return 'bg-gray-100 text-gray-800';
  }
}

export function getRiskLevelColor(level: 'low' | 'medium' | 'high'): string {
  switch (level) {
    case 'low': return 'text-green-600';
    case 'medium': return 'text-yellow-600';
    case 'high': return 'text-red-600';
    default: return 'text-gray-600';
  }
}

export function getPriorityColor(priority: ESGIssue['priority']): string {
  switch (priority) {
    case 'high': return 'bg-red-100 text-red-800';
    case 'medium': return 'bg-yellow-100 text-yellow-800';
    case 'low': return 'bg-green-100 text-green-800';
    default: return 'bg-gray-100 text-gray-800';
  }
} 