'use client';

export const dynamic = 'force-dynamic';

import React, { useState, useEffect } from 'react';
import { Button } from "@/shared/ui/Button";
import { Progress } from "@/shared/ui/Progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/ui/Tabs";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/shared/ui/Resizable";

import { 
  ArrowLeft, 
  Building2, 
  Save, 
  Eye, 
  Download
} from "lucide-react";
import { useRouter } from 'next/navigation';
import { useAutoSave } from "@/hooks/useAutoSave";
import { ReportStorageService } from "@/shared/lib/storage/report-storage";
import { SASB_INDUSTRIES } from "@/widgets/sasb-report-builder/lib";
import { 
  IndustrySelector, 
  MetricForm, 
  ReportPreview 
} from "@/widgets/sasb-report-builder/ui";

export default function SASBBuilderPage() {
  const router = useRouter();
  const [selectedIndustry, setSelectedIndustry] = useState<string | null>('financials');
  const [selectedSector, setSelectedSector] = useState<string | null>('commercial-banks');
  const [responses, setResponses] = useState<Record<string, string>>({});
  const [progress, setProgress] = useState(10);
  const [isLoading, setIsLoading] = useState(true);

  // 자동 저장 기능
  const { isSaving, lastSaved, getSyncStatus } = useAutoSave('sasb-report', responses, {
    framework: 'sasb',
    enabled: true,
    debounceMs: 2000,
    onSaveSuccess: () => {
      console.log('✅ SASB 보고서가 저장되었습니다.', new Date().toLocaleTimeString());
    },
    onSaveError: (error) => {
      console.error('❌ SASB 보고서 저장 실패:', error);
    }
  });

  // 페이지 로딩 시 IndexedDB에서 데이터 불러오기
  useEffect(() => {
    async function loadSavedData() {
      try {
        setIsLoading(true);
        const storageService = ReportStorageService.getInstance();
        const savedData = await storageService.getReport('sasb-report');
        
        if (savedData) {
          setResponses(savedData);
          console.log('📄 저장된 SASB 보고서를 불러왔습니다.');
        }
      } catch (error) {
        console.error('❌ SASB 보고서 불러오기 실패:', error);
        setResponses({});
      } finally {
        setIsLoading(false);
      }
    }

    loadSavedData();
  }, []);

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
  const currentSector = currentIndustry?.sectors.find((s: any) => s.id === selectedSector);

  // 로딩 상태 표시
  if (isLoading) {
    return (
      <div className="h-screen w-full flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-sm text-gray-600">SASB 보고서를 불러오는 중...</p>
        </div>
      </div>
    );
  }

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
            {isSaving && (
              <div className="flex items-center gap-1 text-blue-600 mr-2">
                <div className="animate-spin h-3 w-3 border border-blue-600 border-t-transparent rounded-full"></div>
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
            <IndustrySelector
              industries={SASB_INDUSTRIES}
              selectedIndustry={selectedIndustry}
              selectedSector={selectedSector}
              onIndustrySelect={setSelectedIndustry}
              onSectorSelect={setSelectedSector}
            />
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
                <MetricForm
                  sector={currentSector ?? null}
                  responses={responses}
                  onResponseChange={handleResponseChange}
                />
              </TabsContent>
              
              <TabsContent value="preview" className="flex-1 overflow-y-auto p-6 mt-0">
                <ReportPreview
                  industry={currentIndustry}
                  sector={currentSector ?? null}
                  responses={responses}
                />
              </TabsContent>
            </Tabs>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
} 