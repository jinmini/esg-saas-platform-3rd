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

// 세부 워크플로우 스텝 정의
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

// 통합된 프로세스 단계 (세부 워크플로우 포함)
export interface ProcessStage {
  name: string;
  progress: number; // 0-100 (세부 스텝들의 가중 평균으로 계산)
  status: 'not_started' | 'in_progress' | 'completed' | 'pending';
  actionUrl?: string; // 클릭 시 이동할 페이지 URL
  
  // 🔑 통합: 세부 워크플로우 정보
  steps: DetailedWorkflowStep[];
  currentStepIndex: number; // 현재 진행 중인 스텝 인덱스
  nextActions: string[]; // 즉시 실행 가능한 액션들
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
    companyName: '두산퓨얼셀',
    reportType: 'SASB',
    currentStage: '초안 작성',
    progress: 45,
    deadline: '2025-03-01',
    lastUpdated: '2025-01-14T16:20:00+09:00',
    assignee: '박철수'
  },
  {
    id: 'wf-003',
    companyName: 'LS일렉트릭',
    reportType: 'TCFD',
    currentStage: '승인',
    progress: 95,
    deadline: '2025-01-30',
    lastUpdated: '2025-01-13T09:15:00+09:00',
    assignee: '이지은'
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
    companyName: '두산퓨얼셀',
    revenue: 8960, // 8960억원
    operatingProfit: 920, // 920억원
    debtRatio: 38.7,
    lastUpdated: '2024-12-31',
    trend: 'stable'
  },
  {
    id: 'comp-003',
    companyName: 'LS일렉트릭',
    revenue: 18750, // 1조 8750억원
    operatingProfit: 1850, // 1850억원
    debtRatio: 42.3,
    lastUpdated: '2024-12-31',
    trend: 'up'
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
  // 두산퓨얼셀 이슈
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
  // LS일렉트릭 이슈
  {
    id: 'issue-006',
    title: '스마트 전력망 구축',
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
        actionUrl: '/materiality-assessment/comp-001',
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
        name: '보고서 작성',
        progress: 0,
        status: 'not_started',
        actionUrl: '/reports/builder/gri',
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
      },
      reviewApproval: {
        name: '검토/승인',
        progress: 0,
        status: 'not_started',
        actionUrl: '/review/comp-001',
        currentStepIndex: 0,
        steps: [
          {
            id: 'step-1',
            name: '내부 검토',
            description: '작성된 보고서의 내부 검토 및 수정',
            status: 'pending',
            progress: 0,
            estimatedHours: 8,
            actionUrl: '/review/internal'
          },
          {
            id: 'step-2',
            name: '외부 검증',
            description: '제3자 기관의 외부 검증',
            status: 'pending',
            progress: 0,
            estimatedHours: 16,
            actionUrl: '/review/external'
          },
          {
            id: 'step-3',
            name: '최종 승인',
            description: '경영진 최종 승인 및 발행 준비',
            status: 'pending',
            progress: 0,
            estimatedHours: 4,
            actionUrl: '/review/final'
          }
        ],
        nextActions: ['보고서 작성 완료 후 시작']
      },
      completion: {
        name: '전체 진행률',
        progress: 20,
        status: 'in_progress',
        actionUrl: '/projects/comp-001',
        currentStepIndex: 0,
        steps: [
          {
            id: 'step-1',
            name: '프로젝트 완료',
            description: '모든 단계 완료 및 최종 점검',
            status: 'pending',
            progress: 20,
            estimatedHours: 2,
            actionUrl: '/projects/complete'
          }
        ],
        nextActions: ['모든 이전 단계 완료 후 최종 검토']
      }
    },
    lastUpdated: '2025-01-14T14:30:00+09:00',
    assignee: '김영희'
  },
  {
    id: 'pipeline-002',
    companyName: '두산퓨얼셀',
    industry: '연료전지제조업',
    deadline: '2025-03-01',
    overallProgress: 40,
    riskLevel: 'low',
    stages: {
      materialityAssessment: {
        name: '이슈 중대성 평가',
        progress: 100,
        status: 'completed',
        actionUrl: '/materiality-assessment/comp-002',
        currentStepIndex: 2, // Step 3이 완료됨
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
            status: 'completed',
            progress: 100,
            estimatedHours: 4,
            actionUrl: '/issues/finalize'
          }
        ],
        nextActions: ['보고서 작성 단계로 진행']
      },
      reportWriting: {
        name: '보고서 작성',
        progress: 30,
        status: 'in_progress',
        actionUrl: '/reports/builder/sasb',
        currentStepIndex: 0,
        steps: [
          {
            id: 'step-1',
            name: 'SASB 표준 매핑',
            description: '확정된 중대 이슈를 SASB 표준 지표에 매핑',
            status: 'in_progress',
            progress: 30,
            estimatedHours: 6,
            actionUrl: '/report/sasb-mapping',
            nextAction: 'SASB 표준 매핑 완료하기'
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
        nextActions: ['SASB 표준 매핑 완료', '데이터 수집 시작']
      },
      reviewApproval: {
        name: '검토/승인',
        progress: 0,
        status: 'not_started',
        actionUrl: '/review/comp-002',
        currentStepIndex: 0,
        steps: [
          {
            id: 'step-1',
            name: '내부 검토',
            description: '작성된 보고서의 내부 검토 및 수정',
            status: 'pending',
            progress: 0,
            estimatedHours: 8,
            actionUrl: '/review/internal'
          },
          {
            id: 'step-2',
            name: '외부 검증',
            description: '제3자 기관의 외부 검증',
            status: 'pending',
            progress: 0,
            estimatedHours: 16,
            actionUrl: '/review/external'
          },
          {
            id: 'step-3',
            name: '최종 승인',
            description: '경영진 최종 승인 및 발행 준비',
            status: 'pending',
            progress: 0,
            estimatedHours: 4,
            actionUrl: '/review/final'
          }
        ],
        nextActions: ['보고서 작성 완료 후 시작']
      },
      completion: {
        name: '전체 진행률',
        progress: 40,
        status: 'in_progress',
        actionUrl: '/projects/comp-002',
        currentStepIndex: 0,
        steps: [
          {
            id: 'step-1',
            name: '프로젝트 완료',
            description: '모든 단계 완료 및 최종 점검',
            status: 'pending',
            progress: 40,
            estimatedHours: 2,
            actionUrl: '/projects/complete'
          }
        ],
        nextActions: ['현재 보고서 작성 단계 완료 후 검토 진행']
      }
    },
    lastUpdated: '2025-01-14T16:20:00+09:00',
    assignee: '박철수'
  },
  {
    id: 'pipeline-003',
    companyName: 'LS일렉트릭',
    industry: '전력설비제조업',
    deadline: '2025-04-30',
    overallProgress: 75,
    riskLevel: 'high',
    stages: {
      materialityAssessment: {
        name: '이슈 중대성 평가',
        progress: 100,
        status: 'completed',
        actionUrl: '/materiality-assessment/comp-003',
        currentStepIndex: 2,
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
            status: 'completed',
            progress: 100,
            estimatedHours: 4,
            actionUrl: '/issues/finalize'
          }
        ],
        nextActions: ['완료됨']
      },
      reportWriting: {
        name: '보고서 작성',
        progress: 100,
        status: 'completed',
        actionUrl: '/reports/builder/tcfd',
        currentStepIndex: 2,
        steps: [
          {
            id: 'step-1',
            name: 'TCFD 표준 매핑',
            description: '확정된 중대 이슈를 TCFD 표준 지표에 매핑',
            status: 'completed',
            progress: 100,
            estimatedHours: 6,
            actionUrl: '/report/tcfd-mapping'
          },
          {
            id: 'step-2',
            name: '데이터 수집',
            description: '보고서 작성에 필요한 정량/정성 데이터 수집',
            status: 'completed',
            progress: 100,
            estimatedHours: 20,
            actionUrl: '/report/data-collection'
          },
          {
            id: 'step-3',
            name: '보고서 초안 작성',
            description: '수집된 데이터를 바탕으로 보고서 초안 작성',
            status: 'completed',
            progress: 100,
            estimatedHours: 24,
            actionUrl: '/report/draft'
          }
        ],
        nextActions: ['완료됨']
      },
      reviewApproval: {
        name: '검토/승인',
        progress: 25,
        status: 'in_progress',
        actionUrl: '/review/comp-003',
        currentStepIndex: 0,
        steps: [
          {
            id: 'step-1',
            name: '내부 검토',
            description: '작성된 보고서의 내부 검토 및 수정',
            status: 'in_progress',
            progress: 25,
            estimatedHours: 8,
            actionUrl: '/review/internal',
            nextAction: '내부 검토 의견 반영 완료하기'
          },
          {
            id: 'step-2',
            name: '외부 검증',
            description: '제3자 기관의 외부 검증',
            status: 'pending',
            progress: 0,
            estimatedHours: 16,
            actionUrl: '/review/external'
          },
          {
            id: 'step-3',
            name: '최종 승인',
            description: '경영진 최종 승인 및 발행 준비',
            status: 'pending',
            progress: 0,
            estimatedHours: 4,
            actionUrl: '/review/final'
          }
        ],
        nextActions: ['내부 검토 완료', '외부 검증 기관 선정']
      },
      completion: {
        name: '전체 진행률',
        progress: 75,
        status: 'in_progress',
        actionUrl: '/projects/comp-003',
        currentStepIndex: 0,
        steps: [
          {
            id: 'step-1',
            name: '프로젝트 완료',
            description: '모든 단계 완료 및 최종 점검',
            status: 'pending',
            progress: 75,
            estimatedHours: 2,
            actionUrl: '/projects/complete'
          }
        ],
        nextActions: ['검토/승인 단계 완료 후 최종 점검']
      }
    },
    lastUpdated: '2025-01-14T09:15:00+09:00',
    assignee: '이지은'
  }
];

