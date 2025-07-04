import { GriData, FieldType } from '@/shared/types/gri';

// Mock GRI data for UI development - 실제 운영시에는 API에서 가져올 예정
export const mockGriData: GriData = {
  "GRI 2: General Disclosures 2021": {
    "2-1 조직 세부 정보": {
      title: "2-1 조직 세부 정보",
      description: "조직의 기본 정보를 제공합니다.",
      requirements: {
        "gri2-1-a": {
          id: "gri2-1-a",
          title: "법적 명칭",
          description: "조직의 공식적인 법적 명칭을 보고합니다.",
          requirement: "a. 법적 명칭을 보고해주세요.",
          type: "short_text" as FieldType,
          sample: "예: 한국중부발전 주식회사"
        },
        "gri2-1-b": {
          id: "gri2-1-b",
          title: "소유권 및 법인 구분",
          description: "조직의 소유권 구조와 법인 형태를 설명합니다.",
          requirement: "b. 소유권 및 법인 구분을 보고해주세요.",
          type: "medium_text" as FieldType,
          sample: "예: 시장형 공기업이자 주식회사"
        },
        "gri2-1-c": {
          id: "gri2-1-c",
          title: "본사 위치",
          description: "조직 본사의 물리적 위치를 보고합니다.",
          requirement: "c. 본사 위치를 보고해주세요.",
          type: "short_text" as FieldType,
          sample: "예: 대한민국 충청남도 보령시"
        }
      },
      sample: "조직의 기본 정보를 제공합니다."
    },
    "2-2 조직의 지속 가능성 보고에 포함된 엔티티": {
      title: "2-2 조직의 지속 가능성 보고에 포함된 엔티티",
      description: "보고 범위에 포함된 엔티티를 명시합니다.",
      requirements: {
        "gri2-2-a": {
          id: "gri2-2-a",
          title: "포함된 엔티티 목록",
          description: "지속가능성 보고에 포함된 모든 조직 및 자회사를 나열합니다.",
          requirement: "a. 지속 가능성 보고에 포함된 모든 엔티티를 나열해주세요.",
          type: "long_text" as FieldType,
          sample: "예: 본 지속가능성보고서는 당사 본사 및 국내 전 사업장을 포함합니다."
        }
      },
      sample: "보고 범위에 포함된 엔티티를 명시합니다."
    }
  },
  "GRI 3: Material Topics 2021": {
    "3-1 중요 주제 결정 과정": {
      title: "3-1 중요 주제 결정 과정",
      description: "중요성 평가 프로세스를 설명합니다.",
      requirements: {
        "gri3-1-a": {
          id: "gri3-1-a",
          title: "중요 주제 결정 과정",
          description: "중요한 주제를 식별하고 결정하는 과정을 설명합니다.",
          requirement: "a. 중요 주제 결정 과정을 설명해주세요.",
          type: "long_text" as FieldType,
          sample: "예: 이중 중대성 평가를 통해 내·외부 이해관계자의 의견과 비즈니스 영향도를 종합 분석"
        }
      },
      sample: "중요성 평가 프로세스를 설명합니다."
    },
    "3-2 중요 주제 목록": {
      title: "3-2 중요 주제 목록",
      description: "식별된 중요 주제들을 나열합니다.",
      requirements: {
        "gri3-2-a": {
          id: "gri3-2-a",
          title: "중요 주제 목록",
          description: "중요성 평가를 통해 식별된 핵심 주제들을 나열합니다.",
          requirement: "a. 중요 주제 목록을 보고해주세요.",
          type: "medium_text" as FieldType,
          sample: "예: 기후변화 대응, 안전보건, 공정경영, 인재육성"
        }
      },
      sample: "식별된 중요 주제들을 나열합니다."
    }
  },
  "GRI 201: Economic Performance 2016": {
    "201-1 직접적인 경제적 가치": {
      title: "201-1 직접적인 경제적 가치",
      description: "직접적인 경제적 가치 창출 및 배분 현황을 보고합니다.",
      requirements: {
        "gri201-1-a": {
          id: "gri201-1-a",
          title: "창출된 경제적 가치",
          description: "조직이 창출한 직접적 경제적 가치 (수익)를 보고합니다.",
          requirement: "a. 창출된 직접적 경제적 가치: 수익을 보고해주세요.",
          type: "quantitative" as FieldType,
          unit: "원",
          sample: "예: 6조 2,450억 원"
        },
        "gri201-1-b": {
          id: "gri201-1-b",
          title: "배분된 경제적 가치",
          description: "이해관계자들에게 배분된 경제적 가치를 보고합니다.",
          requirement: "b. 배분된 경제적 가치: 운영비용을 보고해주세요.",
          type: "quantitative" as FieldType,
          unit: "원",
          sample: "예: 5조 8,200억 원"
        }
      },
      sample: "직접적인 경제적 가치 창출 및 배분 현황을 보고합니다."
    }
  },
  "GRI 302: Energy 2016": {
    "302-1 조직 내부 에너지 소비": {
      title: "302-1 조직 내부 에너지 소비",
      description: "조직 내부 에너지 소비 현황을 보고합니다.",
      requirements: {
        "gri302-1-a": {
          id: "gri302-1-a",
          title: "연료 소비량",
          description: "조직의 총 연료 소비량을 연료원별로 보고합니다.",
          requirement: "a. 조직 내 총 연료 소비량을 재생 불가능한 연료원별로 TJ 단위로 보고해주세요.",
          type: "quantitative" as FieldType,
          unit: "TJ",
          sample: "예: 석탄 234,567 TJ, LNG 45,678 TJ"
        },
        "gri302-1-b": {
          id: "gri302-1-b",
          title: "전력 소비량",
          description: "조직의 총 전력 소비량을 보고합니다.",
          requirement: "b. 총 전력 소비량을 MWh 단위로 보고해주세요.",
          type: "quantitative" as FieldType,
          unit: "MWh",
          sample: "예: 1,234,567 MWh"
        }
      },
      sample: "조직 내부 에너지 소비 현황을 보고합니다."
    }
  },
  "GRI 305: Emissions 2016": {
    "305-1 직접 온실가스 배출량": {
      title: "305-1 직접 온실가스 배출량",
      description: "직접 온실가스 배출량 (Scope 1)을 보고합니다.",
      requirements: {
        "gri305-1-a": {
          id: "gri305-1-a",
          title: "총 직접 온실가스 배출량",
          description: "조직의 총 직접 (Scope 1) 온실가스 배출량을 보고합니다.",
          requirement: "a. 총 직접 (Scope 1) 온실가스 배출량을 CO2 환산톤으로 보고해주세요.",
          type: "quantitative" as FieldType,
          unit: "tCO2eq",
          sample: "예: 45,678,901 tCO2eq"
        },
        "gri305-1-b": {
          id: "gri305-1-b",
          title: "포함된 가스 종류",
          description: "온실가스 배출량 계산에 포함된 가스의 종류를 명시합니다.",
          requirement: "b. 계산에 포함된 가스 종류를 보고해주세요.",
          type: "select" as FieldType,
          options: ["CO2", "CH4", "N2O", "CO2, CH4", "CO2, N2O", "CO2, CH4, N2O"],
          sample: "예: CO2, CH4, N2O"
        }
      },
      sample: "직접 온실가스 배출량 (Scope 1)을 보고합니다."
    }
  }
};

