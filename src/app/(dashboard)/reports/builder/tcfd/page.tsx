'use client';

export const dynamic = 'force-dynamic';

import React, { useState, useEffect } from 'react';
import { Button } from "@/shared/ui/Button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/ui/Card";
import { Progress } from "@/shared/ui/Progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/ui/Tabs";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/shared/ui/Resizable";
import { Badge } from "@/shared/ui/Badge";
import { 
  ArrowLeft, 
  Leaf, 
  Save, 
  Eye, 
  Download,
  Target,
  TrendingUp,
  Shield,

  AlertTriangle,
  CheckCircle2
} from "lucide-react";
import { useRouter } from 'next/navigation';
import { useAutoSave } from "@/hooks/useAutoSave";
import { ReportStorageService } from "@/services/storage/report-storage";
import { TCFD_PILLARS } from "@/widgets/reports/tcfd/constants/pillars";
import { tcfdPillarColors } from "@/widgets/reports/tcfd/constants/colors";
import { getTcfdPillarIcon } from "@/widgets/reports/tcfd/constants/icons";
import { PillarSelector } from "@/widgets/reports/tcfd/components/PillarSelector";
import { RecommendationForm } from "@/widgets/reports/tcfd/components/RecommendationForm";
import { ReportPreview } from "@/widgets/reports/tcfd/components/ReportPreview";

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
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold mb-3">TCFD 4대 핵심 요소</h3>
                <div className="space-y-3">
                  {Object.values(TCFD_PILLARS).map((pillar) => (
                    <Card 
                      key={pillar.id}
                      className={`cursor-pointer transition-all duration-200 ${
                        selectedPillar === pillar.id 
                          ? 'ring-2 ring-blue-500 bg-blue-50' 
                          : 'hover:bg-gray-50'
                      }`}
                      onClick={() => {
                        setSelectedPillar(pillar.id);
                        setSelectedRecommendation(pillar.recommendations[0].id);
                      }}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start gap-3">
                          <div className={`p-2 rounded-lg ${pillar.color.replace('text-', 'bg-').replace('-800', '-200')}`}>
                            {pillar.icon}
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium text-sm">{pillar.name}</h4>
                            <p className="text-xs text-muted-foreground mt-1">{pillar.description}</p>
                            <div className="flex items-center gap-2 mt-2">
                              <Badge variant="outline" className={pillar.color}>
                                {pillar.recommendations.length}개 권고사항
                              </Badge>
                              <div className="flex items-center gap-1">
                                {pillar.recommendations.map(rec => (
                                  <div 
                                    key={rec.id}
                                    className={`w-2 h-2 rounded-full ${
                                      responses[rec.id]?.trim().length > 0 
                                        ? 'bg-green-500' 
                                        : 'bg-gray-300'
                                    }`}
                                  />
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {currentPillar && (
                <div>
                  <h3 className="font-semibold mb-3">권고사항</h3>
                  <div className="space-y-2">
                    {currentPillar.recommendations.map((recommendation) => (
                      <Card 
                        key={recommendation.id}
                        className={`cursor-pointer transition-all duration-200 ${
                          selectedRecommendation === recommendation.id 
                            ? 'ring-2 ring-green-500 bg-green-50' 
                            : 'hover:bg-gray-50'
                        }`}
                        onClick={() => setSelectedRecommendation(recommendation.id)}
                      >
                        <CardContent className="p-3">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <h4 className="font-medium text-sm">{recommendation.name}</h4>
                              <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                                {recommendation.description}
                              </p>
                            </div>
                            {responses[recommendation.id]?.trim().length > 0 ? (
                              <CheckCircle2 className="h-4 w-4 text-green-600 ml-2 flex-shrink-0" />
                            ) : (
                              <div className="w-4 h-4 border-2 border-gray-300 rounded-full ml-2 flex-shrink-0" />
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}
            </div>
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