// 총 회사 개요 데이터 (대시보드용)
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
    name: '두산퓨얼셀',
    industry: '연료전지제조업',
    esgScore: 78,
    riskLevel: 'low',
    financials: mockCompaniesFinancials[1],
    activeIssues: mockESGIssues.slice(3, 5),
    reportStatus: mockWorkflowStatuses.filter(w => w.companyName === '두산퓨얼셀')
  },
  {
    id: 'comp-003',
    name: 'LS일렉트릭',
    industry: '전력설비제조업',
    esgScore: 65,
    riskLevel: 'high',
    financials: mockCompaniesFinancials[2],
    activeIssues: mockESGIssues.slice(5, 7),
    reportStatus: mockWorkflowStatuses.filter(w => w.companyName === 'LS일렉트릭')
  }
];

// 점수 매기기 탭용 데이터 구조 (1-5점 스케일)
export interface FinancialImpactScore {
  revenue: number;      // 매출 영향 1-5
  cost: number;         // 비용 영향 1-5  
  risk: number;         // 리스크 영향 1-5
  overall: number;      // 종합 점수 (자동 계산)
}

export interface StakeholderConcernScore {
  investors: number;    // 투자자 관심 1-5
  customers: number;    // 고객 관심 1-5
  regulators: number;   // 규제기관 관심 1-5
  overall: number;      // 종합 점수 (자동 계산)
}

