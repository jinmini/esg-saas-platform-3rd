'use client';

import { useSasbFramework, useSasbReport } from '../model';
import { IndustrySelector, MetricForm, ReportPreview } from '.';
import { Skeleton } from '@/shared/ui/Skeleton';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/ui/Tabs";
import { Button } from '@/shared/ui/Button';
import { Download, Share2 } from 'lucide-react';

export function SasbReportBuilder() {
  const { data: framework, isLoading, error } = useSasbFramework();
  const {
    selectedIndustry,
    selectedSector,
    responses,
    handleIndustrySelect,
    handleSectorSelect,
    handleResponseChange,
    currentIndustry,
    currentSector,
  } = useSasbReport(framework);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <Skeleton className="h-[600px] md:col-span-1" />
        <Skeleton className="h-[600px] md:col-span-2" />
      </div>
    );
  }

  if (error) {
    return <p>오류: SASB 프레임워크를 불러올 수 없습니다. {error.message}</p>;
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
      <aside className="lg:col-span-1 sticky top-24">
        {framework && (
          <IndustrySelector
            industries={framework}
            selectedIndustry={selectedIndustry}
            selectedSector={selectedSector}
            onIndustrySelect={handleIndustrySelect}
            onSectorSelect={handleSectorSelect}
          />
        )}
      </aside>

      <main className="lg:col-span-3">
        <Tabs defaultValue="form">
            <div className="flex justify-between items-center mb-4">
                <TabsList>
                    <TabsTrigger value="form">보고서 작성</TabsTrigger>
                    <TabsTrigger value="preview">미리보기</TabsTrigger>
                </TabsList>
                <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                        <Share2 className="h-4 w-4 mr-2" /> 공유
                    </Button>
                    <Button size="sm">
                        <Download className="h-4 w-4 mr-2" /> 다운로드
                    </Button>
                </div>
            </div>
          <TabsContent value="form">
            <MetricForm
              sector={currentSector}
              responses={responses}
              onResponseChange={handleResponseChange}
            />
          </TabsContent>
          <TabsContent value="preview">
            <ReportPreview
              industry={currentIndustry}
              sector={currentSector}
              responses={responses}
            />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
} 