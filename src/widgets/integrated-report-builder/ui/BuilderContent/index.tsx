import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/ui/Card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/ui/Tabs";
import { Badge } from "@/shared/ui/Badge";
import { TrendingUp,Layers} from "lucide-react";
import { INTEGRATED_SECTIONS } from '@/entities/report/model/constants';
import { ReportSectionIcon } from '@/entities/report/ui/ReportSectionIcon';

interface BuilderContentProps {
  selectedSection: string;
  selectedSubsection: string;
  responses: Record<string, string>;
  onResponseChange: (subsectionId: string, value: string) => void;
}

const getFrameworkBadges = (frameworks: string[]) => {
  const colors = {
    'GRI': 'bg-green-100 text-green-800',
    'SASB': 'bg-blue-100 text-blue-800',
    'TCFD': 'bg-purple-100 text-purple-800'
  };
  return frameworks.map(framework => (
    <Badge key={framework} variant="outline" className={colors[framework as keyof typeof colors]}>
      {framework}
    </Badge>
  ));
};

export function BuilderContent({ selectedSection, selectedSubsection, responses, onResponseChange }: BuilderContentProps) {
  const currentSection = INTEGRATED_SECTIONS[selectedSection as keyof typeof INTEGRATED_SECTIONS];
  const currentSubsection = currentSection?.subsections.find(s => s.id === selectedSubsection);
  return (
    <div className="h-full flex flex-col">
      <Tabs defaultValue="content" className="h-full flex flex-col">
        <div className="px-6 pt-4 border-b">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="content">내용 작성</TabsTrigger>
            <TabsTrigger value="preview">보고서 미리보기</TabsTrigger>
          </TabsList>
        </div>
        
        <TabsContent value="content" className="flex-1 overflow-y-auto p-6 mt-0">
          {currentSubsection ? (
            <div className="space-y-6">
              <div className="text-center p-6 bg-gradient-to-r from-orange-50 to-red-50 rounded-lg">
                <div className="flex items-center justify-center gap-3 mb-4">
                  <div className={`p-3 rounded-lg ${currentSection.color.replace('text-', 'bg-').replace('-800', '-200')}`}>
                    <ReportSectionIcon iconName={currentSection.iconName} className="h-6 w-6" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">{currentSection.name}</h2>
                    <p className="text-muted-foreground">{currentSubsection.name}</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
                  {currentSubsection.description}
                </p>
                <div className="flex justify-center gap-2 mt-4">
                  {getFrameworkBadges(currentSection.frameworks)}
                  <Badge variant="outline">
                    {currentSubsection.framework}
                  </Badge>
                </div>
              </div>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    작성 가이드라인
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <h5 className="font-medium text-sm mb-2">📋 포함해야 할 내용:</h5>
                      <ul className="text-sm space-y-1">
                        <li>• 현재 상황 및 접근 방식</li>
                        <li>• 구체적인 데이터 및 지표</li>
                        <li>• 관련 정책 및 프로세스</li>
                        <li>• 향후 목표 및 계획</li>
                      </ul>
                    </div>
                    <div className="p-3 bg-green-50 rounded-lg">
                      <h5 className="font-medium text-sm mb-2">🎯 품질 기준:</h5>
                      <ul className="text-sm space-y-1">
                        <li>• 정확성: 검증 가능한 데이터 제공</li>
                        <li>• 완전성: 중요한 정보 누락 없음</li>
                        <li>• 균형성: 긍정적/부정적 측면 모두 포함</li>
                        <li>• 명확성: 이해관계자가 쉽게 이해 가능</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>내용 작성</CardTitle>
                  <CardDescription>
                    {currentSubsection.framework} 기준에 따라 {currentSubsection.name}에 대한 정보를 작성해주세요.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <textarea
                    className="w-full p-4 border rounded-md min-h-[350px] resize-y"
                    placeholder={`${currentSubsection.name}에 대한 상세한 정보를 작성해주세요...\n\n예시 구조:\n1. 개요 및 배경\n2. 현재 상황 분석\n3. 주요 성과 및 지표\n4. 도전과제 및 개선사항\n5. 향후 계획 및 목표\n\n※ ${currentSubsection.framework} 기준을 참고하여 작성하세요.`}
                    value={responses[currentSubsection.id] || ''}
                    onChange={(e) => onResponseChange(currentSubsection.id, e.target.value)}
                  />
                  {responses[currentSubsection.id] && (
                    <div className="flex items-center gap-2 mt-3">
                      <div className="w-2 h-2 bg-green-600 rounded-full" />
                      <span className="text-xs text-green-600">
                        자동 저장됨 ({new Date().toLocaleTimeString()})
                      </span>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          ) : (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <Layers className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">항목을 선택하세요</h3>
                <p className="text-muted-foreground">
                  왼쪽에서 보고서 섹션과 세부 항목을 선택하여 시작하세요.
                </p>
              </div>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="preview" className="flex-1 overflow-y-auto p-6 mt-0">
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-2">통합 ESG 지속가능성 보고서</h2>
              <p className="text-muted-foreground">
                GRI Standards + SASB Standards + TCFD Framework
              </p>
              <div className="flex justify-center gap-2 mt-4">
                {getFrameworkBadges(['GRI', 'SASB', 'TCFD'])}
              </div>
            </div>
            
            {Object.values(INTEGRATED_SECTIONS).map((section) => (
              <Card key={section.id}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${section.color.replace('text-', 'bg-').replace('-800', '-200')}`}>
                      <ReportSectionIcon iconName={section.iconName} className="h-5 w-5" />
                    </div>
                    {section.name}
                  </CardTitle>
                  <CardDescription>{section.description}</CardDescription>
                  <div className="flex gap-2">
                    {getFrameworkBadges(section.frameworks)}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {section.subsections.map((subsection) => (
                      <div key={subsection.id} className="border-l-4 border-blue-200 pl-4">
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="font-medium">{subsection.name}</h4>
                          <Badge variant="outline" className="text-xs">
                            {subsection.framework}
                          </Badge>
                        </div>
                        {responses[subsection.id] ? (
                          <div className="whitespace-pre-wrap text-sm">{responses[subsection.id]}</div>
                        ) : (
                          <div className="text-muted-foreground italic text-sm">내용 입력 필요</div>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
} 