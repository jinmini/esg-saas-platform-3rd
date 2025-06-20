// API 모듈 통합 export

export * from './client';
export * as analysisApi from './analysis';
export * as companiesApi from './companies';
export * as crawlerApi from './crawler';
export * as dashboardApi from './dashboard';

// 편의를 위한 통합 객체
import * as analysisApi from './analysis';
import * as companiesApi from './companies';
import * as crawlerApi from './crawler';
import * as dashboardApi from './dashboard';

export const api = {
  analysis: analysisApi,
  companies: companiesApi,
  crawler: crawlerApi,
  dashboard: dashboardApi,
};
