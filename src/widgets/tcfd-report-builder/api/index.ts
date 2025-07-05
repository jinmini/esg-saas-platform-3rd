import { TCFD_PILLARS } from '../lib';
import { Framework } from '../model';

export const getTcfdFramework = async (): Promise<Framework> => {
  // 실제 애플리케이션에서는 이 부분에서 API 호출이 이루어집니다.
  // 현재는 로컬 상수를 비동기적으로 반환하여 시뮬레이션합니다.
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(TCFD_PILLARS as Framework);
    }, 500); // 0.5초 지연
  });
}; 