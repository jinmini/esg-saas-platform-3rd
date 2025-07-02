'use client';

export const dynamic = 'force-dynamic';

import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft, 
  Building2, 
  Save, 
  Eye, 
  Download,
  TrendingUp,
  DollarSign,
  Users,
  Shield
} from "lucide-react";
import { useRouter } from 'next/navigation';

// SASB Industry Categories
const SASB_INDUSTRIES = {
  'consumer-goods': {
    id: 'consumer-goods',
    name: '소비재',
    description: '소비자 제품 및 서비스 관련 기업',
    sectors: [
      {
        id: 'apparel',
        name: '의류, 액세서리 및 신발',
        metrics: [
          { id: 'CG-AA-430a.1', name: '환경 및 사회적 영향 관리', category: 'environmental' },
          { id: 'CG-AA-430a.2', name: '공급망 노동 기준', category: 'social' }
        ]
      }
    ]
  },
  'extractives': {
    id: 'extractives',
    name: '원자재 및 광물',
    description: '천연자원 채굴 및 가공 기업',
    sectors: [
      {
        id: 'oil-gas',
        name: '석유 및 가스',
        metrics: [
          { id: 'EM-EP-110a.1', name: '대기 배출량', category: 'environmental' },
          { id: 'EM-EP-210a.1', name: '수자원 관리', category: 'environmental' }
        ]
      }
    ]
  },
  'financials': {
    id: 'financials',
    name: '금융서비스',
    description: '은행, 보험, 자산관리 등 금융 기업',
    sectors: [
      {
        id: 'commercial-banks',
        name: '상업은행',
        metrics: [
          { id: 'FN-CB-410a.1', name: '기후변화 관련 리스크', category: 'governance' },
          { id: 'FN-CB-240a.1', name: '금융 포용성', category: 'social' }
        ]
      }
    ]
  }
};

const categoryColors = {
  environmental: 'bg-green-100 text-green-800',
  social: 'bg-blue-100 text-blue-800',
  governance: 'bg-purple-100 text-purple-800'
};

const categoryIcons = {
  environmental: <TrendingUp className="h-4 w-4" />,
  social: <Users className="h-4 w-4" />,
  governance: <Shield className="h-4 w-4" />
};

