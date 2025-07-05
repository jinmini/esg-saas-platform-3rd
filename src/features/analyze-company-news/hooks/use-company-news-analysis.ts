import { useCallback, useState } from 'react';
import { NewsAnalysisParams, NewsAnalysisResponse } from '@/shared/types/api';
import { newsAnalysisService } from '../services/implementation';

export function useCompanyNewsAnalysis() {
  const [data, setData] = useState<NewsAnalysisResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const analyze = useCallback(async (params: NewsAnalysisParams) => {
    setLoading(true);
    setError(null);
    try {
      const result = await newsAnalysisService.analyzeCompanyNews(params);
      setData(result);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }, []);

  return { data, loading, error, analyze };
} 