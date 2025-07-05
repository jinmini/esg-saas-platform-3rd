'use client';

import { useState, useEffect, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getTcfdFramework } from '../api';
import { Framework, Responses } from './types';

export const useTcfdFramework = () => {
  return useQuery({
    queryKey: ['tcfdFramework'],
    queryFn: getTcfdFramework,
  });
};

export const useTcfdReport = (framework: Framework | undefined) => {
  const [selectedPillar, setSelectedPillar] = useState<string>('governance');
  const [selectedRecommendation, setSelectedRecommendation] = useState<string>('gov-a');
  const [responses, setResponses] = useState<Responses>({});

  const handlePillarSelect = (pillarId: string, firstRecommendationId: string) => {
    setSelectedPillar(pillarId);
    setSelectedRecommendation(firstRecommendationId);
  };

  const handleRecommendationSelect = (recommendationId: string) => {
    setSelectedRecommendation(recommendationId);
  };

  const handleResponseChange = (recommendationId: string, value: string) => {
    setResponses(prev => ({ ...prev, [recommendationId]: value }));
  };

  const currentPillar = useMemo(() => {
    if (!framework) return null;
    return framework[selectedPillar as keyof Framework];
  }, [framework, selectedPillar]);

  const currentRecommendation = useMemo(() => {
    return currentPillar?.recommendations.find(r => r.id === selectedRecommendation);
  }, [currentPillar, selectedRecommendation]);

  useEffect(() => {
    // TODO: 페이지 로직에서 자동 저장/불러오기 기능 이전
  }, []);

  return {
    selectedPillar,
    selectedRecommendation,
    responses,
    handlePillarSelect,
    handleRecommendationSelect,
    handleResponseChange,
    currentPillar,
    currentRecommendation,
    setResponses, // 불러오기 기능을 위해 추가
  };
}; 