export interface IssueEvaluation {
  issueId: string;
  financialImpact: number;          // 단순화된 재무적 영향 점수 1-5
  stakeholderConcern: number;       // 단순화된 이해관계자 관심도 1-5
  notes?: string;                   // 평가 근거 (선택사항)
  status: 'pending' | 'partial' | 'completed';
  lastUpdated: Date;
  evaluator?: string;               // 평가자 이름
}

// 점수 매기기 진행 상태
export interface ScoringProgress {
  totalIssues: number;
  completedIssues: number;
  partialIssues: number;
  averageFinancialScore: number;
  averageStakeholderScore: number;
  lastUpdated: Date;
}

// Mock 평가 데이터 (1-5점 스케일)
export const mockIssueEvaluations: IssueEvaluation[] = [
  {
    issueId: 'issue-001',
    financialImpact: 4,
    stakeholderConcern: 5,
    notes: '탄소중립은 장기적으로 매출 증대 요인이 될 것으로 예상',
    status: 'completed',
    lastUpdated: new Date('2024-01-15'),
    evaluator: '김지민'
  },
  {
    issueId: 'issue-002', 
    financialImpact: 4,
    stakeholderConcern: 4,
    notes: '협력사 안전관리는 비용 증가와 규제 리스크 모두 고려 필요',
    status: 'completed',
    lastUpdated: new Date('2024-01-14'),
    evaluator: '박지수'
  },
  {
    issueId: 'issue-003',
    financialImpact: 3,
    stakeholderConcern: 0, // 미완료
    status: 'partial',
    lastUpdated: new Date('2024-01-13')
  },
  {
    issueId: 'issue-004',
    financialImpact: 0, // 미완료
    stakeholderConcern: 0, // 미완료
    status: 'pending',
    lastUpdated: new Date('2024-01-12')
  },
  {
    issueId: 'issue-005',
    financialImpact: 2,
    stakeholderConcern: 3,
    notes: '친환경 연료 전환은 초기 투자비용이 크지만 장기적 규제 대응에 필요',
    status: 'completed',
    lastUpdated: new Date('2024-01-11'),
    evaluator: '이영희'
  }
];

