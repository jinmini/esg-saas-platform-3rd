import React from "react";
import { Card, CardContent } from "@/shared/ui/Card";
import { Badge } from "@/shared/ui/Badge";
import { tcfdPillarColors, getTcfdPillarIcon } from "../../lib";
import { Framework, Pillar, Recommendation, Responses } from "../../model";

interface PillarSelectorProps {
  pillars: Framework;
  selectedPillar: string;
  selectedRecommendation: string;
  responses: Responses;
  onPillarSelect: (pillarId: string, firstRecommendationId: string) => void;
  onRecommendationSelect: (recommendationId: string) => void;
}

export function PillarSelector({
  pillars,
  selectedPillar,
  selectedRecommendation,
  responses,
  onPillarSelect,
  onRecommendationSelect
}: PillarSelectorProps) {
  const currentPillar = selectedPillar ? pillars[selectedPillar as keyof Framework] : null;

  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-semibold mb-3">TCFD 4대 핵심 요소</h3>
        <div className="space-y-3">
          {Object.values(pillars).map((pillar: Pillar) => (
            <Card 
              key={pillar.id}
              className={`cursor-pointer transition-all duration-200 ${
                selectedPillar === pillar.id 
                  ? 'ring-2 ring-blue-500 bg-blue-50' 
                  : 'hover:bg-gray-50'
              }`}
              onClick={() => onPillarSelect(pillar.id, pillar.recommendations[0].id)}
            >
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <div className={`p-2 rounded-lg ${tcfdPillarColors[pillar.id as keyof typeof tcfdPillarColors].replace('text-', 'bg-').replace('-800', '-200')}`}>{getTcfdPillarIcon(pillar.id)}</div>
                  <div className="flex-1">
                    <h4 className="font-medium text-sm">{pillar.name}</h4>
                    <p className="text-xs text-muted-foreground mt-1">{pillar.description}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge variant="outline" className={tcfdPillarColors[pillar.id as keyof typeof tcfdPillarColors]}>
                        {pillar.recommendations.length}개 권고사항
                      </Badge>
                      <div className="flex items-center gap-1">
                        {pillar.recommendations.map((rec: Recommendation) => (
                          <div 
                            key={rec.id}
                            className={`w-2 h-2 rounded-full ${
                              responses[rec.id]?.trim().length > 0 
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
      {currentPillar && (
        <div>
          <h3 className="font-semibold mb-3">권고사항</h3>
          <div className="space-y-2">
            {currentPillar.recommendations.map((recommendation: Recommendation) => (
              <Card 
                key={recommendation.id}
                className={`cursor-pointer transition-all duration-200 ${
                  selectedRecommendation === recommendation.id 
                    ? 'ring-2 ring-green-500 bg-green-50' 
                    : 'hover:bg-gray-50'
                }`}
                onClick={() => onRecommendationSelect(recommendation.id)}
              >
                <CardContent className="p-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="font-medium text-sm">{recommendation.name}</h4>
                      <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                        {recommendation.description}
                      </p>
                    </div>
                    {responses[recommendation.id]?.trim().length > 0 ? (
                      <div className="h-4 w-4 rounded-full bg-green-600 ml-2 flex-shrink-0" />
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
  );
} 