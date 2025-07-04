 "use client";

import { Badge } from "@/shared/ui/Badge";
import { Progress } from "@/shared/ui/Progress";
import { 
  CheckCircle2, 
  Circle, 
  AlertCircle,
  Clock,
  Globe,
  FileText,
  Leaf,
  Users,
  HelpCircle
} from "lucide-react";

interface ProgressTrackerProps {
  standards: any;
  selectedCategory: string | null;
  selectedStandard: string | null;
  selectedDisclosure: string | null;
  responses: Record<string, any>;
  onCategorySelect: (categoryId: string) => void;
  onStandardSelect: (standardId: string) => void;
  onDisclosureSelect: (disclosureId: string) => void;
}

const categoryIcons = {
  universal: Globe,
  economic: FileText,
  environmental: Leaf,
  social: Users
};



export function GRIProgressTracker({
  standards,
  selectedCategory,
  selectedStandard,
  selectedDisclosure,
  responses,
  onCategorySelect,
  onStandardSelect,
  onDisclosureSelect
}: ProgressTrackerProps) {
  const getDisclosureStatus = (disclosureId: string, mandatory: boolean) => {
    if (responses[disclosureId]) {
      return "completed";
    }
    if (mandatory) {
      return "required";
    }
    return "pending";
  };

  const getCategoryProgress = (categoryData: any) => {
    const totalDisclosures = categoryData.standards.reduce(
      (acc: number, standard: any) => acc + standard.disclosures.length,
      0
    );
    const completedDisclosures = categoryData.standards.reduce(
      (acc: number, standard: any) => {
        return acc + standard.disclosures.filter(
          (disclosure: any) => responses[disclosure.id]
        ).length;
      },
      0
    );
    
    return totalDisclosures > 0 ? Math.round((completedDisclosures / totalDisclosures) * 100) : 0;
  };

  const getStandardProgress = (standard: any) => {
    const totalDisclosures = standard.disclosures.length;
    const completedDisclosures = standard.disclosures.filter(
      (disclosure: any) => responses[disclosure.id]
    ).length;
    
    return totalDisclosures > 0 ? Math.round((completedDisclosures / totalDisclosures) * 100) : 0;
  };

  const StatusIcon = ({ status }: { status: string }) => {
    switch (status) {
      case "completed":
        return <CheckCircle2 className="h-4 w-4 text-green-600" />;
      case "in-progress":
        return <Clock className="h-4 w-4 text-blue-600" />;
      case "required":
        return <AlertCircle className="h-4 w-4 text-orange-600" />;
      default:
        return <Circle className="h-4 w-4 text-gray-400" />;
    }
  };

  return (
    <div className="p-4 space-y-4">
      {Object.values(standards).map((category: any) => {
        const Icon = categoryIcons[category.id as keyof typeof categoryIcons] || HelpCircle;
        const isSelectedCategory = selectedCategory === category.id;
        const categoryProgress = getCategoryProgress(category);
        
        return (
          <div key={category.id} className="space-y-2">
            {/* 카테고리 헤더 */}
            <div 
              className={`flex items-center gap-2 p-2 rounded-lg transition-colors cursor-pointer ${
                isSelectedCategory ? "bg-primary/10" : "hover:bg-muted/50"
              }`}
              onClick={() => onCategorySelect(category.id)}
            >
              <Icon className={`h-4 w-4 ${
                isSelectedCategory ? "text-primary" : "text-muted-foreground"
              }`} />
              <span className={`text-sm font-medium flex-1 ${
                isSelectedCategory ? "text-primary" : ""
              }`}>
                {category.name}
              </span>
              <div className="text-xs text-muted-foreground">
                {categoryProgress}%
              </div>
            </div>
            
            {/* 카테고리 진행률 바 */}
            <Progress value={categoryProgress} className="h-1" />
            
            {/* 표준 목록 (선택된 카테고리만 표시) */}
            {isSelectedCategory && (
              <div className="ml-6 space-y-3">
                {category.standards.map((standard: any) => {
                  const isSelectedStandard = selectedStandard === standard.id;
                  const standardProgress = getStandardProgress(standard);
                  
                  return (
                    <div key={standard.id} className="space-y-2">
                      {/* 표준 헤더 */}
                      <div 
                        className={`p-2 rounded border-l-2 transition-colors cursor-pointer ${
                          isSelectedStandard 
                            ? "border-primary bg-primary/5" 
                            : "border-transparent hover:bg-muted/30"
                        }`}
                        onClick={() => onStandardSelect(standard.id)}
                      >
                        <div className="flex items-center justify-between">
                          <span className={`text-xs font-medium ${
                            isSelectedStandard ? "text-primary" : ""
                          }`}>
                            {standard.id}
                          </span>
                          <div className="flex items-center gap-1">
                            <span className="text-xs text-muted-foreground">
                              {standardProgress}%
                            </span>
                          </div>
                        </div>
                        <div className="text-xs text-muted-foreground mt-1">
                          {standard.name}
                        </div>
                        <Progress value={standardProgress} className="h-1 mt-2" />
                      </div>
                      
                      {/* 공시사항 목록 (선택된 표준만 표시) */}
                      {isSelectedStandard && standard.disclosures.length > 0 && (
                        <div className="ml-4 space-y-1">
                          {standard.disclosures.map((disclosure: any) => {
                            const isSelected = selectedDisclosure === disclosure.id;
                            const status = getDisclosureStatus(disclosure.id, disclosure.mandatory);
                            
                            return (
                              <div
                                key={disclosure.id}
                                className={`flex items-center gap-2 p-2 rounded text-xs transition-colors cursor-pointer ${
                                  isSelected 
                                    ? "bg-primary/10 border border-primary/20" 
                                    : "hover:bg-muted/30"
                                }`}
                                onClick={() => onDisclosureSelect(disclosure.id)}
                              >
                                <StatusIcon status={status} />
                                <span className={`flex-1 ${
                                  isSelected ? "text-primary font-medium" : ""
                                }`}>
                                  {disclosure.id}
                                </span>
                                <div className="flex items-center gap-1">
                                  {disclosure.mandatory && (
                                    <Badge variant="outline" className="text-xs px-1 py-0">
                                      필수
                                    </Badge>
                                  )}
                                  {status === "completed" && (
                                    <Badge variant="outline" className="text-xs px-1 py-0 bg-green-50 text-green-700">
                                      완료
                                    </Badge>
                                  )}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
      
      {/* 전체 통계 */}
      <div className="mt-6 p-3 bg-muted/30 rounded-lg">
        <h4 className="text-xs font-medium mb-2">전체 진행 현황</h4>
        <div className="space-y-2">
          <div className="flex justify-between text-xs">
            <span>완료됨</span>
            <span>{Object.keys(responses).length}개</span>
          </div>
          <div className="flex justify-between text-xs">
            <span>필수 항목</span>
            <span className="text-orange-600">
              {Object.values(standards).reduce((acc: number, category: any) => {
                return acc + category.standards.reduce((stdAcc: number, standard: any) => {
                  return stdAcc + standard.disclosures.filter((d: any) => d.mandatory).length;
                }, 0);
              }, 0)}개
            </span>
          </div>
        </div>
      </div>
    </div>
  );
} 