"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Save, 
  Upload, 
  HelpCircle, 
  CheckCircle2, 
  AlertTriangle,
  FileText,
  Calculator,
  Type,
  Calendar
} from "lucide-react";

interface GRIDynamicFormProps {
  disclosure: string;
  onSubmit: (data: any) => void;
}

// GRI 공시사항별 필드 정의
const DISCLOSURE_FIELDS = {
  "305-1": {
    name: "직접 온실가스 배출량(Scope 1)",
    description: "조직이 소유하거나 통제하는 배출원에서 발생하는 직접 온실가스 배출량",
    fields: [
      {
        id: "scope1_total",
        label: "총 직접 온실가스 배출량",
        type: "number",
        unit: "tCO2e",
        required: true,
        placeholder: "45230",
        helpText: "조직의 모든 직접 배출원에서 발생하는 온실가스 총량을 tCO2 equivalent로 입력하세요.",
        autoFilled: true,
        autoValue: "45,230"
      },
      {
        id: "calculation_methodology",
        label: "계산 방법론",
        type: "select",
        options: [
          "IPCC 가이드라인",
          "ISO 14064-1",
          "GHG Protocol",
          "기타"
        ],
        required: true,
        helpText: "온실가스 배출량 계산에 사용한 방법론을 선택하세요."
      },
      {
        id: "emission_factors",
        label: "배출계수 출처",
        type: "textarea",
        required: true,
        placeholder: "IPCC 2006 가이드라인, 환경부 배출계수 등을 명시하세요.",
        helpText: "사용된 배출계수의 출처와 버전을 명시하세요."
      },
      {
        id: "base_year",
        label: "기준년도",
        type: "date",
        required: false,
        helpText: "배출량 비교를 위한 기준년도를 설정하세요."
      },
      {
        id: "verification_status",
        label: "검증 상태",
        type: "select",
        options: [
          "제3자 검증 완료",
          "내부 검토 완료",
          "검증 예정",
          "검증 없음"
        ],
        required: false
      }
    ]
  },
  "302-1": {
    name: "조직 내부 에너지 소비",
    description: "조직 내에서 직접 소비하는 에너지량",
    fields: [
      {
        id: "total_fuel_consumption",
        label: "연료 소비량",
        type: "number",
        unit: "GJ",
        required: true,
        autoFilled: true,
        autoValue: "85,000",
        helpText: "재생불가능한 연료원의 총 소비량을 GJ 단위로 입력하세요."
      },
      {
        id: "total_electricity_consumption",
        label: "전력 소비량",
        type: "number",
        unit: "GJ",
        required: true,
        autoFilled: true,
        autoValue: "125,000",
        helpText: "외부에서 구매한 전력의 총 소비량을 GJ 단위로 입력하세요."
      },
      {
        id: "energy_intensity",
        label: "에너지 집약도",
        type: "number",
        unit: "GJ/백만원 매출",
        required: false,
        helpText: "매출 대비 에너지 소비량을 계산하세요."
      }
    ]
  },
  "201-1": {
    name: "직접적인 경제적 가치의 창출과 배분",
    description: "조직이 창출하고 배분한 직접적인 경제적 가치",
    fields: [
      {
        id: "revenues",
        label: "수익",
        type: "number",
        unit: "백만원",
        required: true,
        helpText: "총 매출액을 백만원 단위로 입력하세요."
      },
      {
        id: "operating_costs",
        label: "운영비용",
        type: "number",
        unit: "백만원",
        required: true,
        helpText: "총 운영비용을 백만원 단위로 입력하세요."
      },
      {
        id: "employee_wages",
        label: "직원 급여 및 복리후생",
        type: "number",
        unit: "백만원",
        required: true,
        helpText: "직원에게 지급한 총 급여 및 복리후생비를 입력하세요."
      }
    ]
  }
};

