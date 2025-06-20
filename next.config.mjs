/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: 'export', // SPA로 출력하여 기존 동작 방식 유지
  // images: {
  //   unoptimized: true, // SPA 모드에서 필요
  // },
  // 경로 별칭 설정은 tsconfig.json에서 관리
  transpilePackages: [], // 필요한 패키지 추가
  
  // Next.js 15 최적화 설정
  experimental: {
    // React 19 컴파일러 최적화 (아직 안정화되지 않음)
    // reactCompiler: true,
  },
  
  // Turbopack 설정 (Next.js 15에서 안정화됨)
  turbopack: {
    // rules: {},
  },
  
  // 캐싱 정책 명시적 설정 (Next.js 15 기본값)
  cacheHandler: undefined,
  cacheMaxMemorySize: 50 * 1024 * 1024, // 50MB
}

export default nextConfig 