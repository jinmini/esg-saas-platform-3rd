import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/shared/ui/Card";
import { Target } from "lucide-react";
import { Pillar, Recommendation, Responses } from "../../model";

interface RecommendationFormProps {
  pillar: Pillar | null;
  recommendation: Recommendation | null;
  responses: Responses;
  onResponseChange: (recommendationId: string, value: string) => void;
}

export function RecommendationForm({ pillar, recommendation, responses, onResponseChange }: RecommendationFormProps) {
  if (!pillar || !recommendation) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <h3 className="text-lg font-semibold mb-2">권고사항을 선택하세요</h3>
          <p className="text-muted-foreground">
            왼쪽에서 TCFD 핵심 요소와 권고사항을 선택하여 시작하세요.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center p-6 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className={`p-3 rounded-lg ${pillar.color.replace('text-', 'bg-').replace('-800', '-200')}`}>{pillar.icon}</div>
          <div>
            <h2 className="text-2xl font-bold">{pillar.name}</h2>
            <p className="text-muted-foreground">{recommendation.name}</p>
          </div>
        </div>
        <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
          {recommendation.description}
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            주요 질문 및 가이드라인
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recommendation.questions.map((question: string, index: number) => (
              <div key={index} className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0">
                  {index + 1}
                </div>
                <p className="text-sm">{question}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>정보 공개 내용 작성</CardTitle>
          <CardDescription>
            위 가이드라인을 참고하여 {recommendation.name}에 대한 정보를 작성해주세요.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <textarea
            className="w-full p-4 border rounded-md min-h-[300px] resize-y"
            placeholder={`${recommendation.name}에 대한 상세한 정보를 작성해주세요...\n\n예시 구조:\n- 현재 상황 및 접근 방식\n- 구체적인 프로세스 및 체계\n- 주요 성과 및 지표\n- 향후 계획 및 목표`}
            value={responses[recommendation.id] || ''}
            onChange={(e) => onResponseChange(recommendation.id, e.target.value)}
          />
          {responses[recommendation.id] && (
            <div className="flex items-center gap-2 mt-3">
              <div className="w-2 h-2 bg-green-600 rounded-full" />
              <span className="text-xs text-green-600">
                자동 저장됨 ({new Date().toLocaleTimeString()})
              </span>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
} 