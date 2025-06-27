'use client';

import React, { useState, useEffect } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Lightbulb, CheckCircle2, AlertTriangle, Sparkles } from 'lucide-react';
import { 
  getLengthGuide, 
  getSuggestions, 
  validateReportStyle, 
  identifyESGCategory 
} from '@/lib/esg-data-utils';

// As defined in gri3.md
export type GRIFieldType = 'short_text' | 'quantitative' | 'medium_text' | 'long_text';

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
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [validationResult, setValidationResult] = useState<{ isValid: boolean; suggestions: string[] }>({ isValid: true, suggestions: [] });
  const [esgCategory, setEsgCategory] = useState<'E' | 'S' | 'G' | 'unknown'>('unknown');

  const config = getFieldConfig(fieldType);

  // 실시간 분석 및 가이드 업데이트
  useEffect(() => {
    if (value.length > 0) {
      // ESG 카테고리 식별
      setEsgCategory(identifyESGCategory(value + (griContext || '')));
      
      // 텍스트 검증
      setValidationResult(validateReportStyle(value));
      
      // 자동완성 제안 업데이트
      setSuggestions(getSuggestions(fieldType, value, griContext));
    } else {
      setEsgCategory('unknown');
      setValidationResult({ isValid: true, suggestions: [] });
      setSuggestions([]);
    }
  }, [value, fieldType, griContext]);

  // 제안 적용 함수
  const applySuggestion = (suggestion: string) => {
    onChange(suggestion);
    setShowSuggestions(false);
  };

  // 길이 가이드 가져오기
  const lengthGuide = getLengthGuide(fieldType, value.length);

  // ESG 카테고리 색상 매핑
  const getCategoryColor = (category: 'E' | 'S' | 'G' | 'unknown') => {
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
        
        {/* 새로운 AI 제안 버튼 */}
        {suggestions.length > 0 && (
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => setShowSuggestions(!showSuggestions)}
            className="text-purple-600 border-purple-200 hover:bg-purple-50"
          >
            <Sparkles className="w-4 h-4 mr-1" />
            AI 제안 ({suggestions.length})
          </Button>
        )}
      </div>
    );
  };

  const renderSuggestions = () => {
    if (!showSuggestions || suggestions.length === 0) return null;

    return (
      <Card className="mt-2 border-purple-200">
        <CardContent className="p-3">
          <div className="flex items-center gap-2 mb-2">
            <Lightbulb className="w-4 h-4 text-purple-600" />
            <span className="text-sm font-medium text-purple-700">실제 ESG 보고서 기반 제안</span>
          </div>
          <div className="space-y-2">
            {suggestions.map((suggestion, index) => (
              <div 
                key={index}
                className="p-2 bg-gray-50 rounded-md cursor-pointer hover:bg-gray-100 transition-colors"
                onClick={() => applySuggestion(suggestion)}
              >
                <p className="text-sm text-gray-700">{suggestion}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  };

  const renderRealTimeGuide = () => {
    return (
      <div className="mt-2 space-y-2">
        {/* ESG 카테고리 표시 */}
        {esgCategory !== 'unknown' && (
          <div className="flex items-center gap-2">
            <Badge className={getCategoryColor(esgCategory)}>
              {esgCategory === 'E' ? '환경' : esgCategory === 'S' ? '사회' : '지배구조'} ({esgCategory})
            </Badge>
          </div>
        )}

        {/* 길이 가이드 */}
        {lengthGuide && (
          <div className="flex items-center gap-2 text-xs">
            {lengthGuide.includes('✅') ? (
              <CheckCircle2 className="w-3 h-3 text-green-600" />
            ) : (
              <AlertTriangle className="w-3 h-3 text-orange-600" />
            )}
            <span className={lengthGuide.includes('✅') ? 'text-green-600' : 'text-orange-600'}>
              {lengthGuide}
            </span>
          </div>
        )}

        {/* 검증 결과 */}
        {validationResult.suggestions.length > 0 && (
          <div className="space-y-1">
            {validationResult.suggestions.map((suggestion, index) => (
              <div key={index} className="flex items-center gap-2 text-xs text-blue-600">
                <Lightbulb className="w-3 h-3" />
                <span>{suggestion}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="w-full">
      <Textarea
        id={fieldId}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={config.initialRows}
        placeholder={config.placeholder}
        className={`text-sm transition-colors ${
          validationResult.isValid ? 'border-gray-200' : 'border-orange-200 bg-orange-50'
        }`}
      />
      
      {renderTools()}
      {renderSuggestions()}
      {renderRealTimeGuide()}
    </div>
  );
};

export default SmartTextarea;
