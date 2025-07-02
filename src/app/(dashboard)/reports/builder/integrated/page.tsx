'use client';

export const dynamic = 'force-dynamic';

import React, { useState, useEffect } from 'react';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";

import { INTEGRATED_SECTIONS } from './_constants';
import { BuilderHeader } from './_components/BuilderHeader';
import { BuilderSidebar } from './_components/BuilderSidebar';
import { BuilderContent } from './_components/BuilderContent';

export default function IntegratedBuilderPage() {
  const [selectedSection, setSelectedSection] = useState<string>('organizational_overview');
  const [selectedSubsection, setSelectedSubsection] = useState<string>('org-details');
  const [responses, setResponses] = useState<Record<string, string>>({});
  const [progress, setProgress] = useState(0);

  // Load responses from localStorage on initial render
  useEffect(() => {
    const savedResponses = localStorage.getItem('integratedResponses');
    if (savedResponses) {
      try {
        const parsedResponses = JSON.parse(savedResponses);
        setResponses(parsedResponses);
      } catch (error) {
        console.error('Error loading integrated responses:', error);
      }
    }
  }, []);

  // Save responses to localStorage and calculate progress whenever they change
  useEffect(() => {
    localStorage.setItem('integratedResponses', JSON.stringify(responses));
    
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

  return (
    <div className="h-screen w-full flex flex-col">
      <BuilderHeader 
        progress={progress}
        onSave={() => alert("저장 기능 구현 필요")}
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
          <BuilderContent 
            selectedSection={selectedSection}
            selectedSubsection={selectedSubsection}
            responses={responses}
            onResponseChange={handleResponseChange}
          />
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}