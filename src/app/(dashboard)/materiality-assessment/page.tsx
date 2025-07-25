// 이중중대성 평가 페이지

'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/Card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/ui/Tabs';
import { Badge } from '@/shared/ui/Badge';
import { Button } from '@/shared/ui/Button';
import { Progress } from '@/shared/ui/Progress';
import { ScrollArea } from '@/shared/ui/ScrollArea';
import { 
  Target,
  Database, 
  Calculator,
  Users, 
  Settings,
  CheckCircle,
  Clock,
  AlertCircle,
  BarChart3,
  FileText,
  Save,
  Download,
  ChevronLeft,
  ChevronRight,
  Circle,
  Send,
  Mail,
  Eye,
  Filter,
  TrendingUp
} from 'lucide-react';
import { DoubleMaterialityAssessment } from '@/components/scoring/DoubleMaterialityAssessment';
import { Label } from '@/shared/ui/Label';
import { Input } from '@/shared/ui/Input';
import { Textarea } from '@/shared/ui/TextArea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/ui/Select';
import { 
  StakeholderGroup, 
  mockStakeholderContacts,
  stakeholderGroupInfo
} from '@/shared/lib/mocks/dashboard-mock-data';

// 탭 정의
const analysisTabs = [
  {
    id: 'issue-pool',
    title: '이슈 풀 관리',
    icon: <Database className="h-4 w-4" />,
    description: 'ESG 이슈를 식별하고 관리합니다',
    status: 'completed' as const
  },
  {
    id: 'scoring',
    title: '점수 매기기',
    icon: <Calculator className="h-4 w-4" />,
    description: '재무적 영향과 이해관계자 관심도를 평가합니다',
    status: 'in-progress' as const
  },
  {
    id: 'stakeholder',
    title: '이해관계자 의견',
    icon: <Users className="h-4 w-4" />,
    description: '이해관계자 의견을 수렴하고 가중치를 적용합니다',
    status: 'completed' as const
  },
  {
    id: 'threshold',
    title: '임계값 설정',
    icon: <Settings className="h-4 w-4" />,
    description: '중대성 임계값을 설정하고 확정합니다',
    status: 'pending' as const
  },
  {
    id: 'matrix',
    title: '매트릭스 확정',
    icon: <BarChart3 className="h-4 w-4" />,
    description: '최종 이중중대성 매트릭스를 생성하고 확정합니다',
    status: 'pending' as const
  }
];

// 상태별 아이콘
const getStatusIcon = (status: string) => {
  switch (status) {
    case 'completed':
      return <CheckCircle className="h-4 w-4 text-green-600" />;
    case 'in-progress':
      return <Clock className="h-4 w-4 text-blue-600 animate-pulse" />;
    default:
      return <AlertCircle className="h-4 w-4 text-gray-400" />;
  }
};

// 상태별 색상
const getStatusColor = (status: string) => {
  switch (status) {
    case 'completed':
      return 'bg-green-100 text-green-800 border-green-200';
    case 'in-progress':
      return 'bg-blue-100 text-blue-800 border-blue-200';
    default:
      return 'bg-gray-100 text-gray-600 border-gray-200';
  }
};

// 이슈 평가 타입
interface IssueEvaluation {
  issueId: string;
  financialImpact: number;
  stakeholderConcern: number;
  status: 'pending' | 'partial' | 'completed';
  lastUpdated: Date;
  notes?: string;
}

// 모의 ESG 이슈 데이터
const mockESGIssues: Array<{
  id: string;
  title: string;
  category: 'Environmental' | 'Social' | 'Governance';
  description?: string;
}> = [
  { id: 'issue-001', title: '탄소 배출량 감소', category: 'Environmental' as const },
  { id: 'issue-002', title: '급여 비용 증가', category: 'Social' as const },
  { id: 'issue-003', title: '데이터 유출 사고', category: 'Governance' as const },
  { id: 'issue-004', title: '전력 공급 불안정', category: 'Environmental' as const },
  { id: 'issue-005', title: '고객 만족도 하락', category: 'Social' as const },
  { id: 'issue-006', title: '법적 손해 발생', category: 'Governance' as const },
];

// 모의 평가 데이터
const mockIssueEvaluations: IssueEvaluation[] = [
  {
    issueId: 'issue-001',
    financialImpact: 0,
    stakeholderConcern: 0,
    status: 'pending',
    lastUpdated: new Date('2023-10-20T10:00:00'),
  },
  {
    issueId: 'issue-002',
    financialImpact: 0,
    stakeholderConcern: 0,
    status: 'pending',
    lastUpdated: new Date('2023-10-20T10:00:00'),
  },
  {
    issueId: 'issue-003',
    financialImpact: 0,
    stakeholderConcern: 0,
    status: 'pending',
    lastUpdated: new Date('2023-10-20T10:00:00'),
  },
  {
    issueId: 'issue-004',
    financialImpact: 0,
    stakeholderConcern: 0,
    status: 'pending',
    lastUpdated: new Date('2023-10-20T10:00:00'),
  },
  {
    issueId: 'issue-005',
    financialImpact: 0,
    stakeholderConcern: 0,
    status: 'pending',
    lastUpdated: new Date('2023-10-20T10:00:00'),
  },
  {
    issueId: 'issue-006',
    financialImpact: 0,
    stakeholderConcern: 0,
    status: 'pending',
    lastUpdated: new Date('2023-10-20T10:00:00'),
  },
];

// 점수 매기기 진행률 계산 함수
const calculateScoringProgress = (evaluations: IssueEvaluation[], totalIssues: number) => {
  let completed = 0;
  let partial = 0;
  let averageFinancialScore = 0;
  let averageStakeholderScore = 0;

  evaluations.forEach(evaluation => {
    if (evaluation.status === 'completed') {
      completed++;
      averageFinancialScore += evaluation.financialImpact;
      averageStakeholderScore += evaluation.stakeholderConcern;
    } else if (evaluation.status === 'partial') {
      partial++;
      averageFinancialScore += evaluation.financialImpact;
      averageStakeholderScore += evaluation.stakeholderConcern;
    }
  });

  return {
    completedIssues: completed,
    partialIssues: partial,
    totalIssues: totalIssues,
    averageFinancialScore: totalIssues > 0 ? (averageFinancialScore / totalIssues).toFixed(1) : '0.0',
    averageStakeholderScore: totalIssues > 0 ? (averageStakeholderScore / totalIssues).toFixed(1) : '0.0',
  };
};

