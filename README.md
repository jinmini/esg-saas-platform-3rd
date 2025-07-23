# 🚀 ESG Platform: 프론트엔드-백엔드 API 연동 가이드

안녕하세요, 백엔드 개발자님!

현재 프론트엔드에서는 **새로운 SASB 조합 키워드 API와의 연동**을 완료했습니다. 새로운 API는 특정 기업 분석이 아닌 **산업별 ESG 이슈 모니터링**에 최적화되어 있으며, Mock API 시스템과 Fallback 로직을 통해 개발 환경에서도 원활하게 작동합니다.

이 문서는 백엔드 개발자님께서 새로운 **SASB 조합 키워드 API (`GET /gateway/v1/sasb/api/v1/workers/results/combined-keywords`)** 연동 상황을 파악하는 것을 돕기 위해 작성되었습니다.

---

## ✅ 새로운 SASB API 연동 현황

### 1. 🎯 새로운 API 엔드포인트

**SASB 조합 키워드 분석 API**:
```http
GET /gateway/v1/sasb/api/v1/workers/results/combined-keywords?max_results=100
```

**프론트엔드 설정**: `.env.local`
```env
# 게이트웨이 주소를 설정해주세요
NEXT_PUBLIC_NEWS_SERVICE_URL=http://localhost:8080/gateway/v1
```

### 2. ✨ 새로운 응답 구조

프론트엔드에서는 새로운 응답 구조에 맞춰 **`SASBCombinedKeywordsResponse` 타입**을 정의했습니다:

```typescript
interface SASBCombinedKeywordsResponse {
  task_id: string
  status: 'completed' | 'running' | 'failed'
  searched_keywords: string[]
  total_articles_found: number
  analysis_type: 'combined_keywords'
  analyzed_articles: SASBAnalyzedArticle[]
}
```

**특징**:
- 🎯 산업 키워드 + SASB 이슈 키워드 조합 검색
- 📊 높은 관련성을 가진 ESG 뉴스만 수집
- 🔍 감정 분석 및 신뢰도 점수 포함
- ⚙️ 최대 결과 수 조정 가능 (max_results 파라미터)

### 3. CORS 정책 확인

프론트엔드 개발 서버는 `http://localhost:3000`에서 실행됩니다. 백엔드 서버의 CORS (Cross-Origin Resource Sharing) 정책에 아래의 Origin이 허용되어 있는지 확인해주세요.

```
# 허용 필요
Origin: http://localhost:3000
```

---

## 🧪 새로운 SASB API 테스트 방법

### 1. 프론트엔드 개발 서버 실행
```bash
pnpm dev
```

### 2. SASB 크롤러 페이지 접속
- 브라우저에서 `http://localhost:3000/crawler` 로 접속합니다.
- 또는, 대시보드 좌측 사이드바의 **"크롤링"** 메뉴를 클릭하세요.

### 3. 새로운 SASB 모드 확인
- 기본적으로 **"🚀 SASB 산업별 ESG 이슈 모니터링"** 모드로 실행됩니다.
- 상단 우측의 **"🔄 레거시 모드"** 버튼을 눌러 기존 회사별 분석도 테스트 가능합니다.

### 4. 결과 확인
**SASB 모드에서 확인할 수 있는 정보**:
- ✅ **분석 상태**: API 연결 및 작업 완료 상태
- 📊 **총 발견 기사**: 산업별 ESG 관련 뉴스 수집 현황  
- 🎯 **키워드 조합**: 검색에 사용된 산업+SASB 이슈 키워드들
- 📰 **기사 목록**: 감정 분석과 신뢰도가 포함된 관련 뉴스들

**설정 조정**:
- "SASB 분석 설정" 카드에서 최대 결과 수를 25~200개까지 조정 가능
- "새로고침" 버튼으로 최신 데이터 갱신

---

## 🔮 향후 개발될 API 목록 (참고)

현재 미구현된 다른 API들은 **MSW (Mock Service Worker)** 를 통해 가상으로 응답하고 있습니다. 아래 목록은 향후 백엔드에서 구현이 필요한 API들이며, 프론트엔드는 이 Mock API를 기반으로 UI/UX 개발을 계속 진행할 예정입니다.

- **인증**: `POST /api/auth/login`, `GET /api/auth/me`
- **회사**: `GET /api/companies`, `GET /api/companies/:id`
- **리포트**: `GET /api/reports`, `POST /api/reports`, `PUT /api/reports/:id`
- **대시보드**: `GET /api/dashboard/stats`, `GET /api/dashboard/feed`

> 백엔드 API가 완성되는 대로 `src/lib/mocks/handlers.ts` 파일에서 해당 Mock 핸들러를 제거하고 실제 API 호출로 전환할 예정입니다.

궁금한 점이 있다면 언제든지 문의해주세요. 감사합니다!
