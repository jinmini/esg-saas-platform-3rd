// 총괄 대시보드용 Mock 데이터

// 기존 WorkflowStatus를 확장한 ESG 보고서 전용 인터페이스
export interface ESGReportWorkflow {
  id: string;
  companyName: string;
  reportType: 'GRI' | 'SASB' | 'TCFD';
  targetYear: number;
  
  // ESG 보고서 7단계 생명주기
  phases: {
    planning: ESGPhaseStatus;
    dataCollection: ESGPhaseStatus;
    drafting: ESGPhaseStatus;
    review: ESGPhaseStatus;
    verification: ESGPhaseStatus;
    publication: ESGPhaseStatus;
    monitoring: ESGPhaseStatus;
  };
  
  // 전체 진행 상황
  overallProgress: number; // 0-100
  deadline: string;
  lastUpdated: string;
  assignee: string;
  priority: 'high' | 'medium' | 'low';
}

export interface ESGPhaseStatus {
  status: 'not_started' | 'in_progress' | 'completed' | 'delayed';
  progress: number; // 0-100
  startDate?: string;
  completedAt?: string;
  estimatedDuration: number; // 예상 소요일
  pendingItems?: string[];
  assignee?: string;
}

// 기존 WorkflowStatus (하위 호환성 유지)
export interface WorkflowStatus {
  id: string;
  companyName: string;
  reportType: 'GRI' | 'SASB' | 'TCFD';
  currentStage: '계획 수립' | '데이터 수집' | '초안 작성' | '내부 검토' | '외부 검증' | '발간 준비' | '성과 모니터링';
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
    currentStage: '내부 검토',
    progress: 75,
    deadline: '2025-02-15',
    lastUpdated: '2025-01-15T14:30:00+09:00',
    assignee: '김영희'
  },
  {
    id: 'wf-002',
    companyName: '한국중부발전',
    reportType: 'TCFD',
    currentStage: '초안 작성',
    progress: 45,
    deadline: '2025-03-01',
    lastUpdated: '2025-01-14T16:20:00+09:00',
    assignee: '박민수'
  },
  {
    id: 'wf-003',
    companyName: '한국중부발전',
    reportType: 'GRI',
    currentStage: '성과 모니터링',
    progress: 100,
    deadline: '2024-12-31',
    lastUpdated: '2025-01-13T09:15:00+09:00',
    assignee: '김영희'
  }
];

// 한국중부발전 ESG 보고서 워크플로우 (상세 버전)
export const mockESGWorkflows: ESGReportWorkflow[] = [
  {
    id: 'esg-001',
    companyName: '한국중부발전',
    reportType: 'GRI',
    targetYear: 2024,
    overallProgress: 75,
    deadline: '2025-02-15',
    lastUpdated: '2025-01-15T14:30:00+09:00',
    assignee: '김영희',
    priority: 'high',
    phases: {
      planning: {
        status: 'completed',
        progress: 100,
        startDate: '2024-11-01',
        completedAt: '2024-11-30',
        estimatedDuration: 30,
        assignee: '김영희'
      },
      dataCollection: {
        status: 'completed',
        progress: 100,
        startDate: '2024-12-01',
        completedAt: '2025-01-10',
        estimatedDuration: 40,
        assignee: '박민수'
      },
      drafting: {
        status: 'in_progress',
        progress: 80,
        startDate: '2025-01-11',
        estimatedDuration: 25,
        pendingItems: ['지배구조 부문 최종 검토', 'GRI 413-1 지역사회 영향평가 보완'],
        assignee: '김영희'
      },
      review: {
        status: 'in_progress',
        progress: 40,
        startDate: '2025-01-20',
        estimatedDuration: 15,
        pendingItems: ['경영진 검토 대기', '법무팀 검토 예정'],
        assignee: '이지원'
      },
      verification: {
        status: 'not_started',
        progress: 0,
        estimatedDuration: 20,
        assignee: '외부 검증기관'
      },
      publication: {
        status: 'not_started',
        progress: 0,
        estimatedDuration: 5,
        assignee: '홍보팀'
      },
      monitoring: {
        status: 'not_started',
        progress: 0,
        estimatedDuration: 365,
        assignee: '김영희'
      }
    }
  },
  {
    id: 'esg-002',
    companyName: '한국중부발전',
    reportType: 'TCFD',
    targetYear: 2024,
    overallProgress: 45,
    deadline: '2025-03-01',
    lastUpdated: '2025-01-14T16:20:00+09:00',
    assignee: '박민수',
    priority: 'medium',
    phases: {
      planning: {
        status: 'completed',
        progress: 100,
        startDate: '2024-12-01',
        completedAt: '2024-12-20',
        estimatedDuration: 20,
        assignee: '박민수'
      },
      dataCollection: {
        status: 'in_progress',
        progress: 60,
        startDate: '2024-12-21',
        estimatedDuration: 35,
        pendingItems: ['시나리오 분석 데이터 수집', '기후 리스크 정량화'],
        assignee: '박민수'
      },
      drafting: {
        status: 'not_started',
        progress: 0,
        estimatedDuration: 30,
        assignee: '박민수'
      },
      review: {
        status: 'not_started',
        progress: 0,
        estimatedDuration: 15,
        assignee: '이지원'
      },
      verification: {
        status: 'not_started',
        progress: 0,
        estimatedDuration: 20,
        assignee: '외부 검증기관'
      },
      publication: {
        status: 'not_started',
        progress: 0,
        estimatedDuration: 5,
        assignee: '홍보팀'
      },
      monitoring: {
        status: 'not_started',
        progress: 0,
        estimatedDuration: 365,
        assignee: '박민수'
      }
    }
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