import { useQuery, useMutation } from '@tanstack/react-query';
import { getGRIData, generateGRIReport } from '../api';

export function useGRIData() {
  return useQuery({
    queryKey: ['gri-data'],
    queryFn: getGRIData,
    staleTime: 10 * 60 * 1000, // 10분
  });
}

export function useGenerateGRIReport() {
  return useMutation({
    mutationFn: generateGRIReport,
  });
} 