// 평가 진행 상태 계산 헬퍼 함수 (1-5점 스케일)
export const calculateScoringProgress = (evaluations: IssueEvaluation[], totalIssues: number): ScoringProgress => {
  const completed = evaluations.filter(e => e.status === 'completed');
  const partial = evaluations.filter(e => e.status === 'partial');
  
  const avgFinancial = completed.length > 0 
    ? completed.reduce((sum, e) => sum + e.financialImpact, 0) / completed.length 
    : 0;
    
  const avgStakeholder = completed.length > 0
    ? completed.reduce((sum, e) => sum + e.stakeholderConcern, 0) / completed.length
    : 0;

  return {
    totalIssues,
    completedIssues: completed.length,
    partialIssues: partial.length,
    averageFinancialScore: Number(avgFinancial.toFixed(1)),
    averageStakeholderScore: Number(avgStakeholder.toFixed(1)),
    lastUpdated: new Date()
  };
};

// 이해관계자 설문 시스템 데이터 구조
export type StakeholderGroup = 'investors' | 'customers' | 'employees' | 'regulators' | 'communities' | 'suppliers';

export interface SurveyQuestion {
  id: string;
  issueId: string; // ESG 이슈와 연결
  questionText: string;
  questionType: 'likert' | 'ranking' | 'multiple_choice' | 'open_text';
  options?: string[];
  required: boolean;
  order: number;
}

export interface SurveyTemplate {
  id: string;
  name: string;
  stakeholderGroup: StakeholderGroup;
  description: string;
  questions: SurveyQuestion[];
  estimatedTime: number; // 예상 소요시간(분)
}

export interface StakeholderContact {
  id: string;
  name: string;
  email: string;
  phone?: string;
  organization: string;
  stakeholderGroup: StakeholderGroup;
  isVIP: boolean; // 중요 인사 여부
  preferredLanguage: 'ko' | 'en';
}

export interface SurveyInstance {
  id: string;
  templateId: string;
  title: string;
  description: string;
  stakeholderGroup: StakeholderGroup;
  status: 'draft' | 'ready' | 'sent' | 'collecting' | 'closed' | 'analyzing';
  createdAt: Date;
  sentAt?: Date;
  deadline: Date;
  questions: SurveyQuestion[];
  targetContacts: string[]; // StakeholderContact IDs
  emailConfig: {
    subject: string;
    customMessage: string;
    reminderSchedule: number[]; // 며칠 후 리마인더 [3, 7, 10]
  };
}

export interface SurveyResponse {
  id: string;
  surveyId: string;
  respondentId: string; // StakeholderContact ID
  submittedAt: Date;
  completionTime: number; // 소요시간(분)
  answers: {
    questionId: string;
    value: any; // 점수, 텍스트, 선택값 등
    score?: number; // 정규화된 1-10 점수
  }[];
  isComplete: boolean;
  ipAddress?: string;
  userAgent?: string;
}

