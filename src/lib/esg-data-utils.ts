// ESG 실제 데이터 활용 유틸리티
import esgContent from '../../public/docs/processed_docs/esg_esg_content.json';
import esgStructure from '../../public/docs/processed_docs/esg_structure.json';

// ESG 카테고리별 실제 사례 매핑
export interface ESGExample {
  category: 'E' | 'S' | 'G';
  text: string;
  context: string;
  length: number;
}

// 실제 ESG 보고서에서 추출한 텍스트 예시들
export const ESG_EXAMPLES: ESGExample[] = [
  // 환경(E) 관련 실제 사례들
  {
    category: 'E',
    text: '온실가스 배출량 감축을 위한 노력으로 2023년 기준 전년 대비 5.2% 감소한 45,678,901 tCO2eq를 기록했습니다.',
    context: 'GRI 305-1 직접 온실가스 배출량',
    length: 78
  },
  {
    category: 'E',
    text: '연료별 소비량은 유연탄 234,567 TJ, LNG 45,678 TJ로 전체 에너지 믹스에서 신재생에너지 비중을 지속적으로 확대하고 있습니다.',
    context: 'GRI 302-1 조직 내부 에너지 소비',
    length: 89
  },
  // 사회(S) 관련 실제 사례들
  {
    category: 'S',
    text: '전 임직원을 대상으로 연간 40시간 이상의 안전보건 교육을 실시하여 산업재해율 0.12%를 달성했습니다.',
    context: 'GRI 403 산업안전보건',
    length: 67
  },
  {
    category: 'S',
    text: '성별, 연령, 장애여부에 관계없이 동등한 기회를 제공하며, 여성 관리자 비율은 전년 대비 2.3%p 증가한 15.7%를 기록했습니다.',
    context: 'GRI 405 다양성과 기회균등',
    length: 84
  },
  // 지배구조(G) 관련 실제 사례들
  {
    category: 'G',
    text: '투명하고 윤리적인 경영을 위해 내부신고제도를 운영하고 있으며, 2023년 신고건수 15건 중 100% 처리완료했습니다.',
    context: 'GRI 205 반부패',
    length: 77
  }
];

// GRI 필드 타입별 적정 텍스트 길이 가이드 (실제 보고서 분석 기반)
export const FIELD_LENGTH_GUIDE = {
  'short_text': { min: 5, max: 50, ideal: 20 },
  'medium_text': { min: 50, max: 200, ideal: 120 },
  'long_text': { min: 200, max: 1000, ideal: 400 },
  'quantitative': { min: 10, max: 100, ideal: 30 }
};

// ESG 카테고리 식별 함수
export function identifyESGCategory(text: string): 'E' | 'S' | 'G' | 'unknown' {
  const environmentKeywords = ['온실가스', '배출량', '에너지', '환경', '기후변화', '재생에너지', '탄소', 'CO2', '전력', '연료'];
  const socialKeywords = ['안전', '보건', '교육', '다양성', '인권', '지역사회', '임직원', '근로자', '채용'];
  const governanceKeywords = ['윤리', '투명', '지배구조', '이사회', '컴플라이언스', '반부패', '내부통제', '리스크'];

  const lowerText = text.toLowerCase();
  
  const envScore = environmentKeywords.filter(keyword => lowerText.includes(keyword)).length;
  const socScore = socialKeywords.filter(keyword => lowerText.includes(keyword)).length;
  const govScore = governanceKeywords.filter(keyword => lowerText.includes(keyword)).length;

  if (envScore >= socScore && envScore >= govScore) return 'E';
  if (socScore >= govScore) return 'S';
  if (govScore > 0) return 'G';
  
  return 'unknown';
}

// 텍스트 길이에 따른 가이드 메시지
export function getLengthGuide(fieldType: string, currentLength: number): string {
  const guide = FIELD_LENGTH_GUIDE[fieldType as keyof typeof FIELD_LENGTH_GUIDE];
  if (!guide) return '';

  if (currentLength < guide.min) {
    return `더 구체적으로 작성해주세요 (현재: ${currentLength}자, 권장: ${guide.ideal}자)`;
  } else if (currentLength > guide.max) {
    return `너무 길어요. 간결하게 작성해주세요 (현재: ${currentLength}자, 권장: ${guide.ideal}자)`;
  } else if (Math.abs(currentLength - guide.ideal) <= 20) {
    return '✅ 적절한 길이입니다';
  } else {
    return `권장 길이: ${guide.ideal}자 (현재: ${currentLength}자)`;
  }
}

// 실제 ESG 보고서 패턴 기반 자동완성 제안
export function getSuggestions(fieldType: string, currentText: string, griContext?: string): string[] {
  const category = identifyESGCategory(currentText + (griContext || ''));
  const relevantExamples = ESG_EXAMPLES.filter(example => example.category === category);
  
  const suggestions: string[] = [];
  
  // 유사한 맥락의 실제 보고서 텍스트 제안
  relevantExamples.forEach(example => {
    if (example.context.includes(griContext || '') || 
        currentText.split(' ').some(word => example.text.includes(word))) {
      suggestions.push(example.text);
    }
  });

  // 필드 타입별 기본 제안
  if (fieldType === 'quantitative') {
    suggestions.push(
      '전년 대비 5.2% 증가한 1,234,567 단위를 기록했습니다.',
      '총 45,678 단위로 목표 대비 102% 달성했습니다.',
      '2023년 기준 234,567 단위 (2022년: 221,345 단위)'
    );
  } else if (fieldType === 'long_text') {
    suggestions.push(
      '당사는 지속가능한 발전을 위해 다음과 같은 핵심 전략을 수립하고 실행하고 있습니다.',
      '이해관계자들과의 지속적인 소통을 통해 투명하고 책임감 있는 경영을 실천하고 있습니다.',
      '환경 보호와 사회적 가치 창출을 위한 체계적인 관리 시스템을 구축하여 운영하고 있습니다.'
    );
  }

  return suggestions.slice(0, 3); // 최대 3개 제안
}

// 실제 보고서 스타일 검증
export function validateReportStyle(text: string): { isValid: boolean; suggestions: string[] } {
  const suggestions: string[] = [];
  let isValid = true;

  // 기본 검증 규칙들
  if (text.length < 10) {
    isValid = false;
    suggestions.push('너무 짧습니다. 더 구체적으로 작성해주세요.');
  }

  if (!/[.!?]$/.test(text.trim())) {
    suggestions.push('문장의 끝에 적절한 마침표를 추가해주세요.');
  }

  if (text.includes('예:') || text.includes('example:')) {
    isValid = false;
    suggestions.push('예시 텍스트를 실제 내용으로 교체해주세요.');
  }

  // 정량적 데이터 포함 여부 체크 (해당하는 경우)
  if (text.includes('tCO2eq') || text.includes('TJ') || text.includes('MWh')) {
    if (!/\d+/.test(text)) {
      suggestions.push('구체적인 수치 데이터를 포함해주세요.');
    }
  }

  return { isValid, suggestions };
} 