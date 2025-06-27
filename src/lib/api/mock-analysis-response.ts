export const mockAnalysisResponse = {
  search_info: {
    company: "한국중부발전",
    total: 1500,
    start: 1,
    display: 5,
    last_build_date: "Thu, 27 Jun 2024 10:30:00 +0900",
    original_count: 7,
    duplicates_removed: 2,
    deduplication_enabled: true
  },
  analyzed_news: [
    {
      news_item: {
        title: "한국중부발전, 보령시에 에너지 취약계층 냉방비 지원",
        original_link: "https://example.com/news/1",
        link: "https://news.naver.com/main/read.naver?mode=LSD&mid=shm&sid1=101&oid=001&aid=0000000001",
        description: "한국중부발전(주)은 보령시 에너지 취약계층의 여름철 에너지 비용 부담 완화를 위해 5천만원을 지원했다고 밝혔다. 이번 지원은 지역사회 상생을 위한 노력의 일환이다.",
        pub_date: "Thu, 27 Jun 2024 09:00:00 +0900",
        mention_count: 2,
        duplicate_links: ["https://news.naver.com/main/read.naver?mode=LSD&mid=shm&sid1=101&oid=001&aid=0000000002"],
        similarity_score: 0.98
      },
      esg_classification: {
        esg_category: "사회(S)",
        confidence_score: 0.95,
        keywords: ["취약계층", "지역사회", "상생"],
        "classification_method": "ml_model"
      },
      sentiment_analysis: {
        sentiment: "긍정",
        confidence_score: 0.98,
        positive: 0.9,
        negative: 0.05,
        "neutral": 0.05,
        "analysis_method": "ml_model"
      }
    },
    {
      news_item: {
        title: "중부발전, 2045 탄소중립 목표 달성을 위한 'KOMIPO ABCDE' 전략 선포",
        original_link: "https://example.com/news/2",
        link: "https://news.naver.com/main/read.naver?mode=LSD&mid=shm&sid1=101&oid=001&aid=0000000003",
        description: "한국중부발전이 2045년까지 탄소중립을 달성하기 위한 새로운 로드맵 'KOMIPO ABCDE'를 발표했다. 이는 신재생에너지 확대와 청정연료 전환을 핵심으로 한다.",
        pub_date: "Wed, 26 Jun 2024 14:20:00 +0900",
        mention_count: 5,
        duplicate_links: [],
        similarity_score: 1.0
      },
      esg_classification: {
        esg_category: "환경(E)",
        confidence_score: 0.99,
        keywords: ["탄소중립", "신재생에너지", "청정연료"],
        "classification_method": "ml_model"
      },
      sentiment_analysis: {
        sentiment: "긍정",
        confidence_score: 0.95,
        positive: 0.88,
        negative: 0.02,
        "neutral": 0.10,
        "analysis_method": "ml_model"
      }
    },
    {
      news_item: {
        title: "이사회 투명성 강화... 중부발전, 사외이사 비중 확대 결정",
        original_link: "https://example.com/news/3",
        link: "https://news.naver.com/main/read.naver?mode=LSD&mid=shm&sid1=101&oid=001&aid=0000000004",
        description: "한국중부발전은 이사회의 독립성과 투명성을 제고하기 위해 사외이사 비중을 현재 50%에서 60%로 확대하는 안건을 의결했다고 공시했다.",
        pub_date: "Tue, 25 Jun 2024 11:00:00 +0900",
        mention_count: 1,
        duplicate_links: [],
        similarity_score: 1.0
      },
      esg_classification: {
        esg_category: "지배구조(G)",
        confidence_score: 0.92,
        keywords: ["이사회", "투명성", "사외이사"],
        "classification_method": "ml_model"
      },
      sentiment_analysis: {
        sentiment: "중립",
        confidence_score: 0.85,
        positive: 0.2,
        negative: 0.1,
        "neutral": 0.7,
        "analysis_method": "ml_model"
      }
    },
    {
        news_item: {
          title: "협력사 안전관리 미흡 지적... 중부발전, 개선책 마련 나서",
          original_link: "https://example.com/news/4",
          link: "https://news.naver.com/main/read.naver?mode=LSD&mid=shm&sid1=101&oid=001&aid=0000000005",
          description: "최근 한국중부발전의 한 협력사에서 발생한 안전사고와 관련하여 관리 감독 소홀 지적이 제기되었다. 중부발전은 즉각적인 재발 방지 대책을 수립하겠다고 밝혔다.",
          pub_date: "Mon, 24 Jun 2024 18:00:00 +0900",
          mention_count: 3,
          duplicate_links: [],
          similarity_score: 1.0
        },
        esg_classification: {
          esg_category: "사회(S)",
          confidence_score: 0.88,
          keywords: ["안전사고", "협력사", "안전관리"],
          "classification_method": "ml_model"
        },
        sentiment_analysis: {
          sentiment: "부정",
          confidence_score: 0.99,
          positive: 0.05,
          negative: 0.9,
          "neutral": 0.05,
          "analysis_method": "ml_model"
        }
      },
      {
        news_item: {
          title: "중부발전, 해외 그린 수소 사업 투자... 포트폴리오 다각화",
          original_link: "https://example.com/news/5",
          link: "https://news.naver.com/main/read.naver?mode=LSD&mid=shm&sid1=101&oid=001&aid=0000000006",
          description: "한국중부발전이 해외 그린 수소 생산 프로젝트에 대규모 투자를 결정하며 미래 에너지 시장 선점에 나섰다. 이는 기존 석탄화력 중심의 사업구조를 다각화하는 중요한 행보다.",
          pub_date: "Sun, 23 Jun 2024 10:00:00 +0900",
          mention_count: 8,
          duplicate_links: [],
          similarity_score: 1.0
        },
        esg_classification: {
          esg_category: "환경(E)",
          confidence_score: 0.96,
          keywords: ["그린 수소", "에너지 시장", "투자"],
          "classification_method": "ml_model"
        },
        sentiment_analysis: {
          sentiment: "긍정",
          confidence_score: 0.91,
          positive: 0.85,
          negative: 0.05,
          "neutral": 0.1,
          "analysis_method": "ml_model"
        }
      }
  ],
  analysis_summary: {
    total_analyzed: 5,
    esg_distribution: {
      "환경(E)": 2,
      "사회(S)": 2,
      "지배구조(G)": 1,
      "통합ESG": 0,
      "기타": 0
    },
    "sentiment_distribution": {
      "긍정": 3,
      "부정": 1,
      "중립": 1
    }
  },
  ml_service_status: "connected"
}; 