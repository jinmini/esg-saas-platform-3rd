# 프로젝트 병합 진행 상황

## 1. 의존성 통합 (`package.json` 병합) - 완료

- 두 프로젝트의 의존성을 검토하고 통합된 package.json 파일 생성
- 공통 의존성은 최신 버전으로 통일
- 프로젝트별 고유 의존성 추가 (cmdk, date-fns, embla-carousel-react, input-otp 등)
- 개발 의존성 통합

## 2. 설정 파일 병합 - 완료

### 2.1. `next.config.mjs`
- SPA 모드 유지 (output: 'export')
- 빌드 출력 디렉토리 설정 (distDir: './dist')
- 이미지 최적화 비활성화 (images.unoptimized: true)

### 2.2. `tailwind.config.ts`
- 두 프로젝트의 색상 팔레트 통합 (랜딩페이지 및 대시보드 색상)
- 애니메이션 및 키프레임 통합
- 플러그인 통합 (tailwindcss-animate, @tailwindcss/typography)

### 2.3. `tsconfig.json`
- 모듈 해석 방식 설정 (moduleResolution: "bundler")
- 타입스크립트 설정 통합
- 경로 별칭 설정 (@/*)

### 2.4. `components.json`
- shadcn/ui 컴포넌트 설정
- 경로 별칭 설정 (@/components, @/lib/utils 등)

### 2.5. `eslint.config.js`
- ESLint 구성 통합
- TypeScript ESLint 설정

### 2.6. `postcss.config.js`
- PostCSS 플러그인 설정 (tailwindcss, autoprefixer)

### 2.7. `vercel.json`
- Vercel 배포 설정 추가

## 3. 디렉토리 구조 설정 - 완료

```
esgai_platform/
├── src/
│   ├── app/
│   │   ├── (landing)/      # 랜딩페이지 라우트 그룹
│   │   ├── (dashboard)/    # 대시보드 라우트 그룹
│   │   └── api/            # API 라우트
│   ├── components/
│   │   ├── ui/             # shadcn/ui 컴포넌트
│   │   ├── common/         # 공통 컴포넌트
│   │   ├── landing/        # 랜딩페이지 전용 컴포넌트
│   │   └── dashboard/      # 대시보드 전용 컴포넌트
│   ├── lib/                # 유틸리티 함수
│   ├── hooks/              # 커스텀 훅
│   ├── providers/          # 프로바이더 컴포넌트
│   ├── services/           # API 서비스
│   └── store/              # 상태 관리
│   └── index.css           # 전역 스타일
├── public/                 # 정적 자산
│   └── docs/               # 문서
└── *config files*          # 설정 파일들
```

## 4. 소스 코드 병합 - 완료

### 4.1. 랜딩페이지 코드 이동 - 완료
- App Router 구조에 맞게 파일 구성
  - `app/(landing)/page.tsx` 생성
  - `app/(landing)/layout.tsx` 생성
  - `app/not-found.tsx` 생성
  - `app/layout.tsx` 생성
- 컴포넌트 이동
  - 랜딩페이지 컴포넌트를 `components/landing/` 디렉토리로 이동
    - `NavBar.tsx`
    - `HeroSection.tsx`
    - `FeatureSection.tsx`
    - `BenefitsSection.tsx`
    - `PartnerSection.tsx`
    - `CTASection.tsx`
    - `Footer.tsx`
    - `ScrollToTop.tsx`
  - 'use client' 지시어 추가
- 훅 및 유틸리티 이동
  - `hooks/use-mobile.tsx` 추가
- 프로바이더 설정
  - `providers/providers.tsx` 생성하여 ThemeProvider, QueryClientProvider 등 설정

### 4.2. 대시보드 코드 이동 - 완료
- 대시보드 레이아웃 및 페이지 이동
  - `app/(dashboard)/dashboard/page.tsx` 생성
  - `app/(dashboard)/dashboard/settings/page.tsx` 생성
  - `app/(dashboard)/dashboard/report-history/page.tsx` 생성
  - `app/(dashboard)/dashboard/risk-monitoring/page.tsx` 생성
  - `app/(dashboard)/dashboard/esg-report/page.tsx` 생성
- 대시보드 전용 컴포넌트 이동
  - 사이드바 및 레이아웃 컴포넌트
    - `components/dashboard/ESGSidebar.tsx` 이동
    - `components/dashboard/SiteLayout.tsx` 이동
  - 기능 컴포넌트 이동
    - `components/dashboard/Dashboard.tsx` 
    - `components/dashboard/AIChat.tsx`
    - `components/dashboard/ESGReportGenerator.tsx`
    - `components/dashboard/ESGRiskDashboard.tsx`
    - `components/dashboard/ReportHistory.tsx`
    - `components/dashboard/Settings.tsx`

### 4.3. UI 프레임워크 변경 - 완료
- shadcn/ui 의존성 문제로 인한 접근 방식 변경
  - 기본 HTML 요소와 Tailwind CSS를 사용하여 동일한 디자인 구현
  - 다음 컴포넌트들을 수정:
    - `ESGSidebar.tsx`
    - `SiteLayout.tsx`
    - `AIChat.tsx`
    - `Dashboard.tsx`
    - `ESGReportGenerator.tsx`
    - `ESGRiskDashboard.tsx`
    - `ReportHistory.tsx`
    - `Settings.tsx`
- 랜딩 페이지와 대시보드 간 통합
  - `HeroSection.tsx`의 "지금 시작하기" 버튼에 대시보드 링크 추가

## 5. 성능 최적화 - 진행 중

### 5.1. 불필요한 의존성 제거
- shadcn/ui 컴포넌트를 기본 HTML로 대체함에 따라 관련 의존성 제거
  - `@radix-ui/*` 패키지
  - `class-variance-authority`
  - `clsx`
  - `cmdk`
  - `tailwindcss-animate`
  - `vaul`
- 패키지 크기 및 빌드 시간 감소

### 5.2. 코드 최적화
- 중복 코드 제거
- 컴포넌트 재사용성 개선
- 성능 병목 지점 식별 및 최적화

## 6. 다음 단계

1. **기능 테스트 완료**
   - 통합된 프로젝트 빌드 및 실행 테스트 완료
   - 랜딩페이지 및 대시보드 기능 테스트 완료
   - 다양한 브라우저 및 디바이스에서 호환성 테스트

2. **추가 기능 개발**
   - 데이터 연동 기능 구현
   - 사용자 인증 시스템 개선
   - 보고서 생성 기능 강화

3. **배포 환경 설정**
   - Vercel 배포 파이프라인 구성
   - 환경 변수 및 설정 관리
   - 성능 모니터링 시스템 구축 