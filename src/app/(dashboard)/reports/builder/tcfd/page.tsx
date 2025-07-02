'use client';

export const dynamic = 'force-dynamic';

import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft, 
  Leaf, 
  Save, 
  Eye, 
  Download,
  Target,
  TrendingUp,
  Shield,
  DollarSign,
  AlertTriangle,
  CheckCircle2
} from "lucide-react";
import { useRouter } from 'next/navigation';

// TCFD Pillars and Recommendations
const TCFD_PILLARS = {
  governance: {
    id: 'governance',
    name: '거버넌스',
    description: '기후 관련 위험과 기회에 대한 조직의 거버넌스',
    icon: <Shield className="h-5 w-5" />,
    color: 'bg-purple-100 text-purple-800',
    recommendations: [
      {
        id: 'gov-a',
        name: '이사회의 감독',
        description: '기후 관련 위험과 기회에 대한 이사회의 감독 체계를 설명하세요.',
        questions: [
          '이사회가 기후 관련 이슈를 어떻게 감독하고 있나요?',
          '기후 관련 위험 관리에 대한 이사회의 역할은 무엇인가요?'
        ]
      },
      {
        id: 'gov-b',
        name: '경영진의 역할',
        description: '기후 관련 위험과 기회를 평가하고 관리하는 데 있어 경영진의 역할을 설명하세요.',
        questions: [
          '경영진이 기후 관련 위험을 어떻게 평가하나요?',
          '기후 관련 의사결정 프로세스는 어떻게 되나요?'
        ]
      }
    ]
  },
  strategy: {
    id: 'strategy',
    name: '전략',
    description: '기후 관련 위험과 기회가 조직의 사업, 전략 및 재무 계획에 미치는 실제적이고 잠재적인 영향',
    icon: <Target className="h-5 w-5" />,
    color: 'bg-blue-100 text-blue-800',
    recommendations: [
      {
        id: 'str-a',
        name: '위험과 기회 식별',
        description: '조직이 단기, 중기, 장기에 걸쳐 식별한 기후 관련 위험과 기회를 설명하세요.',
        questions: [
          '주요 기후 관련 물리적 위험은 무엇인가요?',
          '전환 위험과 기회를 어떻게 식별했나요?'
        ]
      },
      {
        id: 'str-b',
        name: '사업 전략에 미치는 영향',
        description: '기후 관련 위험과 기회가 조직의 사업, 전략, 재무 계획에 미치는 영향을 설명하세요.',
        questions: [
          '기후변화가 비즈니스 모델에 어떤 영향을 미치나요?',
          '기후 관련 투자 계획은 무엇인가요?'
        ]
      },
      {
        id: 'str-c',
        name: '시나리오 분석',
        description: '다양한 기후 관련 시나리오를 고려한 조직 전략의 회복력을 설명하세요.',
        questions: [
          '어떤 기후 시나리오를 분석했나요? (예: 1.5°C, 2°C, 4°C)',
          '시나리오별 재무적 영향은 어떻게 평가했나요?'
        ]
      }
    ]
  },
  risk_management: {
    id: 'risk_management',
    name: '위험 관리',
    description: '조직이 기후 관련 위험을 식별, 평가, 관리하는 프로세스',
    icon: <AlertTriangle className="h-5 w-5" />,
    color: 'bg-orange-100 text-orange-800',
    recommendations: [
      {
        id: 'rm-a',
        name: '위험 식별 및 평가',
        description: '기후 관련 위험을 식별하고 평가하는 조직의 프로세스를 설명하세요.',
        questions: [
          '기후 위험 식별 방법론은 무엇인가요?',
          '위험 평가 기준과 척도는 어떻게 정의했나요?'
        ]
      },
      {
        id: 'rm-b',
        name: '위험 관리 프로세스',
        description: '기후 관련 위험을 관리하는 조직의 프로세스를 설명하세요.',
        questions: [
          '위험 완화 전략은 무엇인가요?',
          '위험 모니터링 체계는 어떻게 운영되나요?'
        ]
      },
      {
        id: 'rm-c',
        name: '전체 위험관리 통합',
        description: '기후 관련 위험을 식별, 평가, 관리하는 프로세스가 조직의 전체 위험 관리에 어떻게 통합되는지 설명하세요.',
        questions: [
          '기존 위험관리 체계와 어떻게 통합했나요?',
          '기후 위험이 다른 위험과 어떻게 상호작용하나요?'
        ]
      }
    ]
  },
  metrics_targets: {
    id: 'metrics_targets',
    name: '지표 및 목표',
    description: '기후 관련 위험과 기회를 평가하고 관리하는 데 사용되는 지표와 목표',
    icon: <TrendingUp className="h-5 w-5" />,
    color: 'bg-green-100 text-green-800',
    recommendations: [
      {
        id: 'mt-a',
        name: '기후 관련 지표',
        description: '조직이 전략 및 위험 관리 프로세스에 따라 기후 관련 위험과 기회를 평가하기 위해 사용하는 지표를 공개하세요.',
        questions: [
          '온실가스 배출량 (Scope 1, 2, 3)은 얼마인가요?',
          '에너지 효율성 지표는 무엇인가요?',
          '물 사용량, 폐기물 등 기타 환경 지표는?'
        ]
      },
      {
        id: 'mt-b',
        name: 'Scope 1, 2, 3 배출량',
        description: 'Scope 1, 2 온실가스 배출량과 적절한 경우 Scope 3 배출량 및 관련 위험을 공개하세요.',
        questions: [
          'Scope 1 직접 배출량은 얼마인가요?',
          'Scope 2 간접 배출량은 얼마인가요?',
          'Scope 3 기타 간접 배출량과 중요 카테고리는?'
        ]
      },
      {
        id: 'mt-c',
        name: '목표 설정',
        description: '기후 관련 위험과 기회를 관리하기 위해 조직이 사용하는 목표와 목표 대비 성과를 설명하세요.',
        questions: [
          '탄소중립 목표와 로드맵은 무엇인가요?',
          '재생에너지 사용 목표는?',
          '과학기반 목표(SBTi) 설정 여부는?'
        ]
      }
    ]
  }
};

export default function TCFDBuilderPage() {
  const router = useRouter();
  const [selectedPillar, setSelectedPillar] = useState<string>('governance');
  const [selectedRecommendation, setSelectedRecommendation] = useState<string>('gov-a');
  const [responses, setResponses] = useState<Record<string, string>>({});
  const [progress, setProgress] = useState(5);

  // Load responses from localStorage
  useEffect(() => {
    const savedResponses = localStorage.getItem('tcfdResponses');
    if (savedResponses) {
      try {
        setResponses(JSON.parse(savedResponses));
      } catch (error) {
        console.error('Error loading TCFD responses:', error);
      }
    }
  }, []);

  // Save responses to localStorage
  useEffect(() => {
    localStorage.setItem('tcfdResponses', JSON.stringify(responses));
    // Calculate progress based on completed recommendations
    const totalRecommendations = Object.values(TCFD_PILLARS).reduce((acc, pillar) => acc + pillar.recommendations.length, 0);
    const completedRecommendations = Object.keys(responses).filter(key => responses[key]?.trim().length > 0).length;
    setProgress(Math.round((completedRecommendations / totalRecommendations) * 100));
  }, [responses]);

  const handleResponseChange = (recommendationId: string, value: string) => {
    setResponses(prev => ({ ...prev, [recommendationId]: value }));
  };

  const currentPillar = TCFD_PILLARS[selectedPillar as keyof typeof TCFD_PILLARS];
  const currentRecommendation = currentPillar?.recommendations.find(r => r.id === selectedRecommendation);

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