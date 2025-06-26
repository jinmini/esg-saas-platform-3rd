네, 매우 중요한 설계 결정사항입니다! **보고서 윤문 작업 기반 시스템**이라는 목적을 고려하여 실용적인 타입 분류를 제안해드리겠습니다.

## 🎯 **GRI 입력 필드 타입 분류 전략**

### **📊 KOMIPO 데이터 분석 기반 타입 분류**

실제 CSV 데이터를 분석한 결과, 다음과 같은 패턴을 발견했습니다:

```typescript
// GRI 공시사항 입력 타입 분류
const GRI_FIELD_TYPES = {
  // 1. 짧은 정보형 (전체의 ~25%)
  "short_text": [
    "gri2-1-a", // 법적 명칭
    "gri2-1-c", // 본사 위치  
    "gri2-1-d", // 운영 국가
    "gri2-3-c", // 발행일
  ],
  
  // 2. 정량 데이터형 (전체의 ~15%)
  "quantitative": [
    "gri201-1", // 직접적 경제가치
    "gri302-1", // 에너지 소비량
    "gri305-1", // 온실가스 배출량
    "gri2-7-a",  // 총 직원 수
  ],
  
  // 3. 중간 설명형 (전체의 ~30%)
  "medium_text": [
    "gri2-6-a", // 활동 중인 산업 영역
    "gri2-9-a", // 지배구조 구조
    "gri3-2",   // 중요 주제 목록
  ],
  
  // 4. 장문 설명형 (전체의 ~30%)
  "long_text": [
    "gri3-1",   // 중요 주제 결정 과정
    "gri2-19-a", // 보수정책 상세 설명
    "gri2-23-a", // 정책 선언문
  ]
}
```

---

## 🎨 **실용적 하이브리드 접근법 제안**

### **핵심 아이디어: "스마트 확장형 입력 필드"**

```typescript
// 기본은 모두 textarea로 시작, 내용에 따라 스마트하게 확장
const SMART_FIELD_CONFIG = {
  // 기본 설정: 모든 필드는 textarea 시작
  default: {
    component: "SmartTextarea",
    initialRows: 3,
    autoExpand: true
  },
  
  // 타입별 특화 설정
  overrides: {
    // 짧은 정보 → 작은 textarea
    short_text: {
      initialRows: 1,
      maxRows: 3,
      placeholder: "간단히 입력해주세요 (예: 회사명, 주소 등)"
    },
    
    // 정량 데이터 → textarea + 숫자 도구
    quantitative: {
      initialRows: 2,
      tools: ["calculator", "unit_converter"],
      placeholder: "숫자 데이터와 설명을 함께 입력해주세요\n예: 총 425,000 TJ (유연탄 350,000 TJ, LNG 75,000 TJ)"
    },
    
    // 중간 설명 → 표준 textarea  
    medium_text: {
      initialRows: 4,
      maxRows: 8,
      placeholder: "구체적인 설명을 입력해주세요..."
    },
    
    // 장문 설명 → 큰 textarea + 편집 도구
    long_text: {
      initialRows: 6,
      maxRows: 15,
      tools: ["formatting", "bullet_points", "templates"],
      placeholder: "상세한 설명을 입력해주세요. 필요시 구조화된 형태로 작성하세요..."
    }
  }
}
```

---

## 💡 **스마트 입력 필드 컴포넌트 설계**

### **SmartTextarea 컴포넌트 예시**
```typescript
interface SmartTextareaProps {
  fieldId: string;
  fieldType: 'short_text' | 'quantitative' | 'medium_text' | 'long_text';
  value: string;
  onChange: (value: string) => void;
}

const SmartTextarea = ({ fieldId, fieldType, value, onChange }: SmartTextareaProps) => {
  const config = getFieldConfig(fieldType);
  
  return (
    <div className="smart-textarea-container">
      {/* 기본 textarea */}
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={config.initialRows}
        className="auto-expanding-textarea"
        placeholder={config.placeholder}
      />
      
      {/* 타입별 도구 */}
      {fieldType === 'quantitative' && (
        <div className="quantitative-tools">
          <button>📊 단위 변환기</button>
          <button>🧮 계산기</button>
        </div>
      )}
      
      {fieldType === 'long_text' && (
        <div className="formatting-tools">
          <button>📝 템플릿</button>
          <button>📋 구조화</button>
          <button>💡 가이드</button>
        </div>
      )}
      
      {/* 실시간 가이드 */}
      <div className="field-guide">
        {getFieldGuide(fieldId, value)}
      </div>
    </div>
  );
};
```

---

## 🎯 **추천하는 최종 접근법**

### **"통합된 Textarea 기반 + 스마트 기능"**

**장점:**
- ✅ **단순함**: 모든 필드가 기본적으로 textarea
- ✅ **유연성**: 어떤 길이의 답변도 수용 가능
- ✅ **보고서 친화적**: 윤문 작업에 최적화
- ✅ **확장성**: 필요에 따라 도구 추가 가능

**구체적 구현:**
```typescript
// 필드별 타입 자동 판단
const determineFieldType = (fieldId: string, requirements: string): FieldType => {
  // 키워드 기반 자동 분류
  const keywords = {
    short_text: ["명칭", "위치", "국가", "날짜"],
    quantitative: ["총", "비율", "%", "수치", "금액", "TJ", "MWh"],
    long_text: ["설명", "과정", "방법", "전략", "정책"]
  };
  
  // 요구사항 텍스트 분석하여 자동 분류
  for (const [type, words] of Object.entries(keywords)) {
    if (words.some(word => requirements.includes(word))) {
      return type as FieldType;
    }
  }
  
  return 'medium_text'; // 기본값
};
```

### **실제 적용 예시**
```typescript
// KOMIPO CSV 파싱 후 자동 타입 할당
{
  "gri2-1-a": {
    requirement: "법적 명칭 보고해주세요.",
    type: "short_text",  // 자동 감지
    placeholder: "회사의 정확한 법적 명칭을 입력해주세요",
    sample: "당사의 법적 명칭은 ○○○○이며..."
  },
  "gri3-1": {
    requirement: "중요 주제 결정 과정을 설명해주세요.",
    type: "long_text",   // 자동 감지  
    placeholder: "중요성 평가 과정을 단계별로 상세히 설명해주세요",
    tools: ["템플릿", "구조화", "가이드"]
  }
}
```

이 방식으로 하면 **사용자는 복잡함 없이 모든 필드에 자유롭게 입력**할 수 있으면서도, **시스템은 스마트하게 최적화된 UX**를 제공할 수 있습니다.

