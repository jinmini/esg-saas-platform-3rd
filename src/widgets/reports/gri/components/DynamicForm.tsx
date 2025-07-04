 'use client';

import React from 'react';
import { mockGriData } from '@/shared/lib/mocks/gri-mock-data';
import { GriRequirement, GRIResponse } from '@/shared/types/gri';
import SmartTextarea from './smart-textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/shared/ui/Card";
import { Input } from "@/shared/ui/Input";
import { Label } from "@/shared/ui/Label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/ui/Select";


interface GRIDynamicFormProps {
  category: string;
  standardId: string;
  onResponseChange: (disclosureId: string, value: string) => void;
  initialResponses: Record<string, GRIResponse>;
}

const renderField = (requirement: GriRequirement, value: string, onChange: (value: string) => void, reqId: string, griContext?: string) => {
  switch (requirement.type) {
    case 'short_text':
      return (
        <Input
          id={reqId}
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={requirement.sample}
          className="w-full"
        />
      );
    
    case 'quantitative':
      return (
        <div className="flex gap-2">
          <Input
            id={reqId}
            type="number"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="숫자를 입력하세요"
            className="flex-1"
          />
          {requirement.unit && (
            <div className="flex items-center px-3 bg-gray-50 border rounded-md text-sm text-gray-600">
              {requirement.unit}
            </div>
          )}
        </div>
      );
    
    case 'date':
      return (
        <Input
          id={reqId}
          type="date"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full"
        />
      );
    
    case 'file_upload':
      return (
        <div className="space-y-2">
          <Input
            id={reqId}
            type="file"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                onChange(file.name);
              }
            }}
            className="w-full"
          />
          {value && (
            <div className="text-sm text-gray-600">
              선택된 파일: {value}
            </div>
          )}
        </div>
      );
    
    case 'select':
      if (requirement.options) {
        return (
          <Select value={value} onValueChange={onChange}>
            <SelectTrigger>
              <SelectValue placeholder="옵션을 선택하세요" />
            </SelectTrigger>
            <SelectContent>
              {requirement.options.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );
      }
      // Fallback to text input if no options provided
      return (
        <Input
          id={reqId}
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={requirement.sample}
          className="w-full"
        />
      );
    
    case 'medium_text':
    case 'long_text':
    default:
      return (
        <SmartTextarea
          fieldId={reqId}
          fieldType={requirement.type}
          value={value}
          onChange={onChange}
          griContext={griContext}
        />
      );
  }
};

export const GRIDynamicForm = ({ 
  category, 
  standardId, 
  onResponseChange, 
  initialResponses 
}: GRIDynamicFormProps) => {

  const standardData = mockGriData[category]?.[standardId];

  if (!standardData) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>데이터 없음</CardTitle>
        </CardHeader>
        <CardContent>
          <p>선택된 표준에 대한 공시 항목을 찾을 수 없습니다.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{standardId}</CardTitle>
        <CardDescription>{standardData.sample || '이 표준에 대한 설명이 없습니다.'}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {Object.entries(standardData.requirements).map(([reqId, requirement]: [string, GriRequirement]) => (
          <div key={reqId} className="space-y-2">
            <Label htmlFor={reqId} className="block text-sm font-medium text-gray-700">
              {requirement.requirement}
            </Label>
            {renderField(
              requirement,
              initialResponses[reqId]?.content || '',
              (value) => onResponseChange(reqId, value),
              reqId,
              `${standardId} ${requirement.title}`
            )}
            <div className="text-xs text-gray-500">
              <p><span className="font-semibold">유형:</span> {requirement.type}</p>
              <p><span className="font-semibold">예시:</span> {requirement.sample}</p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
