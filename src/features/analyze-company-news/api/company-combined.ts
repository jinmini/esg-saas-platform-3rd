import { CompanyCombinedResponse, CompanyCombinedParams, SUPPORTED_COMPANIES } from '@/shared/types/api';

// 회사별 조합 검색 API 엔드포인트
const API_BASE_URL = process.env.NEXT_PUBLIC_SASB_API_URL 
  ? `${process.env.NEXT_PUBLIC_SASB_API_URL}/workers/results`
  : 'https://sasb-production.up.railway.app/api/v1/workers/results';

export const fetchCompanyCombined = async (params: CompanyCombinedParams): Promise<CompanyCombinedResponse> => {
  const { company, max_results = 100 } = params;
  
  // MVP 단계: 지원하는 회사인지 확인
  if (!SUPPORTED_COMPANIES.includes(company as any)) {
    throw new Error(`현재 MVP 단계에서는 "${SUPPORTED_COMPANIES.join('", "')}" 회사만 지원합니다.`);
  }
  
  const queryParams = new URLSearchParams();
  queryParams.append('max_results', max_results.toString());

  // 회사명을 URL 인코딩하여 path parameter로 사용
  const encodedCompany = encodeURIComponent(company);
  const url = `${API_BASE_URL}/company-combined/${encodedCompany}?${queryParams.toString()}`;
  
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error(`"${company}" 회사의 분석 결과를 찾을 수 없습니다.`);
      }
      throw new Error(`API 요청 실패: ${response.status} ${response.statusText}`);
    }

    const data: CompanyCombinedResponse = await response.json();
    return data;
  } catch (error) {
    console.error('회사별 조합 검색 API 오류:', error);
    throw new Error(error instanceof Error ? error.message : '회사별 조합 검색 중 오류가 발생했습니다.');
  }
}; 