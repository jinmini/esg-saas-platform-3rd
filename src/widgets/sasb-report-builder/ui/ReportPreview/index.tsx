import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/shared/ui/Card";
import { Industry, Sector, Responses } from "../../model";

interface ReportPreviewProps {
  industry: Industry | null;
  sector: Sector | null;
  responses: Responses;
}

export function ReportPreview({ industry, sector, responses }: ReportPreviewProps) {
  if (!industry || !sector) {
    return (
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">SASB 지속가능성 보고서</h2>
        <p className="text-muted-foreground">업종을 선택하세요</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">SASB 지속가능성 보고서</h2>
        <p className="text-muted-foreground">
          {industry.name} - {sector.name}
        </p>
      </div>
      {sector.metrics.map((metric) => (
        <Card key={metric.id}>
          <CardHeader>
            <CardTitle className="text-lg">{metric.name}</CardTitle>
            <CardDescription className="font-mono">{metric.id}</CardDescription>
          </CardHeader>
          <CardContent>
            {responses[metric.id] ? (
              <div className="whitespace-pre-wrap">{responses[metric.id]}</div>
            ) : (
              <div className="text-muted-foreground italic">데이터 입력 필요</div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
} 