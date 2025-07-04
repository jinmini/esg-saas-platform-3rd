import { useQuery, useMutation } from '@tanstack/react-query';
import * as api from '../api';
import { AnalysisFilter, AnalysisResult } from './types';
import { PaginationParams } from '@/shared/types';

const anlysisKeys = {
  all: ['analysis'] as const,
  lists: () => [...anlysisKeys.all, 'list'] as const,
  list: (filters: PaginationParams & AnalysisFilter) => [...anlysisKeys.lists(), filters] as const,
  details: () => [...anlysisKeys.all, 'detail'] as const,
  detail: (id: string) => [...anlysisKeys.details(), id] as const,
  stats: () => [...anlysisKeys.all, 'stats'] as const,
  recents: () => [...anlysisKeys.all, 'recent'] as const,
  recent: (limit: number) => [...anlysisKeys.recents(), limit] as const,
  highRisks: () => [...anlysisKeys.all, 'high-risk'] as const,
  highRisk: (threshold: number) => [...anlysisKeys.highRisks(), threshold] as const,
};

export const useAnalyses = (params: PaginationParams & AnalysisFilter) => {
  return useQuery({
    queryKey: anlysisKeys.list(params),
    queryFn: () => api.getAnalyses(params),
  });
};

export const useAnalysisById = (id: string) => {
  return useQuery({
    queryKey: anlysisKeys.detail(id),
    queryFn: () => api.getAnalysisById(id),
    enabled: !!id,
  });
};

export const useAnalysisStats = () => {
  return useQuery({
    queryKey: anlysisKeys.stats(),
    queryFn: api.getAnalysisStats,
  });
};

export const useAnalyzeTextMutation = () => {
  return useMutation({
    mutationFn: (text: string) => api.analyzeText(text),
  });
};

export const useRecentAnalyses = (limit: number = 10) => {
  return useQuery<AnalysisResult[], Error>({
    queryKey: anlysisKeys.recent(limit),
    queryFn: () => api.getRecentAnalyses(limit),
  });
};

export const useHighRiskAnalyses = (threshold: number = 0.7) => {
  return useQuery<AnalysisResult[], Error>({
    queryKey: anlysisKeys.highRisk(threshold),
    queryFn: () => api.getHighRiskAnalyses(threshold),
  });
}; 