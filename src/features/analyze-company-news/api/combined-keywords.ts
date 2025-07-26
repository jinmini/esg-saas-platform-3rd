import { CombinedKeywordsResponse, CombinedKeywordsParams } from '@/shared/types/api';

// 조합 키워드 검색 API 엔드포인트
const API_BASE_URL = process.env.NEXT_PUBLIC_SASB_API_URL 
  ? `${process.env.NEXT_PUBLIC_SASB_API_URL}/workers/results`
  : 'https://sasb-production.up.railway.app/api/v1/workers/results';

export const fetchCombinedKeywords = async (params: CombinedKeywordsParams = {}): Promise<CombinedKeywordsResponse> => {
  const { max_results = 100 } = params;
  
  const queryParams = new URLSearchParams();
  queryParams.append('max_results', max_results.toString());

  const url = `${API_BASE_URL}/combined-keywords?${queryParams.toString()}`;
  
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`API 요청 실패: ${response.status} ${response.statusText}`);
    }

    const data: CombinedKeywordsResponse = await response.json();
    return data;
  } catch (error) {
    console.error('조합 키워드 검색 API 오류:', error);
    throw new Error(error instanceof Error ? error.message : '조합 키워드 검색 중 오류가 발생했습니다.');
  }
}; 