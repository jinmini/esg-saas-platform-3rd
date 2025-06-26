## 🎯 **1번 우선순위: GRI 공시사항 Index 기반 Dynamic Form 완성**

### **📋 KOMIPO 사례 분석을 통한 핵심 인사이트**

**실제 GRI 공시사항 우선순위 (사용 빈도순):**
1. **GRI 2 (General Disclosures)** - 기본 공시 30개 항목
2. **GRI 3 (Material Topics)** - 중요 주제 관리 3개 항목  
3. **GRI 201 (Economic Performance)** - 경제적 성과 4개 항목
4. **GRI 302 (Energy)** - 에너지 사용량 4개 항목
5. **GRI 305 (Emissions)** - 온실가스 배출 (파일에서 확인됨)

### **🎯 즉시 구현해야 할 구체적 작업 내용**

#### **1-1. 실제 GRI 공시사항 데이터 구조 완성**
```typescript
// src/components/reports/builder/gri/dynamic-form.tsx에 추가
const KOMIPO_GRI_STRUCTURE = {
  "GRI 2": {
    "2-1": {
      requirements: [
        { id: "gri2-1-a", text: "법적 명칭 보고해주세요.", type: "text" },
        { id: "gri2-1-b", text: "소유권 및 법인 구분 보고해주세요.", type: "text" },
        { id: "gri2-1-c", text: "본사 위치 보고해주세요.", type: "text" },
        { id: "gri2-1-d", text: "운영 국가(들) 보고해주세요.", type: "text" }
      ],
      sample: "당사의 법적 명칭은 당사이며, 소유권 및 법인 구분상 시장형 공기업이자 주식회사입니다..."
    }
  },
  // ... 추가 구조
}
```

#### **1-2. 우선순위 기반 폼 구성**
```typescript
const PRIORITY_FORMS = [
  { category: "GRI 2", priority: 1, items: 30 },
  { category: "GRI 3", priority: 2, items: 3 },
  { category: "GRI 201", priority: 3, items: 4 },
  { category: "GRI 302", priority: 4, items: 4 },
  { category: "GRI 305", priority: 5, items: 6 }
]
```

### **🤔 구현 전 명확히 해야 할 디테일한 정보**

1. **CSV 파일 파싱 방식**
   - KOMIPO CSV 파일을 직접 파싱하여 동적 폼 생성하세요!

2. **사용자 인터페이스 우선순위**
    - 카테고리별 탭 구조로 분리하세요!

3. **데이터 저장 방식**
   - 폼에 사용자가 입력을 하면 실시간 저장 되고 진행률 추적이 연동됩니다.
   - 많은 내용이 들어가기 때문에 LocalStrage가 아닌 서버 저장으로 진행됩니다.

4. **샘플 답변 표시 방식**
   - KOMIPO 샘플을 그대로 표시하지 말고 일반적인 샘플로 변경과 가이드 기능을 추가합니다.

5. **폼 검증 로직**
   - 필수 항목 검증, 글자 수 제한이나 형식 검증이 필요한가요?
   1단계: 실시간 기본 검증 (Real-time Basic Validation)
```
const REAL_TIME_VALIDATION = {
  // 기본 요구사항 검증
  minimumLength: {
    "text": 10,      // 최소 10자
    "textarea": 50,  // 최소 50자  
    "number": 1      // 최소 1자
  },
  
  // 데이터 타입 검증
  dataType: {
    "gri201-1": "number",  // 경제적 가치는 숫자
    "gri302-1": "number",  // 에너지 소비량은 숫자
    "gri2-1-a": "text"     // 법적 명칭은 텍스트
  },
  
  // 필수 항목 체크
  required: ["gri2-1-a", "gri2-1-b", "gri3-1", "gri3-2"] // 핵심 필수 항목들
}
```
2단계: 스마트 컨텐츠 검증 (Smart Content Validation)
```
// 답변 품질 및 완성도 검증
const CONTENT_VALIDATION = {
  // 키워드 기반 적합성 검증
  keywordCheck: {
    "gri2-1-a": ["회사", "법인", "기업", "명칭"],
    "gri302-1": ["TJ", "MWh", "소비", "사용량", "에너지"],
    "gri305-1": ["tCO2eq", "온실가스", "배출", "Scope1"]
  },
  
  // 답변 완성도 점수 (1-5점)
  completionScore: {
    1: "미입력",
    2: "기본 정보만 입력", 
    3: "표준 답변 수준",
    4: "상세 답변 포함",
    5: "완전한 답변 + 추가 설명"
  },
  
  // 문맥적 일관성 검증
  contextualCheck: {
    // 예: 회사명이 여러 곳에서 일치하는지 확인
    companyName: ["gri2-1-a", "gri2-1-b"],
    reportingPeriod: ["gri2-3-a", "gri201-1", "gri302-1"]
  }
}
```
3단계: 제출 전 종합 검증 (Pre-submission Comprehensive Validation)
```
// 최종 제출 전 완전성 검증
const COMPREHENSIVE_VALIDATION = {
  // 필수 공시사항 완료율
  mandatoryCompletion: {
    "GRI 2": 0.8,  // 80% 이상 완료
    "GRI 3": 1.0,  // 100% 완료 (중요 주제는 필수)
    "선택된 Material Topics": 0.9  // 90% 이상 완료
  },
  
  // 답변 간 논리적 일관성
  logicalConsistency: [
    {
      check: "에너지 사용량 vs 온실가스 배출량 비례성",
      fields: ["gri302-1", "gri305-1"],
      validation: "에너지 증가 시 배출량도 증가해야 함"
    }
  ],
  
  // 산업별 벤치마크 비교
  industryBenchmark: {
    energyIntensity: "제조업 평균 대비 적절한 범위인가?",
    disclosureRate: "동종업계 대비 공시 완성도는?"
  }
}
```

### **💡 제안하는 MVP 구현 순서**

**1단계 (즉시 시작):** KOMIPO CSV에서 GRI 2 섹션 추출 및 동적 폼 생성
**2단계:** 카테고리별 탭 구조 구현
**3단계:** 실시간 저장 및 진행률 추적 연동
**4단계:** 샘플 답변 표시 및 가이드 기능

시스템의 장점 
📊 사용자 친화적: 실시간 피드백으로 작성 효율성 극대화
🎯 GRI 특화: 실제 GRI 공시사항 요구사항에 최적화
⚡ 점진적 구현: 기본 → 고급 기능으로 단계적 확장 가능
💾 서버 연동: 실시간 저장과 자연스럽게 통합