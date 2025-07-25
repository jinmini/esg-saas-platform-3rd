import { setupWorker } from 'msw/browser'
import { handlers } from './handlers'

// MSW 브라우저 워커 설정
export const worker = setupWorker(...handlers)

// 개발 환경에서만 MSW 실행
export const startMocking = async () => {
  if (typeof window === 'undefined') {
    return
  }

  // MSW 활성화 여부 확인
  const isMSWEnabled = process.env.NEXT_PUBLIC_MSW_ENABLED === 'true'
  
  if (process.env.NODE_ENV === 'development' && isMSWEnabled) {
    console.log('🔧 MSW: Mock Service Worker 활성화')
    
    try {
      await worker.start({
        onUnhandledRequest: 'warn', // 핸들러가 없는 요청은 경고 표시
        serviceWorker: {
          url: '/mockServiceWorker.js',
        },
        quiet: false, // MSW 로그 표시
      })
      console.log('✅ MSW: Mock Service Worker 시작됨')
    } catch (error) {
      console.error('❌ MSW: Mock Service Worker 시작 실패:', error)
      throw error // 에러를 다시 던져서 상위에서 처리할 수 있도록
    }
  } else {
    console.log('🔧 MSW: 비활성화 상태 (NODE_ENV:', process.env.NODE_ENV, ', MSW_ENABLED:', isMSWEnabled, ')')
  }
}

// MSW 중지
export const stopMocking = () => {
  if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
    worker.stop()
    console.log('🔴 MSW: Mock Service Worker 중지됨')
  }
} 