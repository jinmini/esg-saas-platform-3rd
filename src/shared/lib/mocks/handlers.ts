import { http, HttpResponse } from 'msw'
import { 
  Company, 
  Report, 
  DashboardStats, 
  WorkflowStatus,
  CompanyFinancials,
  AuthUser, 
  LoginRequest, 
  LoginResponse,
  ApiResponse 
} from '@/shared/types/api'

// Mock 데이터 생성 함수들
const createMockCompanies = (): Company[] => [
  {
    id: '1',
    name: '삼성전자',
    industry: '반도체',
    size: 'large',
    esg_score: 87.5,
    risk_level: 'low',
    last_updated: new Date().toISOString()
  },
  {
    id: '2',
    name: 'SK하이닉스',
    industry: '반도체',
    size: 'large',
    esg_score: 82.3,
    risk_level: 'medium',
    last_updated: new Date().toISOString()
  },
  {
    id: '3',
    name: 'LG전자',
    industry: '가전',
    size: 'large',
    esg_score: 79.1,
    risk_level: 'medium',
    last_updated: new Date().toISOString()
  }
]

const createMockReports = (): Report[] => [
  {
    id: '1',
    company_id: '1',
    framework: 'gri',
    title: '삼성전자 2024 GRI 보고서',
    data: { sections: [] },
    status: 'completed',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '2',
    company_id: '1',
    framework: 'sasb',
    title: '삼성전자 2024 SASB 보고서',
    data: { sections: [] },
    status: 'draft',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
]

const createMockDashboardStats = (): DashboardStats => ({
  totalArticles: 2847,
  analyzedArticles: 2245,
  avgRiskScore: 0.342, // 0.0 ~ 1.0 리스크 점수
  criticalIssues: 23
})

const createMockWorkflows = (): WorkflowStatus[] => [
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
    currentStage: '발간 준비',
    progress: 95,
    deadline: '2025-01-30',
    lastUpdated: '2025-01-13T09:15:00+09:00',
    assignee: '김영희'
  }
]

const createMockFinancials = (): CompanyFinancials[] => [
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
]

const createMockUser = (): AuthUser => ({
  id: '1',
  email: 'admin@esg-platform.com',
  name: '관리자',
  role: 'admin',
  company_id: '1'
})

