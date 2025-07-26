import { MaterialityAnalysisResponse, MaterialityAnalysisParams } from '@/shared/types/api';

// 중대성 분석 API 엔드포인트
const API_BASE_URL = process.env.NEXT_PUBLIC_MATERIAL_API_URL 
  ? `${process.env.NEXT_PUBLIC_MATERIAL_API_URL}/materiality`
  : 'https://material-production.up.railway.app/api/v1/materiality';

export const fetchMaterialityAnalysis = async (params: MaterialityAnalysisParams): Promise<MaterialityAnalysisResponse> => {
  const { 
    company_name, 
    year = 2025, 
    include_news = true, 
    max_articles = 100 
  } = params;
  
  // 회사명을 URL 인코딩하여 path parameter로 사용
  const encodedCompany = encodeURIComponent(company_name);
  
  const queryParams = new URLSearchParams();
  queryParams.append('year', year.toString());
  queryParams.append('include_news', include_news.toString());
  queryParams.append('max_articles', max_articles.toString());

  const url = `${API_BASE_URL}/companies/${encodedCompany}/analyze?${queryParams.toString()}`;
  
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error(`"${company_name}" 회사의 중대성 분석을 수행할 수 없습니다.`);
      }
      if (response.status === 500) {
        throw new Error('서버에서 분석 처리 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
      }
      throw new Error(`API 요청 실패: ${response.status} ${response.statusText}`);
    }

    const data: MaterialityAnalysisResponse = await response.json();
    return data;
  } catch (error) {
    console.error('중대성 분석 API 오류:', error);
    throw new Error(error instanceof Error ? error.message : '중대성 분석 중 오류가 발생했습니다.');
  }
}; 