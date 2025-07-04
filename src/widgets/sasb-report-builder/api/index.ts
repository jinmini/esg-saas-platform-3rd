import { SASB_INDUSTRIES } from "../lib/constants/industries";

// SASB 프레임워크 데이터 조회 (현재는 정적 데이터 사용)
export async function getSasbFramework() {
  // 향후 실제 API 호출로 대체될 수 있음
  return Promise.resolve(SASB_INDUSTRIES);
} 