export interface StakeholderStats {
  surveyId: string;
  totalSent: number;
  totalResponded: number;
  responseRate: number; // 백분율
  avgCompletionTime: number; // 평균 소요시간
  groupStats: {
    [K in StakeholderGroup]: {
      sent: number;
      responded: number;
      responseRate: number;
      avgScore: number;
    };
  };
  topConcerns: {
    issueId: string;
    issueTitle: string;
    avgScore: number;
    responseCount: number;
  }[];
  completionByDay: {
    date: string;
    count: number;
    cumulative: number;
  }[];
  lastUpdated: Date;
}

// Mock 이해관계자 연락처
export const mockStakeholderContacts: StakeholderContact[] = [
  // 투자자
  { id: 'contact-001', name: '김투자', email: 'investor1@example.com', organization: 'ABC 투자회사', stakeholderGroup: 'investors', isVIP: true, preferredLanguage: 'ko' },
  { id: 'contact-002', name: 'John Smith', email: 'jsmith@global-fund.com', organization: 'Global Investment Fund', stakeholderGroup: 'investors', isVIP: true, preferredLanguage: 'en' },
  { id: 'contact-003', name: '박펀드', email: 'fund.park@company.co.kr', organization: '미래에셋', stakeholderGroup: 'investors', isVIP: false, preferredLanguage: 'ko' },
  
  // 고객
  { id: 'contact-004', name: '이고객', email: 'customer1@email.com', organization: '대한제품', stakeholderGroup: 'customers', isVIP: false, preferredLanguage: 'ko' },
  { id: 'contact-005', name: '최소비자', email: 'consumer@company.co.kr', organization: '소비자협회', stakeholderGroup: 'customers', isVIP: true, preferredLanguage: 'ko' },
  
  // 직원
  { id: 'contact-006', name: '김직원', email: 'employee1@company.com', organization: '우리회사', stakeholderGroup: 'employees', isVIP: false, preferredLanguage: 'ko' },
  { id: 'contact-007', name: '노조장', email: 'union@company.com', organization: '노동조합', stakeholderGroup: 'employees', isVIP: true, preferredLanguage: 'ko' },
  
  // 규제기관
  { id: 'contact-008', name: '환경부', email: 'env@korea.go.kr', organization: '환경부', stakeholderGroup: 'regulators', isVIP: true, preferredLanguage: 'ko' },
  { id: 'contact-009', name: '금융위', email: 'finance@korea.go.kr', organization: '금융위원회', stakeholderGroup: 'regulators', isVIP: true, preferredLanguage: 'ko' },
  
  // 지역사회
  { id: 'contact-010', name: '지역주민', email: 'local@community.org', organization: '지역주민협의회', stakeholderGroup: 'communities', isVIP: false, preferredLanguage: 'ko' },
];

// Mock 설문 템플릿
export const mockSurveyTemplates: SurveyTemplate[] = [
  {
    id: 'template-investors',
    name: '투자자 ESG 관심도 조사',
    stakeholderGroup: 'investors',
    description: '투자 의사결정에서 ESG 요소의 중요도를 파악하기 위한 설문입니다.',
    estimatedTime: 10,
    questions: [
      {
        id: 'q-investors-1',
        issueId: 'issue-001',
        questionText: '탄소 배출량 감소가 투자 결정에 미치는 영향도는?',
        questionType: 'likert',
        options: ['전혀 중요하지 않음', '중요하지 않음', '보통', '중요함', '매우 중요함'],
        required: true,
        order: 1
      },
      {
        id: 'q-investors-2',
        issueId: 'issue-002',
        questionText: '급여 비용 증가에 대한 우려 수준은?',
        questionType: 'likert',
        options: ['전혀 우려되지 않음', '우려되지 않음', '보통', '우려됨', '매우 우려됨'],
        required: true,
        order: 2
      }
    ]
  },
  {
    id: 'template-customers',
    name: '고객 ESG 인식 조사',
    stakeholderGroup: 'customers',
    description: '제품/서비스 선택 시 ESG 요소의 영향을 파악하기 위한 설문입니다.',
    estimatedTime: 8,
    questions: [
      {
        id: 'q-customers-1',
        issueId: 'issue-001',
        questionText: '친환경 제품에 대한 추가 지불 의향은?',
        questionType: 'multiple_choice',
        options: ['0% (추가 지불 불가)', '5% 이내', '10% 이내', '15% 이내', '20% 이상'],
        required: true,
        order: 1
      }
    ]
  }
];

