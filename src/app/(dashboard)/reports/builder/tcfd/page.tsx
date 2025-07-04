'use client';

export const dynamic = 'force-dynamic';

import React, { useState, useEffect } from 'react';
import { Button } from "@/shared/ui/Button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/ui/Card";
import { Progress } from "@/shared/ui/Progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/ui/Tabs";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/shared/ui/Resizable";
import { 
  ArrowLeft, 
  Leaf, 
  Save, 
  Eye, 
  Download,
  Target
} from "lucide-react";
import { useRouter } from 'next/navigation';
import { useAutoSave } from "@/hooks/useAutoSave";
import { ReportStorageService } from "@/shared/lib/storage/report-storage";
import { TCFD_PILLARS } from "@/widgets/tcfd-report-builder/lib";
import { 
  PillarSelector
} from "@/widgets/tcfd-report-builder/ui";

export default function TCFDBuilderPage() {
  const router = useRouter();
  const [selectedPillar, setSelectedPillar] = useState<string>('governance');
  const [selectedRecommendation, setSelectedRecommendation] = useState<string>('gov-a');
  const [responses, setResponses] = useState<Record<string, string>>({});
  const [progress, setProgress] = useState(5);
  const [isLoading, setIsLoading] = useState(true);

  // 자동 저장 기능
  const { isSaving, lastSaved, getSyncStatus } = useAutoSave('tcfd-report', responses, {
    framework: 'tcfd',
    enabled: true,
    debounceMs: 2000,
    onSaveSuccess: () => {
      console.log('✅ TCFD 보고서가 저장되었습니다.', new Date().toLocaleTimeString());
    },
    onSaveError: (error) => {
      console.error('❌ TCFD 보고서 저장 실패:', error);
    }
  });

  // 페이지 로딩 시 IndexedDB에서 데이터 불러오기
  useEffect(() => {
    async function loadSavedData() {
      try {
        setIsLoading(true);
        const storageService = ReportStorageService.getInstance();
        const savedData = await storageService.getReport('tcfd-report');
        
        if (savedData) {
          setResponses(savedData);
          console.log('📄 저장된 TCFD 보고서를 불러왔습니다.');
        }
      } catch (error) {
        console.error('❌ TCFD 보고서 불러오기 실패:', error);
        setResponses({});
      } finally {
        setIsLoading(false);
      }
    }

    loadSavedData();
  }, []);

  // 진행률 계산
  useEffect(() => {
    const totalRecommendations = Object.values(TCFD_PILLARS).reduce((acc, pillar) => acc + pillar.recommendations.length, 0);
    const completedRecommendations = Object.keys(responses).filter(key => responses[key]?.trim().length > 0).length;
    setProgress(Math.round((completedRecommendations / totalRecommendations) * 100));
  }, [responses]);

  const handleResponseChange = (recommendationId: string, value: string) => {
    setResponses(prev => ({ ...prev, [recommendationId]: value }));
  };

  const currentPillar = TCFD_PILLARS[selectedPillar as keyof typeof TCFD_PILLARS];
  const currentRecommendation = currentPillar?.recommendations.find(r => r.id === selectedRecommendation);

  // 로딩 상태 표시
  if (isLoading) {
    return (
      <div className="h-screen w-full flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-sm text-gray-600">TCFD 보고서를 불러오는 중...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen w-full flex flex-col">
      {/* Header */}
      <header className="p-4 border-b bg-gradient-to-r from-green-50 to-blue-50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => router.push('/reports/builder')}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              프레임워크 선택
            </Button>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <Leaf className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <h1 className="text-xl font-bold">TCFD 기후 정보공개</h1>
                <p className="text-sm text-muted-foreground">기후변화 관련 재무정보 공시 권고안</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {isSaving && (
              <div className="flex items-center gap-1 text-green-600 mr-2">
                <div className="animate-spin h-3 w-3 border border-green-600 border-t-transparent rounded-full"></div>
                <span className="text-xs">저장 중...</span>
              </div>
            )}
            {lastSaved && (
              <span className="text-xs text-gray-500 mr-2">
                마지막 저장: {lastSaved.toLocaleTimeString()}
              </span>
            )}
            <div className={`h-2 w-2 rounded-full mr-2 ${
              getSyncStatus() === 'synced' ? 'bg-green-500' : 
              getSyncStatus() === 'pending' ? 'bg-yellow-500' : 
              getSyncStatus() === 'failed' ? 'bg-red-500' : 'bg-gray-400'
            }`} title={`동기화 상태: ${getSyncStatus()}`}></div>
            <Button variant="outline" size="sm">
              <Save className="h-4 w-4 mr-2" />
              저장
            </Button>
            <Button variant="outline" size="sm">
              <Eye className="h-4 w-4 mr-2" />
              미리보기
            </Button>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              내보내기
            </Button>
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="mt-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">TCFD 권고사항 완성도</span>
            <span className="text-sm text-muted-foreground">{progress}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      </header>

      <ResizablePanelGroup direction="horizontal" className="flex-grow">
        {/* Sidebar - TCFD Pillars */}
        <ResizablePanel defaultSize={25} minSize={20}>
          <div className="h-full overflow-y-auto p-4">
            <PillarSelector
              pillars={TCFD_PILLARS}
              selectedPillar={selectedPillar}
              selectedRecommendation={selectedRecommendation}
              responses={responses}
              onPillarSelect={(pillarId, firstRecommendationId) => {
                setSelectedPillar(pillarId);
                setSelectedRecommendation(firstRecommendationId);
              }}
              onRecommendationSelect={setSelectedRecommendation}
            />
          </div>
        </ResizablePanel>

        <ResizableHandle withHandle />

        {/* Main Content */}
        <ResizablePanel defaultSize={75}>
          <div className="h-full flex flex-col">
            <Tabs defaultValue="content" className="h-full flex flex-col">
              <div className="px-6 pt-4 border-b">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="content">권고사항 작성</TabsTrigger>
                  <TabsTrigger value="preview">보고서 미리보기</TabsTrigger>
                </TabsList>
              </div>
              
              <TabsContent value="content" className="flex-1 overflow-y-auto p-6 mt-0">
                {currentRecommendation ? (
                  <div className="space-y-6">
                    <div className="text-center p-6 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg">
                      <div className="flex items-center justify-center gap-3 mb-4">
                        <div className={`p-3 rounded-lg ${currentPillar.color.replace('text-', 'bg-').replace('-800', '-200')}`}>
                          {currentPillar.icon}
                        </div>
                        <div>
                          <h2 className="text-2xl font-bold">{currentPillar.name}</h2>
                          <p className="text-muted-foreground">{currentRecommendation.name}</p>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
                        {currentRecommendation.description}
                      </p>
                    </div>

                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Target className="h-5 w-5" />
                          주요 질문 및 가이드라인
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          {currentRecommendation.questions.map((question, index) => (
                            <div key={index} className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                              <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0">
                                {index + 1}
                              </div>
                              <p className="text-sm">{question}</p>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>정보 공개 내용 작성</CardTitle>
                        <CardDescription>
                          위 가이드라인을 참고하여 {currentRecommendation.name}에 대한 정보를 작성해주세요.
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <textarea
                          className="w-full p-4 border rounded-md min-h-[300px] resize-y"
                          placeholder={`${currentRecommendation.name}에 대한 상세한 정보를 작성해주세요...

예시 구조:
- 현재 상황 및 접근 방식
- 구체적인 프로세스 및 체계
- 주요 성과 및 지표
- 향후 계획 및 목표`}
                          value={responses[currentRecommendation.id] || ''}
                          onChange={(e) => handleResponseChange(currentRecommendation.id, e.target.value)}
                        />
                        {responses[currentRecommendation.id] && (
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
                      <Leaf className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-lg font-semibold mb-2">권고사항을 선택하세요</h3>
                      <p className="text-muted-foreground">
                        왼쪽에서 TCFD 핵심 요소와 권고사항을 선택하여 시작하세요.
                      </p>
                    </div>
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="preview" className="flex-1 overflow-y-auto p-6 mt-0">
                <div className="space-y-6">
                  <div className="text-center">
                    <h2 className="text-2xl font-bold mb-2">TCFD 기후변화 정보공개 보고서</h2>
                    <p className="text-muted-foreground">
                      Task Force on Climate-related Financial Disclosures
                    </p>
                  </div>
                  
                  {Object.values(TCFD_PILLARS).map((pillar) => (
                    <Card key={pillar.id}>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-3">
                          <div className={`p-2 rounded-lg ${pillar.color.replace('text-', 'bg-').replace('-800', '-200')}`}>
                            {pillar.icon}
                          </div>
                          {pillar.name}
                        </CardTitle>
                        <CardDescription>{pillar.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {pillar.recommendations.map((recommendation) => (
                            <div key={recommendation.id} className="border-l-4 border-blue-200 pl-4">
                              <h4 className="font-medium mb-2">{recommendation.name}</h4>
                              {responses[recommendation.id] ? (
                                <div className="whitespace-pre-wrap text-sm">{responses[recommendation.id]}</div>
                              ) : (
                                <div className="text-muted-foreground italic text-sm">정보 입력 필요</div>
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
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
} 