// MSW 핸들러 정의
export const handlers = [
  // 🔐 인증 API
  http.post('/api/auth/login', async ({ request }) => {
    const loginData = await request.json() as LoginRequest
    
    // 간단한 로그인 검증 (실제로는 백엔드에서 처리)
    if (loginData.email === 'admin@esg-platform.com' && loginData.password === 'admin123') {
      const response: ApiResponse<LoginResponse> = {
        success: true,
        data: {
          user: createMockUser(),
          access_token: 'mock_jwt_token_12345',
          refresh_token: 'mock_refresh_token_67890',
          expires_in: 3600
        },
        message: '로그인 성공'
      }
      return HttpResponse.json(response)
    }
    
    return HttpResponse.json(
      { success: false, error: '이메일 또는 비밀번호가 올바르지 않습니다.' },
      { status: 401 }
    )
  }),

  http.get('/api/auth/me', () => {
    const response: ApiResponse<AuthUser> = {
      success: true,
      data: createMockUser(),
      message: '사용자 정보 조회 성공'
    }
    return HttpResponse.json(response)
  }),

  // 🏢 회사 API
  http.get('/api/companies', () => {
    const response: ApiResponse<Company[]> = {
      success: true,
      data: createMockCompanies(),
      message: '회사 목록 조회 성공'
    }
    return HttpResponse.json(response)
  }),

  http.get('/api/companies/:id', ({ params }) => {
    const companies = createMockCompanies()
    const company = companies.find(c => c.id === params.id)
    
    if (!company) {
      return HttpResponse.json(
        { success: false, error: '회사를 찾을 수 없습니다.' },
        { status: 404 }
      )
    }
    
    const response: ApiResponse<Company> = {
      success: true,
      data: company,
      message: '회사 정보 조회 성공'
    }
    return HttpResponse.json(response)
  }),

  // 📊 리포트 API
  http.get('/api/reports', () => {
    const response: ApiResponse<Report[]> = {
      success: true,
      data: createMockReports(),
      message: '리포트 목록 조회 성공'
    }
    return HttpResponse.json(response)
  }),

  http.post('/api/reports', async ({ request }) => {
    const reportData = await request.json() as Partial<Report>
    
    const newReport: Report = {
      id: Math.random().toString(36).substr(2, 9),
      company_id: reportData.company_id || '1',
      framework: reportData.framework || 'gri',
      title: reportData.title || '새로운 리포트',
      data: reportData.data || {},
      status: 'draft',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }
    
    const response: ApiResponse<Report> = {
      success: true,
      data: newReport,
      message: '리포트 생성 성공'
    }
    return HttpResponse.json(response, { status: 201 })
  }),

  http.get('/api/reports/:id', ({ params }) => {
    const reports = createMockReports()
    const report = reports.find(r => r.id === params.id)
    
    if (!report) {
      return HttpResponse.json(
        { success: false, error: '리포트를 찾을 수 없습니다.' },
        { status: 404 }
      )
    }
    
    const response: ApiResponse<Report> = {
      success: true,
      data: report,
      message: '리포트 조회 성공'
    }
    return HttpResponse.json(response)
  }),

  http.put('/api/reports/:id', async ({ params, request }) => {
    const updateData = await request.json() as Partial<Report>
    const reports = createMockReports()
    const report = reports.find(r => r.id === params.id)
    
    if (!report) {
      return HttpResponse.json(
        { success: false, error: '리포트를 찾을 수 없습니다.' },
        { status: 404 }
      )
    }
    
    const updatedReport: Report = {
      ...report,
      ...updateData,
      updated_at: new Date().toISOString()
    }
    
    const response: ApiResponse<Report> = {
      success: true,
      data: updatedReport,
      message: '리포트 업데이트 성공'
    }
    return HttpResponse.json(response)
  }),

  // 📈 대시보드 API
  http.get('/api/dashboard/stats', () => {
    const response: ApiResponse<DashboardStats> = {
      success: true,
      data: createMockDashboardStats(),
      message: '대시보드 통계 조회 성공'
    }
    return HttpResponse.json(response)
  }),

  http.get('/api/dashboard/feed', () => {
    const mockFeed = [
      {
        id: '1',
        type: 'news',
        title: '삼성전자, RE100 달성 목표 발표',
        content: '2030년까지 재생에너지 100% 사용 목표',
        timestamp: new Date().toISOString(),
        company: '삼성전자'
      },
      {
        id: '2',
        type: 'report',
        title: 'SK하이닉스 ESG 보고서 완성',
        content: '2024년 지속가능경영보고서 발간',
        timestamp: new Date(Date.now() - 3600000).toISOString(),
        company: 'SK하이닉스'
      }
    ]
    
    const response: ApiResponse<typeof mockFeed> = {
      success: true,
      data: mockFeed,
      message: '피드 조회 성공'
    }
    return HttpResponse.json(response)
  }),

  // 🚀 워크플로우 API
  http.get('/api/dashboard/workflows', () => {
    const response: ApiResponse<WorkflowStatus[]> = {
      success: true,
      data: createMockWorkflows(),
      message: '워크플로우 목록 조회 성공'
    }
    return HttpResponse.json(response)
  }),

  // 💰 기업 재무 API  
  http.get('/api/dashboard/financials', () => {
    const response: ApiResponse<CompanyFinancials[]> = {
      success: true,
      data: createMockFinancials(),
      message: '기업 재무 정보 조회 성공'
    }
    return HttpResponse.json(response)
  })
] 