import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import { ApiResponse } from '@/types/api'

// 환경 변수로 백엔드 URL 설정
// 개발 환경에서는 MSW를 사용하므로 강제로 현재 도메인 사용
const BASE_URL = process.env.NODE_ENV === 'development' 
  ? '' // 개발 환경: MSW를 위해 현재 도메인 사용
  : (process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3001') // 프로덕션: 환경변수 또는 기본값

// 개발 환경에서만 설정 로그 출력
if (process.env.NODE_ENV === 'development') {
  console.log('🔧 HTTP Client: MSW 모드 활성화 (BASE_URL: empty string)')
}

// Axios 인스턴스 생성
const createApiClient = (): AxiosInstance => {
  const client = axios.create({
    baseURL: BASE_URL,
    timeout: 30000, // 30초 타임아웃
    headers: {
      'Content-Type': 'application/json',
    },
  })

  // 요청 인터셉터
  client.interceptors.request.use(
    (config) => {
      // 향후 JWT 토큰 추가 시 여기서 설정
      // const token = getToken()
      // if (token) {
      //   config.headers.Authorization = `Bearer ${token}`
      // }
      
      console.log(`🚀 API Request: ${config.method?.toUpperCase()} ${config.url}`)
      return config
    },
    (error) => {
      console.error('❌ Request Error:', error)
      return Promise.reject(error)
    }
  )

  // 응답 인터셉터
  client.interceptors.response.use(
    (response: AxiosResponse) => {
      console.log(`✅ API Response: ${response.status} ${response.config.url}`)
      return response
    },
    (error) => {
      console.error('❌ Response Error:', error.response?.data || error.message)
      
      // 네트워크 에러 처리
      if (!error.response) {
        console.error('🔌 Network Error: Backend server may be offline')
      }
      
      // 향후 인증 에러 처리
      // if (error.response?.status === 401) {
      //   // 토큰 갱신 또는 로그아웃 처리
      // }
      
      return Promise.reject(error)
    }
  )

  return client
}

// API 클라이언트 인스턴스
export const apiClient = createApiClient()

// 타입 안전한 API 호출 헬퍼 함수들
export class HttpClient {
  private client: AxiosInstance

  constructor() {
    this.client = apiClient
  }

  async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.get<T>(url, config)
    return response.data
  }

  async post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.post<T>(url, data, config)
    return response.data
  }

  async put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.put<T>(url, data, config)
    return response.data
  }

  async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.delete<T>(url, config)
    return response.data
  }

  async patch<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.patch<T>(url, data, config)
    return response.data
  }
}

// 기본 HTTP 클라이언트 인스턴스 내보내기
export const httpClient = new HttpClient()

// API 응답 래퍼 함수 (표준화된 응답 형식용)
export const createApiResponse = <T>(data: T, message?: string): ApiResponse<T> => ({
  success: true,
  data,
  message,
})

export const createApiError = (error: string, message?: string): ApiResponse<null> => ({
  success: false,
  data: null,
  error,
  message,
}) 