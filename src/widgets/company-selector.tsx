// 기업 선택 드롭다운 위젯

'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/Card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/ui/Select';
import { Badge } from '@/shared/ui/Badge';
import { Building2, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { CompanyOverview, getRiskLevelColor } from '@/shared/lib/mocks/dashboard-mock-data';

interface CompanySelectorProps {
  companies: CompanyOverview[];
  selectedCompanyId?: string;
  onCompanySelect: (companyId: string) => void;
  isLoading?: boolean;
}

export function CompanySelector({ 
  companies, 
  selectedCompanyId, 
  onCompanySelect, 
  isLoading = false 
}: CompanySelectorProps) {
  const selectedCompany = companies.find(c => c.id === selectedCompanyId);

  const getTrendIcon = (trend: 'up' | 'down' | 'stable') => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="h-4 w-4 text-green-600" />;
      case 'down':
        return <TrendingDown className="h-4 w-4 text-red-600" />;
      case 'stable':
        return <Minus className="h-4 w-4 text-gray-600" />;
    }
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>기업 선택</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse space-y-4">
            <div className="h-10 bg-gray-200 rounded"></div>
            <div className="h-20 bg-gray-200 rounded"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Building2 className="h-5 w-5 mr-2" />
          기업 선택
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Select value={selectedCompanyId} onValueChange={onCompanySelect}>
          <SelectTrigger>
            <SelectValue placeholder="분석할 기업을 선택하세요" />
          </SelectTrigger>
          <SelectContent>
            {companies.map((company) => (
              <SelectItem key={company.id} value={company.id}>
                <div className="flex items-center justify-between w-full">
                  <span>{company.name}</span>
                  <div className="flex items-center space-x-2 ml-4">
                    <Badge variant="outline" className="text-xs">
                      {company.industry}
                    </Badge>
                    <span className={`text-xs font-medium ${getRiskLevelColor(company.riskLevel)}`}>
                      {company.riskLevel === 'low' && '저위험'}
                      {company.riskLevel === 'medium' && '중위험'}
                      {company.riskLevel === 'high' && '고위험'}
                    </span>
                  </div>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {selectedCompany && (
          <div className="border rounded-lg p-4 space-y-3 bg-gray-50">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-lg">{selectedCompany.name}</h4>
                <p className="text-sm text-muted-foreground">{selectedCompany.industry}</p>
              </div>
              <div className="text-right">
                <div className="flex items-center">
                  {getTrendIcon(selectedCompany.financials.trend)}
                  <span className="text-sm font-medium ml-1">ESG 점수: {selectedCompany.esgScore}</span>
                </div>
                <Badge 
                  variant="outline" 
                  className={getRiskLevelColor(selectedCompany.riskLevel)}
                >
                  {selectedCompany.riskLevel === 'low' && '저위험'}
                  {selectedCompany.riskLevel === 'medium' && '중위험'}
                  {selectedCompany.riskLevel === 'high' && '고위험'}
                </Badge>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">활성 이슈:</span>
                <span className="ml-2 font-medium">{selectedCompany.activeIssues.length}건</span>
              </div>
              <div>
                <span className="text-muted-foreground">진행 중인 보고서:</span>
                <span className="ml-2 font-medium">{selectedCompany.reportStatus.length}건</span>
              </div>
            </div>

            {/* 빠른 액션 버튼들 */}
            <div className="flex space-x-2 pt-2">
              <button 
                className="px-3 py-1 text-xs bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition-colors"
                onClick={() => {/* GRI 보고서 이동 */}}
              >
                GRI 보고서
              </button>
              <button 
                className="px-3 py-1 text-xs bg-green-100 text-green-700 rounded hover:bg-green-200 transition-colors"
                onClick={() => {/* 크롤링 페이지 이동 */}}
              >
                뉴스 분석
              </button>
              <button 
                className="px-3 py-1 text-xs bg-purple-100 text-purple-700 rounded hover:bg-purple-200 transition-colors"
                onClick={() => {/* 상세 페이지 이동 */}}
              >
                상세 보기
              </button>
            </div>
          </div>
        )}

        {!selectedCompany && (
          <div className="text-center py-6 text-muted-foreground text-sm">
            기업을 선택하면 상세 정보가 표시됩니다.
          </div>
        )}
      </CardContent>
    </Card>
  );
} 