'use client';

import React, { useState, useEffect } from 'react';
import { Textarea } from '@/shared/ui/TextArea';
import { Button } from '@/shared/ui/Button';
import { Badge } from '@/shared/ui/Badge';
import { Card, CardContent } from '@/shared/ui/Card';
import { Lightbulb, CheckCircle2, AlertTriangle, Sparkles, Loader2 } from 'lucide-react';
import { useESGAssistant, type GRIFieldType, type ESGCategory } from '@/features/esg-report-assistant';

interface SmartTextareaProps {
  fieldId: string;
  fieldType: GRIFieldType;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  initialRows?: number;
  griContext?: string; // GRI 표준 컨텍스트 (예: "GRI 305-1 직접 온실가스 배출량")
}

const getFieldConfig = (type: GRIFieldType) => {
  // Based on SMART_FIELD_CONFIG from gri3.md
  const defaultConfig = {
    initialRows: 3,
    maxRows: 10,
    placeholder: "내용을 입력해주세요...",
    tools: [] as string[],
  };

  switch (type) {
    case 'short_text':
      return { ...defaultConfig, initialRows: 1, maxRows: 3, placeholder: "간단히 입력해주세요 (예: 회사명, 주소 등)" };
    case 'quantitative':
      return { ...defaultConfig, initialRows: 2, tools: ["calculator", "unit_converter"], placeholder: "숫자 데이터와 설명을 함께 입력해주세요\n예: 총 425,000 TJ (유연탄 350,000 TJ, LNG 75,000 TJ)" };
    case 'medium_text':
      return { ...defaultConfig, initialRows: 4, maxRows: 8, placeholder: "구체적인 설명을 입력해주세요..." };
    case 'long_text':
      return { ...defaultConfig, initialRows: 6, maxRows: 15, tools: ["formatting", "bullet_points", "templates"], placeholder: "상세한 설명을 입력해주세요. 필요시 구조화된 형태로 작성하세요..." };
    default:
      return defaultConfig;
  }
};

