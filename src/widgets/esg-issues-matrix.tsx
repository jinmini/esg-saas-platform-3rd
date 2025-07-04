// ESG 이슈 Double Material Matrix 위젯

'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/Card';
import { Badge } from '@/shared/ui/Badge';

import { ESGIssue, getPriorityColor } from '@/shared/lib/mocks/dashboard-mock-data';
import { Leaf, Users, Shield } from 'lucide-react';

interface ESGIssuesMatrixProps {
  issues: ESGIssue[];
  isLoading?: boolean;
  selectedCompany?: string;
}

export function ESGIssuesMatrix({ issues, isLoading = false, selectedCompany }: ESGIssuesMatrixProps) {
  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>ESG 이슈 매트릭스</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse">
            <div className="h-64 bg-gray-200 rounded mb-4"></div>
            <div className="space-y-2">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-4 bg-gray-200 rounded w-3/4"></div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  const getCategoryIcon = (category: ESGIssue['category']) => {
    switch (category) {
      case 'Environmental':
        return <Leaf className="h-4 w-4 text-green-600" />;
      case 'Social':
        return <Users className="h-4 w-4 text-blue-600" />;
      case 'Governance':
        return <Shield className="h-4 w-4 text-purple-600" />;
    }
  };

  const getCategoryColor = (category: ESGIssue['category']) => {
    switch (category) {
      case 'Environmental': return 'border-green-200 bg-green-50';
      case 'Social': return 'border-blue-200 bg-blue-50';
      case 'Governance': return 'border-purple-200 bg-purple-50';
    }
  };

  const getPositionStyle = (businessImpact: number, stakeholderConcern: number) => {
    // 10x10 그리드에서의 위치 계산 (1-10 스케일)
    const left = `${(businessImpact - 1) * 10}%`;
    const bottom = `${(stakeholderConcern - 1) * 10}%`;
    return { left, bottom };
  };

  const getQuadrantInfo = (businessImpact: number, stakeholderConcern: number) => {
    if (businessImpact >= 6 && stakeholderConcern >= 6) {
      return { label: '핵심 이슈', color: 'bg-red-100 border-red-300' };
    } else if (businessImpact >= 6 && stakeholderConcern < 6) {
      return { label: '사업 영향', color: 'bg-orange-100 border-orange-300' };
    } else if (businessImpact < 6 && stakeholderConcern >= 6) {
      return { label: '사회적 관심', color: 'bg-yellow-100 border-yellow-300' };
    } else {
      return { label: '일반 이슈', color: 'bg-gray-100 border-gray-300' };
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          ESG 이슈 매트릭스 
          {selectedCompany && (
            <span className="text-base font-normal text-muted-foreground ml-2">
              - {selectedCompany}
            </span>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {issues.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            {selectedCompany ? '선택된 기업의 ESG 이슈가 없습니다.' : '기업을 선택해주세요.'}
          </div>
        ) : (
          <div className="space-y-6">
            {/* Double Material Matrix */}
            <div className="relative bg-white border rounded-lg p-4" style={{ height: '400px' }}>
              {/* 배경 그리드 */}
              <div className="absolute inset-4 border-l border-b border-gray-300">
                {/* 수직 그리드 라인 */}
                {[...Array(9)].map((_, i) => (
                  <div
                    key={`v-${i}`}
                    className="absolute top-0 bottom-0 border-l border-gray-100"
                    style={{ left: `${(i + 1) * 10}%` }}
                  />
                ))}
                {/* 수평 그리드 라인 */}
                {[...Array(9)].map((_, i) => (
                  <div
                    key={`h-${i}`}
                    className="absolute left-0 right-0 border-b border-gray-100"
                    style={{ bottom: `${(i + 1) * 10}%` }}
                  />
                ))}

                {/* 중앙 구분선 */}
                <div className="absolute top-0 bottom-0 border-l-2 border-gray-400" style={{ left: '50%' }} />
                <div className="absolute left-0 right-0 border-b-2 border-gray-400" style={{ bottom: '50%' }} />

                {/* 이슈 포인트들 */}
                {issues.map((issue) => {
                  const position = getPositionStyle(issue.businessImpact, issue.stakeholderConcern);
                  const quadrant = getQuadrantInfo(issue.businessImpact, issue.stakeholderConcern);
                  
                  return (
                    <div
                      key={issue.id}
                      className={`absolute w-4 h-4 rounded-full border-2 cursor-pointer transition-all hover:scale-125 ${getCategoryColor(issue.category)} ${quadrant.color}`}
                      style={position}
                      title={`${issue.title} (${issue.businessImpact}, ${issue.stakeholderConcern})`}
                    >
                      <div className="absolute -top-1 -left-1 w-6 h-6 flex items-center justify-center">
                        {getCategoryIcon(issue.category)}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* 축 레이블 */}
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-6 text-sm font-medium">
                사업 영향도 →
              </div>
              <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-8 -rotate-90 text-sm font-medium">
                이해관계자 관심도 →
              </div>

              {/* 사분면 레이블 */}
              <div className="absolute top-2 left-2 text-xs text-gray-500">사회적 관심</div>
              <div className="absolute top-2 right-2 text-xs text-gray-500">핵심 이슈</div>
              <div className="absolute bottom-2 left-2 text-xs text-gray-500">일반 이슈</div>
              <div className="absolute bottom-2 right-2 text-xs text-gray-500">사업 영향</div>
            </div>

            {/* 이슈 목록 */}
            <div className="space-y-3">
              <h4 className="font-medium">이슈 상세 목록</h4>
              {issues.map((issue) => (
                <div key={issue.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    {getCategoryIcon(issue.category)}
                    <div>
                      <p className="font-medium">{issue.title}</p>
                      <p className="text-sm text-muted-foreground">
                        사업영향도: {issue.businessImpact}/10, 이해관계자관심도: {issue.stakeholderConcern}/10
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge className={getPriorityColor(issue.priority)} variant="secondary">
                      {issue.priority === 'high' && '높음'}
                      {issue.priority === 'medium' && '보통'}
                      {issue.priority === 'low' && '낮음'}
                    </Badge>
                    <Badge variant="outline">
                      {issue.status === 'identified' && '식별됨'}
                      {issue.status === 'analyzing' && '분석중'}
                      {issue.status === 'responding' && '대응중'}
                      {issue.status === 'resolved' && '해결됨'}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>

            {/* 범례 */}
            <div className="flex items-center space-x-6 text-sm">
              <div className="flex items-center space-x-2">
                <Leaf className="h-4 w-4 text-green-600" />
                <span>Environmental</span>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="h-4 w-4 text-blue-600" />
                <span>Social</span>
              </div>
              <div className="flex items-center space-x-2">
                <Shield className="h-4 w-4 text-purple-600" />
                <span>Governance</span>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
} 