// src/components/reports/builder/gri/cascade-selector.tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChevronRight, FileText, Globe, Leaf, Users } from "lucide-react";

interface GRICascadeSelectorProps {
  standards: any;
  onCategorySelect: (category: string) => void;
  onStandardSelect: (standard: string) => void;
  onNext: () => void;
}

const categoryIcons = {
  universal: Globe,
  economic: FileText,
  environmental: Leaf,
  social: Users
};

export function GRICascadeSelector({
  standards,
  onCategorySelect,
  onStandardSelect,
  onNext
}: GRICascadeSelectorProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedStandard, setSelectedStandard] = useState<string | null>(null);

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId);
    onCategorySelect(categoryId);
    setSelectedStandard(null);
  };

  const handleStandardSelect = (standardId: string) => {
    setSelectedStandard(standardId);
    onStandardSelect(standardId);
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-2">GRI Standards 카테고리 선택</h3>
        <p className="text-sm text-muted-foreground mb-4">
          보고서에 포함할 표준 카테고리를 선택하세요
        </p>
      </div>

      {/* 카테고리 선택 */}
      <div className="grid grid-cols-2 gap-4">
        {Object.values(standards).map((category: any) => {
          const Icon = categoryIcons[category.id as keyof typeof categoryIcons];
          const isSelected = selectedCategory === category.id;
          
          return (
            <Card
              key={category.id}
              className={`p-4 cursor-pointer transition-all ${
                isSelected
                  ? "border-primary ring-2 ring-primary/20"
                  : "hover:shadow-md"
              }`}
              onClick={() => handleCategorySelect(category.id)}
            >
              <div className="flex items-start gap-3">
                <div className={`p-2 rounded-lg ${
                  isSelected ? "bg-primary/10" : "bg-muted"
                }`}>
                  <Icon className={`h-5 w-5 ${
                    isSelected ? "text-primary" : "text-muted-foreground"
                  }`} />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-sm">{category.name}</h4>
                  <p className="text-xs text-muted-foreground mt-1">
                    {category.description}
                  </p>
                  <Badge variant="secondary" className="mt-2">
                    {category.standards.length}개 표준
                  </Badge>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* 표준 선택 */}
      {selectedCategory && (
        <div className="mt-6">
          <h4 className="text-base font-medium mb-3">세부 표준 선택</h4>
          <div className="space-y-3">
            {standards[selectedCategory].standards.map((standard: any) => {
              const isSelected = selectedStandard === standard.id;
              
              return (
                <Card
                  key={standard.id}
                  className={`p-4 cursor-pointer transition-all ${
                    isSelected
                      ? "border-primary ring-2 ring-primary/20"
                      : "hover:shadow-sm"
                  }`}
                  onClick={() => handleStandardSelect(standard.id)}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-sm">{standard.id}</span>
                        <span className="text-sm">{standard.name}</span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        {standard.description}
                      </p>
                      {standard.disclosures.length > 0 && (
                        <div className="flex items-center gap-2 mt-2">
                          <Badge variant="outline" className="text-xs">
                            {standard.disclosures.length}개 공시사항
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            필수 {standard.disclosures.filter((d: any) => d.mandatory).length}개
                          </Badge>
                        </div>
                      )}
                    </div>
                    <ChevronRight className={`h-4 w-4 transition-colors ${
                      isSelected ? "text-primary" : "text-muted-foreground"
                    }`} />
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      )}

      {/* 다음 버튼 */}
      {selectedStandard && (
        <div className="flex justify-end mt-6">
          <Button onClick={onNext} size="lg">
            다음 단계로
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
}