// Mock standards structure for navigation
export const mockStandards = {
  "GRI 2: General Disclosures 2021": {
    id: "GRI 2: General Disclosures 2021",
    name: "GRI 2: General Disclosures 2021",
    standards: [
      {
        id: "2-1 조직 세부 정보",
        name: "2-1 조직 세부 정보",
        disclosures: [
          { id: "gri2-1-a", name: "법적 명칭", mandatory: true },
          { id: "gri2-1-b", name: "소유권 및 법인 구분", mandatory: true },
          { id: "gri2-1-c", name: "본사 위치", mandatory: true }
        ]
      },
      {
        id: "2-2 조직의 지속 가능성 보고에 포함된 엔티티",
        name: "2-2 조직의 지속 가능성 보고에 포함된 엔티티",
        disclosures: [
          { id: "gri2-2-a", name: "포함된 엔티티 목록", mandatory: true }
        ]
      }
    ]
  },
  "GRI 3: Material Topics 2021": {
    id: "GRI 3: Material Topics 2021", 
    name: "GRI 3: Material Topics 2021",
    standards: [
      {
        id: "3-1 중요 주제 결정 과정",
        name: "3-1 중요 주제 결정 과정",
        disclosures: [
          { id: "gri3-1-a", name: "중요 주제 결정 과정", mandatory: true }
        ]
      },
      {
        id: "3-2 중요 주제 목록",
        name: "3-2 중요 주제 목록", 
        disclosures: [
          { id: "gri3-2-a", name: "중요 주제 목록", mandatory: true }
        ]
      }
    ]
  },
  "GRI 201: Economic Performance 2016": {
    id: "GRI 201: Economic Performance 2016",
    name: "GRI 201: Economic Performance 2016",
    standards: [
      {
        id: "201-1 직접적인 경제적 가치",
        name: "201-1 직접적인 경제적 가치",
        disclosures: [
          { id: "gri201-1-a", name: "창출된 경제적 가치", mandatory: true },
          { id: "gri201-1-b", name: "배분된 경제적 가치", mandatory: true }
        ]
      }
    ]
  },
  "GRI 302: Energy 2016": {
    id: "GRI 302: Energy 2016",
    name: "GRI 302: Energy 2016", 
    standards: [
      {
        id: "302-1 조직 내부 에너지 소비",
        name: "302-1 조직 내부 에너지 소비",
        disclosures: [
          { id: "gri302-1-a", name: "연료 소비량", mandatory: true },
          { id: "gri302-1-b", name: "전력 소비량", mandatory: true }
        ]
      }
    ]
  },
  "GRI 305: Emissions 2016": {
    id: "GRI 305: Emissions 2016",
    name: "GRI 305: Emissions 2016",
    standards: [
      {
        id: "305-1 직접 온실가스 배출량", 
        name: "305-1 직접 온실가스 배출량",
        disclosures: [
          { id: "gri305-1-a", name: "Scope 1 배출량", mandatory: true },
          { id: "gri305-1-b", name: "포함 가스 종류", mandatory: true }
        ]
      }
    ]
  }
}; 