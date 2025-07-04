// ESG 이슈 Double Material Matrix 위젯

'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/Card';
import { Badge } from '@/shared/ui/Badge';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/shared/ui/Tooltip";
import { ESGIssue } from '@/shared/lib/mocks/dashboard-mock-data';
import { getPriorityColor } from '@/shared/lib/ui-helpers';
import { Leaf, Users, Shield } from 'lucide-react';
import {
  getCategoryIcon,
  getCategoryColor,
  getPositionStyle,
  getQuadrantInfo,
} from './lib/utils';

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
            <div className="flex-1 p-4 border rounded-lg relative h-80 w-80 bg-gray-50">
              {/* Quadrant Labels */}
              <div className="absolute top-2 left-2 text-xs text-muted-foreground">중요도 낮음</div>
              <div className="absolute bottom-2 right-2 text-xs text-muted-foreground">중요도 높음</div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[calc(100%-1rem)] h-[calc(100%-1rem)] grid grid-cols-2 grid-rows-2 gap-1">
                <div className="flex items-center justify-center text-sm font-medium rounded-tl-lg bg-yellow-100/50 text-yellow-800">중점</div>
                <div className="flex items-center justify-center text-sm font-medium rounded-tr-lg bg-red-100/50 text-red-800">핵심</div>
                <div className="flex items-center justify-center text-sm font-medium rounded-bl-lg bg-green-100/50 text-green-800">모니터링</div>
                <div className="flex items-center justify-center text-sm font-medium rounded-br-lg bg-orange-100/50 text-orange-800">전략</div>
              </div>
              
              {/* Issues */}
              {issues.map((issue) => (
                <div
                  key={issue.id}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 group"
                  style={getPositionStyle(issue.businessImpact, issue.stakeholderConcern)}
                >
                  <div className={`h-5 w-5 rounded-full flex items-center justify-center cursor-pointer ${getCategoryColor(issue.category)} border-2 ${getQuadrantInfo(issue.businessImpact, issue.stakeholderConcern).color}`}>
                    {getCategoryIcon(issue.category)}
                  </div>
                  <div className="hidden group-hover:block absolute bottom-full left-1/2 -translate-x-1/2 mb-2 p-2 text-xs bg-gray-800 text-white rounded-md w-max z-10">
                    {issue.title}
                  </div>
                </div>
              ))}
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