// Mock 설문 인스턴스
export const mockSurveyInstance: SurveyInstance = {
  id: 'survey-001',
  templateId: 'template-investors',
  title: '2024년 ESG 투자자 의견 조사',
  description: '2024년 ESG 이슈에 대한 투자자들의 관심도와 중요도를 파악하기 위한 조사입니다.',
  stakeholderGroup: 'investors',
  status: 'collecting',
  createdAt: new Date('2024-01-10'),
  sentAt: new Date('2024-01-15'),
  deadline: new Date('2024-01-30'),
  questions: mockSurveyTemplates[0].questions,
  targetContacts: ['contact-001', 'contact-002', 'contact-003'],
  emailConfig: {
    subject: '[중요] ESG 투자 의견 조사 참여 요청',
    customMessage: '안녕하세요. 2024년 ESG 이슈에 대한 투자자 의견을 조사하고 있습니다. 10분 정도 소요되는 간단한 설문에 참여해주시면 감사하겠습니다.',
    reminderSchedule: [3, 7, 10] // 3일, 7일, 10일 후 리마인더
  }
};

// Mock 설문 응답
export const mockSurveyResponses: SurveyResponse[] = [
  {
    id: 'response-001',
    surveyId: 'survey-001',
    respondentId: 'contact-001',
    submittedAt: new Date('2024-01-16T10:30:00'),
    completionTime: 8,
    isComplete: true,
    answers: [
      { questionId: 'q-investors-1', value: '매우 중요함', score: 9 },
      { questionId: 'q-investors-2', value: '보통', score: 5 }
    ]
  },
  {
    id: 'response-002',
    surveyId: 'survey-001',
    respondentId: 'contact-002',
    submittedAt: new Date('2024-01-17T14:20:00'),
    completionTime: 12,
    isComplete: true,
    answers: [
      { questionId: 'q-investors-1', value: '중요함', score: 7 },
      { questionId: 'q-investors-2', value: '우려됨', score: 7 }
    ]
  }
];

// Mock 설문 통계
export const mockStakeholderStats: StakeholderStats = {
  surveyId: 'survey-001',
  totalSent: 3,
  totalResponded: 2,
  responseRate: 66.7,
  avgCompletionTime: 10,
  groupStats: {
    investors: { sent: 3, responded: 2, responseRate: 66.7, avgScore: 7.0 },
    customers: { sent: 0, responded: 0, responseRate: 0, avgScore: 0 },
    employees: { sent: 0, responded: 0, responseRate: 0, avgScore: 0 },
    regulators: { sent: 0, responded: 0, responseRate: 0, avgScore: 0 },
    communities: { sent: 0, responded: 0, responseRate: 0, avgScore: 0 },
    suppliers: { sent: 0, responded: 0, responseRate: 0, avgScore: 0 }
  },
  topConcerns: [
    { issueId: 'issue-001', issueTitle: '탄소 배출량 감소', avgScore: 8.0, responseCount: 2 },
    { issueId: 'issue-002', issueTitle: '급여 비용 증가', avgScore: 6.0, responseCount: 2 }
  ],
  completionByDay: [
    { date: '2024-01-16', count: 1, cumulative: 1 },
    { date: '2024-01-17', count: 1, cumulative: 2 },
    { date: '2024-01-18', count: 0, cumulative: 2 }
  ],
  lastUpdated: new Date('2024-01-18T09:00:00')
};

