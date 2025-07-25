// ESG 이슈 Double Material Matrix 위젯 - 인터랙티브 분석 워크스페이스

'use client';

import React, { useState, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/Card';
import { Badge } from '@/shared/ui/Badge';
import { Button } from '@/shared/ui/Button';
import { ScrollArea } from '@/shared/ui/ScrollArea';
import { 
  Filter,
  ArrowLeft,
  Calendar
} from 'lucide-react';
import { ESGIssue } from '@/shared/lib/mocks/dashboard-mock-data';
import {
  getCategoryIcon,
  getCategoryColor,
} from './lib/utils';

interface ESGIssuesMatrixProps {
  issues: ESGIssue[];
  isLoading?: boolean;
  selectedCompany?: string;
  onIssueSelect?: (issue: ESGIssue) => void;
  onThresholdChange?: (financialThreshold: number, impactThreshold: number) => void;
  onConfirmMaterialIssues?: (materialIssues: ESGIssue[]) => void;
}

type FilterType = 'all' | 'Environmental' | 'Social' | 'Governance';

// 카테고리별 색상 정의
const getCategoryBackground = (category: string): string => {
  switch (category) {
    case 'Environmental':
      return 'bg-green-500';
    case 'Social':
      return 'bg-blue-500';
    case 'Governance':
      return 'bg-purple-500';
    default:
      return 'bg-gray-500';
  }
};

const getCategoryBorder = (category: string): string => {
  switch (category) {
    case 'Environmental':
      return 'border-green-600';
    case 'Social':
      return 'border-blue-600';
    case 'Governance':
      return 'border-purple-600';
    default:
      return 'border-gray-600';
  }
};

// 번호를 원형 번호로 변환 (①②③...)
const getCircledNumber = (index: number): string => {
  const circledNumbers = ['①', '②', '③', '④', '⑤', '⑥', '⑦', '⑧', '⑨', '⑩', 
                         '⑪', '⑫', '⑬', '⑭', '⑮', '⑯', '⑰', '⑱', '⑲', '⑳'];
  return circledNumbers[index] || `${index + 1}`;
};

// 위치 계산 함수 (businessImpact, stakeholderConcern 사용)
const getMatrixPosition = (businessImpact: number, stakeholderConcern: number) => ({
  left: `${businessImpact * 10}%`, // 1-10 스케일을 0-100%로 변환
  top: `${100 - (stakeholderConcern * 10)}%`, // Y축은 반전 (위가 높은 값)
});

export function ESGIssuesMatrix({
  issues,
  isLoading = false,
  selectedCompany,
  onIssueSelect,
  onConfirmMaterialIssues
}: ESGIssuesMatrixProps) {
  const [categoryFilter, setCategoryFilter] = useState<FilterType>('all');
  const [selectedIssue, setSelectedIssue] = useState<ESGIssue | null>(null);
  const [hoveredIssue, setHoveredIssue] = useState<ESGIssue | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // 필터링된 이슈들
  const filteredIssues = issues.filter(issue => 
    categoryFilter === 'all' || issue.category === categoryFilter
  );

  // 중대 이슈 (5점 이상, 50% 기준)
  const materialIssues = filteredIssues.filter(issue => 
    issue.businessImpact >= 5 && issue.stakeholderConcern >= 5
  );

  const handleIssueClick = useCallback((issue: ESGIssue) => {
    setSelectedIssue(issue);
    onIssueSelect?.(issue);
  }, [onIssueSelect]);

  const handleIssueHover = useCallback((issue: ESGIssue | null, event?: React.MouseEvent) => {
    setHoveredIssue(issue);
    if (event && issue) {
      const rect = event.currentTarget.getBoundingClientRect();
      setMousePosition({
        x: event.clientX - rect.left,
        y: event.clientY - rect.top
      });
    }
  }, []);

  const handleBackToList = () => {
    setSelectedIssue(null);
  };

  if (isLoading) {
    return (
      <Card className="w-full">
        <CardContent className="p-6">
          <div className="animate-pulse flex space-x-4">
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="h-64 bg-gray-200 rounded"></div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="w-full space-y-4">
      {/* 헤더 및 필터 */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">ESG 이중중대성 매트릭스</h3>
          {selectedCompany && (
            <p className="text-sm text-gray-600 mt-1">{selectedCompany}</p>
          )}
        </div>
        
        {/* 카테고리 필터 */}
        <div className="flex items-center space-x-2">
          <Filter className="h-4 w-4 text-gray-500" />
          <div className="flex space-x-1">
            {(['all', 'Environmental', 'Social', 'Governance'] as FilterType[]).map((filter) => (
              <Button
                key={filter}
                variant={categoryFilter === filter ? "default" : "outline"}
                size="sm"
                onClick={() => setCategoryFilter(filter)}
                className="text-xs"
              >
                {filter === 'all' ? '전체' : 
                 filter === 'Environmental' ? 'E' :
                 filter === 'Social' ? 'S' : 'G'}
              </Button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* 매트릭스 (2/3 너비) */}
        <div className="col-span-2">
          <Card>
            <CardContent className="p-6">
              <div className="relative">
                {/* 매트릭스 차트 */}
                <div 
                  className="relative w-full h-96 border border-gray-200 rounded-lg bg-white overflow-hidden"
                  style={{ aspectRatio: '1' }}
                >
                  {/* 축 레이블 */}
                  <div className="absolute -left-4 top-1/2 transform -rotate-90 -translate-y-1/2 text-sm font-medium text-gray-700">
                    사회/환경적 영향
                  </div>
                  <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 text-sm font-medium text-gray-700">
                    재무적 영향
                  </div>

                  {/* 50% 기준선 (고정) */}
                  <div 
                    className="absolute border-dashed border-gray-400"
                    style={{
                      left: '50%',
                      top: '0',
                      bottom: '0',
                      borderLeftWidth: '1px'
                    }}
                  />
                  <div 
                    className="absolute border-dashed border-gray-400"
                    style={{
                      top: '50%',
                      left: '0',
                      right: '0',
                      borderTopWidth: '1px'
                    }}
                  />

                  {/* 사분면 레이블 */}
                  <div className="absolute top-2 left-2 text-xs text-gray-500 bg-white px-1 rounded">
                    높은 영향<br/>낮은 재무성
                  </div>
                  <div className="absolute top-2 right-2 text-xs text-gray-500 bg-white px-1 rounded">
                    높은 영향<br/>높은 재무성
                  </div>
                  <div className="absolute bottom-2 left-2 text-xs text-gray-500 bg-white px-1 rounded">
                    낮은 영향<br/>낮은 재무성
                  </div>
                  <div className="absolute bottom-2 right-2 text-xs text-gray-500 bg-white px-1 rounded">
                    낮은 영향<br/>높은 재무성
                  </div>

                  {/* 데이터 포인트 (번호 원형) */}
                  {filteredIssues.map((issue, index) => {
                    const position = getMatrixPosition(issue.businessImpact, issue.stakeholderConcern);
                    const isFiltered = categoryFilter !== 'all' && issue.category !== categoryFilter;
                    
                    return (
                      <div
                        key={issue.id}
                        className={`absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-200 ${
                          isFiltered ? 'opacity-30' : 'opacity-100'
                        } hover:scale-110`}
                        style={{ 
                          left: position.left, 
                          top: position.top 
                        }}
                        onClick={() => handleIssueClick(issue)}
                        onMouseEnter={(e) => handleIssueHover(issue, e)}
                        onMouseLeave={() => handleIssueHover(null)}
                      >
                        <div
                          className={`
                            w-8 h-8 rounded-full border-2 flex items-center justify-center text-white text-sm font-bold
                            ${getCategoryBackground(issue.category)} ${getCategoryBorder(issue.category)}
                            hover:shadow-lg transition-shadow
                          `}
                        >
                          {getCircledNumber(index)}
                        </div>
                      </div>
                    );
                  })}

                  {/* 툴팁 */}
                  {hoveredIssue && (
                    <div
                      className="absolute z-10 bg-gray-900 text-white text-xs rounded px-2 py-1 pointer-events-none max-w-48"
                      style={{
                        left: Math.min(mousePosition.x + 10, 300), // 차트 영역 내 제한
                        top: Math.max(mousePosition.y - 30, 10),   // 차트 영역 내 제한
                      }}
                    >
                      {hoveredIssue.title}
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 범례/상세 패널 (1/3 너비) */}
        <div className="col-span-1">
          <Card className="h-fit">
            <CardHeader className="pb-3">
              {selectedIssue ? (
                <div className="flex items-center space-x-2">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={handleBackToList}
                    className="p-1"
                  >
                    <ArrowLeft className="h-4 w-4" />
                  </Button>
                  <CardTitle className="text-lg">이슈 상세</CardTitle>
                </div>
              ) : (
                <CardTitle className="text-lg">이슈 목록 ({filteredIssues.length}개)</CardTitle>
              )}
            </CardHeader>
            <CardContent className="p-4">
              {selectedIssue ? (
                /* 상세 정보 뷰 */
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center space-x-2 mb-2">
                      <div
                        className={`w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold ${getCategoryBackground(selectedIssue.category)}`}
                      >
                        {getCircledNumber(filteredIssues.findIndex(i => i.id === selectedIssue.id))}
                      </div>
                      {getCategoryIcon(selectedIssue.category)}
                      <Badge variant="outline" className={getCategoryColor(selectedIssue.category)}>
                        {selectedIssue.category}
                      </Badge>
                    </div>
                    <h4 className="font-semibold text-sm mb-2">{selectedIssue.title}</h4>
                    <p className="text-xs text-gray-600 mb-3">
                      {selectedIssue.category} 카테고리 이슈
                    </p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-600">재무적 영향:</span>
                      <span className="font-medium">{selectedIssue.businessImpact}/10</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-600">이해관계자 관심:</span>
                      <span className="font-medium">{selectedIssue.stakeholderConcern}/10</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-600">우선순위:</span>
                      <Badge 
                        variant="outline" 
                        className={`text-xs ${
                          selectedIssue.priority === 'high' ? 'border-red-200 text-red-700' :
                          selectedIssue.priority === 'medium' ? 'border-yellow-200 text-yellow-700' :
                          'border-gray-200 text-gray-700'
                        }`}
                      >
                        {selectedIssue.priority === 'high' ? '높음' :
                         selectedIssue.priority === 'medium' ? '보통' : '낮음'}
                      </Badge>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-600">상태:</span>
                      <Badge variant="outline" className="text-xs">
                        {selectedIssue.status === 'identified' ? '식별됨' :
                         selectedIssue.status === 'analyzing' ? '분석중' :
                         selectedIssue.status === 'responding' ? '대응중' : '해결됨'}
                      </Badge>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 text-xs text-gray-600 pt-2 border-t">
                    <Calendar className="h-3 w-3" />
                    <span>카테고리: {selectedIssue.category}</span>
                  </div>
                </div>
              ) : (
                /* 범례 목록 뷰 */
                <div className="space-y-3">
                  <ScrollArea className="h-80">
                    <div className="space-y-2">
                      {filteredIssues.map((issue, index) => {
                        const isFiltered = categoryFilter !== 'all' && issue.category !== categoryFilter;
                        return (
                          <div
                            key={issue.id}
                            className={`
                              flex items-center space-x-3 p-2 rounded-lg border cursor-pointer transition-all
                              ${isFiltered ? 'opacity-50' : 'opacity-100'}
                              hover:bg-gray-50 hover:border-gray-300
                            `}
                            onClick={() => handleIssueClick(issue)}
                          >
                            <div
                              className={`w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0 ${getCategoryBackground(issue.category)}`}
                            >
                              {getCircledNumber(index)}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center space-x-2">
                                {getCategoryIcon(issue.category)}
                                <span className="text-xs font-medium truncate">{issue.title}</span>
                              </div>
                              <div className="text-xs text-gray-500 mt-1">
                                재무: {issue.businessImpact}/10 / 관심도: {issue.stakeholderConcern}/10
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </ScrollArea>

                  {/* 중대 이슈 확정 버튼 */}
                  {materialIssues.length > 0 && (
                    <div className="pt-3 border-t">
                      <div className="text-xs text-gray-600 mb-2">
                        중대 이슈: {materialIssues.length}개
                      </div>
                      <Button 
                        className="w-full text-xs" 
                        size="sm"
                        onClick={() => onConfirmMaterialIssues?.(materialIssues)}
                      >
                        중대 이슈 확정
                      </Button>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
} 