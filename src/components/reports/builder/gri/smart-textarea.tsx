'use client';

import React from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

// As defined in gri3.md
export type GRIFieldType = 'short_text' | 'quantitative' | 'medium_text' | 'long_text';

interface SmartTextareaProps {
  fieldId: string;
  fieldType: GRIFieldType;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  initialRows?: number;
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

const SmartTextarea = ({ fieldId, fieldType, value, onChange }: SmartTextareaProps) => {
  const config = getFieldConfig(fieldType);

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
        className="text-sm"
      />
      {renderTools()}
      {/* Placeholder for real-time guide */}
      {/* <div className="mt-2 text-xs text-muted-foreground">
        {getFieldGuide(fieldId, value)}
      </div> */}
    </div>
  );
};

export default SmartTextarea;
