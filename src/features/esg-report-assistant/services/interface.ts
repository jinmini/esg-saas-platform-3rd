import { 
  ESGCategory, 
  ESGSuggestion, 
  ValidationResult, 
  LengthGuide, 
  GRIFieldType 
} from '../types';

/**
 * ESG 리포트 어시스턴트 서비스 인터페이스
 * 
 * 이 인터페이스는 ESG 리포트 작성을 돕는 모든 기능을 정의합니다.
 * 현재는 프론트엔드에서 구현되지만, 미래에는 백엔드 API로 대체될 예정입니다.
 */
export interface IESGReportAssistantService {
  /**
   * 텍스트에서 ESG 카테고리를 식별합니다.
   * @param text 분석할 텍스트
   * @param context 추가 컨텍스트 (선택사항)
   * @returns ESG 카테고리 ('E', 'S', 'G', 'unknown')
   */
  identifyESGCategory(text: string, context?: string): Promise<ESGCategory>;

  /**
   * 필드 타입과 현재 텍스트를 기반으로 자동완성 제안을 생성합니다.
   * @param fieldType GRI 필드 타입
   * @param currentText 현재 입력된 텍스트
   * @param griContext GRI 컨텍스트 정보 (선택사항)
   * @returns 제안 목록
   */
  getSuggestions(
    fieldType: GRIFieldType, 
    currentText: string, 
    griContext?: string
  ): Promise<ESGSuggestion[]>;

  /**
   * 텍스트 길이에 대한 가이드를 제공합니다.
   * @param fieldType GRI 필드 타입
   * @param currentLength 현재 텍스트 길이
   * @returns 길이 가이드 정보
   */
  getLengthGuide(fieldType: GRIFieldType, currentLength: number): Promise<LengthGuide>;

  /**
   * ESG 리포트 스타일을 검증합니다.
   * @param text 검증할 텍스트
   * @param fieldType 필드 타입 (선택사항)
   * @returns 검증 결과
   */
  validateReportStyle(text: string, fieldType?: GRIFieldType): Promise<ValidationResult>;

  /**
   * 실시간 텍스트 분석을 수행합니다.
   * @param text 분석할 텍스트
   * @param fieldType 필드 타입
   * @param griContext GRI 컨텍스트
   * @returns 종합 분석 결과
   */
  analyzeText(
    text: string, 
    fieldType: GRIFieldType, 
    griContext?: string
  ): Promise<{
    category: ESGCategory;
    lengthGuide: LengthGuide;
    validation: ValidationResult;
    suggestions: ESGSuggestion[];
  }>;
} 