// 총괄 대시보드용 Mock 데이터

export interface WorkflowStatus {
  id: string;
  companyName: string;
  reportType: 'GRI' | 'SASB' | 'TCFD';
  currentStage: '초안 작성' | '검토' | '승인' | '발행';
  progress: number; // 0-100
  deadline: string;
  lastUpdated: string;
  assignee: string;
}

export interface CompanyFinancials {
  id: string;
  companyName: string;
  revenue: number; // 매출 (억원)
  operatingProfit: number; // 영업이익 (억원)
  debtRatio: number; // 부채비율 (%)
  lastUpdated: string;
  trend: 'up' | 'down' | 'stable';
}

export interface ESGIssue {
  id: string;
  title: string;
  category: 'Environmental' | 'Social' | 'Governance';
  businessImpact: number; // 1-10 (사업 영향도)
  stakeholderConcern: number; // 1-10 (이해관계자 관심도)
  priority: 'high' | 'medium' | 'low';
  status: 'identified' | 'analyzing' | 'responding' | 'resolved';
}

export interface CompanyOverview {
  id: string;
  name: string;
  industry: string;
  esgScore: number;
  riskLevel: 'low' | 'medium' | 'high';
  financials: CompanyFinancials;
  activeIssues: ESGIssue[];
  reportStatus: WorkflowStatus[];
}

// Mock 데이터
export const mockWorkflowStatuses: WorkflowStatus[] = [
  {
    id: 'wf-001',
    companyName: '한국중부발전',
    reportType: 'GRI',
    currentStage: '검토',
    progress: 75,
    deadline: '2025-02-15',
    lastUpdated: '2025-01-15T14:30:00+09:00',
    assignee: '김영희'
  },
  {
    id: 'wf-002',
    companyName: 'SK에너지',
    reportType: 'GRI',
    currentStage: '초안 작성',
    progress: 45,
    deadline: '2025-03-01',
    lastUpdated: '2025-01-14T16:20:00+09:00',
    assignee: '김영희'
  },
  {
    id: 'wf-003',
    companyName: '현대건설',
    reportType: 'GRI',
    currentStage: '승인',
    progress: 95,
    deadline: '2025-01-30',
    lastUpdated: '2025-01-13T09:15:00+09:00',
    assignee: '김영희'
  }
];

export const mockCompaniesFinancials: CompanyFinancials[] = [
  {
    id: 'comp-001',
    companyName: '한국중부발전',
    revenue: 15420, // 1조 5420억원
    operatingProfit: 2340, // 2340억원
    debtRatio: 45.2,
    lastUpdated: '2024-12-31',
    trend: 'up'
  },
  {
    id: 'comp-002',
    companyName: 'SK에너지',
    revenue: 89650, // 8조 9650억원
    operatingProfit: 8920, // 8920억원
    debtRatio: 38.7,
    lastUpdated: '2024-12-31',
    trend: 'stable'
  },
  {
    id: 'comp-003',
    companyName: '현대건설',
    revenue: 18750, // 1조 8750억원
    operatingProfit: 1250, // 1250억원
    debtRatio: 52.3,
    lastUpdated: '2024-12-31',
    trend: 'down'
  }
];

export const mockESGIssues: ESGIssue[] = [
  // 한국중부발전 이슈
  {
    id: 'issue-001',
    title: '탄소중립 로드맵 실행',
    category: 'Environmental',
    businessImpact: 9,
    stakeholderConcern: 8,
    priority: 'high',
    status: 'responding'
  },
  {
    id: 'issue-002',
    title: '협력사 안전관리 강화',
    category: 'Social',
    businessImpact: 7,
    stakeholderConcern: 9,
    priority: 'high',
    status: 'analyzing'
  },
  {
    id: 'issue-003',
    title: '이사회 독립성 제고',
    category: 'Governance',
    businessImpact: 6,
    stakeholderConcern: 7,
    priority: 'medium',
    status: 'identified'
  },
  // SK에너지 이슈
  {
    id: 'issue-004',
    title: '친환경 연료 전환',
    category: 'Environmental',
    businessImpact: 10,
    stakeholderConcern: 9,
    priority: 'high',
    status: 'responding'
  },
  {
    id: 'issue-005',
    title: '지역사회 투자 확대',
    category: 'Social',
    businessImpact: 5,
    stakeholderConcern: 6,
    priority: 'medium',
    status: 'responding'
  },
  // 현대건설 이슈
  {
    id: 'issue-006',
    title: '건설 폐기물 재활용',
    category: 'Environmental',
    businessImpact: 7,
    stakeholderConcern: 8,
    priority: 'high',
    status: 'analyzing'
  },
  {
    id: 'issue-007',
    title: '근로자 안전보건 관리',
    category: 'Social',
    businessImpact: 8,
    stakeholderConcern: 10,
    priority: 'high',
    status: 'responding'
  }
];

export const mockCompaniesOverview: CompanyOverview[] = [
  {
    id: 'comp-001',
    name: '한국중부발전',
    industry: '전력공급업',
    esgScore: 72,
    riskLevel: 'medium',
    financials: mockCompaniesFinancials[0],
    activeIssues: mockESGIssues.slice(0, 3),
    reportStatus: mockWorkflowStatuses.filter(w => w.companyName === '한국중부발전')
  },
  {
    id: 'comp-002',
    name: 'SK에너지',
    industry: '정유업',
    esgScore: 68,
    riskLevel: 'medium',
    financials: mockCompaniesFinancials[1],
    activeIssues: mockESGIssues.slice(3, 5),
    reportStatus: mockWorkflowStatuses.filter(w => w.companyName === 'SK에너지')
  },
  {
    id: 'comp-003',
    name: '현대건설',
    industry: '건설업',
    esgScore: 65,
    riskLevel: 'high',
    financials: mockCompaniesFinancials[2],
    activeIssues: mockESGIssues.slice(5, 7),
    reportStatus: mockWorkflowStatuses.filter(w => w.companyName === '현대건설')
  }
];

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