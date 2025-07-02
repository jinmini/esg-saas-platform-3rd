'use client'

import { useEffect, useState } from 'react'

interface MSWProviderProps {
  children: React.ReactNode
}

export function MSWProvider({ children }: MSWProviderProps) {
  const [isReady, setIsReady] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [initStep, setInitStep] = useState('시작')

  useEffect(() => {
    async function initMSW() {
      console.log('🔧 MSW Provider: 초기화 시작')
      
      if (process.env.NODE_ENV === 'development') {
        try {
          setInitStep('모듈 로딩...')
          console.log('📦 MSW Provider: 브라우저 모듈 import 중')
          
          const { startMocking } = await import('@/lib/mocks/browser')
          
          setInitStep('서비스 워커 등록...')
          console.log('🚀 MSW Provider: startMocking 호출 중')
          
          await startMocking()
          
          setInitStep('완료')
          console.log('✅ MSW Provider: 초기화 완료')
        } catch (error) {
          console.error('❌ MSW Provider 초기화 실패:', error)
          setError(error instanceof Error ? error.message : 'Unknown error')
          setInitStep('오류 발생')
        }
      } else {
        console.log('🔧 MSW Provider: 프로덕션 모드 - MSW 스킵')
        setInitStep('프로덕션 모드')
      }
      
      console.log('🎯 MSW Provider: isReady = true 설정')
      setIsReady(true)
    }

    initMSW()
  }, [])

  // MSW가 초기화될 때까지 대기
  if (!isReady) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-2 text-sm text-gray-600">API 모킹 서비스 초기화 중...</p>
          <p className="mt-1 text-xs text-gray-500">현재 단계: {initStep}</p>
          {error && (
            <div className="mt-3 p-2 bg-red-100 text-red-700 rounded text-xs">
              에러: {error}
            </div>
          )}
        </div>
      </div>
    )
  }

  return <>{children}</>
} 