export const SASB_INDUSTRIES = {
  'consumer-goods': {
    id: 'consumer-goods',
    name: '소비재',
    description: '소비자 제품 및 서비스 관련 기업',
    sectors: [
      {
        id: 'apparel',
        name: '의류, 액세서리 및 신발',
        metrics: [
          { id: 'CG-AA-430a.1', name: '환경 및 사회적 영향 관리', category: 'environmental' },
          { id: 'CG-AA-430a.2', name: '공급망 노동 기준', category: 'social' }
        ]
      }
    ]
  },
  'extractives': {
    id: 'extractives',
    name: '원자재 및 광물',
    description: '천연자원 채굴 및 가공 기업',
    sectors: [
      {
        id: 'oil-gas',
        name: '석유 및 가스',
        metrics: [
          { id: 'EM-EP-110a.1', name: '대기 배출량', category: 'environmental' },
          { id: 'EM-EP-210a.1', name: '수자원 관리', category: 'environmental' }
        ]
      }
    ]
  },
  'financials': {
    id: 'financials',
    name: '금융서비스',
    description: '은행, 보험, 자산관리 등 금융 기업',
    sectors: [
      {
        id: 'commercial-banks',
        name: '상업은행',
        metrics: [
          { id: 'FN-CB-410a.1', name: '기후변화 관련 리스크', category: 'governance' },
          { id: 'FN-CB-240a.1', name: '금융 포용성', category: 'social' }
        ]
      }
    ]
  }
}; 