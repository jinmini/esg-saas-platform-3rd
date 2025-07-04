 'use client';

import React, { useState } from 'react';
import { mockGriData } from '@/shared/lib/mocks/gri-mock-data';
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/Card";
import { Badge } from "@/shared/ui/Badge";
import { Progress } from "@/shared/ui/Progress";
import { CheckCircle2, FileDown, Loader2 } from "lucide-react";
import { Button } from '@/shared/ui/Button';
import { GRIResponse, GRIEntry } from '@/shared/types/gri';
import { identifyESGCategorySync } from '@/features/esg-report-assistant';
import KoreanEsgReportTemplate from '@/features/esg-report-assistant/templates/korean-esg-report-template';
import { getESGBadgeStyle } from '../../lib/utils';

interface ReportPreviewProps {
  responses: Record<string, GRIResponse>;
}

export default function ReportPreview({ responses }: ReportPreviewProps) {
  const [isExporting, setIsExporting] = useState(false);

  // 전체 진행률 계산
  const getTotalProgress = () => {
    const totalRequirements = Object.values(mockGriData).reduce((acc, category) => {
      return acc + Object.values(category).reduce((categoryAcc, disclosure) => {
        return categoryAcc + Object.keys(disclosure.requirements).length;
      }, 0);
    }, 0);

    const completedRequirements = Object.keys(responses).filter(key => responses[key]?.content?.trim()).length;

    return {
      total: totalRequirements,
      completed: completedRequirements,
      percentage: totalRequirements > 0 ? Math.round((completedRequirements / totalRequirements) * 100) : 0
    };
  };



  // 완료된 공시사항 가져오기
  const getCompletedDisclosures = () => {
    const completed: Array<{
      key: string;
      disclosure: { code: string; title: string; description: string; requirements?: string };
      response: GRIResponse;
      esgCategory: 'E' | 'S' | 'G' | 'unknown';
    }> = [];

    Object.entries(mockGriData).forEach(([, categoryData]) => {
      Object.entries(categoryData).forEach(([disclosureId, disclosure]) => {
        Object.keys(disclosure.requirements).forEach(reqId => {
          const response = responses[reqId];
          if (response?.content?.trim()) {
            completed.push({
              key: reqId,
              disclosure: {
                code: disclosureId,
                title: disclosure.title,
                description: disclosure.description,
                requirements: disclosure.requirements[reqId].requirement
              },
              response,
              esgCategory: identifyESGCategorySync(response.content + disclosure.title)
            });
          }
        });
      });
    });

    return completed;
  };

  // 미완료 공시사항 가져오기
  const getIncompleteDisclosures = () => {
    const incomplete: Array<{
      key: string;
      disclosure: { code: string; title: string; description: string };
    }> = [];

    Object.entries(mockGriData).forEach(([, categoryData]) => {
      Object.entries(categoryData).forEach(([disclosureId, disclosure]) => {
        const hasIncompleteRequirements = Object.keys(disclosure.requirements).some(reqId => 
          !responses[reqId]?.content?.trim()
        );
        
        if (hasIncompleteRequirements) {
          incomplete.push({
            key: disclosureId,
            disclosure: {
              code: disclosureId,
              title: disclosure.title,
              description: disclosure.description
            }
          });
        }
      });
    });

    return incomplete;
  };

  // PDF 내보내기 함수
  const exportToPDF = async () => {
    setIsExporting(true);
    
    try {
      // html2pdf 동적 import
      const html2pdf = (await import('html2pdf.js')).default;
      
      // PDF 생성할 요소를 숨겨진 템플릿으로 변경
      const element = document.getElementById('pdf-export-container');
      if (!element) {
        throw new Error('PDF 생성용 보고서 템플릿을 찾을 수 없습니다.');
      }

      // PDF 옵션 설정
      const opt = {
        margin: 0,
        filename: `지속가능경영보고서-${new Date().toISOString().split('T')[0]}.pdf`,
        image: { type: 'jpeg' as const, quality: 0.98 },
        html2canvas: { 
          scale: 2,
          useCORS: true,
          letterRendering: true,
        },
        jsPDF: { 
          unit: 'mm' as const, 
          format: 'a4' as const, 
          orientation: 'portrait' as const
        },
        pagebreak: { mode: ['css', 'legacy'], after: '.page-break-after' }
      };

      // PDF 생성 및 다운로드
      await html2pdf().set(opt).from(element).save();
      
    } catch (error) {
      console.error('PDF 생성 중 오류:', error);
      alert('PDF 생성 중 오류가 발생했습니다. 다시 시도해주세요.');
    } finally {
      setIsExporting(false);
    }
  };

  const totalProgress = getTotalProgress();
  const completedDisclosures = getCompletedDisclosures();
  const incompleteDisclosures = getIncompleteDisclosures();

  const reportEntriesForPdf: GRIEntry[] = completedDisclosures.map(item => ({
    standard: {
      code: item.disclosure.code,
      title: item.disclosure.title,
    },
    content: item.response.content || '',
  }));

  return (
    <div className="space-y-6">
       {/* 숨겨진 PDF 템플릿 */}
       <div className="hidden" aria-hidden="true">
        <div id="pdf-export-container">
          <KoreanEsgReportTemplate
            reportData={reportEntriesForPdf}
            companyName="한국중부발전 (샘플)"
          />
        </div>
      </div>

      {/* 헤더 및 PDF 내보내기 버튼 */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">GRI 보고서 미리보기</h2>
          <p className="text-sm text-gray-600 mt-1">
            {new Date().toLocaleDateString('ko-KR', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </p>
        </div>
        
        <Button 
          onClick={exportToPDF}
          disabled={isExporting || totalProgress.completed === 0}
          className="bg-blue-600 hover:bg-blue-700"
        >
          {isExporting ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              PDF 생성 중...
            </>
          ) : (
            <>
              <FileDown className="w-4 h-4 mr-2" />
              PDF 내보내기
            </>
          )}
        </Button>
      </div>

      {/* 보고서 내용 (PDF로 변환될 영역) */}
      <div id="report-content" className="bg-white">
        {/* 보고서 정보 카드 */}
        <Card className="mb-6">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl">GRI Standards 지속가능성 보고서</CardTitle>
              <Badge variant={totalProgress.completed > 0 ? "default" : "secondary"}>
                {totalProgress.completed > 0 ? "진행 중" : "작성 전"}
              </Badge>
            </div>
            <div className="text-sm text-gray-600">
              생성일: {new Date().toLocaleDateString('ko-KR')}
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <Card className="border-l-4 border-l-blue-500">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-gray-600">전체 진행률</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-blue-600 mb-2">
                      {totalProgress.percentage}%
                    </div>
                    <Progress value={totalProgress.percentage} className="mb-2" />
                    <p className="text-xs text-gray-500">
                      {totalProgress.completed} / {totalProgress.total} 항목 완료
                    </p>
                  </CardContent>
                </Card>

                {/* ESG 카테고리별 진행률 */}
                <Card className="border-l-4 border-l-green-500">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-gray-600">환경(E) 진행률</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-green-600 mb-2">
                      {Math.round((completedDisclosures.filter(d => d.esgCategory === 'E').length / Math.max(1, completedDisclosures.length)) * 100)}%
                    </div>
                    <p className="text-xs text-gray-500">
                      {completedDisclosures.filter(d => d.esgCategory === 'E').length}건 완료
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-l-purple-500">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-gray-600">사회(S) & 지배구조(G)</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-purple-600 mb-2">
                      {Math.round(((completedDisclosures.filter(d => d.esgCategory === 'S').length + completedDisclosures.filter(d => d.esgCategory === 'G').length) / Math.max(1, completedDisclosures.length)) * 100)}%
                    </div>
                    <p className="text-xs text-gray-500">
                      S: {completedDisclosures.filter(d => d.esgCategory === 'S').length}건, G: {completedDisclosures.filter(d => d.esgCategory === 'G').length}건
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 완료된 공시사항 */}
        {completedDisclosures.length > 0 && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-600" />
                완료된 공시사항 ({completedDisclosures.length}건)
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {completedDisclosures.map((item) => {
                const badgeStyle = getESGBadgeStyle(item.esgCategory);
                return (
                  <div key={item.key} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Badge className={`${badgeStyle.className} border`}>
                          {badgeStyle.icon} {badgeStyle.label}
                        </Badge>
                        <code className="text-xs bg-gray-100 px-2 py-1 rounded">{item.disclosure.code}</code>
                      </div>
                      <div className="text-xs text-gray-500">
                        {new Date().toLocaleDateString('ko-KR')}
                      </div>
                    </div>
                    <h4 className="font-medium text-gray-900 mb-1">{item.disclosure.title}</h4>
                    <p className="text-sm text-gray-600 mb-2">{item.disclosure.requirements}</p>
                    <div className="bg-blue-50 border-l-4 border-blue-200 p-3 rounded-r">
                      <p className="text-sm text-gray-700 whitespace-pre-wrap">{item.response.content}</p>
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>
        )}

        {/* 미완료 항목 */}
        {incompleteDisclosures.length > 0 && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-lg">미완료 항목</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {incompleteDisclosures.map((disclosure) => (
                  <div key={disclosure.key} className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                    <div>
                      <div className="font-medium text-gray-900">
                        {disclosure.disclosure.code}: {disclosure.disclosure.title}
                      </div>
                      <div className="text-sm text-gray-600">
                        {disclosure.disclosure.description}
                      </div>
                    </div>
                    <Badge variant="outline" className="text-yellow-700 border-yellow-300">
                      미작성
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* 빈 상태 */}
        {totalProgress.completed === 0 && (
          <Card>
            <CardContent className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <FileDown className="w-16 h-16 mx-auto mb-4" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                아직 작성된 내용이 없습니다
              </h3>
              <p className="text-gray-600 mb-6">
                좌측의 GRI 지표를 선택하여 보고서 작성을 시작해보세요.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
} 