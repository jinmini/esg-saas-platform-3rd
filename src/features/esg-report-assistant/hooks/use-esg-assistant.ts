'use client';

import { useState, useCallback } from 'react';
import { getESGReportAssistantService } from '../services/factory';
import { 
  ESGCategory, 
  ESGSuggestion, 
  ValidationResult, 
  LengthGuide, 
  GRIFieldType 
} from '../types';

/**
 * ESG 리포트 어시스턴트 Hook
 * 
 * ESG 리포트 작성을 돕는 모든 기능을 제공하는 React Hook입니다.
 * 서비스 레이어를 추상화하여 컴포넌트에서 쉽게 사용할 수 있습니다.
 */
export function useESGAssistant() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const service = getESGReportAssistantService();

  const identifyCategory = useCallback(async (text: string, context?: string): Promise<ESGCategory | null> => {
    if (!text.trim()) return null;
    
    try {
      setIsLoading(true);
      setError(null);
      const result = await service.identifyESGCategory(text, context);
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : '카테고리 식별 중 오류가 발생했습니다.');
      return null;
    } finally {
      setIsLoading(false);
    }
  }, [service]);

  const getSuggestions = useCallback(async (
    fieldType: GRIFieldType, 
    currentText: string, 
    griContext?: string
  ): Promise<ESGSuggestion[]> => {
    if (!currentText.trim()) return [];
    
    try {
      setIsLoading(true);
      setError(null);
      const result = await service.getSuggestions(fieldType, currentText, griContext);
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : '제안 생성 중 오류가 발생했습니다.');
      return [];
    } finally {
      setIsLoading(false);
    }
  }, [service]);

  const getLengthGuide = useCallback(async (
    fieldType: GRIFieldType, 
    currentLength: number
  ): Promise<LengthGuide | null> => {
    try {
      setIsLoading(true);
      setError(null);
      const result = await service.getLengthGuide(fieldType, currentLength);
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : '길이 가이드 조회 중 오류가 발생했습니다.');
      return null;
    } finally {
      setIsLoading(false);
    }
  }, [service]);

  const validateStyle = useCallback(async (
    text: string, 
    fieldType?: GRIFieldType
  ): Promise<ValidationResult | null> => {
    if (!text.trim()) return null;
    
    try {
      setIsLoading(true);
      setError(null);
      const result = await service.validateReportStyle(text, fieldType);
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : '스타일 검증 중 오류가 발생했습니다.');
      return null;
    } finally {
      setIsLoading(false);
    }
  }, [service]);

  const analyzeText = useCallback(async (
    text: string, 
    fieldType: GRIFieldType, 
    griContext?: string
  ) => {
    if (!text.trim()) return null;
    
    try {
      setIsLoading(true);
      setError(null);
      const result = await service.analyzeText(text, fieldType, griContext);
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : '텍스트 분석 중 오류가 발생했습니다.');
      return null;
    } finally {
      setIsLoading(false);
    }
  }, [service]);

  return {
    // 상태
    isLoading,
    error,
    
    // 메서드
    identifyCategory,
    getSuggestions,
    getLengthGuide,
    validateStyle,
    analyzeText,
    
    // 유틸리티
    clearError: () => setError(null)
  };
} 