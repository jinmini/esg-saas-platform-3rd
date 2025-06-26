'use client';

export const dynamic = 'force-dynamic';

import React, { useState, useEffect } from 'react';
import { GRIDynamicForm } from "@/components/reports/builder/gri/dynamic-form";
import { GRIProgressTracker } from "@/components/reports/builder/gri/progress-tracker";
import { standards } from "@/lib/gri-parser";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";

export default function GriBuilderPage() {
  const [responses, setResponses] = useState<Record<string, string>>({});
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedStandard, setSelectedStandard] = useState<string | null>(null);
  const [selectedDisclosure, setSelectedDisclosure] = useState<string | null>(null);

  // Load responses from localStorage on initial render
  useEffect(() => {
    const savedResponses = localStorage.getItem('griResponses');
    if (savedResponses) {
      setResponses(JSON.parse(savedResponses));
    }
    // Set initial selection
    const firstCategory = Object.keys(standards)[0];
    if (firstCategory) {
      setSelectedCategory(firstCategory);
      const firstStandard = standards[firstCategory].standards[0];
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
    setResponses(prev => ({ ...prev, [disclosureId]: value }));
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
              standards={standards}
              selectedCategory={selectedCategory}
              selectedStandard={selectedStandard}
              selectedDisclosure={selectedDisclosure}
              responses={responses}
            />
          </div>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={75}>
          <div className="h-full overflow-y-auto p-6">
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
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
