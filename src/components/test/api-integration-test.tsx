'use client'

import { useState, useEffect } from 'react'
import { useCompanies } from '@/entities/company'
import { useReports } from '@/hooks/api/use-reports'
import { useDashboardStats } from '@/hooks/api/use-dashboard'
import { useNewsAnalysis } from '@/hooks/api/use-news'
import { useNewsApiStatus } from '@/hooks/api/use-news'
import { Button } from '@/shared/ui/Button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/shared/ui/Card'
import { Input } from '@/shared/ui/Input'
import { Badge } from '@/shared/ui/Badge'
import { Textarea } from '@/shared/ui/TextArea'
import { Alert, AlertDescription } from '@/shared/ui/Alert'
import { useAutoSave } from '@/hooks/useAutoSave'
import { ReportStorageService } from '@/shared/lib/storage/report-storage'
import { 
  Database, 
  Save, 
  Trash2, 
  RefreshCw, 
  CheckCircle, 

  Clock
} from 'lucide-react'
import type { Company } from '@/entities/company/model/types'

export function ApiIntegrationTest() {
  const [testCompany, setTestCompany] = useState('삼성전자')

  // API 훅들 사용
  const { data: companies, isLoading: companiesLoading, error: companiesError } = useCompanies()
  const { data: reports, isLoading: reportsLoading, error: reportsError } = useReports()
  const { data: dashboardStats, isLoading: statsLoading, error: statsError } = useDashboardStats()
  const { data: newsApiStatus } = useNewsApiStatus()
  
  const { 
    data: newsAnalysis, 
    isLoading: newsLoading, 
    error: newsError,
    refetch: refetchNews 
  } = useNewsAnalysis({ 
    company: testCompany,
    display: 10 
  })

  const handleTestNews = () => {
    refetchNews()
  }

  return (
    <div className="p-6 space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold">🔌 API 연동 테스트</h1>
        <p className="text-gray-600 mt-2">백엔드 API와 MSW Mock 서비스 연동 상태를 확인합니다</p>
      </div>

      {/* API 상태 표시 */}
      <Card>
        <CardHeader>
          <CardTitle>🔍 API 연결 상태</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Badge variant={newsApiStatus?.available ? "default" : "destructive"}>
                뉴스 분석 API: {newsApiStatus?.available ? "연결됨" : "오프라인"}
              </Badge>
              <p className="text-sm text-gray-600 mt-1">{newsApiStatus?.message}</p>
            </div>
            <div>
              <Badge variant="default">Mock API: 활성화됨</Badge>
              <p className="text-sm text-gray-600 mt-1">개발 환경에서 MSW 사용 중</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 회사 목록 테스트 */}
      <Card>
        <CardHeader>
          <CardTitle>🏢 회사 목록 API (Mock)</CardTitle>
        </CardHeader>
        <CardContent>
          {companiesLoading && <p>로딩 중...</p>}
          {companiesError && <p className="text-red-500">오류: {companiesError.message}</p>}
          {companies && (
            <div className="space-y-2">
              {(companies.items as import('@/entities/company/model/types').Company[])?.map((company) => (
                <div key={company.id} className="flex justify-between items-center p-2 border rounded">
                  <span>{company.name}</span>
                  <Badge variant={company.risk_level === 'low' ? 'default' : 'destructive'}>
                    ESG: {company.esg_score}
                  </Badge>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* 리포트 목록 테스트 */}
      <Card>
        <CardHeader>
          <CardTitle>📊 리포트 목록 API (Mock)</CardTitle>
        </CardHeader>
        <CardContent>
          {reportsLoading && <p>로딩 중...</p>}
          {reportsError && <p className="text-red-500">오류: {reportsError.message}</p>}
          {reports && (
            <div className="space-y-2">
              {reports.map((report) => (
                <div key={report.id} className="flex justify-between items-center p-2 border rounded">
                  <span>{report.title}</span>
                  <div className="space-x-2">
                    <Badge>{report.framework.toUpperCase()}</Badge>
                    <Badge variant={report.status === 'completed' ? 'default' : 'secondary'}>
                      {report.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* 대시보드 통계 테스트 */}
      <Card>
        <CardHeader>
          <CardTitle>📈 대시보드 통계 API (Mock)</CardTitle>
        </CardHeader>
        <CardContent>
          {statsLoading && <p>로딩 중...</p>}
          {statsError && <p className="text-red-500">오류: {statsError.message}</p>}
          {dashboardStats && (
            <div className="grid grid-cols-2 gap-4">
              <div>총 기사 수: {dashboardStats.totalArticles?.toLocaleString()}</div>
              <div>분석 완료: {dashboardStats.analyzedArticles?.toLocaleString()}</div>
              <div>평균 리스크 점수: {(dashboardStats.avgRiskScore * 100).toFixed(1)}%</div>
              <div>주요 이슈: {dashboardStats.criticalIssues}건</div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* 뉴스 분석 테스트 */}
      <Card>
        <CardHeader>
          <CardTitle>📰 뉴스 분석 API (백엔드/Fallback)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-2 mb-4">
            <Input 
              value={testCompany}
              onChange={(e) => setTestCompany(e.target.value)}
              placeholder="회사명 입력"
            />
            <Button onClick={handleTestNews} disabled={newsLoading}>
              {newsLoading ? '분석 중...' : '뉴스 분석'}
            </Button>
          </div>
          
          {newsError && <p className="text-red-500">오류: {newsError.message}</p>}
          {newsAnalysis && (
            <div className="space-y-4">
              <div className="flex justify-between">
                <span>분석 상태: </span>
                <Badge variant={newsAnalysis.ml_service_status === 'connected' ? 'default' : 'secondary'}>
                  {newsAnalysis.ml_service_status === 'connected' ? '백엔드 연결' : 'Fallback 모드'}
                </Badge>
              </div>
              
              <div>
                <h4 className="font-semibold">분석 요약</h4>
                <p>총 분석 뉴스: {newsAnalysis.analysis_summary.total_analyzed}개</p>
                <div className="grid grid-cols-3 gap-2 mt-2">
                  {Object.entries(newsAnalysis.analysis_summary.esg_distribution as Record<string, number>).map(([key, value]) => (
                    <div key={key} className="text-sm">
                      {key}: {value}개
                    </div>
                  ))}
                </div>
              </div>

              {newsAnalysis.analyzed_news.length > 0 && (
                <div>
                  <h4 className="font-semibold">첫 번째 뉴스</h4>
                  <div className="border p-3 rounded">
                    <p className="font-medium">{newsAnalysis.analyzed_news[0].news_item.title}</p>
                    <div className="mt-2 space-x-2">
                      <Badge>{newsAnalysis.analyzed_news[0].esg_classification.esg_category}</Badge>
                      <Badge variant="outline">{newsAnalysis.analyzed_news[0].sentiment_analysis.sentiment}</Badge>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

interface TestData {
  testText: string;
  testNumber: number;
  timestamp: string;
}

export function StorageIntegrationTest() {
  const [testData, setTestData] = useState<TestData>({
    testText: '',
    testNumber: 0,
    timestamp: new Date().toISOString()
  });

  const [manualTestResult, setManualTestResult] = useState<string>('');
  const [allReports, setAllReports] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // 자동 저장 테스트
  const { isSaving, lastSaved, getSyncStatus, saveNow } = useAutoSave('test-report', testData, {
    framework: 'gri',
    enabled: true,
    debounceMs: 1000, // 빠른 테스트를 위해 1초로 설정
    onSaveSuccess: (data) => {
      console.log('✅ 자동 저장 성공:', data);
    },
    onSaveError: (error) => {
      console.error('❌ 자동 저장 실패:', error);
    }
  });

  // 모든 보고서 불러오기
  const loadAllReports = async () => {
    setIsLoading(true);
    try {
      const storageService = ReportStorageService.getInstance();
      const reports = await storageService.getAllReports();
      setAllReports(reports);
    } catch (error) {
      console.error('보고서 불러오기 실패:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // 수동 저장 테스트
  const testManualSave = async () => {
    try {
      const storageService = ReportStorageService.getInstance();
      const testPayload = {
        message: 'Manual save test',
        timestamp: new Date().toISOString(),
        randomValue: Math.random()
      };

      await storageService.saveReport('manual-test', testPayload, 'sasb');
      setManualTestResult('✅ 수동 저장 성공!');
      await loadAllReports();
    } catch (error) {
      setManualTestResult(`❌ 수동 저장 실패: ${error}`);
    }
  };

  // 수동 불러오기 테스트
  const testManualLoad = async () => {
    try {
      const storageService = ReportStorageService.getInstance();
      const data = await storageService.getReport('manual-test');
      setManualTestResult(data ? `✅ 불러오기 성공: ${JSON.stringify(data)}` : '❌ 데이터 없음');
    } catch (error) {
      setManualTestResult(`❌ 불러오기 실패: ${error}`);
    }
  };

  // 삭제 테스트
  const testDelete = async (reportId: string) => {
    try {
      const storageService = ReportStorageService.getInstance();
      await storageService.deleteReport(reportId);
      setManualTestResult(`✅ ${reportId} 삭제 완료`);
      await loadAllReports();
    } catch (error) {
      setManualTestResult(`❌ 삭제 실패: ${error}`);
    }
  };

  // 초기 로드
  useEffect(() => {
    loadAllReports();
  }, []);

  return (
    <div className="space-y-6 p-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="h-5 w-5" />
            IndexedDB 저장소 통합 테스트
          </CardTitle>
          <CardDescription>
            localStorage → IndexedDB 전환 후 데이터 저장/불러오기 테스트
          </CardDescription>
        </CardHeader>
      </Card>

      {/* 자동 저장 테스트 섹션 */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">🔄 자동 저장 테스트</CardTitle>
          <CardDescription>
            아래 필드를 수정하면 1초 후 자동으로 저장됩니다
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4 mb-4">
            <div className="flex items-center gap-2">
              {isSaving ? (
                <div className="flex items-center gap-1 text-blue-600">
                  <div className="animate-spin h-4 w-4 border border-blue-600 border-t-transparent rounded-full"></div>
                  <span className="text-sm">저장 중...</span>
                </div>
              ) : (
                <div className="flex items-center gap-1 text-green-600">
                  <CheckCircle className="h-4 w-4" />
                  <span className="text-sm">저장 완료</span>
                </div>
              )}
            </div>
            {lastSaved && (
              <Badge variant="outline">
                <Clock className="h-3 w-3 mr-1" />
                {lastSaved.toLocaleTimeString()}
              </Badge>
            )}
            <Badge variant={
              getSyncStatus() === 'synced' ? 'default' : 
              getSyncStatus() === 'pending' ? 'secondary' : 'destructive'
            }>
              {getSyncStatus()}
            </Badge>
          </div>

          <div className="space-y-3">
            <div>
              <label className="text-sm font-medium">테스트 텍스트:</label>
              <Textarea
                value={testData.testText}
                onChange={(e) => setTestData(prev => ({ 
                  ...prev, 
                  testText: e.target.value,
                  timestamp: new Date().toISOString()
                }))}
                placeholder="여기에 텍스트를 입력하세요..."
                className="mt-1"
              />
            </div>
            <div>
              <label className="text-sm font-medium">테스트 숫자:</label>
              <input
                type="number"
                value={testData.testNumber}
                onChange={(e) => setTestData(prev => ({ 
                  ...prev, 
                  testNumber: parseInt(e.target.value) || 0,
                  timestamp: new Date().toISOString()
                }))}
                className="mt-1 w-full p-2 border rounded-md"
              />
            </div>
          </div>

          <Button onClick={saveNow} variant="outline">
            <Save className="h-4 w-4 mr-2" />
            즉시 저장
          </Button>
        </CardContent>
      </Card>

      {/* 수동 테스트 섹션 */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">⚡ 수동 저장/불러오기 테스트</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Button onClick={testManualSave} variant="outline">
              <Save className="h-4 w-4 mr-2" />
              수동 저장 테스트
            </Button>
            <Button onClick={testManualLoad} variant="outline">
              <RefreshCw className="h-4 w-4 mr-2" />
              수동 불러오기 테스트
            </Button>
          </div>
          
          {manualTestResult && (
            <Alert>
              <AlertDescription>{manualTestResult}</AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      {/* 저장된 보고서 목록 */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center justify-between">
            📋 저장된 보고서 목록
            <Button onClick={loadAllReports} variant="outline" size="sm">
              <RefreshCw className="h-4 w-4 mr-2" />
              새로고침
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="text-center py-4">
              <div className="animate-spin h-6 w-6 border border-gray-300 border-t-blue-600 rounded-full mx-auto"></div>
              <p className="text-sm text-gray-500 mt-2">로딩 중...</p>
            </div>
          ) : allReports.length === 0 ? (
            <p className="text-gray-500 text-center py-4">저장된 보고서가 없습니다.</p>
          ) : (
            <div className="space-y-3">
              {allReports.map((report) => (
                <div key={report.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <div className="font-medium">{report.id}</div>
                    <div className="text-sm text-gray-500">
                      프레임워크: {report.framework} | 
                      수정일: {new Date(report.lastModified).toLocaleString()} |
                      버전: {report.version}
                    </div>
                    <Badge variant={
                      report.syncStatus === 'synced' ? 'default' : 
                      report.syncStatus === 'pending' ? 'secondary' : 'destructive'
                    }>
                      {report.syncStatus}
                    </Badge>
                  </div>
                  <Button 
                    onClick={() => testDelete(report.id)} 
                    variant="outline" 
                    size="sm"
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* 브라우저 개발자 도구 안내 */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">🔍 IndexedDB 확인 방법</CardTitle>
        </CardHeader>
        <CardContent>
          <ol className="list-decimal list-inside space-y-2 text-sm">
            <li>브라우저 개발자 도구 열기 (F12)</li>
            <li>Application 탭 선택</li>
            <li>왼쪽 사이드바에서 Storage → IndexedDB 확장</li>
            <li>"esg-platform" 데이터베이스 확장</li>
            <li>"reports" 객체 저장소에서 저장된 데이터 확인</li>
          </ol>
        </CardContent>
      </Card>
    </div>
  );
} 