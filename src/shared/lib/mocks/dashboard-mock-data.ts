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

// 새로운 파이프라인 UI를 위한 타입
export interface ProcessStage {
  name: string;
  progress: number; // 0-100
  status: 'not_started' | 'in_progress' | 'completed' | 'pending';
  actionUrl?: string; // 클릭 시 이동할 페이지 URL
}

export interface ProjectPipeline {
  id: string;
  companyName: string;
  industry: string;
  deadline: string;
  overallProgress: number; // 전체 진행률 0-100
  riskLevel: 'low' | 'medium' | 'high';
  stages: {
    materialityAssessment: ProcessStage;
    reportWriting: ProcessStage;
    reviewApproval: ProcessStage;
    completion: ProcessStage;
  };
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

// 새로운 파이프라인 모크 데이터
export const mockProjectPipelines: ProjectPipeline[] = [
  {
    id: 'pipeline-001',
    companyName: '한국중부발전',
    industry: '전력공급업',
    deadline: '2025-02-15',
    overallProgress: 20,
    riskLevel: 'medium',
    stages: {
      materialityAssessment: {
        name: '이슈 중대성 평가',
        progress: 60,
        status: 'in_progress',
        actionUrl: '/materiality-assessment/comp-001'
      },
      reportWriting: {
        name: '보고서 작성',
        progress: 0,
        status: 'not_started',
        actionUrl: '/reports/builder/gri'
      },
      reviewApproval: {
        name: '검토/승인',
        progress: 0,
        status: 'not_started',
        actionUrl: '/review/comp-001'
      },
      completion: {
        name: '전체 진행률',
        progress: 20,
        status: 'in_progress',
        actionUrl: '/projects/comp-001'
      }
    },
    lastUpdated: '2025-01-15T14:30:00+09:00',
    assignee: '김영희'
  },
  {
    id: 'pipeline-002',
    companyName: '네이버',
    industry: 'IT서비스',
    deadline: '2025-03-01',
    overallProgress: 40,
    riskLevel: 'low',
    stages: {
      materialityAssessment: {
        name: '이슈 중대성 평가',
        progress: 100,
        status: 'completed',
        actionUrl: '/materiality-assessment/comp-002'
      },
      reportWriting: {
        name: '보고서 작성',
        progress: 30,
        status: 'in_progress',
        actionUrl: '/reports/builder/gri'
      },
      reviewApproval: {
        name: '검토/승인',
        progress: 0,
        status: 'not_started',
        actionUrl: '/review/comp-002'
      },
      completion: {
        name: '전체 진행률',
        progress: 40,
        status: 'in_progress',
        actionUrl: '/projects/comp-002'
      }
    },
    lastUpdated: '2025-01-14T16:20:00+09:00',
    assignee: '김영희'
  },
  {
    id: 'pipeline-003',
    companyName: 'SK에너지',
    industry: '정유업',
    deadline: '2025-01-30',
    overallProgress: 85,
    riskLevel: 'high',
    stages: {
      materialityAssessment: {
        name: '이슈 중대성 평가',
        progress: 100,
        status: 'completed',
        actionUrl: '/materiality-assessment/comp-003'
      },
      reportWriting: {
        name: '보고서 작성',
        progress: 100,
        status: 'completed',
        actionUrl: '/reports/builder/gri'
      },
      reviewApproval: {
        name: '검토/승인',
        progress: 50,
        status: 'in_progress',
        actionUrl: '/review/comp-003'
      },
      completion: {
        name: '전체 진행률',
        progress: 85,
        status: 'in_progress',
        actionUrl: '/projects/comp-003'
      }
    },
    lastUpdated: '2025-01-13T09:15:00+09:00',
    assignee: '김영희'
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

// 상세 워크플로우를 위한 타입들
export interface DetailedWorkflowStep {
  id: string;
  name: string;
  description: string;
  status: 'completed' | 'in_progress' | 'pending' | 'blocked';
  progress: number; // 0-100
  estimatedHours?: number;
  actionUrl?: string;
  nextAction?: string; // "다음 할 일" 설명
}

export interface StageDetailWorkflow {
  stageKey: keyof ProjectPipeline['stages'];
  stageName: string;
  steps: DetailedWorkflowStep[];
  currentStepIndex: number; // 현재 진행 중인 스텝 인덱스
  nextActions: string[]; // 즉시 할 수 있는 액션들
}

// 각 단계별 상세 워크플로우 데이터
export const detailedWorkflows: Record<string, Record<string, StageDetailWorkflow>> = {
  // 한국중부발전 프로젝트
  'project-1': {
    materialityAssessment: {
      stageKey: 'materialityAssessment',
      stageName: '이중중대성 평가',
      currentStepIndex: 1, // Step 2가 현재 진행 중
      steps: [
        {
          id: 'step-1',
          name: '이슈 풀 정의',
          description: '업계 표준 ESG 이슈 목록 수집 및 기업 특화 이슈 식별',
          status: 'completed',
          progress: 100,
          estimatedHours: 8,
          actionUrl: '/issues/define'
        },
        {
          id: 'step-2', 
          name: '영향/재무 평가',
          description: '각 이슈의 사업영향도와 이해관계자 관심도 점수 매기기',
          status: 'in_progress',
          progress: 65,
          estimatedHours: 12,
          actionUrl: '/issues/evaluate',
          nextAction: '미평가된 7개 이슈의 영향도/관심도 입력하기'
        },
        {
          id: 'step-3',
          name: '매트릭스 확정',
          description: '이중중대성 매트릭스 검토 및 최종 승인',
          status: 'pending',
          progress: 0,
          estimatedHours: 4,
          actionUrl: '/issues/finalize'
        }
      ],
      nextActions: [
        '미평가 이슈 7개 평가하기',
        '이해관계자 인터뷰 결과 반영',
        '임시 저장된 평가 계속하기'
      ]
    },
    reportWriting: {
      stageKey: 'reportWriting',
      stageName: '보고서 작성',
      currentStepIndex: 0,
      steps: [
        {
          id: 'step-1',
          name: 'GRI 표준 매핑',
          description: '확정된 중대 이슈를 GRI 표준 지표에 매핑',
          status: 'pending',
          progress: 0,
          estimatedHours: 6,
          actionUrl: '/report/gri-mapping'
        },
        {
          id: 'step-2',
          name: '데이터 수집',
          description: '보고서 작성에 필요한 정량/정성 데이터 수집',
          status: 'pending',
          progress: 0,
          estimatedHours: 20,
          actionUrl: '/report/data-collection'
        },
        {
          id: 'step-3',
          name: '보고서 초안 작성',
          description: '수집된 데이터를 바탕으로 보고서 초안 작성',
          status: 'pending',
          progress: 0,
          estimatedHours: 24,
          actionUrl: '/report/draft'
        }
      ],
      nextActions: ['중대 이슈 GRI 표준 매핑 시작']
    }
  },
  // 네이버 프로젝트  
  'project-2': {
    materialityAssessment: {
      stageKey: 'materialityAssessment',
      stageName: '이중중대성 평가',
      currentStepIndex: 2, // Step 3이 현재 진행 중
      steps: [
        {
          id: 'step-1',
          name: '이슈 풀 정의',
          description: '업계 표준 ESG 이슈 목록 수집 및 기업 특화 이슈 식별',
          status: 'completed',
          progress: 100,
          estimatedHours: 8,
          actionUrl: '/issues/define'
        },
        {
          id: 'step-2',
          name: '영향/재무 평가', 
          description: '각 이슈의 사업영향도와 이해관계자 관심도 점수 매기기',
          status: 'completed',
          progress: 100,
          estimatedHours: 12,
          actionUrl: '/issues/evaluate'
        },
        {
          id: 'step-3',
          name: '매트릭스 확정',
          description: '이중중대성 매트릭스 검토 및 최종 승인',
          status: 'in_progress',
          progress: 30,
          estimatedHours: 4,
          actionUrl: '/issues/finalize',
          nextAction: '매트릭스 검토 및 승인 요청하기'
        }
      ],
      nextActions: [
        '매트릭스 검토 요청 발송',
        '이해관계자 피드백 수렴',
        '최종 매트릭스 승인'
      ]
    }
  }
};