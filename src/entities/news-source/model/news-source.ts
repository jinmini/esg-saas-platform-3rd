import { NewsSource } from './types';

/**
 * 뉴스 소스의 활성화 상태를 텍스트로 반환합니다.
 * @param source - 뉴스 소스 객체
 * @returns '활성' | '비활성'
 */
export function getSourceStatusText(source: NewsSource): '활성' | '비활성' {
  return source.enabled ? '활성' : '비활성';
} 