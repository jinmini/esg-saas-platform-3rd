import { 
  IESGReportAssistantService 
} from './interface';
import { 
  ESGCategory, 
  ESGSuggestion, 
  ValidationResult, 
  LengthGuide, 
  GRIFieldType,
  ESGExample 
} from '../types';

// 실제 ESG 보고서에서 추출한 텍스트 예시들
const ESG_EXAMPLES: ESGExample[] = [
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

// GRI 필드 타입별 적정 텍스트 길이 가이드
const FIELD_LENGTH_GUIDE = {
  'short_text': { min: 5, max: 50, ideal: 20 },
  'medium_text': { min: 50, max: 200, ideal: 120 },
  'long_text': { min: 200, max: 1000, ideal: 400 },
  'quantitative': { min: 10, max: 100, ideal: 30 }
};

/**
 * 동기 버전의 ESG 카테고리 식별 함수
 * PDF 생성 등 동기적 처리가 필요한 경우 사용
 */
export function identifyESGCategorySync(text: string, context?: string): ESGCategory {
  const combinedText = text + (context || '');
  
  const environmentKeywords = ['온실가스', '배출량', '에너지', '환경', '기후변화', '재생에너지', '탄소', 'CO2', '전력', '연료'];
  const socialKeywords = ['안전', '보건', '교육', '다양성', '인권', '지역사회', '임직원', '근로자', '채용'];
  const governanceKeywords = ['윤리', '투명', '지배구조', '이사회', '컴플라이언스', '반부패', '내부통제', '리스크'];

  const lowerText = combinedText.toLowerCase();
  
  const envScore = environmentKeywords.filter(keyword => lowerText.includes(keyword)).length;
  const socScore = socialKeywords.filter(keyword => lowerText.includes(keyword)).length;
  const govScore = governanceKeywords.filter(keyword => lowerText.includes(keyword)).length;

  if (envScore >= socScore && envScore >= govScore) return 'E';
  if (socScore >= govScore) return 'S';
  if (govScore > 0) return 'G';
  
  return 'unknown';
}

/**
 * ESG 리포트 어시스턴트 서비스의 임시 구현체
 * 
 * 백엔드 API가 준비되기 전까지 사용하는 Mock 구현체입니다.
 * 실제 백엔드 API가 완성되면 이 구현체를 교체하게 됩니다.
 */
export class MockESGReportAssistantService implements IESGReportAssistantService {
  
  async identifyESGCategory(text: string, context?: string): Promise<ESGCategory> {
    // 네트워크 지연 시뮬레이션
    await this.simulateNetworkDelay();
    
    return identifyESGCategorySync(text, context);
  }

  async getSuggestions(
    fieldType: GRIFieldType, 
    currentText: string, 
    griContext?: string
  ): Promise<ESGSuggestion[]> {
    await this.simulateNetworkDelay();
    
    const category = await this.identifyESGCategory(currentText, griContext);
    const relevantExamples = ESG_EXAMPLES.filter(example => example.category === category);
    
    const suggestions: ESGSuggestion[] = [];
    
    // 유사한 맥락의 실제 보고서 텍스트 제안
    relevantExamples.forEach(example => {
      if (example.context.includes(griContext || '') || 
          currentText.split(' ').some(word => example.text.includes(word))) {
        suggestions.push({
          text: example.text,
          confidence: 0.8,
          source: 'similar_context'
        });
      }
    });

    // 필드 타입별 기본 제안
    if (fieldType === 'quantitative') {
      suggestions.push(
        {
          text: '전년 대비 5.2% 증가한 1,234,567 단위를 기록했습니다.',
          confidence: 0.6,
          source: 'field_type'
        },
        {
          text: '총 45,678 단위로 목표 대비 102% 달성했습니다.',
          confidence: 0.6,
          source: 'field_type'
        }
      );
    } else if (fieldType === 'long_text') {
      suggestions.push(
        {
          text: '당사는 지속가능한 발전을 위해 다음과 같은 핵심 전략을 수립하고 실행하고 있습니다.',
          confidence: 0.5,
          source: 'template'
        },
        {
          text: '이해관계자들과의 지속적인 소통을 통해 투명하고 책임감 있는 경영을 실천하고 있습니다.',
          confidence: 0.5,
          source: 'template'
        }
      );
    }

    return suggestions.slice(0, 3); // 최대 3개 제안
  }

  async getLengthGuide(fieldType: GRIFieldType, currentLength: number): Promise<LengthGuide> {
    await this.simulateNetworkDelay();
    
    const guide = FIELD_LENGTH_GUIDE[fieldType];
    if (!guide) {
      return {
        min: 0,
        max: 1000,
        ideal: 100,
        current: currentLength,
        message: '길이 가이드를 찾을 수 없습니다.',
        status: 'acceptable'
      };
    }

    let status: LengthGuide['status'];
    let message: string;

    if (currentLength < guide.min) {
      status = 'too_short';
      message = `더 구체적으로 작성해주세요 (현재: ${currentLength}자, 권장: ${guide.ideal}자)`;
    } else if (currentLength > guide.max) {
      status = 'too_long';
      message = `너무 길어요. 간결하게 작성해주세요 (현재: ${currentLength}자, 권장: ${guide.ideal}자)`;
    } else if (Math.abs(currentLength - guide.ideal) <= 20) {
      status = 'ideal';
      message = '✅ 적절한 길이입니다';
    } else {
      status = 'acceptable';
      message = `권장 길이: ${guide.ideal}자 (현재: ${currentLength}자)`;
    }

    return {
      min: guide.min,
      max: guide.max,
      ideal: guide.ideal,
      current: currentLength,
      message,
      status
    };
  }

  async validateReportStyle(text: string, fieldType?: GRIFieldType): Promise<ValidationResult> {
    await this.simulateNetworkDelay();
    
    const suggestions: string[] = [];
    let isValid = true;
    let score = 100;

    // 기본 검증 규칙들
    if (text.length < 10) {
      isValid = false;
      score -= 30;
      suggestions.push('너무 짧습니다. 더 구체적으로 작성해주세요.');
    }

    // 숫자 데이터 검증
    if (fieldType === 'quantitative') {
      const hasNumbers = /\d/.test(text);
      if (!hasNumbers) {
        isValid = false;
        score -= 40;
        suggestions.push('정량적 데이터를 포함해주세요.');
      }
    }

    // 전문 용어 사용 검증
    const professionalTerms = ['지속가능', '이해관계자', '투명성', '책임경영', '성과', '개선', '전략'];
    const hasTerms = professionalTerms.some(term => text.includes(term));
    if (!hasTerms) {
      score -= 10;
      suggestions.push('ESG 전문 용어를 사용하면 더 전문적인 보고서가 됩니다.');
    }

    // 구체성 검증
    if (text.includes('많은') && !text.includes('건')) {
      score -= 15;
      suggestions.push('구체적인 수치나 단위를 포함해주세요.');
    }

    return {
      isValid,
      score,
      suggestions
    };
  }

  async analyzeText(
    text: string, 
    fieldType: GRIFieldType, 
    griContext?: string
  ): Promise<{
    category: ESGCategory;
    lengthGuide: LengthGuide;
    validation: ValidationResult;
    suggestions: ESGSuggestion[];
  }> {
    const [category, lengthGuide, validation, suggestions] = await Promise.all([
      this.identifyESGCategory(text, griContext),
      this.getLengthGuide(fieldType, text.length),
      this.validateReportStyle(text, fieldType),
      this.getSuggestions(fieldType, text, griContext)
    ]);

    return {
      category,
      lengthGuide,
      validation,
      suggestions
    };
  }

  private async simulateNetworkDelay(): Promise<void> {
    const delay = Math.random() * 150 + 50; // 50-200ms 랜덤 지연
    await new Promise(resolve => setTimeout(resolve, delay));
  }
} 