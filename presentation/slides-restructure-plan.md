# ESG GenAI Platform 슬라이드 재구성 계획

## 🎯 목표
- 20페이지 이내로 구성 (현재 12페이지 제안)
- 논리적 흐름 개선
- 중복 내용 통합
- 관리 용이한 구조

## 📋 최적화된 슬라이드 구성

### 1. **01-title.html** - 타이틀 슬라이드
- 기존 index01.html 유지
- ESG GenAI Compliance Platform 소개

### 2. **02-executive-summary.html** - 한 장 요약
- 기존 index02.html 유지
- 5개 핵심 카드: 문제, 솔루션, 성과, 비전, 요청

### 3. **03-market-inflection.html** - 시장의 변곡점
- 기존 index03a.html 활용
- "Why Now?" 메시지 강화
- 규제 쓰나미, 투자자 압력, AI 격차

### 4. **04-market-landscape.html** - 시장 지형도  
- 기존 index03b.html 활용
- ESG SaaS 3세대 진화
- 경쟁사 분석

### 5. **05-market-opportunity.html** - 시장 기회
- 기존 index03.html 단순화
- ESG 담당자 페인포인트 중심
- 글로벌 규제 트렌드

### 6. **06-solution.html** - 솔루션 소개
- 기존 index04.html 유지
- Intelligence, Automation, Compliance
- 4단계 프로세스

### 7. **07-demo-usecase.html** - 핵심 기능 & 유스케이스
- 기존 index05.html 유지
- As-Is vs To-Be 비교
- GRI 보고서 작성 프로세스 3단계

### 8. **08-architecture.html** - 기술 아키텍처
- 기존 index06.html 유지
- 프론트엔드/백엔드 기술 스택
- 확장성 전략

### 9. **09-achievements.html** - 프로젝트 성과
- 기존 index07.html 유지
- MVP 100% 달성
- 4대 마일스톤 완료

### 10. **10-roadmap.html** - 향후 로드맵
- 기존 index08.html 유지
- Q3 2025 ~ Q1 2026 계획
- 3단계 개발 전략

### 11. **11-the-ask.html** - 요청사항
- 기존 index09.html 유지
- 리소스 요청 (+2 백엔드, +1 AI, +2억 예산)
- 5년 ROI 550% 기대효과

### 12. **12-qa.html** - Q&A
- 기존 index10.html 유지
- index11.html(Appendix) 내용 통합 고려

## 🔄 통합/제거 대상

### 통합할 내용:
- **index03 + index03a + index03b** → 3개 슬라이드로 분리하되 논리적 순서 조정
- **index11.html(Appendix)** → index10.html(Q&A)에 통합 또는 별도 참고자료로 관리

### 제거할 중복:
- 시장 분석 중복 내용 정리
- 불필요한 상세 설명 축약

## 🏗️ 새로운 폴더 구조 장점

### 1. **분리된 프레젠테이션 환경**
```
presentation/
├── assets/common.css (공통 스타일)
├── slides/ (개별 슬라이드)
└── index.html (네비게이션)
```

### 2. **라이브러리 중앙 관리**
- Tailwind CSS, FontAwesome 등 CDN 링크 공통 관리
- Chart.js 등 필요한 슬라이드에만 로드

### 3. **개발 효율성**
- 슬라이드별 독립 개발/수정
- 명확한 파일명으로 관리 용이
- 버전 관리 최적화

## 🚀 구현 방안

### Option A: 새 폴더 구조 생성 (권장)
- `presentation/` 폴더 생성
- 기존 내용 마이그레이션
- 공통 리소스 최적화

### Option B: 현재 구조 정리
- 기존 slides/ 폴더에서 파일명 정리
- 중복 파일 통합
- 순서 재배치

## 📊 최종 권장사항

**새로운 폴더 구조 생성을 권장**합니다:

1. **관리 효율성**: 프레젠테이션 전용 환경
2. **확장성**: 향후 다른 프레젠테이션 추가 용이  
3. **성능**: 공통 리소스 최적화
4. **협업**: 명확한 구조로 팀 작업 효율화

다음 단계로 새로운 구조를 생성하고 기존 내용을 최적화하여 마이그레이션하겠습니다. 