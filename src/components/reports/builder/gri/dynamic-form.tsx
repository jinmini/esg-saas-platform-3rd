'use client';

import React from 'react';
import { griData } from '@/lib/gri-parser';
import { GriRequirement } from '@/types/gri';
import SmartTextarea from './smart-textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

interface GRIDynamicFormProps {
  category: string;
  standardId: string;
  onResponseChange: (disclosureId: string, value: string) => void;
  initialResponses: Record<string, string>;
}

export const GRIDynamicForm = ({ 
  category, 
  standardId, 
  onResponseChange, 
  initialResponses 
}: GRIDynamicFormProps) => {

  const standardData = griData[category]?.[standardId];

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
          <div key={reqId}>
            <label htmlFor={reqId} className="block text-sm font-medium text-gray-700 mb-2">
              {requirement.requirement}
            </label>
            <SmartTextarea
              fieldId={reqId}
              fieldType={requirement.type}
              value={initialResponses[reqId] || ''}
              onChange={(value) => onResponseChange(reqId, value)}
            />
            <div className="text-xs text-gray-500 mt-2">
              <p><span className="font-semibold">Sample:</span> {requirement.sample}</p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