// 이해관계자 그룹 정보
export const stakeholderGroupInfo = {
  investors: { name: '투자자', icon: '💰', color: 'bg-green-100 text-green-800', description: '주주, 투자회사, 펀드매니저' },
  customers: { name: '고객', icon: '🛒', color: 'bg-blue-100 text-blue-800', description: '소비자, 구매고객, 사용자' },
  employees: { name: '직원', icon: '👥', color: 'bg-purple-100 text-purple-800', description: '임직원, 노동조합, 경영진' },
  regulators: { name: '규제기관', icon: '🏛️', color: 'bg-red-100 text-red-800', description: '정부부처, 감독기관, 인증기관' },
  communities: { name: '지역사회', icon: '🏘️', color: 'bg-yellow-100 text-yellow-800', description: '지역주민, 시민단체, NGO' },
  suppliers: { name: '공급업체', icon: '🚚', color: 'bg-gray-100 text-gray-800', description: '협력사, 공급업체, 파트너' }
};

// 설문 진행 상태 계산 함수
export const calculateStakeholderStats = (
  survey: SurveyInstance,
  responses: SurveyResponse[],
  contacts: StakeholderContact[]
): StakeholderStats => {
  const targetContacts = contacts.filter(c => survey.targetContacts.includes(c.id));
  const completedResponses = responses.filter(r => r.surveyId === survey.id && r.isComplete);
  
  const totalSent = targetContacts.length;
  const totalResponded = completedResponses.length;
  const responseRate = totalSent > 0 ? Number(((totalResponded / totalSent) * 100).toFixed(1)) : 0;
  
  const avgCompletionTime = completedResponses.length > 0 
    ? Number((completedResponses.reduce((sum, r) => sum + r.completionTime, 0) / completedResponses.length).toFixed(1))
    : 0;

  // 그룹별 통계 계산
  const groupStats = Object.keys(stakeholderGroupInfo).reduce((acc, group) => {
    const groupContacts = targetContacts.filter(c => c.stakeholderGroup === group);
    const groupResponses = completedResponses.filter(r => {
      const contact = contacts.find(c => c.id === r.respondentId);
      return contact?.stakeholderGroup === group;
    });
    
    const sent = groupContacts.length;
    const responded = groupResponses.length;
    const rate = sent > 0 ? Number(((responded / sent) * 100).toFixed(1)) : 0;
    
    // 그룹 평균 점수 계산
    const allScores = groupResponses.flatMap(r => r.answers.map(a => a.score || 0));
    const avgScore = allScores.length > 0 
      ? Number((allScores.reduce((sum, s) => sum + s, 0) / allScores.length).toFixed(1))
      : 0;

    acc[group as StakeholderGroup] = {
      sent,
      responded,
      responseRate: rate,
      avgScore
    };
    return acc;
  }, {} as StakeholderStats['groupStats']);

  // 주요 관심사 계산
  const issueScores = new Map<string, { scores: number[], title: string }>();
  
  completedResponses.forEach(response => {
    response.answers.forEach(answer => {
      if (answer.score) {
        const question = survey.questions.find(q => q.id === answer.questionId);
        if (question) {
          const issue = mockESGIssues.find(i => i.id === question.issueId);
          if (issue) {
            if (!issueScores.has(question.issueId)) {
              issueScores.set(question.issueId, { scores: [], title: issue.title });
            }
            issueScores.get(question.issueId)!.scores.push(answer.score);
          }
        }
      }
    });
  });

  const topConcerns = Array.from(issueScores.entries())
    .map(([issueId, data]) => ({
      issueId,
      issueTitle: data.title,
      avgScore: Number((data.scores.reduce((sum, s) => sum + s, 0) / data.scores.length).toFixed(1)),
      responseCount: data.scores.length
    }))
    .sort((a, b) => b.avgScore - a.avgScore);

  return {
    surveyId: survey.id,
    totalSent,
    totalResponded,
    responseRate,
    avgCompletionTime,
    groupStats,
    topConcerns,
    completionByDay: mockStakeholderStats.completionByDay, // 실제로는 날짜별 계산
    lastUpdated: new Date()
  };
};