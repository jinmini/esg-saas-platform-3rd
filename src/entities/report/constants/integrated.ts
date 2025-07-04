import React from 'react';
import { 
  Building2,
  Leaf,
  Target,
  Globe,
  Users,
  Shield
} from "lucide-react";

// 통합 보고서 섹션들 (GRI + SASB + TCFD 조합)
export const INTEGRATED_SECTIONS = {
  organizational_overview: {
    id: 'organizational_overview',
    name: '조직 개요 및 전략',
    description: 'GRI 2 기반의 조직 기본 정보와 비즈니스 모델',
    icon: <Building2 className="h-5 w-5" />, 
    color: 'bg-blue-100 text-blue-800',
    frameworks: ['GRI'],
    subsections: [
      {
        id: 'org-details',
        name: '조직 세부 정보',
        description: '회사명, 소유구조, 본사 위치, 운영 국가 등 기본 정보',
        framework: 'GRI 2-1'
      },
      {
        id: 'business-model',
        name: '비즈니스 모델',
        description: '핵심 사업 영역, 가치 창출 과정, 주요 제품/서비스',
        framework: 'GRI 2-6'
      },
      {
        id: 'governance',
        name: '거버넌스 구조',
        description: '이사회 구성, 의사결정 구조, ESG 책임 체계',
        framework: 'GRI 2-9, TCFD 거버넌스'
      }
    ]
  },
  materiality_analysis: {
    id: 'materiality_analysis',
    name: '중요성 평가',
    description: 'GRI 3 기반의 중요 주제 식별 및 우선순위 결정',
    icon: <Target className="h-5 w-5" />, 
    color: 'bg-purple-100 text-purple-800',
    frameworks: ['GRI', 'SASB'],
    subsections: [
      {
        id: 'materiality-process',
        name: '중요성 평가 프로세스',
        description: '이해관계자 참여, 영향 평가, 우선순위 결정 방법론',
        framework: 'GRI 3-1'
      },
      {
        id: 'material-topics',
        name: '중요 주제 목록',
        description: '식별된 중요 ESG 주제와 SASB 업종별 지표 연계',
        framework: 'GRI 3-2, SASB 업종별'
      },
      {
        id: 'topic-management',
        name: '중요 주제 관리',
        description: '각 주제별 관리 접근법, 목표, 성과 지표',
        framework: 'GRI 3-3'
      }
    ]
  },
  climate_strategy: {
    id: 'climate_strategy',
    name: '기후변화 전략',
    description: 'TCFD 프레임워크 기반의 종합적 기후변화 대응 전략',
    icon: <Leaf className="h-5 w-5" />, 
    color: 'bg-green-100 text-green-800',
    frameworks: ['TCFD', 'GRI'],
    subsections: [
      {
        id: 'climate-governance',
        name: '기후변화 거버넌스',
        description: '이사회 및 경영진의 기후변화 감독 체계',
        framework: 'TCFD 거버넌스'
      },
      {
        id: 'climate-strategy',
        name: '기후 리스크 전략',
        description: '기후 위험과 기회, 시나리오 분석, 전략적 대응',
        framework: 'TCFD 전략'
      },
      {
        id: 'climate-metrics',
        name: '기후변화 지표 및 목표',
        description: 'Scope 1,2,3 배출량, 감축 목표, 기후 관련 재무 지표',
        framework: 'TCFD 지표, GRI 305'
      }
    ]
  },
  environmental_performance: {
    id: 'environmental_performance',
    name: '환경 성과',
    description: 'GRI 300 시리즈 기반의 환경 영향 관리 성과',
    icon: <Globe className="h-5 w-5" />, 
    color: 'bg-teal-100 text-teal-800',
    frameworks: ['GRI', 'SASB'],
    subsections: [
      {
        id: 'energy-management',
        name: '에너지 관리',
        description: '에너지 소비, 효율성, 재생에너지 사용 현황',
        framework: 'GRI 302, SASB 에너지'
      },
      {
        id: 'water-management',
        name: '수자원 관리',
        description: '물 사용량, 수질 관리, 수자원 보호 활동',
        framework: 'GRI 303, SASB 물'
      },
      {
        id: 'waste-management',
        name: '폐기물 관리',
        description: '폐기물 발생량, 재활용률, 순환경제 접근법',
        framework: 'GRI 306, SASB 폐기물'
      }
    ]
  },
  social_performance: {
    id: 'social_performance',
    name: '사회적 성과',
    description: 'GRI 400 시리즈 기반의 사회적 영향 관리 성과',
    icon: <Users className="h-5 w-5" />, 
    color: 'bg-orange-100 text-orange-800',
    frameworks: ['GRI', 'SASB'],
    subsections: [
      {
        id: 'employment',
        name: '고용 및 노사관계',
        description: '고용 현황, 다양성, 근로조건, 노사관계',
        framework: 'GRI 401, 402, 405'
      },
      {
        id: 'training-development',
        name: '교육 및 개발',
        description: '직원 교육, 역량 개발, 경력 관리 프로그램',
        framework: 'GRI 404'
      },
      {
        id: 'community-impact',
        name: '지역사회 영향',
        description: '지역사회 투자, 사회공헌 활동, 지역 경제 기여',
        framework: 'GRI 413, SASB 지역사회'
      }
    ]
  },
  governance_ethics: {
    id: 'governance_ethics',
    name: '거버넌스 및 윤리',
    description: '기업 지배구조, 윤리경영, 리스크 관리 체계',
    icon: <Shield className="h-5 w-5" />, 
    color: 'bg-indigo-100 text-indigo-800',
    frameworks: ['GRI', 'TCFD'],
    subsections: [
      {
        id: 'board-structure',
        name: '이사회 구조 및 운영',
        description: '이사회 구성, 독립성, 전문성, 운영 현황',
        framework: 'GRI 2-9 ~ 2-17'
      },
      {
        id: 'ethics-compliance',
        name: '윤리 및 컴플라이언스',
        description: '윤리강령, 반부패 정책, 내부 통제 시스템',
        framework: 'GRI 2-23, 2-24, 205, 206'
      },
      {
        id: 'risk-management',
        name: '리스크 관리',
        description: '전사적 리스크 관리, 내부 감사, 위기 대응',
        framework: 'TCFD 리스크 관리'
      }
    ]
  }
}; 