// 카테고리별 아이콘
const getCategoryIcon = (category: string) => {
  switch (category) {
    case 'Environmental':
      return <BarChart3 className="h-4 w-4 text-green-600" />;
    case 'Social':
      return <Users className="h-4 w-4 text-blue-600" />;
    case 'Governance':
      return <Settings className="h-4 w-4 text-purple-600" />;
    default:
      return <FileText className="h-4 w-4 text-gray-600" />;
  }
};

// 카테고리별 색상
const getCategoryColor = (category: string) => {
  switch (category) {
    case 'Environmental':
      return 'bg-green-100 text-green-800 border-green-200';
    case 'Social':
      return 'bg-blue-100 text-blue-800 border-blue-200';
    case 'Governance':
      return 'bg-purple-100 text-purple-800 border-purple-200';
    default:
      return 'bg-gray-100 text-gray-600 border-gray-200';
  }
};

export default function AnalysisPage() {
  const [activeTab, setActiveTab] = useState('issue-pool');
  const [currentProject] = useState('한국중부발전 - 2024년 지속가능성 보고서');

  // 전체 진행률 계산
  const completedTabs = analysisTabs.filter(tab => tab.status === 'completed').length;
  const inProgressTabs = analysisTabs.filter(tab => tab.status === 'in-progress').length;
  const overallProgress = (completedTabs + inProgressTabs * 0.5) / analysisTabs.length * 100;

  return (
    <div className="space-y-6">
      {/* 헤더 */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center">
            <Target className="h-8 w-8 mr-3 text-blue-600" />
            이중중대성 평가
          </h1>
          <p className="text-muted-foreground mt-2">
            ESG 이슈의 재무적 영향과 사회/환경적 영향을 체계적으로 평가합니다
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" size="sm">
            <Save className="h-4 w-4 mr-2" />
            임시 저장
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            보고서 출력
          </Button>
        </div>
      </div>

      {/* 프로젝트 정보 및 전체 진행률 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center">
              <FileText className="h-5 w-5 mr-2 text-blue-600" />
              현재 프로젝트: {currentProject}
            </div>
            <Badge variant="outline" className="bg-blue-50">
              전체 진행률: {Math.round(overallProgress)}%
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Progress value={overallProgress} className="h-2" />
            <div className="grid grid-cols-5 gap-4">
              {analysisTabs.map((tab) => (
                <div 
                  key={tab.id} 
                  className={`text-center p-3 rounded-lg border transition-colors cursor-pointer ${
                    getStatusColor(tab.status)
                  } ${activeTab === tab.id ? 'ring-2 ring-blue-400' : ''}`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  <div className="flex items-center justify-center space-x-2 mb-2">
                    {tab.icon}
                    {getStatusIcon(tab.status)}
                  </div>
                  <div className="font-medium text-sm">{tab.title}</div>
                  <div className="text-xs mt-1 opacity-75">
                    {tab.status === 'completed' && '완료'}
                    {tab.status === 'in-progress' && '진행 중'}
                    {tab.status === 'pending' && '대기'}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 메인 탭 컨텐츠 */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-5 h-auto p-1">
          {analysisTabs.map((tab) => (
            <TabsTrigger 
              key={tab.id} 
              value={tab.id} 
              className="flex flex-col items-center py-3 px-2 text-xs"
              disabled={tab.status === 'pending'}
            >
              <div className="flex items-center space-x-1 mb-1">
                {tab.icon}
                {getStatusIcon(tab.status)}
              </div>
              <span className="font-medium">{tab.title}</span>
            </TabsTrigger>
          ))}
        </TabsList>

        {/* 탭 컨텐츠 영역 */}
        <div className="mt-6">
          <TabsContent value="issue-pool" className="mt-0">
            <IssuePoolManagement />
          </TabsContent>

          <TabsContent value="scoring" className="space-y-6">
            <DoubleMaterialityEvaluation />
          </TabsContent>

          <TabsContent value="stakeholder" className="mt-0">
            <StakeholderInput />
          </TabsContent>

          <TabsContent value="threshold" className="mt-0">
            <ThresholdSetting />
          </TabsContent>

          <TabsContent value="matrix" className="mt-0">
            <MatrixConfirmation />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}

// 1. 이슈 풀 관리 컴포넌트
function IssuePoolManagement() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Database className="h-5 w-5 mr-2 text-blue-600" />
            ESG 이슈 풀 관리
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12">
            <Database className="h-16 w-16 mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-semibold text-gray-700 mb-2">이슈 풀 관리</h3>
            <p className="text-gray-500 mb-6">
              GRI, SASB, TCFD 기준에 따른 ESG 이슈를 식별하고 관리합니다
            </p>
            <div className="max-w-md mx-auto space-y-2 text-sm text-gray-600">
              <div className="flex items-center justify-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>업종별 이슈 라이브러리 제공</span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>사용자 정의 이슈 추가 기능</span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>이슈별 상세 정보 관리</span>
              </div>
            </div>
            <Button className="mt-6">구현 예정</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// 2. ESRS 이중중대성 평가 컴포넌트
function DoubleMaterialityEvaluation() {
  const [selectedIssue, setSelectedIssue] = useState('issue-001');
  const [evaluations, setEvaluations] = useState(
    new Map(mockIssueEvaluations.map(e => [e.issueId, e]))
  );
  const [categoryFilter, setCategoryFilter] = useState<'all' | 'Environmental' | 'Social' | 'Governance'>('all');
  
  // 이중중대성 평가 데이터
  const [doubleMaterialityData, setDoubleMaterialityData] = useState<Record<string, {
    impactMateriality: { scale: number, scope: number, irreversibility: number, overall: number },
    financialMateriality: { probability: number, magnitude: number, timeHorizon: 'short' | 'medium' | 'long', overall: number }
  }>>({});
  
  const [currentDoubleMateriality, setCurrentDoubleMateriality] = useState<{
    impactMateriality: { scale: number, scope: number, irreversibility: number, overall: number },
    financialMateriality: { probability: number, magnitude: number, timeHorizon: 'short' | 'medium' | 'long', overall: number }
  }>({
    impactMateriality: { scale: 5, scope: 5, irreversibility: 5, overall: 5 },
    financialMateriality: { probability: 5, magnitude: 5, timeHorizon: 'medium', overall: 5 }
  });

  // 필터링된 이슈 목록
  const filteredIssues = mockESGIssues.filter(issue => 
    categoryFilter === 'all' || issue.category === categoryFilter
  );

  const currentIssue = filteredIssues.find(issue => issue.id === selectedIssue);
  const currentEvaluation = evaluations.get(selectedIssue);

  // 선택된 이슈가 변경될 때 해당 이슈의 이중중대성 평가 데이터를 로드
  useEffect(() => {
    const issueData = doubleMaterialityData[selectedIssue];
    if (issueData) {
      setCurrentDoubleMateriality(issueData);
    } else {
      // 기본값으로 초기화
      setCurrentDoubleMateriality({
        impactMateriality: { scale: 5, scope: 5, irreversibility: 5, overall: 5 },
        financialMateriality: { probability: 5, magnitude: 5, timeHorizon: 'medium' as const, overall: 5 }
      });
    }
  }, [selectedIssue, doubleMaterialityData]);

  // 이해관계자 데이터 관리
  // const [stakeholderResponses, setStakeholderResponses] = useState<Record<string, any>>({});

  // 다음/이전 이슈로 이동
  const navigateIssue = (direction: 'next' | 'prev') => {
    const currentIndex = filteredIssues.findIndex(issue => issue.id === selectedIssue);
    if (direction === 'next' && currentIndex < filteredIssues.length - 1) {
      setSelectedIssue(filteredIssues[currentIndex + 1].id);
    } else if (direction === 'prev' && currentIndex > 0) {
      setSelectedIssue(filteredIssues[currentIndex - 1].id);
    }
  };

  // 진행률 계산
  const progress = calculateScoringProgress(Array.from(evaluations.values()), filteredIssues.length);

  return (
    <div className="grid grid-cols-4 gap-6">
      {/* 이슈 목록 (1/4) */}
      <div className="col-span-1">
        <Card className="h-[600px]">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm flex items-center justify-between">
              <div className="flex items-center">
                <Database className="h-4 w-4 mr-2" />
                이슈 목록
              </div>
              <Badge variant="outline">
                {progress.completedIssues}/{progress.totalIssues}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            {/* 카테고리 필터 */}
            <div className="grid grid-cols-4 gap-1 mb-4">
              {(['all', 'Environmental', 'Social', 'Governance'] as const).map((filter) => (
                <Button
                  key={filter}
                  variant={categoryFilter === filter ? "default" : "outline"}
                  size="sm"
                  className="text-xs h-7"
                  onClick={() => setCategoryFilter(filter)}
                >
                  {filter === 'all' ? '전체' : filter.charAt(0)}
                </Button>
              ))}
            </div>

            <ScrollArea className="h-[480px]">
              <div className="space-y-2">
                {filteredIssues.map((issue, index) => {
                  const evaluation = evaluations.get(issue.id);
                  const isSelected = selectedIssue === issue.id;
                  
                  return (
                    <div
                      key={issue.id}
                      className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                        isSelected 
                          ? 'border-blue-500 bg-blue-50' 
                          : 'border-gray-200 hover:border-gray-300'
                      } ${evaluation?.status === 'completed' ? 'bg-green-50 border-green-200' : ''}`}
                      onClick={() => setSelectedIssue(issue.id)}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-medium text-gray-500">
                          #{String(index + 1).padStart(2, '0')}
                        </span>
                        <div className="flex items-center space-x-1">
                          {evaluation?.status === 'completed' && (
                            <CheckCircle className="h-4 w-4 text-green-500" />
                          )}
                          {evaluation?.status === 'partial' && (
                            <Clock className="h-4 w-4 text-yellow-500" />
                          )}
                          {!evaluation?.status || evaluation.status === 'pending' && (
                            <Circle className="h-4 w-4 text-gray-400" />
                          )}
                        </div>
                      </div>
                      
                      <h4 className="text-sm font-medium text-gray-900 mb-2">
                        {issue.title}
                      </h4>
                      
                      <div className="flex items-center justify-between">
                        <Badge variant="outline" className={getCategoryColor(issue.category)}>
                          {getCategoryIcon(issue.category)}
                          <span className="ml-1 text-xs">{issue.category.charAt(0)}</span>
                        </Badge>
                        {evaluation && (
                          <div className="text-xs text-gray-600">
                            {evaluation.financialImpact || 0}/{evaluation.stakeholderConcern || 0}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>

      {/* 평가 인터페이스 (2/4) */}
      <div className="col-span-2">
        <Card className="h-[600px]">
          <CardHeader>
            <CardTitle className="text-lg flex items-center justify-between">
              <div className="flex items-center">
                <Calculator className="h-5 w-5 mr-2" />
                점수 매기기
              </div>
              <div className="flex space-x-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => navigateIssue('prev')}
                  disabled={filteredIssues.findIndex(i => i.id === selectedIssue) === 0}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => navigateIssue('next')}
                  disabled={filteredIssues.findIndex(i => i.id === selectedIssue) === filteredIssues.length - 1}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            {currentIssue ? (
              <div className="space-y-6">
                {/* 현재 이슈 정보 */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">
                    {currentIssue.title}
                  </h3>
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <Badge variant="outline" className={getCategoryColor(currentIssue.category)}>
                      {getCategoryIcon(currentIssue.category)}
                      <span className="ml-1">{currentIssue.category}</span>
                    </Badge>
                    <span>
                      현재 점수: {currentEvaluation?.financialImpact || 0}/5, {currentEvaluation?.stakeholderConcern || 0}/5
                    </span>
                  </div>
                </div>

                {/* ESRS 이중중대성 평가 */}
                <div className="space-y-6">
                  <DoubleMaterialityAssessment
                    issue={currentIssue}
                    evaluation={currentDoubleMateriality}
                    onUpdate={(evaluation: any) => {
                      setCurrentDoubleMateriality(evaluation);
                      setDoubleMaterialityData(prev => ({
                        ...prev,
                        [selectedIssue]: evaluation
                      }));
                    }}
                  />
                </div>

                {/* 평가 근거 (선택사항) */}
                <div className="space-y-2">
                  <Label htmlFor="notes" className="text-sm font-medium">
                    📝 평가 근거 (선택사항)
                  </Label>
                  <textarea
                    id="notes"
                    value={currentEvaluation?.notes || ''}
                    onChange={(e) => {
                      setEvaluations(prev => {
                        const newMap = new Map(prev);
                        const current = newMap.get(selectedIssue) || {
                          issueId: selectedIssue,
                          financialImpact: 0,
                          stakeholderConcern: 0,
                          status: 'pending' as const,
                          lastUpdated: new Date()
                        };
                        newMap.set(selectedIssue, { ...current, notes: e.target.value });
                        return newMap;
                      });
                    }}
                    className="w-full h-20 px-3 py-2 border border-gray-300 rounded-md text-sm"
                    placeholder="평가 근거를 입력하세요 (예: 고객 관심도 증가, 규제 강화 예상 등)"
                  />
                </div>

                {/* 저장 버튼 */}
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" size="sm">
                    <Save className="h-4 w-4 mr-2" />
                    임시 저장
                  </Button>
                  <Button 
                    size="sm"
                    onClick={() => navigateIssue('next')}
                    disabled={filteredIssues.findIndex(i => i.id === selectedIssue) === filteredIssues.length - 1}
                  >
                    다음 이슈
                    <ChevronRight className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center h-full text-gray-500">
                이슈를 선택하세요
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* 실시간 미리보기 (1/4) */}
      <div className="col-span-1">
        <Card className="h-[600px]">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm flex items-center">
              <BarChart3 className="h-4 w-4 mr-2" />
              실시간 미리보기
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="space-y-4">
              {/* 전체 진행률 */}
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>전체 진행률</span>
                  <span className="font-medium">{Math.round((progress.completedIssues / progress.totalIssues) * 100)}%</span>
                </div>
                <Progress value={(progress.completedIssues / progress.totalIssues) * 100} className="h-2" />
                <div className="text-xs text-gray-500 mt-1">
                  완료: {progress.completedIssues} / 전체: {progress.totalIssues}
                </div>
              </div>

              {/* 미니 매트릭스 */}
              <div>
                <h4 className="text-sm font-medium mb-3">매트릭스 미리보기</h4>
                <div className="relative w-full h-48 border border-gray-200 rounded-lg bg-gray-50">
                  {/* 축 레이블 */}
                  <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs text-gray-600">
                    재무적 영향
                  </div>
                  <div className="absolute left-2 top-1/2 transform -translate-y-1/2 -rotate-90 text-xs text-gray-600">
                    이해관계자 관심도
                  </div>
                  
                  {/* 중앙선 */}
                  <div className="absolute left-1/2 top-0 w-px h-full bg-gray-300 transform -translate-x-0.5"></div>
                  <div className="absolute top-1/2 left-0 w-full h-px bg-gray-300 transform -translate-y-0.5"></div>
                  
                  {/* 점수가 입력된 이슈들 표시 */}
                  {Array.from(evaluations.values())
                    .filter(e => e.financialImpact > 0 && e.stakeholderConcern > 0)
                    .map((evaluation, index) => {
                      const issue = mockESGIssues.find(i => i.id === evaluation.issueId);
                      if (!issue) return null;
                      
                      const x = (evaluation.financialImpact / 5) * 100;
                      const y = 100 - (evaluation.stakeholderConcern / 5) * 100;
                      
                      return (
                        <div
                          key={evaluation.issueId}
                          className={`absolute w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white transform -translate-x-3 -translate-y-3 ${
                            evaluation.issueId === selectedIssue ? 'ring-2 ring-blue-400' : ''
                          } ${
                            issue.category === 'Environmental' ? 'bg-green-500' :
                            issue.category === 'Social' ? 'bg-blue-500' : 'bg-purple-500'
                          }`}
                          style={{ left: `${x}%`, top: `${y}%` }}
                          title={issue.title}
                        >
                          {index + 1}
                        </div>
                      );
                    })}
                </div>
              </div>

              {/* 통계 */}
              <div className="space-y-2">
                <h4 className="text-sm font-medium">평가 통계</h4>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="bg-green-50 p-2 rounded">
                    <div className="font-medium text-green-800">완료</div>
                    <div className="text-green-600">{progress.completedIssues}개</div>
                  </div>
                  <div className="bg-yellow-50 p-2 rounded">
                    <div className="font-medium text-yellow-800">진행중</div>
                    <div className="text-yellow-600">{progress.partialIssues}개</div>
                  </div>
                  <div className="bg-blue-50 p-2 rounded">
                    <div className="font-medium text-blue-800">평균 재무</div>
                    <div className="text-blue-600">{progress.averageFinancialScore}</div>
                  </div>
                  <div className="bg-purple-50 p-2 rounded">
                    <div className="font-medium text-purple-800">평균 관심도</div>
                    <div className="text-purple-600">{progress.averageStakeholderScore}</div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// 3. 이해관계자 의견 수렴 컴포넌트
function StakeholderInput() {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedGroups, setSelectedGroups] = useState<StakeholderGroup[]>(['investors', 'customers']);
  const [surveyData, setSurveyData] = useState({
    title: '한국중부발전 ESG 중대성 평가 설문',
    description: '지속가능성 보고서 작성을 위한 이해관계자 의견 수렴',
    deadline: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // 2주 후
  });

  const steps = [
    { 
      id: 1, 
      title: '설문 설계', 
      icon: <FileText className="h-4 w-4" />, 
      status: currentStep > 1 ? 'completed' : currentStep === 1 ? 'current' : 'pending' 
    },
    { 
      id: 2, 
      title: '대상자 관리', 
      icon: <Users className="h-4 w-4" />, 
      status: currentStep > 2 ? 'completed' : currentStep === 2 ? 'current' : 'pending' 
    },
    { 
      id: 3, 
      title: '설문 발송', 
      icon: <Send className="h-4 w-4" />, 
      status: currentStep > 3 ? 'completed' : currentStep === 3 ? 'current' : 'pending' 
    },
    { 
      id: 4, 
      title: '결과 분석', 
      icon: <BarChart3 className="h-4 w-4" />, 
      status: currentStep === 4 ? 'current' : 'pending' 
    }
  ];

  return (
    <div className="space-y-6">
      {/* 진행 단계 표시 */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div 
                  className={`flex items-center justify-center w-10 h-10 rounded-full border-2 cursor-pointer transition-colors ${
                    step.status === 'completed' 
                      ? 'bg-green-500 border-green-500 text-white' 
                      : step.status === 'current'
                      ? 'bg-blue-500 border-blue-500 text-white'
                      : 'bg-gray-100 border-gray-300 text-gray-400'
                  }`}
                  onClick={() => step.status !== 'pending' && setCurrentStep(step.id)}
                >
                  {step.status === 'completed' ? (
                    <CheckCircle className="h-5 w-5" />
                  ) : (
                    step.icon
                  )}
                </div>
                <div className="ml-3">
                  <p className={`text-sm font-medium ${
                    step.status === 'current' ? 'text-blue-600' : 
                    step.status === 'completed' ? 'text-green-600' : 'text-gray-400'
                  }`}>
                    {step.title}
                  </p>
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-16 h-0.5 mx-4 ${
                    step.status === 'completed' ? 'bg-green-500' : 'bg-gray-300'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* 단계별 컨텐츠 */}
      {currentStep === 1 && (
        <SurveyDesignStep 
          surveyData={surveyData}
          setSurveyData={setSurveyData}
          selectedGroups={selectedGroups}
          setSelectedGroups={setSelectedGroups}
          onNext={() => setCurrentStep(2)} 
        />
      )}
      {currentStep === 2 && (
        <ContactManagementStep 
          selectedGroups={selectedGroups}
          onNext={() => setCurrentStep(3)} 
          onBack={() => setCurrentStep(1)} 
        />
      )}
      {currentStep === 3 && (
        <SurveyDistributionStep 
          surveyData={surveyData}
          selectedGroups={selectedGroups}
          onNext={() => setCurrentStep(4)} 
          onBack={() => setCurrentStep(2)} 
        />
      )}
      {currentStep === 4 && (
        <ResponseAnalysisStep 
          selectedGroups={selectedGroups}
          onBack={() => setCurrentStep(3)} 
        />
      )}
    </div>
  );
}

// 4. 임계값 설정 컴포넌트
function ThresholdSetting() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Settings className="h-5 w-5 mr-2 text-gray-400" />
            중대성 임계값 설정
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12">
            <Settings className="h-16 w-16 mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-semibold text-gray-700 mb-2">임계값 설정</h3>
            <p className="text-gray-500 mb-6">
              경영진 논의를 통해 중대성 판단 기준을 설정합니다
            </p>
            <div className="max-w-md mx-auto space-y-2 text-sm text-gray-600">
              <div className="flex items-center justify-center space-x-2">
                <AlertCircle className="h-4 w-4 text-gray-400" />
                <span>시나리오 분석 도구</span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <AlertCircle className="h-4 w-4 text-gray-400" />
                <span>경영진 의사결정 지원</span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <AlertCircle className="h-4 w-4 text-gray-400" />
                <span>기준 확정 및 문서화</span>
              </div>
            </div>
            <Button disabled className="mt-6">대기 중</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// 5. 매트릭스 확정 컴포넌트
function MatrixConfirmation() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <BarChart3 className="h-5 w-5 mr-2 text-gray-400" />
            최종 매트릭스 확정
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12">
            <BarChart3 className="h-16 w-16 mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-semibold text-gray-700 mb-2">매트릭스 확정</h3>
            <p className="text-gray-500 mb-6">
              최종 이중중대성 매트릭스를 생성하고 보고서에 활용합니다
            </p>
            <div className="max-w-md mx-auto space-y-2 text-sm text-gray-600">
              <div className="flex items-center justify-center space-x-2">
                <AlertCircle className="h-4 w-4 text-gray-400" />
                <span>실시간 매트릭스 생성</span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <AlertCircle className="h-4 w-4 text-gray-400" />
                <span>다양한 시각화 옵션</span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <AlertCircle className="h-4 w-4 text-gray-400" />
                <span>보고서 연동 및 출력</span>
              </div>
            </div>
            <Button disabled className="mt-6">대기 중</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// 이해관계자 설문 단계별 컴포넌트들

// 1단계: 설문 설계
interface SurveyDesignStepProps {
  surveyData: any;
  setSurveyData: (data: any) => void;
  selectedGroups: StakeholderGroup[];
  setSelectedGroups: (groups: StakeholderGroup[]) => void;
  onNext: () => void;
}

function SurveyDesignStep({ surveyData, setSurveyData, selectedGroups, setSelectedGroups, onNext }: SurveyDesignStepProps) {
  // const [selectedTemplate, setSelectedTemplate] = useState<string>('');

  return (
    <div className="grid grid-cols-2 gap-6">
      {/* 왼쪽: 설문 기본 정보 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <FileText className="h-5 w-5 mr-2 text-blue-600" />
            설문 기본 정보
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="survey-title">설문 제목</Label>
            <Input
              id="survey-title"
              value={surveyData.title}
              onChange={(e) => setSurveyData({...surveyData, title: e.target.value})}
              placeholder="ESG 중대성 평가 설문"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="survey-description">설문 설명</Label>
            <Textarea
              id="survey-description"
              value={surveyData.description}
              onChange={(e) => setSurveyData({...surveyData, description: e.target.value})}
              placeholder="설문의 목적과 중요성을 설명해주세요"
              className="h-20"
            />
          </div>

          <div className="space-y-2">
            <Label>이해관계자 그룹 선택</Label>
            <div className="grid grid-cols-2 gap-2">
              {Object.entries(stakeholderGroupInfo).map(([key, info]) => (
                <div
                  key={key}
                  className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                    selectedGroups.includes(key as StakeholderGroup)
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => {
                    const group = key as StakeholderGroup;
                    setSelectedGroups(
                      selectedGroups.includes(group)
                        ? selectedGroups.filter(g => g !== group)
                        : [...selectedGroups, group]
                    );
                  }}
                >
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="text-lg">{info.icon}</span>
                    <span className="font-medium text-sm">{info.name}</span>
                  </div>
                  <p className="text-xs text-gray-600">{info.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t">
            <div className="flex justify-between items-center mb-2">
              <Label>선택된 그룹 ({selectedGroups.length}개)</Label>
              <span className="text-sm text-gray-500">
                예상 응답자: {selectedGroups.length * 15}명
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {selectedGroups.map(group => (
                <Badge key={group} className={stakeholderGroupInfo[group].color}>
                  {stakeholderGroupInfo[group].icon} {stakeholderGroupInfo[group].name}
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 오른쪽: 설문 템플릿 미리보기 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Eye className="h-5 w-5 mr-2 text-green-600" />
            설문 미리보기
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-2">{surveyData.title}</h3>
              <p className="text-sm text-gray-600 mb-4">{surveyData.description}</p>
              
              <div className="space-y-3">
                <div className="text-sm">
                  <strong>예상 소요시간:</strong> 8-12분
                </div>
                <div className="text-sm">
                  <strong>질문 수:</strong> {mockESGIssues.length}개 (ESG 이슈별)
                </div>
              </div>
            </div>

            {/* 샘플 질문 */}
            <div className="space-y-3">
              <h4 className="font-medium text-gray-900">샘플 질문</h4>
              
              <div className="bg-white border rounded-lg p-4">
                <p className="font-medium text-sm mb-3">
                  1. 다음 ESG 이슈가 귀하/귀 조직에게 미치는 영향도를 평가해주세요
                </p>
                <div className="pl-4 border-l-4 border-blue-200">
                  <p className="text-sm font-medium text-gray-800 mb-2">탄소 배출량 감소</p>
                  <div className="flex space-x-2 text-xs">
                    {[1, 2, 3, 4, 5].map(score => (
                      <div key={score} className="flex flex-col items-center">
                        <div className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center bg-gray-50">
                          {score}
                        </div>
                        <span className="mt-1 text-gray-500">
                          {score === 1 ? '낮음' : score === 5 ? '높음' : ''}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="bg-white border rounded-lg p-4">
                <p className="font-medium text-sm mb-3">
                  2. 추가 의견이나 제안사항이 있으시면 작성해주세요 (선택사항)
                </p>
                <div className="h-16 bg-gray-50 border rounded text-xs text-gray-500 p-2">
                  자유 기재 영역
                </div>
              </div>
            </div>

            <div className="pt-4 border-t">
              <Button 
                onClick={onNext}
                disabled={selectedGroups.length === 0}
                className="w-full"
              >
                다음 단계: 대상자 관리
                <ChevronRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// 2단계: 대상자 관리
interface ContactManagementStepProps {
  selectedGroups: StakeholderGroup[];
  onNext: () => void;
  onBack: () => void;
}

function ContactManagementStep({ selectedGroups, onNext, onBack }: ContactManagementStepProps) {
  const [selectedContacts, setSelectedContacts] = useState<string[]>(
    mockStakeholderContacts
      .filter(contact => selectedGroups.includes(contact.stakeholderGroup))
      .map(contact => contact.id)
  );
  const [filterGroup, setFilterGroup] = useState<StakeholderGroup | 'all'>('all');

  const relevantContacts = mockStakeholderContacts.filter(
    contact => selectedGroups.includes(contact.stakeholderGroup)
  );

  const filteredContacts = filterGroup === 'all' 
    ? relevantContacts 
    : relevantContacts.filter(contact => contact.stakeholderGroup === filterGroup);

  const toggleContact = (contactId: string) => {
    setSelectedContacts(prev =>
      prev.includes(contactId)
        ? prev.filter(id => id !== contactId)
        : [...prev, contactId]
    );
  };

  const toggleAllInGroup = (group: StakeholderGroup) => {
    const groupContacts = relevantContacts.filter(c => c.stakeholderGroup === group);
    const allSelected = groupContacts.every(c => selectedContacts.includes(c.id));
    
    if (allSelected) {
      setSelectedContacts(prev => prev.filter(id => !groupContacts.map(c => c.id).includes(id)));
    } else {
      setSelectedContacts(prev => [...new Set([...prev, ...groupContacts.map(c => c.id)])]);
    }
  };

  return (
    <div className="grid grid-cols-3 gap-6">
      {/* 왼쪽: 그룹별 통계 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Users className="h-5 w-5 mr-2 text-blue-600" />
            그룹별 현황
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {selectedGroups.map(group => {
              const groupContacts = relevantContacts.filter(c => c.stakeholderGroup === group);
              const selectedInGroup = groupContacts.filter(c => selectedContacts.includes(c.id)).length;
              
              return (
                <div key={group} className={`p-3 rounded-lg border ${stakeholderGroupInfo[group].color}`}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <span>{stakeholderGroupInfo[group].icon}</span>
                      <span className="font-medium text-sm">{stakeholderGroupInfo[group].name}</span>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => toggleAllInGroup(group)}
                      className="h-6 text-xs"
                    >
                      {selectedInGroup === groupContacts.length ? '전체 해제' : '전체 선택'}
                    </Button>
                  </div>
                  <div className="text-sm">
                    <div className="flex justify-between">
                      <span>선택됨:</span>
                      <span className="font-medium">{selectedInGroup}/{groupContacts.length}명</span>
                    </div>
                    <div className="flex justify-between">
                      <span>VIP:</span>
                      <span>{groupContacts.filter(c => c.isVIP && selectedContacts.includes(c.id)).length}명</span>
                    </div>
                  </div>
                  <Progress 
                    value={(selectedInGroup / groupContacts.length) * 100} 
                    className="h-1 mt-2" 
                  />
                </div>
              );
            })}

            <div className="pt-4 border-t">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{selectedContacts.length}</div>
                <div className="text-sm text-gray-600">총 선택된 응답자</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 가운데: 연락처 목록 */}
      <Card className="col-span-2">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center">
              <Mail className="h-5 w-5 mr-2 text-green-600" />
              연락처 관리
            </CardTitle>
            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4 text-gray-400" />
              <Select value={filterGroup} onValueChange={(value) => setFilterGroup(value as any)}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">전체</SelectItem>
                  {selectedGroups.map(group => (
                    <SelectItem key={group} value={group}>
                      {stakeholderGroupInfo[group].name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-96">
            <div className="space-y-2">
              {filteredContacts.map(contact => (
                <div
                  key={contact.id}
                  className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                    selectedContacts.includes(contact.id)
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => toggleContact(contact.id)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`w-3 h-3 rounded-full ${
                        selectedContacts.includes(contact.id) ? 'bg-blue-500' : 'bg-gray-300'
                      }`} />
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="font-medium text-sm">{contact.name}</span>
                          {contact.isVIP && (
                            <Badge variant="outline" className="text-xs bg-yellow-50 text-yellow-700">
                              VIP
                            </Badge>
                          )}
                        </div>
                        <div className="text-xs text-gray-600">
                          {contact.organization} • {contact.email}
                        </div>
                      </div>
                    </div>
                    <Badge className={stakeholderGroupInfo[contact.stakeholderGroup].color}>
                      {stakeholderGroupInfo[contact.stakeholderGroup].icon}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>

          <div className="flex justify-between pt-4 border-t">
            <Button variant="outline" onClick={onBack}>
              <ChevronLeft className="h-4 w-4 mr-2" />
              이전
            </Button>
            <Button 
              onClick={onNext}
              disabled={selectedContacts.length === 0}
            >
              다음 단계: 설문 발송
              <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// 3단계: 설문 발송
interface SurveyDistributionStepProps {
  surveyData: any;
  selectedGroups: StakeholderGroup[];
  onNext: () => void;
  onBack: () => void;
}

function SurveyDistributionStep({ surveyData, selectedGroups, onNext, onBack }: SurveyDistributionStepProps) {
  const [emailConfig, setEmailConfig] = useState({
    subject: `[${surveyData.title}] ESG 중대성 평가에 대한 귀하의 의견을 들려주세요`,
    customMessage: '안녕하세요,\n\n저희 회사의 지속가능성 보고서 작성을 위해 이해관계자 여러분의 소중한 의견을 수렴하고자 합니다.\n\n설문은 약 10분 정도 소요되며, 귀하의 응답은 익명으로 처리됩니다.\n\n감사합니다.',
    reminderDays: [3, 7, 10]
  });
  const [sendStatus, setSendStatus] = useState<'ready' | 'sending' | 'sent'>('ready');

  const totalRecipients = selectedGroups.length * 15; // 모의 데이터

  const handleSendSurvey = () => {
    setSendStatus('sending');
    // 모의 발송 과정
    setTimeout(() => {
      setSendStatus('sent');
    }, 3000);
  };

  return (
    <div className="space-y-6">
      {sendStatus === 'ready' && (
        <div className="grid grid-cols-2 gap-6">
          {/* 왼쪽: 이메일 설정 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Mail className="h-5 w-5 mr-2 text-blue-600" />
                이메일 설정
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email-subject">이메일 제목</Label>
                <Input
                  id="email-subject"
                  value={emailConfig.subject}
                  onChange={(e) => setEmailConfig({...emailConfig, subject: e.target.value})}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email-message">개인화 메시지</Label>
                <Textarea
                  id="email-message"
                  value={emailConfig.customMessage}
                  onChange={(e) => setEmailConfig({...emailConfig, customMessage: e.target.value})}
                  className="h-32"
                />
              </div>

              <div className="space-y-2">
                <Label>리마인더 일정 (며칠 후)</Label>
                <div className="flex space-x-2">
                  {[3, 7, 10, 14].map(day => (
                    <Button
                      key={day}
                      variant={emailConfig.reminderDays.includes(day) ? "default" : "outline"}
                      size="sm"
                      onClick={() => {
                        const newDays = emailConfig.reminderDays.includes(day)
                          ? emailConfig.reminderDays.filter(d => d !== day)
                          : [...emailConfig.reminderDays, day].sort((a, b) => a - b);
                        setEmailConfig({...emailConfig, reminderDays: newDays});
                      }}
                    >
                      {day}일
                    </Button>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">총 발송 대상:</span>
                    <span className="font-medium ml-2">{totalRecipients}명</span>
                  </div>
                  <div>
                    <span className="text-gray-600">응답 마감일:</span>
                    <span className="font-medium ml-2">{surveyData.deadline.toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 오른쪽: 발송 미리보기 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Eye className="h-5 w-5 mr-2 text-green-600" />
                이메일 미리보기
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-50 p-4 rounded-lg space-y-4">
                <div className="border-b pb-2">
                  <div className="text-sm text-gray-600">제목:</div>
                  <div className="font-medium">{emailConfig.subject}</div>
                </div>

                <div className="text-sm space-y-2">
                  <div className="whitespace-pre-line">{emailConfig.customMessage}</div>
                  
                  <div className="bg-blue-50 p-3 rounded border-l-4 border-blue-400">
                    <div className="font-medium text-blue-800 mb-2">📋 설문 참여하기</div>
                    <Button size="sm" className="mb-2">설문 시작하기</Button>
                    <div className="text-xs text-blue-600">
                      • 예상 소요시간: 10분<br/>
                      • 응답 마감: {surveyData.deadline.toLocaleDateString()}<br/>
                      • 익명 처리됩니다
                    </div>
                  </div>

                  <div className="text-xs text-gray-500 pt-2 border-t">
                    본 설문에 대한 문의사항이 있으시면 esg@company.com으로 연락주세요.
                  </div>
                </div>
              </div>

              <div className="pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span>그룹별 발송 현황:</span>
                </div>
                {selectedGroups.map(group => (
                  <div key={group} className="flex justify-between text-sm">
                    <span>{stakeholderGroupInfo[group].icon} {stakeholderGroupInfo[group].name}</span>
                    <span className="font-medium">15명</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {sendStatus === 'sending' && (
        <Card>
          <CardContent className="pt-6">
            <div className="text-center py-12">
              <div className="animate-spin h-12 w-12 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
              <h3 className="text-lg font-semibold text-gray-700 mb-2">설문 발송 중...</h3>
              <p className="text-gray-500">
                {totalRecipients}명의 이해관계자에게 설문 이메일을 발송하고 있습니다.
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {sendStatus === 'sent' && (
        <Card>
          <CardContent className="pt-6">
            <div className="text-center py-12">
              <CheckCircle className="h-16 w-16 mx-auto text-green-500 mb-4" />
              <h3 className="text-lg font-semibold text-gray-700 mb-2">설문 발송 완료!</h3>
              <p className="text-gray-500 mb-6">
                총 {totalRecipients}명에게 설문 이메일이 성공적으로 발송되었습니다.
              </p>
              <div className="grid grid-cols-3 gap-4 max-w-md mx-auto text-sm">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">{totalRecipients}</div>
                  <div className="text-gray-600">발송 완료</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">0</div>
                  <div className="text-gray-600">응답 완료</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600">0%</div>
                  <div className="text-gray-600">응답률</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="flex justify-between">
        <Button variant="outline" onClick={onBack}>
          <ChevronLeft className="h-4 w-4 mr-2" />
          이전
        </Button>
        <div className="space-x-2">
          {sendStatus === 'ready' && (
            <Button onClick={handleSendSurvey}>
              <Send className="h-4 w-4 mr-2" />
              설문 발송하기
            </Button>
          )}
          {sendStatus === 'sent' && (
            <Button onClick={onNext}>
              다음 단계: 결과 분석
              <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

// 4단계: 결과 분석
interface ResponseAnalysisStepProps {
  selectedGroups: StakeholderGroup[];
  onBack: () => void;
}

function ResponseAnalysisStep({ selectedGroups, onBack }: ResponseAnalysisStepProps) {
  // 모의 응답 데이터
  const mockResponses = {
    totalSent: selectedGroups.length * 15,
    totalResponded: selectedGroups.length * 8,
    responseRate: 53.3,
    avgCompletionTime: 9.2,
    groupStats: Object.fromEntries(
      selectedGroups.map(group => [
        group,
        {
          sent: 15,
          responded: Math.floor(Math.random() * 10) + 5,
          responseRate: Math.floor(Math.random() * 40) + 40,
          avgScore: Math.floor(Math.random() * 3) + 3
        }
      ])
    ),
    issueScores: mockESGIssues.map(issue => ({
      issueId: issue.id,
      issueTitle: issue.title,
      avgScore: Math.floor(Math.random() * 3) + 3,
      category: issue.category
    }))
  };

  return (
    <div className="space-y-6">
      {/* 전체 응답 현황 */}
      <div className="grid grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">{mockResponses.totalResponded}</div>
              <div className="text-sm text-gray-600">총 응답자</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">{mockResponses.responseRate}%</div>
              <div className="text-sm text-gray-600">응답률</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">{mockResponses.avgCompletionTime}</div>
              <div className="text-sm text-gray-600">평균 소요시간(분)</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600">7</div>
              <div className="text-sm text-gray-600">남은 일수</div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {/* 왼쪽: 그룹별 응답 현황 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Users className="h-5 w-5 mr-2 text-blue-600" />
              그룹별 응답 현황
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {selectedGroups.map(group => {
                const stats = mockResponses.groupStats[group];
                return (
                  <div key={group} className={`p-4 rounded-lg border ${stakeholderGroupInfo[group].color}`}>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <span>{stakeholderGroupInfo[group].icon}</span>
                        <span className="font-medium">{stakeholderGroupInfo[group].name}</span>
                      </div>
                      <Badge variant="outline">
                        {stats.responded}/{stats.sent}명
                      </Badge>
                    </div>
                    <div className="grid grid-cols-3 gap-2 text-sm">
                      <div>
                        <div className="text-gray-600">응답률</div>
                        <div className="font-medium">{stats.responseRate}%</div>
                      </div>
                      <div>
                        <div className="text-gray-600">평균 점수</div>
                        <div className="font-medium">{stats.avgScore}/5</div>
                      </div>
                      <div>
                        <div className="text-gray-600">가중치</div>
                        <div className="font-medium">1.0x</div>
                      </div>
                    </div>
                    <Progress value={stats.responseRate} className="h-2 mt-2" />
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* 오른쪽: 이슈별 관심도 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="h-5 w-5 mr-2 text-green-600" />
              이슈별 관심도 분석
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-80">
              <div className="space-y-3">
                {mockResponses.issueScores
                  .sort((a, b) => b.avgScore - a.avgScore)
                  .map((issue, index) => (
                    <div key={issue.issueId} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white ${
                          index < 3 ? 'bg-red-500' : index < 6 ? 'bg-orange-500' : 'bg-green-500'
                        }`}>
                          {index + 1}
                        </div>
                        <div>
                          <div className="font-medium text-sm">{issue.issueTitle}</div>
                          <div className="flex items-center space-x-2">
                            <Badge variant="outline" className={getCategoryColor(issue.category)}>
                              {getCategoryIcon(issue.category)}
                              <span className="ml-1 text-xs">{issue.category.charAt(0)}</span>
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-gray-900">{issue.avgScore.toFixed(1)}</div>
                        <div className="text-xs text-gray-500">평균 점수</div>
                      </div>
                    </div>
                  ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>

      {/* 가중치 적용 및 완료 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Calculator className="h-5 w-5 mr-2 text-purple-600" />
            가중치 적용 및 점수 반영
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-blue-50 p-4 rounded-lg mb-4">
            <div className="flex items-start space-x-3">
              <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5" />
              <div>
                <h4 className="font-medium text-blue-900 mb-1">이해관계자 의견 반영 완료</h4>
                <p className="text-sm text-blue-700">
                  수집된 이해관계자 의견이 점수 매기기 탭의 '이해관계자 관심도' 점수에 자동으로 반영됩니다. 
                  각 그룹의 가중치와 응답 점수를 종합하여 최종 점수가 계산됩니다.
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <h5 className="font-medium mb-2">적용 방식</h5>
              <ul className="space-y-1 text-gray-600">
                <li>• 그룹별 평균 점수 계산</li>
                <li>• 응답률 기반 신뢰도 가중치</li>
                <li>• VIP 응답자 1.2x 가중치</li>
                <li>• 최종 점수 1-5점 범위로 정규화</li>
              </ul>
            </div>
            <div>
              <h5 className="font-medium mb-2">다음 단계</h5>
              <ul className="space-y-1 text-gray-600">
                <li>• 점수 매기기 탭에서 확인</li>
                <li>• 임계값 설정으로 진행</li>
                <li>• 최종 매트릭스 생성</li>
                <li>• 보고서 작성 완료</li>
              </ul>
            </div>
          </div>

          <div className="flex justify-between pt-4 border-t">
            <Button variant="outline" onClick={onBack}>
              <ChevronLeft className="h-4 w-4 mr-2" />
              이전
            </Button>
            <div className="space-x-2">
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                결과 다운로드
              </Button>
              <Button>
                <CheckCircle className="h-4 w-4 mr-2" />
                이해관계자 의견 수렴 완료
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