export default function SASBBuilderPage() {
  const router = useRouter();
  const [selectedIndustry, setSelectedIndustry] = useState<string | null>('financials');
  const [selectedSector, setSelectedSector] = useState<string | null>('commercial-banks');
  const [responses, setResponses] = useState<Record<string, string>>({});
  const [progress, setProgress] = useState(10);

  // Load responses from localStorage
  useEffect(() => {
    const savedResponses = localStorage.getItem('sasbResponses');
    if (savedResponses) {
      try {
        setResponses(JSON.parse(savedResponses));
      } catch (error) {
        console.error('Error loading SASB responses:', error);
      }
    }
  }, []);

  // Save responses to localStorage
  useEffect(() => {
    localStorage.setItem('sasbResponses', JSON.stringify(responses));
  }, [responses]);

  const handleResponseChange = (metricId: string, value: string) => {
    setResponses(prev => ({ ...prev, [metricId]: value }));
    // Update progress based on completed metrics
    const totalMetrics = getCurrentMetrics().length;
    const completedMetrics = Object.values({...responses, [metricId]: value}).filter(v => v.trim().length > 0).length;
    setProgress(Math.round((completedMetrics / totalMetrics) * 100));
  };

  const getCurrentMetrics = () => {
    if (!selectedIndustry || !selectedSector) return [];
    const industry = SASB_INDUSTRIES[selectedIndustry as keyof typeof SASB_INDUSTRIES];
    const sector = industry?.sectors.find(s => s.id === selectedSector);
    return sector?.metrics || [];
  };

  const currentIndustry = selectedIndustry ? SASB_INDUSTRIES[selectedIndustry as keyof typeof SASB_INDUSTRIES] : null;
  const currentSector = currentIndustry?.sectors.find(s => s.id === selectedSector);

  return (
    <div className="h-screen w-full flex flex-col">
      {/* Header */}
      <header className="p-4 border-b bg-gradient-to-r from-blue-50 to-purple-50">
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
              <div className="p-2 bg-blue-100 rounded-lg">
                <Building2 className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h1 className="text-xl font-bold">SASB Standards 보고서</h1>
                <p className="text-sm text-muted-foreground">산업별 지속가능성 회계 표준</p>
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
            <span className="text-sm font-medium">진행률</span>
            <span className="text-sm text-muted-foreground">{progress}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      </header>

      <ResizablePanelGroup direction="horizontal" className="flex-grow">
        {/* Sidebar - Industry & Sector Selection */}
        <ResizablePanel defaultSize={25} minSize={20}>
          <div className="h-full overflow-y-auto p-4">
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold mb-3">산업 분류</h3>
                <div className="space-y-2">
                  {Object.values(SASB_INDUSTRIES).map((industry) => (
                    <Card 
                      key={industry.id}
                      className={`cursor-pointer transition-all duration-200 ${
                        selectedIndustry === industry.id 
                          ? 'ring-2 ring-blue-500 bg-blue-50' 
                          : 'hover:bg-gray-50'
                      }`}
                      onClick={() => {
                        setSelectedIndustry(industry.id);
                        setSelectedSector(industry.sectors[0]?.id || null);
                      }}
                    >
                      <CardContent className="p-3">
                        <h4 className="font-medium text-sm">{industry.name}</h4>
                        <p className="text-xs text-muted-foreground">{industry.description}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {currentIndustry && (
                <div>
                  <h3 className="font-semibold mb-3">세부 업종</h3>
                  <div className="space-y-2">
                    {currentIndustry.sectors.map((sector) => (
                      <Card 
                        key={sector.id}
                        className={`cursor-pointer transition-all duration-200 ${
                          selectedSector === sector.id 
                            ? 'ring-2 ring-green-500 bg-green-50' 
                            : 'hover:bg-gray-50'
                        }`}
                        onClick={() => setSelectedSector(sector.id)}
                      >
                        <CardContent className="p-3">
                          <h4 className="font-medium text-sm">{sector.name}</h4>
                          <div className="flex gap-1 mt-2">
                            {sector.metrics.map((metric) => (
                              <Badge 
                                key={metric.id} 
                                variant="outline" 
                                className={`text-xs ${categoryColors[metric.category as keyof typeof categoryColors]}`}
                              >
                                {categoryIcons[metric.category as keyof typeof categoryIcons]}
                                <span className="ml-1">{metric.category}</span>
                              </Badge>
                            ))}
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
            <Tabs defaultValue="metrics" className="h-full flex flex-col">
              <div className="px-6 pt-4 border-b">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="metrics">지표 작성</TabsTrigger>
                  <TabsTrigger value="preview">보고서 미리보기</TabsTrigger>
                </TabsList>
              </div>
              
              <TabsContent value="metrics" className="flex-1 overflow-y-auto p-6 mt-0">
                {currentSector ? (
                  <div className="space-y-6">
                    <div className="text-center p-6 bg-gradient-to-r from-blue-50 to-green-50 rounded-lg">
                      <h2 className="text-2xl font-bold mb-2">{currentSector.name}</h2>
                      <p className="text-muted-foreground">
                        {currentIndustry?.name} 업종의 SASB 지속가능성 회계 표준
                      </p>
                      <div className="flex justify-center gap-4 mt-4">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-blue-600">{currentSector.metrics.length}</div>
                          <div className="text-sm text-muted-foreground">필수 지표</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-green-600">
                            {Object.values(responses).filter(v => v.trim().length > 0).length}
                          </div>
                          <div className="text-sm text-muted-foreground">완료된 지표</div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      {currentSector.metrics.map((metric) => (
                        <Card key={metric.id}>
                          <CardHeader>
                            <div className="flex items-start justify-between">
                              <div>
                                <CardTitle className="text-lg">{metric.name}</CardTitle>
                                <CardDescription className="font-mono text-sm">
                                  {metric.id}
                                </CardDescription>
                              </div>
                              <Badge 
                                variant="outline" 
                                className={categoryColors[metric.category as keyof typeof categoryColors]}
                              >
                                {categoryIcons[metric.category as keyof typeof categoryIcons]}
                                <span className="ml-1 capitalize">{metric.category}</span>
                              </Badge>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-4">
                              <div>
                                <label className="text-sm font-medium">지표 데이터 및 설명</label>
                                <textarea
                                  className="w-full mt-2 p-3 border rounded-md min-h-[120px] resize-y"
                                  placeholder={`${metric.name}에 대한 데이터와 설명을 입력하세요...`}
                                  value={responses[metric.id] || ''}
                                  onChange={(e) => handleResponseChange(metric.id, e.target.value)}
                                />
                              </div>
                              {responses[metric.id] && (
                                <div className="text-xs text-green-600 flex items-center gap-1">
                                  <div className="w-2 h-2 bg-green-600 rounded-full" />
                                  저장됨 ({new Date().toLocaleTimeString()})
                                </div>
                              )}
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <div className="text-center">
                      <Building2 className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-lg font-semibold mb-2">업종을 선택하세요</h3>
                      <p className="text-muted-foreground">
                        왼쪽에서 산업 분류와 세부 업종을 선택하여 시작하세요.
                      </p>
                    </div>
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="preview" className="flex-1 overflow-y-auto p-6 mt-0">
                <div className="space-y-6">
                  <div className="text-center">
                    <h2 className="text-2xl font-bold mb-2">SASB 지속가능성 보고서</h2>
                    <p className="text-muted-foreground">
                      {currentIndustry?.name} - {currentSector?.name}
                    </p>
                  </div>
                  
                  {getCurrentMetrics().map((metric) => (
                    <Card key={metric.id}>
                      <CardHeader>
                        <CardTitle className="text-lg">{metric.name}</CardTitle>
                        <CardDescription className="font-mono">{metric.id}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        {responses[metric.id] ? (
                          <div className="whitespace-pre-wrap">{responses[metric.id]}</div>
                        ) : (
                          <div className="text-muted-foreground italic">데이터 입력 필요</div>
                        )}
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