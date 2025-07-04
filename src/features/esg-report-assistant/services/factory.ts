import { IESGReportAssistantService } from './interface';
import { MockESGReportAssistantService } from './mock-implementation';

/**
 * ESG 리포트 어시스턴트 서비스 팩토리
 * 
 * 환경에 따라 적절한 구현체를 반환합니다.
 * 현재는 Mock 구현체만 있지만, 미래에 실제 API 구현체가 추가될 예정입니다.
 */
export class ESGReportAssistantServiceFactory {
  private static instance: IESGReportAssistantService | null = null;

  /**
   * 싱글톤 패턴으로 서비스 인스턴스를 반환합니다.
   * @returns ESG 리포트 어시스턴트 서비스 인스턴스
   */
  static getInstance(): IESGReportAssistantService {
    if (!this.instance) {
      this.instance = this.createService();
    }
    return this.instance;
  }

  /**
   * 테스트용으로 인스턴스를 재설정합니다.
   * @param service 새로운 서비스 인스턴스
   */
  static setInstance(service: IESGReportAssistantService): void {
    this.instance = service;
  }

  /**
   * 인스턴스를 초기화합니다.
   */
  static reset(): void {
    this.instance = null;
  }

  private static createService(): IESGReportAssistantService {
    // 환경 변수나 설정에 따라 다른 구현체를 반환할 수 있습니다.
    // 현재는 Mock 구현체만 사용
    
    // 미래에는 다음과 같이 분기할 수 있습니다:
    // if (process.env.NODE_ENV === 'production' && process.env.ESG_API_ENDPOINT) {
    //   return new APIESGReportAssistantService(process.env.ESG_API_ENDPOINT);
    // }
    
    return new MockESGReportAssistantService();
  }
}

/**
 * 편의 함수: ESG 리포트 어시스턴트 서비스 인스턴스를 가져옵니다.
 */
export function getESGReportAssistantService(): IESGReportAssistantService {
  return ESGReportAssistantServiceFactory.getInstance();
}