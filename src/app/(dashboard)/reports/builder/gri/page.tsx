'use client';

export const dynamic = 'force-dynamic';

import React, { useState, useEffect } from 'react';
import { mockStandards } from "@/widgets/reports/gri/constants/standards";
import { GRIDynamicForm } from "@/widgets/reports/gri/components/DynamicForm";
import { GRIProgressTracker } from "@/widgets/reports/gri/components/ProgressTracker";
import ReportPreview from "@/widgets/reports/gri/components/ReportPreview";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/shared/ui/Resizable";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/ui/Tabs";
import { GRIResponse } from "@/shared/types/gri";
import { useAutoSave } from "@/hooks/useAutoSave";
import { ReportStorageService } from "@/services/storage/report-storage";

export default function GriBuilderPage() {
  const [responses, setResponses] = useState<Record<string, GRIResponse>>({});
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedStandard, setSelectedStandard] = useState<string | null>(null);
  const [selectedDisclosure, setSelectedDisclosure] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // 자동 저장 기능
  const { isSaving, lastSaved, getSyncStatus } = useAutoSave('gri-report', responses, {
    framework: 'gri',
    enabled: true,
    debounceMs: 2000,
    onSaveSuccess: () => {
      console.log('✅ GRI 보고서가 저장되었습니다.', new Date().toLocaleTimeString());
    },
    onSaveError: (error) => {
      console.error('❌ GRI 보고서 저장 실패:', error);
    }
  });

  // 페이지 로딩 시 IndexedDB에서 데이터 불러오기
  useEffect(() => {
    async function loadSavedData() {
      try {
        setIsLoading(true);
        const storageService = ReportStorageService.getInstance();
        const savedData = await storageService.getReport('gri-report');
        
        if (savedData) {
          // 기존 데이터 타입 변환 로직 유지
          const convertedResponses: Record<string, GRIResponse> = {};
          Object.entries(savedData).forEach(([key, value]) => {
            if (typeof value === 'string') {
              // 기존 string 데이터를 GRIResponse로 변환
              convertedResponses[key] = {
                content: value,
                lastModified: new Date().toISOString(),
                attachments: []
              };
            } else if (value && typeof value === 'object' && 'content' in value) {
              // 이미 GRIResponse 형태인 경우
              convertedResponses[key] = value as GRIResponse;
            }
          });
          setResponses(convertedResponses);
          console.log('📄 저장된 GRI 보고서를 불러왔습니다.');
        }
      } catch (error) {
        console.error('❌ GRI 보고서 불러오기 실패:', error);
        setResponses({});
      } finally {
        setIsLoading(false);
      }
    }

    loadSavedData();

    // Set initial selection
    const firstCategory = Object.keys(mockStandards)[0];
    if (firstCategory) {
      setSelectedCategory(firstCategory);
      const firstStandard = mockStandards[firstCategory as keyof typeof mockStandards].standards[0];
      if (firstStandard) {
        setSelectedStandard(firstStandard.id);
        if (firstStandard.disclosures.length > 0) {
          setSelectedDisclosure(firstStandard.disclosures[0].id);
        }
      }
    }
  }, []);

  const handleResponseChange = (disclosureId: string, value: string) => {
    setResponses(prev => ({ 
      ...prev, 
      [disclosureId]: {
        content: value,
        lastModified: new Date().toISOString(),
        attachments: prev[disclosureId]?.attachments || []
      }
    }));
  };

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId);
    // 첫 번째 표준 자동 선택
    const categoryStandards = mockStandards[categoryId as keyof typeof mockStandards];
    if (categoryStandards && categoryStandards.standards.length > 0) {
      const firstStandard = categoryStandards.standards[0];
      setSelectedStandard(firstStandard.id);
      if (firstStandard.disclosures.length > 0) {
        setSelectedDisclosure(firstStandard.disclosures[0].id);
      }
    }
  };

  const handleStandardSelect = (standardId: string) => {
    setSelectedStandard(standardId);
    // 선택된 표준의 첫 번째 공시사항 자동 선택
    if (selectedCategory) {
      const categoryStandards = mockStandards[selectedCategory as keyof typeof mockStandards];
      const selectedStandardData = categoryStandards.standards.find(s => s.id === standardId);
      if (selectedStandardData && selectedStandardData.disclosures.length > 0) {
        setSelectedDisclosure(selectedStandardData.disclosures[0].id);
      }
    }
  };

  const handleDisclosureSelect = (disclosureId: string) => {
    setSelectedDisclosure(disclosureId);
  };

  // 로딩 상태 표시
  if (isLoading) {
    return (
      <div className="h-screen w-full flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-sm text-gray-600">GRI 보고서를 불러오는 중...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen w-full flex flex-col">
      <header className="p-4 border-b">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">GRI 보고서 빌더</h1>
            <p className="text-sm text-muted-foreground">실시간 저장 및 진행률 추적 기능이 활성화되었습니다.</p>
          </div>
          <div className="text-right">
            <div className="flex items-center gap-2">
              {isSaving && (
                <div className="flex items-center gap-1 text-blue-600">
                  <div className="animate-spin h-3 w-3 border border-blue-600 border-t-transparent rounded-full"></div>
                  <span className="text-xs">저장 중...</span>
                </div>
              )}
              {lastSaved && (
                <span className="text-xs text-gray-500">
                  마지막 저장: {lastSaved.toLocaleTimeString()}
                </span>
              )}
              <div className={`h-2 w-2 rounded-full ${
                getSyncStatus() === 'synced' ? 'bg-green-500' : 
                getSyncStatus() === 'pending' ? 'bg-yellow-500' : 
                getSyncStatus() === 'failed' ? 'bg-red-500' : 'bg-gray-400'
              }`} title={`동기화 상태: ${getSyncStatus()}`}></div>
            </div>
          </div>
        </div>
      </header>
      <ResizablePanelGroup direction="horizontal" className="flex-grow">
        <ResizablePanel defaultSize={25} minSize={20}>
          <div className="h-full overflow-y-auto p-4">
            <GRIProgressTracker
              standards={mockStandards}
              selectedCategory={selectedCategory}
              selectedStandard={selectedStandard}
              selectedDisclosure={selectedDisclosure}
              responses={responses}
              onCategorySelect={handleCategorySelect}
              onStandardSelect={handleStandardSelect}
              onDisclosureSelect={handleDisclosureSelect}
            />
          </div>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={75}>
          <div className="h-full flex flex-col">
            <Tabs defaultValue="form" className="h-full flex flex-col">
              <div className="px-6 pt-4 border-b">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="form">작성</TabsTrigger>
                  <TabsTrigger value="preview">미리보기</TabsTrigger>
                </TabsList>
              </div>
              
              <TabsContent value="form" className="flex-1 overflow-y-auto p-6 mt-0">
                {selectedStandard ? (
                  <GRIDynamicForm
                    key={selectedStandard} // Re-mount component when standard changes
                    category={selectedCategory || ''}
                    standardId={selectedStandard}
                    onResponseChange={handleResponseChange}
                    initialResponses={responses}
                  />
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <p className="text-muted-foreground">왼쪽에서 항목을 선택하여 시작하세요.</p>
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="preview" className="flex-1 overflow-y-auto p-6 mt-0">
                <ReportPreview responses={responses} />
              </TabsContent>
            </Tabs>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
