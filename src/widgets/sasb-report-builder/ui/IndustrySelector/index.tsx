import React from "react";
import { Card, CardContent } from "@/shared/ui/Card";
import { Badge } from "@/shared/ui/Badge";
import { categoryColors, getCategoryIcon } from "../../lib";
import { Framework, Industry, Sector } from "../../model";

interface IndustrySelectorProps {
  industries: Framework;
  selectedIndustry: string | null;
  selectedSector: string | null;
  onIndustrySelect: (industryId: string) => void;
  onSectorSelect: (sectorId: string) => void;
}

export function IndustrySelector({
  industries,
  selectedIndustry,
  selectedSector,
  onIndustrySelect,
  onSectorSelect
}: IndustrySelectorProps) {
  const currentIndustry = selectedIndustry ? industries[selectedIndustry as keyof Framework] : null;

  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-semibold mb-3">산업 분류</h3>
        <div className="space-y-2">
          {Object.values(industries).map((industry: Industry) => (
            <Card 
              key={industry.id}
              className={`cursor-pointer transition-all duration-200 ${
                selectedIndustry === industry.id 
                  ? 'ring-2 ring-blue-500 bg-blue-50' 
                  : 'hover:bg-gray-50'
              }`}
              onClick={() => {
                onIndustrySelect(industry.id);
              }}
            >
              <CardContent className="p-3">
                <h4 className="font-medium text-sm">{industry.name}</h4>
                <p className="text-xs text-muted-foreground">{industry.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {currentIndustry && (
        <div>
          <h3 className="font-semibold mb-3">세부 업종</h3>
          <div className="space-y-2">
            {currentIndustry.sectors.map((sector: Sector) => (
              <Card 
                key={sector.id}
                className={`cursor-pointer transition-all duration-200 ${
                  selectedSector === sector.id 
                    ? 'ring-2 ring-green-500 bg-green-50' 
                    : 'hover:bg-gray-50'
                }`}
                onClick={() => onSectorSelect(sector.id)}
              >
                <CardContent className="p-3">
                  <h4 className="font-medium text-sm">{sector.name}</h4>
                  <div className="flex gap-1 mt-2">
                    {sector.metrics.map((metric) => (
                      <Badge 
                        key={metric.id} 
                        variant="outline" 
                        className={`text-xs ${categoryColors[metric.category as keyof typeof categoryColors]}`}
                      >
                        {getCategoryIcon(metric.category)}
                        <span className="ml-1">{metric.category}</span>
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
} 