const SmartTextarea = ({ 
  fieldId, 
  fieldType, 
  value, 
  onChange, 
  griContext 
}: SmartTextareaProps) => {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [analysis, setAnalysis] = useState<{
    category: ESGCategory;
    lengthGuide: any;
    validation: any;
    suggestions: any[];
  } | null>(null);

  const { 
    isLoading, 
    error, 
    analyzeText, 
    clearError 
  } = useESGAssistant();

  const config = getFieldConfig(fieldType);

  // 실시간 분석 및 가이드 업데이트
  useEffect(() => {
    const analyzeCurrentText = async () => {
      if (value.length > 0) {
        const result = await analyzeText(value, fieldType, griContext);
        if (result) {
          setAnalysis(result);
        }
      } else {
        setAnalysis(null);
      }
    };

    // 디바운싱: 500ms 후에 분석 실행
    const timeoutId = setTimeout(analyzeCurrentText, 500);
    return () => clearTimeout(timeoutId);
  }, [value, fieldType, griContext, analyzeText]);

  // 제안 적용 함수
  const applySuggestion = (suggestion: string) => {
    onChange(suggestion);
    setShowSuggestions(false);
  };

  // ESG 카테고리 색상 매핑
  const getCategoryColor = (category: ESGCategory) => {
    switch (category) {
      case 'E': return 'bg-green-100 text-green-800';
      case 'S': return 'bg-blue-100 text-blue-800';
      case 'G': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const renderTools = () => {
    if (config.tools.length === 0) return null;

    return (
      <div className="flex items-center gap-2 mt-2">
        {fieldType === 'quantitative' && (
          <>
            <Button variant="outline" size="sm">📊 단위 변환기</Button>
            <Button variant="outline" size="sm">🧮 계산기</Button>
          </>
        )}
        {fieldType === 'long_text' && (
          <>
            <Button variant="outline" size="sm">📝 템플릿</Button>
            <Button variant="outline" size="sm">📋 구조화</Button>
            <Button variant="outline" size="sm">💡 가이드</Button>
          </>
        )}
        
        {/* AI 제안 버튼 */}
        {analysis?.suggestions && analysis.suggestions.length > 0 && (
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => setShowSuggestions(!showSuggestions)}
            className="text-purple-600 border-purple-200 hover:bg-purple-50"
            disabled={isLoading}
          >
            {isLoading ? (
              <Loader2 className="w-4 h-4 mr-1 animate-spin" />
            ) : (
              <Sparkles className="w-4 h-4 mr-1" />
            )}
            AI 제안 ({analysis.suggestions.length})
          </Button>
        )}
      </div>
    );
  };

  const renderSuggestions = () => {
    if (!showSuggestions || !analysis?.suggestions || analysis.suggestions.length === 0) return null;

    return (
      <Card className="mt-2 border-purple-200">
        <CardContent className="p-3">
          <div className="flex items-center gap-2 mb-2">
            <Lightbulb className="w-4 h-4 text-purple-600" />
            <span className="text-sm font-medium text-purple-700">실제 ESG 보고서 기반 제안</span>
          </div>
          <div className="space-y-2">
            {analysis.suggestions.map((suggestion, index) => (
              <div 
                key={index}
                className="p-2 bg-gray-50 rounded-md cursor-pointer hover:bg-gray-100 transition-colors"
                onClick={() => applySuggestion(suggestion.text)}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-gray-500 capitalize">
                    {suggestion.source === 'similar_context' ? '유사 맥락' : 
                     suggestion.source === 'field_type' ? '필드 타입' : '템플릿'}
                  </span>
                  <span className="text-xs text-gray-500">
                    신뢰도: {Math.round(suggestion.confidence * 100)}%
                  </span>
                </div>
                <p className="text-sm text-gray-700">{suggestion.text}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  };

  const renderRealTimeGuide = () => {
    if (!analysis) return null;

    return (
      <div className="mt-2 space-y-2">
        {/* ESG 카테고리 표시 */}
        {analysis.category !== 'unknown' && (
          <div className="flex items-center gap-2">
            <Badge className={getCategoryColor(analysis.category)}>
              {analysis.category === 'E' ? '환경' : 
               analysis.category === 'S' ? '사회' : '지배구조'} ({analysis.category})
            </Badge>
          </div>
        )}

        {/* 길이 가이드 */}
        {analysis.lengthGuide && (
          <div className="flex items-center gap-2 text-xs">
            {analysis.lengthGuide.status === 'ideal' ? (
              <CheckCircle2 className="w-3 h-3 text-green-600" />
            ) : (
              <AlertTriangle className="w-3 h-3 text-orange-600" />
            )}
            <span className={
              analysis.lengthGuide.status === 'ideal' 
                ? 'text-green-600' 
                : 'text-orange-600'
            }>
              {analysis.lengthGuide.message}
            </span>
          </div>
        )}

        {/* 검증 결과 */}
        {analysis.validation?.suggestions && analysis.validation.suggestions.length > 0 && (
          <div className="space-y-1">
            {analysis.validation.suggestions.map((suggestion: string, index: number) => (
              <div key={index} className="flex items-center gap-2 text-xs text-blue-600">
                <Lightbulb className="w-3 h-3" />
                <span>{suggestion}</span>
              </div>
            ))}
          </div>
        )}

        {/* 에러 표시 */}
        {error && (
          <div className="flex items-center gap-2 text-xs text-red-600">
            <AlertTriangle className="w-3 h-3" />
            <span>{error}</span>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={clearError}
              className="text-xs p-0 h-auto"
            >
              닫기
            </Button>
          </div>
        )}

        {/* 로딩 상태 */}
        {isLoading && (
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <Loader2 className="w-3 h-3 animate-spin" />
            <span>AI가 텍스트를 분석하고 있습니다...</span>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-2">
      <Textarea
        id={fieldId}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={config.placeholder}
        rows={config.initialRows}
        className="min-h-[80px] resize-y"
        style={{ maxHeight: `${config.maxRows * 1.5}rem` }}
      />
      
      {renderTools()}
      {renderSuggestions()}
      {renderRealTimeGuide()}
    </div>
  );
};

export default SmartTextarea;