export function GRIDynamicForm({ disclosure, onSubmit }: GRIDynamicFormProps) {
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const [isSaving, setIsSaving] = useState(false);

  const disclosureInfo = DISCLOSURE_FIELDS[disclosure as keyof typeof DISCLOSURE_FIELDS];

  if (!disclosureInfo) {
    return (
      <Card>
        <CardContent className="py-8 text-center">
          <FileText className="h-8 w-8 mx-auto mb-3 text-muted-foreground" />
          <p className="text-sm text-muted-foreground">
            이 공시사항에 대한 입력 폼이 준비되지 않았습니다.
          </p>
        </CardContent>
      </Card>
    );
  }

  // 자동 입력된 값으로 초기화
  useEffect(() => {
    const autoFilledData: Record<string, any> = {};
    disclosureInfo.fields.forEach(field => {
      if ('autoFilled' in field && field.autoFilled && 'autoValue' in field && field.autoValue) {
        autoFilledData[field.id] = field.autoValue;
      }
    });
    setFormData(autoFilledData);
  }, [disclosure, disclosureInfo.fields]); // disclosure가 변경될 때만 실행

  const handleFieldChange = (fieldId: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [fieldId]: value
    }));
    
    // 검증 오류 제거
    if (validationErrors[fieldId]) {
      setValidationErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[fieldId];
        return newErrors;
      });
    }
  };

  const validateForm = () => {
    const errors: Record<string, string> = {};
    
    disclosureInfo.fields.forEach(field => {
      if (field.required && !formData[field.id]) {
        errors[field.id] = `${field.label}는 필수 입력 항목입니다.`;
      }
      
      if (field.type === 'number' && formData[field.id] && isNaN(Number(formData[field.id]))) {
        errors[field.id] = `${field.label}는 숫자여야 합니다.`;
      }
    });
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;
    
    setIsSaving(true);
    
    // 시뮬레이션된 저장 프로세스
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    onSubmit({
      disclosure,
      data: formData,
      timestamp: new Date().toISOString()
    });
    
    setIsSaving(false);
  };

  const getCompletionProgress = () => {
    const requiredFields = disclosureInfo.fields.filter(f => f.required);
    const completedRequired = requiredFields.filter(f => formData[f.id]).length;
    const optionalFields = disclosureInfo.fields.filter(f => !f.required);
    const completedOptional = optionalFields.filter(f => formData[f.id]).length;
    
    const requiredProgress = requiredFields.length > 0 ? (completedRequired / requiredFields.length) * 70 : 70;
    const optionalProgress = optionalFields.length > 0 ? (completedOptional / optionalFields.length) * 30 : 30;
    
    return Math.round(requiredProgress + optionalProgress);
  };

  const getFieldIcon = (type: string) => {
    switch (type) {
      case 'number': return Calculator;
      case 'textarea': return Type;
      case 'date': return Calendar;
      default: return Type;
    }
  };

  return (
    <div className="space-y-6">
      {/* 폼 헤더 */}
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="text-lg">{disclosureInfo.name}</CardTitle>
              <CardDescription className="mt-1">
                {disclosureInfo.description}
              </CardDescription>
            </div>
            <Badge variant="outline" className="bg-blue-50 text-blue-700">
              {disclosure}
            </Badge>
          </div>
          
          {/* 진행률 */}
          <div className="mt-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">작성 진행률</span>
              <span className="text-sm text-muted-foreground">{getCompletionProgress()}%</span>
            </div>
            <Progress value={getCompletionProgress()} className="h-2" />
          </div>
        </CardHeader>
      </Card>

      {/* 동적 필드 */}
      <Card>
        <CardContent className="p-6">
          <div className="space-y-6">
            {disclosureInfo.fields.map((field) => {
              const FieldIcon = getFieldIcon(field.type);
              const hasError = validationErrors[field.id];
              
              return (
                <div key={field.id} className="space-y-2">
                  <div className="flex items-center gap-2">
                    <FieldIcon className="h-4 w-4 text-muted-foreground" />
                    <Label htmlFor={field.id} className="text-sm font-medium">
                      {field.label}
                      {field.required && <span className="text-red-500 ml-1">*</span>}
                      {field.unit && (
                        <span className="text-muted-foreground ml-2">({field.unit})</span>
                      )}
                    </Label>
                    {'autoFilled' in field && field.autoFilled && (
                      <Badge variant="secondary" className="text-xs bg-green-100 text-green-700">
                        자동입력
                      </Badge>
                    )}
                  </div>
                  
                  {/* 필드 입력 */}
                  <div className="space-y-1">
                    {field.type === 'textarea' ? (
                      <Textarea
                        id={field.id}
                        placeholder={'placeholder' in field ? field.placeholder : ""}
                        value={formData[field.id] || ''}
                        onChange={(e) => handleFieldChange(field.id, e.target.value)}
                        className={hasError ? 'border-red-300' : ''}
                        rows={3}
                      />
                    ) : field.type === 'select' ? (
                      <select
                        id={field.id}
                        value={formData[field.id] || ''}
                        onChange={(e) => handleFieldChange(field.id, e.target.value)}
                        className={`flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring ${
                          hasError ? 'border-red-300' : ''
                        }`}
                      >
                        <option value="">선택하세요</option>
                        {'options' in field && field.options?.map((option: string) => (
                          <option key={option} value={option}>{option}</option>
                        ))}
                      </select>
                    ) : (
                      <Input
                        id={field.id}
                        type={field.type}
                        placeholder={'placeholder' in field ? field.placeholder : ""}
                        value={formData[field.id] || ''}
                        onChange={(e) => handleFieldChange(field.id, e.target.value)}
                        className={hasError ? 'border-red-300' : ''}
                      />
                    )}
                    
                    {/* 도움말 */}
                    {field.helpText && (
                      <div className="flex items-start gap-2 text-xs text-muted-foreground">
                        <HelpCircle className="h-3 w-3 mt-0.5 flex-shrink-0" />
                        <span>{field.helpText}</span>
                      </div>
                    )}
                    
                    {/* 검증 오류 */}
                    {hasError && (
                      <div className="flex items-center gap-2 text-xs text-red-600">
                        <AlertTriangle className="h-3 w-3" />
                        <span>{hasError}</span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* 액션 버튼 */}
      <div className="flex items-center justify-between">
        <Button variant="outline" size="sm">
          <Upload className="h-4 w-4 mr-2" />
          증빙자료 업로드
        </Button>
        
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            onClick={handleSubmit}
            disabled={isSaving}
          >
            <Save className="h-4 w-4 mr-2" />
            임시 저장
          </Button>
          <Button 
            onClick={handleSubmit}
            disabled={isSaving || Object.keys(validationErrors).length > 0}
          >
            {isSaving ? (
              <>저장 중...</>
            ) : (
              <>
                <CheckCircle2 className="h-4 w-4 mr-2" />
                완료
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
} 