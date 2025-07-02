// ESG 총괄 관리 대시보드

'use client';

import { useState } from 'react';
import { WorkflowOverview } from '@/components/dashboard/widgets/workflow-overview';
import { CompanyFinancialsWidget } from '@/components/dashboard/widgets/company-financials';
import { ESGIssuesMatrix } from '@/components/dashboard/widgets/esg-issues-matrix';
import { CompanySelector } from '@/components/dashboard/widgets/company-selector';
import { StatsCards } from '@/components/dashboard/widgets/stats-cards';
import { 
  mockCompaniesOverview 
} from '@/lib/dashboard-mock-data';
import { 
  useDashboardStats, 
  useDashboardWorkflows, 
  useDashboardFinancials 
} from '@/hooks/api/use-dashboard';

export default function DashboardPage() {
  const [selectedCompanyId, setSelectedCompanyId] = useState<string>('');
  
  // 🚀 API 훅 사용 - 모든 위젯 API 연동!
  const { data: dashboardStats, isLoading: statsLoading } = useDashboardStats();
  const { data: workflows, isLoading: workflowsLoading } = useDashboardWorkflows();
  const { data: financials, isLoading: financialsLoading } = useDashboardFinancials();
  
  // 선택된 기업의 이슈들 필터링
  const selectedCompany = mockCompaniesOverview.find(c => c.id === selectedCompanyId);
  const selectedCompanyIssues = selectedCompany?.activeIssues || [];

  return (
    <div className="space-y-6">
      {/* 헤더 */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">ESG 통합 관리 대시보드</h1>
        <p className="text-muted-foreground mt-2">
          담당 기업의 ESG 보고서 진행 상황과 이슈를 통합 관리합니다.
        </p>
      </div>

      {/* 🚀 새로운 패턴: API 연동 StatsCards */}
      <StatsCards 
        stats={dashboardStats}
        isLoading={statsLoading}
      />

      {/* 상단 레이아웃: 워크플로우 + 기업 선택 */}
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="lg:col-span-1">
          <WorkflowOverview 
            workflows={workflows || []}
            isLoading={workflowsLoading}
          />
        </div>
        
        <div className="lg:col-span-1">
          <CompanySelector 
            companies={mockCompaniesOverview}
            selectedCompanyId={selectedCompanyId}
            onCompanySelect={setSelectedCompanyId}
            isLoading={false}
          />
        </div>
      </div>

      {/* 중간 레이아웃: 기업 재무 현황 */}
      <div className="grid gap-6">
        <CompanyFinancialsWidget 
          companies={financials || []}
          isLoading={financialsLoading}
        />
      </div>

      {/* 하단 레이아웃: ESG 이슈 매트릭스 */}
      <div className="grid gap-6">
        <ESGIssuesMatrix 
          issues={selectedCompanyIssues}
          selectedCompany={selectedCompany?.name}
          isLoading={false}
        />
      </div>

      {/* 추가 정보나 액션 섹션 */}
      {selectedCompany && (
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4 text-blue-900">
            📊 {selectedCompany.name} 통합 현황
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
            <div className="bg-white rounded-lg p-4 border border-blue-100">
              <p className="text-blue-600 font-medium">ESG 점수</p>
              <p className="text-2xl font-bold text-blue-800">{selectedCompany.esgScore}/100</p>
            </div>
            
            <div className="bg-white rounded-lg p-4 border border-green-100">
              <p className="text-green-600 font-medium">진행 중인 보고서</p>
              <p className="text-2xl font-bold text-green-800">{selectedCompany.reportStatus.length}건</p>
            </div>
            
            <div className="bg-white rounded-lg p-4 border border-orange-100">
              <p className="text-orange-600 font-medium">활성 이슈</p>
              <p className="text-2xl font-bold text-orange-800">{selectedCompany.activeIssues.length}건</p>
            </div>
            
            <div className="bg-white rounded-lg p-4 border border-purple-100">
              <p className="text-purple-600 font-medium">위험 등급</p>
              <p className="text-2xl font-bold text-purple-800">
                {selectedCompany.riskLevel === 'low' && '낮음'}
                {selectedCompany.riskLevel === 'medium' && '보통'}
                {selectedCompany.riskLevel === 'high' && '높음'}
              </p>
            </div>
          </div>

          {/* 빠른 액션 버튼들 */}
          <div className="flex flex-wrap gap-3 mt-6">
            <button 
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
              onClick={() => window.open('/reports/builder/gri', '_blank')}
            >
              <span>📝</span>
              <span>GRI 보고서 작성</span>
            </button>
            
            <button 
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
              onClick={() => window.open('/crawler', '_blank')}
            >
              <span>📰</span>
              <span>뉴스 분석</span>
            </button>
            
            <button 
              className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center space-x-2"
              onClick={() => {/* 향후 상세 페이지 구현 */}}
            >
              <span>📈</span>
              <span>상세 분석</span>
            </button>
            
            <button 
              className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors flex items-center space-x-2"
              onClick={() => {/* 향후 설정 페이지 구현 */}}
            >
              <span>⚙️</span>
              <span>설정</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
