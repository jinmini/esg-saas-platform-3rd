import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/shared/ui/Card";
import { tcfdPillarColors } from "../constants/colors";
import { getTcfdPillarIcon } from "../constants/icons";

interface ReportPreviewProps {
  pillars: any;
  responses: Record<string, string>;
}

export function ReportPreview({ pillars, responses }: ReportPreviewProps) {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">TCFD 기후변화 정보공개 보고서</h2>
        <p className="text-muted-foreground">
          Task Force on Climate-related Financial Disclosures
        </p>
      </div>
      {Object.values(pillars).map((pillar: any) => (
        <Card key={pillar.id}>
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <div className={`p-2 rounded-lg ${tcfdPillarColors[pillar.id as keyof typeof tcfdPillarColors].replace('text-', 'bg-').replace('-800', '-200')}`}>{getTcfdPillarIcon(pillar.id)}</div>
              {pillar.name}
            </CardTitle>
            <CardDescription>{pillar.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {pillar.recommendations.map((recommendation: any) => (
                <div key={recommendation.id} className="border-l-4 border-blue-200 pl-4">
                  <h4 className="font-medium mb-2">{recommendation.name}</h4>
                  {responses[recommendation.id] ? (
                    <div className="whitespace-pre-wrap text-sm">{responses[recommendation.id]}</div>
                  ) : (
                    <div className="text-muted-foreground italic text-sm">정보 입력 필요</div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
} 