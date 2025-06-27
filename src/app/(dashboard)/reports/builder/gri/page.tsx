'use client';

export const dynamic = 'force-dynamic';

import React, { useState, useEffect } from 'react';
import { GRIDynamicForm } from "@/components/reports/builder/gri/dynamic-form";
import { GRIProgressTracker } from "@/components/reports/builder/gri/progress-tracker";
import ReportPreview from "@/components/reports/builder/gri/report-preview";
import { mockStandards } from "@/lib/gri-mock-data";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GRIResponse } from "@/types/gri";

export default function GriBuilderPage() {
  const [responses, setResponses] = useState<Record<string, GRIResponse>>({});
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedStandard, setSelectedStandard] = useState<string | null>(null);
  const [selectedDisclosure, setSelectedDisclosure] = useState<string | null>(null);

  // Load responses from localStorage on initial render
  useEffect(() => {
    const savedResponses = localStorage.getItem('griResponses');
    if (savedResponses) {
      try {
        const parsed = JSON.parse(savedResponses);
        // 기존 string 형태 데이터를 GRIResponse 형태로 변환
        const convertedResponses: Record<string, GRIResponse> = {};
        Object.entries(parsed).forEach(([key, value]) => {
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
      } catch (error) {
        console.error('Error parsing saved responses:', error);
        setResponses({});
      }
    }
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

  // Save responses to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('griResponses', JSON.stringify(responses));
  }, [responses]);

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

  return (
    <div className="h-screen w-full flex flex-col">
      <header className="p-4 border-b">
        <h1 className="text-2xl font-bold">GRI 보고서 빌더</h1>
        <p className="text-sm text-muted-foreground">실시간 저장 및 진행률 추적 기능이 활성화되었습니다.</p>
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
