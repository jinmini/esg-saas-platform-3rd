import { useState, useCallback, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getSasbFramework } from '../api';
import { Framework, Sector, Responses } from './types';

// SASB 프레임워크 데이터를 가져오는 훅
export function useSasbFramework() {
  return useQuery<Framework, Error>({
    queryKey: ['sasbFramework'],
    queryFn: getSasbFramework,
    staleTime: Infinity, // 정적 데이터이므로 stale time을 무한으로 설정
  });
}

// SASB 보고서 상태를 관리하는 훅
export function useSasbReport(framework: Framework | undefined) {
  const [selectedIndustry, setSelectedIndustry] = useState<string | null>(null);
  const [selectedSector, setSelectedSector] = useState<string | null>(null);
  const [responses, setResponses] = useState<Responses>({});

  const handleIndustrySelect = useCallback((industryId: string) => {
    setSelectedIndustry(industryId);
    // 산업 변경 시, 해당 산업의 첫 번째 업종을 자동으로 선택
    const industry = framework?.[industryId as keyof typeof framework];
    setSelectedSector(industry?.sectors[0]?.id ?? null);
  }, [framework]);

  const handleSectorSelect = useCallback((sectorId: string) => {
    setSelectedSector(sectorId);
  }, []);

  const handleResponseChange = useCallback((metricId: string, value: string) => {
    setResponses(prev => ({ ...prev, [metricId]: value }));
  }, []);
  
  const currentIndustry = useMemo(() => {
    if (!framework || !selectedIndustry) return null;
    return framework[selectedIndustry as keyof typeof framework];
  }, [framework, selectedIndustry]);

  const currentSector = useMemo(() => {
    return currentIndustry?.sectors.find((s: Sector) => s.id === selectedSector) ?? null;
  }, [currentIndustry, selectedSector]);

  return {
    selectedIndustry,
    selectedSector,
    responses,
    handleIndustrySelect,
    handleSectorSelect,
    handleResponseChange,
    currentIndustry,
    currentSector
  };
} 