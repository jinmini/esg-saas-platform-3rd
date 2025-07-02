# 🚀 ESG Platform: 프론트엔드-백엔드 API 연동 가이드

안녕하세요, 백엔드 개발자님!

현재 프론트엔드에서는 **백엔드 API와의 유연한 연동을 위한 모든 준비**를 마쳤습니다. 백엔드 API가 완성되는 즉시, 또는 부분적으로 완성되더라도 프론트엔드 개발에 지장이 없도록 **Mock API 시스템(MSW)** 과 **Fallback 로직**을 구현해 두었습니다.

이 문서는 백엔드 개발자님께서 현재 프론트엔드 상황을 빠르게 파악하고, 최소한의 확인 및 수정으로 **뉴스 분석 크롤러 API (`GET /api/v1/news/analyze-company`)** 를 연동하는 것을 돕기 위해 작성되었습니다.

---

## ✅ 확인 및 조치 필요 사항 (3단계)

### 1. API 서버 주소 및 포트 확인

프론트엔드에서는 `http://localhost:3001`을 기본 백엔드 주소로 설정해 두었습니다. 개발자님의 실제 로컬 서버 주소 및 포트와 다르다면, 프로젝트 루트의 `.env.local` 파일만 수정해 주시면 됩니다.

**경로**: `.env.local`

```env
# 이 부분의 포트 번호를 실제 구동되는 포트로 변경해주세요.
NEXT_PUBLIC_API_BASE_URL=http://localhost:3001 
```

### 2. 데이터 스키마 (JSON 응답 형식) 확인

프론트엔드는 제공해주신 `crawler.json` 파일을 기반으로 **TypeScript 타입**을 이미 정의했습니다. `GET /api/v1/news/analyze-company` 엔드포인트의 응답이 아래 파일에 정의된 `NewsAnalysisResponse` 타입과 일치하는지 확인해주세요.

**타입 정의 파일**: `src/types/api.ts`
**참고 JSON 파일**: `src/test/crawler.json`

**핵심 확인 사항**:
- 응답 객체의 `key` 이름이 타입 정의와 일치하는가?
- 각 `value`의 데이터 타입(string, number, array 등)이 일치하는가?
- 만약 스키마가 변경되었다면, 프론트엔드에 알려주세요. 타입 정의를 즉시 업데이트하겠습니다.

### 3. CORS 정책 확인

프론트엔드 개발 서버는 `http://localhost:3000`에서 실행됩니다. 백엔드 서버의 CORS (Cross-Origin Resource Sharing) 정책에 아래의 Origin이 허용되어 있는지 확인해주세요.

```
# 허용 필요
Origin: http://localhost:3000
```

---

## 🧪 연동 테스트 방법 (2분 소요)

위의 3가지 사항 확인 후, 아래의 방법으로 프론트엔드와 실제 API가 정상적으로 연동되었는지 바로 테스트할 수 있습니다.

**1. 프론트엔드 개발 서버 실행**
```bash
pnpm dev
```

**2. API 테스트 페이지 접속**
- 브라우저에서 `http://localhost:3000/api-test` 로 접속합니다.
- 또는, 대시보드 좌측 사이드바의 **"API 테스트"** 메뉴를 클릭하세요.

**3. 결과 확인**
- **"🔍 API 연결 상태"** 카드에서 **"뉴스 분석 API"** 상태를 확인합니다.
  - ✅ **"연결됨"**: 성공입니다! 이제 백엔드 API와 실시간으로 통신합니다.
  - ❌ **"오프라인"**: 연결 실패. `.env.local`의 주소/포트, 서버 실행 여부, CORS 설정을 다시 확인해주세요.

- **"📰 뉴스 분석 API (백엔드/Fallback)"** 카드에서 회사명(기본값: 삼성전자)을 입력하고 "뉴스 분석" 버튼을 클릭하여 실제 데이터가 잘 들어오는지 확인합니다.

---

## 🔮 향후 개발될 API 목록 (참고)

현재 미구현된 다른 API들은 **MSW (Mock Service Worker)** 를 통해 가상으로 응답하고 있습니다. 아래 목록은 향후 백엔드에서 구현이 필요한 API들이며, 프론트엔드는 이 Mock API를 기반으로 UI/UX 개발을 계속 진행할 예정입니다.

- **인증**: `POST /api/auth/login`, `GET /api/auth/me`
- **회사**: `GET /api/companies`, `GET /api/companies/:id`
- **리포트**: `GET /api/reports`, `POST /api/reports`, `PUT /api/reports/:id`
- **대시보드**: `GET /api/dashboard/stats`, `GET /api/dashboard/feed`

> 백엔드 API가 완성되는 대로 `src/lib/mocks/handlers.ts` 파일에서 해당 Mock 핸들러를 제거하고 실제 API 호출로 전환할 예정입니다.

궁금한 점이 있다면 언제든지 문의해주세요. 감사합니다!
