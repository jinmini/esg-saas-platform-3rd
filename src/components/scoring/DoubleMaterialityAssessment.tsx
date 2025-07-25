import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/Card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/ui/Tabs';
import { Badge } from '@/shared/ui/Badge';
import { ScoreSlider } from './ScoreSlider';
import { Label } from '@/shared/ui/Label';
import { 
  TrendingUp,  
  Globe, 
  DollarSign,
  Info
} from 'lucide-react';

interface DoubleMaterialityProps {
  issue: {
    id: string;
    title: string;
    category: 'Environmental' | 'Social' | 'Governance';
    description?: string;
  };
  evaluation: {
    impactMateriality: {
      scale: number;
      scope: number;
      irreversibility: number;
      overall: number;
    };
    financialMateriality: {
      probability: number;
      magnitude: number;
      timeHorizon: 'short' | 'medium' | 'long';
      overall: number;
    };
    notes?: string;
  };
  onUpdate: (evaluation: any) => void;
}

export function DoubleMaterialityAssessment({ 
  issue, 
  evaluation, 
  onUpdate 
}: DoubleMaterialityProps) {
  const [activeTab, setActiveTab] = useState<'impact' | 'financial'>('impact');

  // 영향중대성 업데이트
  const updateImpactMateriality = (field: string, value: number) => {
    const updated = {
      ...evaluation,
      impactMateriality: {
        ...evaluation.impactMateriality,
        [field]: value
      }
    };
    
    // 전체 점수 계산 (Scale, Scope, Irreversibility 평균)
    const { scale, scope, irreversibility } = updated.impactMateriality;
    updated.impactMateriality.overall = Math.round((scale + scope + irreversibility) / 3 * 10) / 10;
    
    onUpdate(updated);
  };

  // 재무중대성 업데이트
  const updateFinancialMateriality = (field: string, value: number | string) => {
    const updated = {
      ...evaluation,
      financialMateriality: {
        ...evaluation.financialMateriality,
        [field]: value
      }
    };
    
    // 전체 점수 계산 (Probability × Magnitude)
    const { probability, magnitude } = updated.financialMateriality;
    updated.financialMateriality.overall = Math.round(probability * magnitude / 5 * 10) / 10;
    
    onUpdate(updated);
  };

  return (
    <div className="space-y-6">
      {/* 이슈 정보 */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Globe className="h-5 w-5 text-blue-600" />
              </div>
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900 mb-2">{issue.title}</h3>
              <div className="flex items-center space-x-3 mb-3">
                <Badge variant="outline">
                  {issue.category}
                </Badge>
                <span className="text-sm text-gray-500">
                  영향중대성: {evaluation.impactMateriality.overall}/5 | 
                  재무중대성: {evaluation.financialMateriality.overall}/5
                </span>
              </div>
              {issue.description && (
                <p className="text-sm text-gray-600">{issue.description}</p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ESRS 이중중대성 평가 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <TrendingUp className="h-5 w-5" />
            <span>ESRS 이중중대성 평가 (Double Materiality Assessment)</span>
          </CardTitle>
          <div className="text-sm text-gray-600">
            ESRS 표준에 따른 영향중대성과 재무중대성을 각각 평가합니다
          </div>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as 'impact' | 'financial')}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="impact" className="flex items-center space-x-2">
                <Globe className="h-4 w-4" />
                <span>영향중대성 (Impact Materiality)</span>
              </TabsTrigger>
              <TabsTrigger value="financial" className="flex items-center space-x-2">
                <DollarSign className="h-4 w-4" />
                <span>재무중대성 (Financial Materiality)</span>
              </TabsTrigger>
            </TabsList>

            {/* 영향중대성 탭 */}
            <TabsContent value="impact" className="space-y-6 mt-6">
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="flex items-start space-x-3">
                  <Info className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-blue-900 mb-1">영향중대성이란?</h4>
                    <p className="text-sm text-blue-700">
                      기업의 활동이 환경, 사회, 지배구조에 미치는 <strong>실제적·잠재적 영향</strong>의 중대성을 평가합니다.
                      Scale(규모), Scope(범위), Irreversibility(비가역성)을 종합적으로 고려합니다.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <ScoreSlider
                  label="📏 규모 (Scale)"
                  value={evaluation.impactMateriality.scale}
                  onChange={(value) => updateImpactMateriality('scale', value)}
                  description="영향의 심각성이나 강도 정도 (예: 온실가스 배출량, 영향받는 인구 수)"
                  min={1}
                  max={5}
                />

                <ScoreSlider
                  label="🌐 범위 (Scope)"
                  value={evaluation.impactMateriality.scope}
                  onChange={(value) => updateImpactMateriality('scope', value)}
                  description="영향이 미치는 지리적 범위나 대상 범위 (지역적 vs 글로벌)"
                  min={1}
                  max={5}
                />

                <ScoreSlider
                  label="🔄 비가역성 (Irreversibility)"
                  value={evaluation.impactMateriality.irreversibility}
                  onChange={(value) => updateImpactMateriality('irreversibility', value)}
                  description="영향의 되돌릴 수 없는 정도 (복구 가능성의 반대 개념)"
                  min={1}
                  max={5}
                />

                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-gray-700">영향중대성 종합 점수</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl font-bold text-blue-600">
                        {evaluation.impactMateriality.overall}
                      </span>
                      <span className="text-gray-500">/5</span>
                    </div>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    계산: (규모 + 범위 + 비가역성) ÷ 3
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* 재무중대성 탭 */}
            <TabsContent value="financial" className="space-y-6 mt-6">
              <div className="bg-green-50 p-4 rounded-lg">
                <div className="flex items-start space-x-3">
                  <Info className="h-5 w-5 text-green-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-green-900 mb-1">재무중대성이란?</h4>
                    <p className="text-sm text-green-700">
                      지속가능성 관련 <strong>위험과 기회</strong>가 기업의 재무성과에 미치는 영향의 중대성을 평가합니다.
                      발생 확률과 재무적 영향 규모를 종합적으로 고려합니다.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <ScoreSlider
                  label="📊 발생 확률 (Probability)"
                  value={evaluation.financialMateriality.probability}
                  onChange={(value) => updateFinancialMateriality('probability', value)}
                  description="해당 위험이나 기회가 실제로 발생할 가능성"
                  min={1}
                  max={5}
                />

                <ScoreSlider
                  label="💰 재무 영향 규모 (Financial Magnitude)"
                  value={evaluation.financialMateriality.magnitude}
                  onChange={(value) => updateFinancialMateriality('magnitude', value)}
                  description="발생 시 기업의 재무성과(매출, 비용, 자산가치)에 미치는 영향 크기"
                  min={1}
                  max={5}
                />

                <div>
                  <Label className="text-sm font-medium mb-3 block">
                    ⏰ 시간 범위 (Time Horizon)
                  </Label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { value: 'short', label: '단기 (1년 이내)', color: 'bg-red-100 text-red-700' },
                      { value: 'medium', label: '중기 (1-5년)', color: 'bg-yellow-100 text-yellow-700' },
                      { value: 'long', label: '장기 (5년 이상)', color: 'bg-blue-100 text-blue-700' }
                    ].map((option) => (
                      <button
                        key={option.value}
                        onClick={() => updateFinancialMateriality('timeHorizon', option.value)}
                        className={`p-3 rounded-lg text-xs font-medium border-2 transition-all ${
                          evaluation.financialMateriality.timeHorizon === option.value
                            ? `${option.color} border-current`
                            : 'bg-gray-50 text-gray-600 border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-gray-700">재무중대성 종합 점수</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl font-bold text-green-600">
                        {evaluation.financialMateriality.overall}
                      </span>
                      <span className="text-gray-500">/5</span>
                    </div>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    계산: (발생확률 × 재무영향규모) ÷ 5
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>

          {/* 평가 근거 */}
          <div className="mt-6 space-y-2">
            <Label htmlFor="notes" className="text-sm font-medium">
              📝 평가 근거 및 참고사항
            </Label>
            <textarea
              id="notes"
              value={evaluation.notes || ''}
              onChange={(e) => onUpdate({ ...evaluation, notes: e.target.value })}
              placeholder="평가 근거, 데이터 출처, 주요 가정사항 등을 기록해주세요..."
              className="w-full p-3 border border-gray-300 rounded-md resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              rows={3}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 