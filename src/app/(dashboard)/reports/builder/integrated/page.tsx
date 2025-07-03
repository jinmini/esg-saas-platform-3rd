'use client';

export const dynamic = 'force-dynamic';

import React, { useState, useEffect } from 'react';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/shared/ui/Resizable";
import { useAutoSave } from "@/hooks/useAutoSave";
import { ReportStorageService } from "@/services/storage/report-storage";

import { INTEGRATED_SECTIONS } from './_constants';
import { BuilderHeader } from './_components/BuilderHeader';
import { BuilderSidebar } from './_components/BuilderSidebar';
import { BuilderContent } from './_components/BuilderContent';

export default function IntegratedBuilderPage() {
  const [selectedSection, setSelectedSection] = useState<string>('organizational_overview');
  const [selectedSubsection, setSelectedSubsection] = useState<string>('org-details');
  const [responses, setResponses] = useState<Record<string, string>>({});
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  // 자동 저장 기능
  const { isSaving, lastSaved, getSyncStatus, saveNow } = useAutoSave('integrated-report', responses, {
    framework: 'integrated',
    enabled: true,
    debounceMs: 2000,
    onSaveSuccess: () => {
      console.log('✅ 통합 보고서가 저장되었습니다.', new Date().toLocaleTimeString());
    },
    onSaveError: (error) => {
      console.error('❌ 통합 보고서 저장 실패:', error);
    }
  });

  // 페이지 로딩 시 IndexedDB에서 데이터 불러오기
  useEffect(() => {
    async function loadSavedData() {
      try {
        setIsLoading(true);
        const storageService = ReportStorageService.getInstance();
        const savedData = await storageService.getReport('integrated-report');
        
        if (savedData) {
          setResponses(savedData);
          console.log('📄 저장된 통합 보고서를 불러왔습니다.');
        }
      } catch (error) {
        console.error('❌ 통합 보고서 불러오기 실패:', error);
        setResponses({});
      } finally {
        setIsLoading(false);
      }
    }

    loadSavedData();
  }, []);

  // 진행률 계산
  useEffect(() => {
    const totalSubsections = Object.values(INTEGRATED_SECTIONS).reduce((acc, section) => acc + section.subsections.length, 0);
    if (totalSubsections > 0) {
      const completedSubsections = Object.keys(responses).filter(key => responses[key]?.trim().length > 0).length;
      setProgress(Math.round((completedSubsections / totalSubsections) * 100));
    } else {
      setProgress(0);
    }
  }, [responses]);

  const handleResponseChange = (subsectionId: string, value: string) => {
    setResponses(prev => ({ ...prev, [subsectionId]: value }));
  };

  const handleSave = async () => {
    try {
      await saveNow();
      alert("보고서가 저장되었습니다!");
    } catch (error) {
      alert("저장 중 오류가 발생했습니다.");
    }
  };

  // 로딩 상태 표시
  if (isLoading) {
    return (
      <div className="h-screen w-full flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-sm text-gray-600">통합 보고서를 불러오는 중...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen w-full flex flex-col">
      <BuilderHeader 
        progress={progress}
        onSave={handleSave}
        onPreview={() => alert("미리보기 기능 구현 필요")}
        onExport={() => alert("내보내기 기능 구현 필요")}
      />

      <ResizablePanelGroup direction="horizontal" className="flex-grow">
        <ResizablePanel defaultSize={25} minSize={20}>
          <BuilderSidebar 
            selectedSection={selectedSection}
            selectedSubsection={selectedSubsection}
            responses={responses}
            onSectionSelect={(sectionId, subsectionId) => {
              setSelectedSection(sectionId);
              setSelectedSubsection(subsectionId);
            }}
            onSubsectionSelect={setSelectedSubsection}
          />
        </ResizablePanel>

        <ResizableHandle withHandle />

        <ResizablePanel defaultSize={75}>
          <div className="h-full flex flex-col">
            {/* 상태바 추가 */}
            <div className="px-6 py-2 border-b bg-gray-50">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">실시간 자동 저장 활성화</span>
                <div className="flex items-center gap-2">
                  {isSaving && (
                    <div className="flex items-center gap-1 text-orange-600">
                      <div className="animate-spin h-3 w-3 border border-orange-600 border-t-transparent rounded-full"></div>
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
            
            <BuilderContent 
              selectedSection={selectedSection}
              selectedSubsection={selectedSubsection}
              responses={responses}
              onResponseChange={handleResponseChange}
            />
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}