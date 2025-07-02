import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2 } from 'lucide-react';
import { INTEGRATED_SECTIONS } from '../_constants';

interface BuilderSidebarProps {
  selectedSection: string;
  selectedSubsection: string;
  responses: Record<string, string>;
  onSectionSelect: (sectionId: string, subsectionId: string) => void;
  onSubsectionSelect: (subsectionId: string) => void;
}

const getFrameworkBadges = (frameworks: string[]) => {
  const colors = {
    'GRI': 'bg-green-100 text-green-800',
    'SASB': 'bg-blue-100 text-blue-800',
    'TCFD': 'bg-purple-100 text-purple-800'
  };
  
  return frameworks.map(framework => (
    <Badge key={framework} variant="outline" className={colors[framework as keyof typeof colors]}>
      {framework}
    </Badge>
  ));
};

export function BuilderSidebar({ 
  selectedSection, 
  selectedSubsection, 
  responses, 
  onSectionSelect, 
  onSubsectionSelect 
}: BuilderSidebarProps) {
  const currentSection = INTEGRATED_SECTIONS[selectedSection as keyof typeof INTEGRATED_SECTIONS];

  return (
    <div className="h-full overflow-y-auto p-4">
      <div className="space-y-6">
        <div>
          <h3 className="font-semibold mb-3">통합 보고서 섹션</h3>
          <div className="space-y-3">
            {Object.values(INTEGRATED_SECTIONS).map((section) => (
              <Card 
                key={section.id}
                className={`cursor-pointer transition-all duration-200 ${
                  selectedSection === section.id 
                    ? 'ring-2 ring-blue-500 bg-blue-50' 
                    : 'hover:bg-gray-50'
                }`}
                onClick={() => onSectionSelect(section.id, section.subsections[0].id)}
              >
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className={`p-2 rounded-lg ${section.color.replace('text-', 'bg-').replace('-800', '-200')}`}>
                      {section.icon}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-sm">{section.name}</h4>
                      <p className="text-xs text-muted-foreground mt-1">{section.description}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <div className="flex gap-1">
                          {getFrameworkBadges(section.frameworks)}
                        </div>
                        <div className="flex items-center gap-1">
                          {section.subsections.map(subsection => (
                            <div 
                              key={subsection.id}
                              className={`w-2 h-2 rounded-full ${
                                responses[subsection.id]?.trim().length > 0 
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

        {currentSection && (
          <div>
            <h3 className="font-semibold mb-3">세부 항목</h3>
            <div className="space-y-2">
              {currentSection.subsections.map((subsection) => (
                <Card 
                  key={subsection.id}
                  className={`cursor-pointer transition-all duration-200 ${
                    selectedSubsection === subsection.id 
                      ? 'ring-2 ring-green-500 bg-green-50' 
                      : 'hover:bg-gray-50'
                  }`}
                  onClick={() => onSubsectionSelect(subsection.id)}
                >
                  <CardContent className="p-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-medium text-sm">{subsection.name}</h4>
                        <p className="text-xs text-muted-foreground mt-1">
                          {subsection.description}
                        </p>
                        <Badge variant="outline" className="text-xs mt-2">
                          {subsection.framework}
                        </Badge>
                      </div>
                      {responses[subsection.id]?.trim().length > 0 ? (
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
  );
}