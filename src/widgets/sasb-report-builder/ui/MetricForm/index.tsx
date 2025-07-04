import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/shared/ui/Card";
import { Badge } from "@/shared/ui/Badge";
import { categoryColors, getCategoryIcon } from "../../lib";
import { Sector, Responses, Metric } from "../../model";

interface MetricFormProps {
  sector: Sector | null;
  responses: Responses;
  onResponseChange: (metricId: string, value: string) => void;
}

export function MetricForm({ sector, responses, onResponseChange }: MetricFormProps) {
  if (!sector) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <h3 className="text-lg font-semibold mb-2">업종을 선택하세요</h3>
          <p className="text-muted-foreground">
            왼쪽에서 산업 분류와 세부 업종을 선택하여 시작하세요.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center p-6 bg-gradient-to-r from-blue-50 to-green-50 rounded-lg">
        <h2 className="text-2xl font-bold mb-2">{sector.name}</h2>
        <div className="flex justify-center gap-4 mt-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">{sector.metrics.length}</div>
            <div className="text-sm text-muted-foreground">필수 지표</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">
              {Object.values(responses).filter(v => v.trim().length > 0).length}
            </div>
            <div className="text-sm text-muted-foreground">완료된 지표</div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {sector.metrics.map((metric: Metric) => (
          <Card key={metric.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg">{metric.name}</CardTitle>
                  <CardDescription className="font-mono text-sm">
                    {metric.id}
                  </CardDescription>
                </div>
                <Badge 
                  variant="outline" 
                  className={categoryColors[metric.category as keyof typeof categoryColors]}
                >
                  {getCategoryIcon(metric.category)}
                  <span className="ml-1 capitalize">{metric.category}</span>
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">지표 데이터 및 설명</label>
                  <textarea
                    className="w-full mt-2 p-3 border rounded-md min-h-[120px] resize-y"
                    placeholder={`${metric.name}에 대한 데이터와 설명을 입력하세요...`}
                    value={responses[metric.id] || ''}
                    onChange={(e) => onResponseChange(metric.id, e.target.value)}
                  />
                </div>
                {responses[metric.id] && (
                  <div className="text-xs text-green-600 flex items-center gap-1">
                    <div className="w-2 h-2 bg-green-600 rounded-full" />
                    저장됨 ({new Date().toLocaleTimeString()})
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
} 