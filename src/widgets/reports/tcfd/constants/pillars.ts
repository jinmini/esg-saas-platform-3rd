export const TCFD_PILLARS = {
  governance: {
    id: 'governance',
    name: '거버넌스',
    description: '기후 관련 위험과 기회에 대한 조직의 거버넌스',
    icon: '<Shield className="h-5 w-5" />',
    color: 'bg-purple-100 text-purple-800',
    recommendations: [
      {
        id: 'gov-a',
        name: '이사회의 감독',
        description: '기후 관련 위험과 기회에 대한 이사회의 감독 체계를 설명하세요.',
        questions: [
          '이사회가 기후 관련 이슈를 어떻게 감독하고 있나요?',
          '기후 관련 위험 관리에 대한 이사회의 역할은 무엇인가요?'
        ]
      },
      {
        id: 'gov-b',
        name: '경영진의 역할',
        description: '기후 관련 위험과 기회를 평가하고 관리하는 데 있어 경영진의 역할을 설명하세요.',
        questions: [
          '경영진이 기후 관련 위험을 어떻게 평가하나요?',
          '기후 관련 의사결정 프로세스는 어떻게 되나요?'
        ]
      }
    ]
  },
  strategy: {
    id: 'strategy',
    name: '전략',
    description: '기후 관련 위험과 기회가 조직의 사업, 전략 및 재무 계획에 미치는 실제적이고 잠재적인 영향',
    icon: '<Target className="h-5 w-5" />',
    color: 'bg-blue-100 text-blue-800',
    recommendations: [
      {
        id: 'str-a',
        name: '위험과 기회 식별',
        description: '조직이 단기, 중기, 장기에 걸쳐 식별한 기후 관련 위험과 기회를 설명하세요.',
        questions: [
          '주요 기후 관련 물리적 위험은 무엇인가요?',
          '전환 위험과 기회를 어떻게 식별했나요?'
        ]
      },
      {
        id: 'str-b',
        name: '사업 전략에 미치는 영향',
        description: '기후 관련 위험과 기회가 조직의 사업, 전략, 재무 계획에 미치는 영향을 설명하세요.',
        questions: [
          '기후변화가 비즈니스 모델에 어떤 영향을 미치나요?',
          '기후 관련 투자 계획은 무엇인가요?'
        ]
      },
      {
        id: 'str-c',
        name: '시나리오 분석',
        description: '다양한 기후 관련 시나리오를 고려한 조직 전략의 회복력을 설명하세요.',
        questions: [
          '어떤 기후 시나리오를 분석했나요? (예: 1.5°C, 2°C, 4°C)',
          '시나리오별 재무적 영향은 어떻게 평가했나요?'
        ]
      }
    ]
  },
  risk_management: {
    id: 'risk_management',
    name: '위험 관리',
    description: '조직이 기후 관련 위험을 식별, 평가, 관리하는 프로세스',
    icon: '<AlertTriangle className="h-5 w-5" />',
    color: 'bg-orange-100 text-orange-800',
    recommendations: [
      {
        id: 'rm-a',
        name: '위험 식별 및 평가',
        description: '기후 관련 위험을 식별하고 평가하는 조직의 프로세스를 설명하세요.',
        questions: [
          '기후 위험 식별 방법론은 무엇인가요?',
          '위험 평가 기준과 척도는 어떻게 정의했나요?'
        ]
      },
      {
        id: 'rm-b',
        name: '위험 관리 프로세스',
        description: '기후 관련 위험을 관리하는 조직의 프로세스를 설명하세요.',
        questions: [
          '위험 완화 전략은 무엇인가요?',
          '위험 모니터링 체계는 어떻게 운영되나요?'
        ]
      },
      {
        id: 'rm-c',
        name: '전체 위험관리 통합',
        description: '기후 관련 위험을 식별, 평가, 관리하는 프로세스가 조직의 전체 위험 관리에 어떻게 통합되는지 설명하세요.',
        questions: [
          '기존 위험관리 체계와 어떻게 통합했나요?',
          '기후 위험이 다른 위험과 어떻게 상호작용하나요?'
        ]
      }
    ]
  },
  metrics_targets: {
    id: 'metrics_targets',
    name: '지표 및 목표',
    description: '기후 관련 위험과 기회를 평가하고 관리하는 데 사용되는 지표와 목표',
    icon: '<TrendingUp className="h-5 w-5" />',
    color: 'bg-green-100 text-green-800',
    recommendations: [
      {
        id: 'mt-a',
        name: '기후 관련 지표',
        description: '조직이 전략 및 위험 관리 프로세스에 따라 기후 관련 위험과 기회를 평가하기 위해 사용하는 지표를 공개하세요.',
        questions: [
          '온실가스 배출량 (Scope 1, 2, 3)은 얼마인가요?',
          '에너지 효율성 지표는 무엇인가요?',
          '물 사용량, 폐기물 등 기타 환경 지표는?'
        ]
      },
      {
        id: 'mt-b',
        name: 'Scope 1, 2, 3 배출량',
        description: 'Scope 1, 2 온실가스 배출량과 적절한 경우 Scope 3 배출량 및 관련 위험을 공개하세요.',
        questions: [
          'Scope 1 직접 배출량은 얼마인가요?',
          'Scope 2 간접 배출량은 얼마인가요?',
          'Scope 3 기타 간접 배출량과 중요 카테고리는?'
        ]
      },
      {
        id: 'mt-c',
        name: '목표 설정',
        description: '기후 관련 위험과 기회를 관리하기 위해 조직이 사용하는 목표와 목표 대비 성과를 설명하세요.',
        questions: [
          '탄소중립 목표와 로드맵은 무엇인가요?',
          '재생에너지 사용 목표는?',
          '과학기반 목표(SBTi) 설정 여부는?'
        ]
      }
    ]
  }
}; 