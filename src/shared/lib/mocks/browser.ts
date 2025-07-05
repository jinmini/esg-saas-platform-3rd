import { setupWorker } from 'msw/browser'
import { handlers } from './handlers'

// MSW 브라우저 워커 설정
export const worker = setupWorker(...handlers)

// 개발 환경에서만 MSW 실행
export const startMocking = async () => {
  if (typeof window === 'undefined') {
    return
  }

  if (process.env.NODE_ENV === 'development') {
    console.log('🔧 MSW: Mock Service Worker 활성화')
    
    try {
      await worker.start({
        onUnhandledRequest: 'bypass', // 핸들러가 없는 요청은 그대로 통과
        serviceWorker: {
          url: '/mockServiceWorker.js',
        },
      })
      console.log('✅ MSW: Mock Service Worker 시작됨')
    } catch (error) {
      console.error('❌ MSW: Mock Service Worker 시작 실패:', error)
    }
  }
}

// MSW 중지
export const stopMocking = () => {
  if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
    worker.stop()
    console.log('🔴 MSW: Mock Service Worker 중지됨')
  }
} 