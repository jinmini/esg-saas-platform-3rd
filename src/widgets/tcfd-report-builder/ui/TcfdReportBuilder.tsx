'use client';

import React, { useEffect } from 'react';
import { useTcfdFramework, useTcfdReport } from '../model';
import { PillarSelector, RecommendationForm, ReportPreview } from './';
import { Skeleton } from '@/shared/ui/Skeleton';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/ui/Tabs";
import { Button } from '@/shared/ui/Button';
import { Download, Share2 } from 'lucide-react';
import { ReportStorageService } from '@/shared/lib/storage/report-storage';
import { useAutoSave } from '@/hooks/useAutoSave';

export function TcfdReportBuilder() {
  const { data: framework, isLoading: isFrameworkLoading } = useTcfdFramework();
  const {
    selectedPillar,
    selectedRecommendation,
    responses,
    handlePillarSelect,
    handleRecommendationSelect,
    handleResponseChange,
    currentPillar,
    currentRecommendation,
    setResponses,
  } = useTcfdReport(framework);

  const { isSaving, lastSaved } = useAutoSave('tcfd-report', responses, {
    framework: 'tcfd',
    enabled: true,
    debounceMs: 2000,
  });
  
  useEffect(() => {
    async function loadSavedData() {
      const storageService = ReportStorageService.getInstance();
      const savedData = await storageService.getReport('tcfd-report');
      if (savedData) {
        setResponses(savedData);
      }
    }
    loadSavedData();
  }, [setResponses]);


  if (isFrameworkLoading) {
    return (
      <div className="space-y-4 p-4">
        <Skeleton className="h-12 w-1/4" />
        <Skeleton className="h-32 w-full" />
        <Skeleton className="h-64 w-full" />
      </div>
    );
  }

  if (!framework) {
    return <div>TCFD 프레임워크 데이터를 불러오는 데 실패했습니다.</div>;
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full">
      <div className="lg:col-span-1 h-full overflow-y-auto">
        <PillarSelector
          pillars={framework}
          selectedPillar={selectedPillar}
          selectedRecommendation={selectedRecommendation}
          responses={responses}
          onPillarSelect={handlePillarSelect}
          onRecommendationSelect={handleRecommendationSelect}
        />
      </div>
      <div className="lg:col-span-2 h-full overflow-y-auto">
        <Tabs defaultValue="form">
          <div className="flex justify-between items-center mb-4">
            <TabsList>
              <TabsTrigger value="form">권고사항 작성</TabsTrigger>
              <TabsTrigger value="preview">보고서 미리보기</TabsTrigger>
            </TabsList>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">
                {isSaving ? '저장 중...' : lastSaved ? `마지막 저장: ${lastSaved.toLocaleTimeString()}`: ''}
              </span>
              <Button variant="outline" size="sm"><Share2 className="h-4 w-4 mr-2" /> 공유</Button>
              <Button variant="outline" size="sm"><Download className="h-4 w-4 mr-2" /> 내보내기</Button>
            </div>
          </div>
          <TabsContent value="form">
            <RecommendationForm
              pillar={currentPillar}
              recommendation={currentRecommendation}
              responses={responses}
              onResponseChange={handleResponseChange}
            />
          </TabsContent>
          <TabsContent value="preview">
            <ReportPreview pillars={framework} responses={responses} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
} 