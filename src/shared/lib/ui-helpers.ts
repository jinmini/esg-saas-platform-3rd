import { WorkflowStatus, ESGIssue, ESGPhaseStatus, ESGReportWorkflow } from './mocks/dashboard-mock-data';

// 유틸리티 함수들
export function getWorkflowStatusColor(stage: WorkflowStatus['currentStage']): string {
  switch (stage) {
    case '계획 수립': return 'bg-blue-100 text-blue-800';
    case '데이터 수집': return 'bg-yellow-100 text-yellow-800';
    case '초안 작성': return 'bg-orange-100 text-orange-800';
    case '내부 검토': return 'bg-purple-100 text-purple-800';
    case '외부 검증': return 'bg-indigo-100 text-indigo-800';
    case '발간 준비': return 'bg-green-100 text-green-800';
    case '성과 모니터링': return 'bg-emerald-100 text-emerald-800';
    default: return 'bg-gray-100 text-gray-800';
  }
}

// ESG 단계별 상태 색상
export function getESGPhaseStatusColor(status: ESGPhaseStatus['status']): string {
  switch (status) {
    case 'not_started': return 'bg-gray-100 text-gray-600';
    case 'in_progress': return 'bg-blue-100 text-blue-700';
    case 'completed': return 'bg-green-100 text-green-700';
    case 'delayed': return 'bg-red-100 text-red-700';
    default: return 'bg-gray-100 text-gray-600';
  }
}

// ESG 단계별 상태 아이콘
export function getESGPhaseStatusIcon(status: ESGPhaseStatus['status']): string {
  switch (status) {
    case 'not_started': return '⏸️';
    case 'in_progress': return '🔄';
    case 'completed': return '✅';
    case 'delayed': return '⚠️';
    default: return '❓';
  }
}

// ESG 보고서 우선순위 색상
export function getESGPriorityColor(priority: ESGReportWorkflow['priority']): string {
  switch (priority) {
    case 'high': return 'bg-red-100 text-red-800 border-red-200';
    case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    case 'low': return 'bg-green-100 text-green-800 border-green-200';
    default: return 'bg-gray-100 text-gray-800 border-gray-200';
  }
}

// ESG 단계명 한글 변환
export function getESGPhaseLabel(phase: keyof ESGReportWorkflow['phases']): string {
  switch (phase) {
    case 'planning': return '계획 수립';
    case 'dataCollection': return '데이터 수집';
    case 'drafting': return '초안 작성';
    case 'review': return '내부 검토';
    case 'verification': return '외부 검증';
    case 'publication': return '발간 준비';
    case 'monitoring': return '성과 모니터링';
    default: return '알 수 없음';
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