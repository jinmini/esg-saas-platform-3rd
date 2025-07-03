// API 클라이언트 설정

import { PaginationParams } from '@/shared/types';
import axios, { AxiosError, type InternalAxiosRequestConfig } from 'axios';
import { getSession, signOut } from 'next-auth/react';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost/api/v1';

// 기본 fetch 옵션
const defaultOptions: RequestInit = {
  headers: {
    'Content-Type': 'application/json',
  },
  credentials: 'include',
};

// API 에러 클래스
export class ApiError extends Error {
  constructor(
    public status: number,
    message: string,
    public data?: unknown,
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 요청 인터셉터: 모든 요청에 인증 토큰 추가
instance.interceptors.request.use(
  async (config) => {
    const session = await getSession();
    if (session?.accessToken) {
      config.headers.Authorization = `Bearer ${session.accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// --- 토큰 갱신 로직 ---
let isRefreshing = false;
let failedQueue: Array<{
  resolve: (value: unknown) => void;
  reject: (reason?: unknown) => void;
}> = [];

const processQueue = (error: Error | null, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

// 응답 인터셉터: 401 에러 처리 (토큰 갱신)
instance.interceptors.response.use(
  (response) => response.data, // 성공 시 바로 data 반환
  async (error: AxiosError) => {
    const originalRequest =
      error.config as InternalAxiosRequestConfig & { _retry?: boolean };

    if (error.response?.status === 401 && originalRequest && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            if (originalRequest.headers) {
              originalRequest.headers['Authorization'] = 'Bearer ' + token;
            }
            return instance(originalRequest);
          })
          .catch((err) => {
            return Promise.reject(err);
          });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const session = await getSession();
        if (!session?.refreshToken) {
          await signOut({ redirect: true, callbackUrl: '/auth/login' });
          throw new Error('리프레시 토큰이 없습니다. 다시 로그인해주세요.');
        }

        const { data } = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`,
          { refreshToken: session.refreshToken },
        );

        const newAccessToken = data.accessToken;
        
        instance.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;

        processQueue(null, newAccessToken);

        if (originalRequest.headers) {
          originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
        }
        return instance(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError as Error, null);
        await signOut({ redirect: true, callbackUrl: '/auth/login' });
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    const status = error.response?.status || 0;
    const message = (error.response?.data as any)?.message || error.message;
    const errorData = error.response?.data;
    return Promise.reject(new ApiError(status, message, errorData));
  },
);

// GET 요청
export async function get<T>(
  endpoint: string,
  params?: Record<string, string | number | boolean>
): Promise<T> {
  const queryString = params
    ? '?' + new URLSearchParams(
        Object.entries(params).reduce((acc, [key, value]) => {
          acc[key] = String(value);
          return acc;
        }, {} as Record<string, string>)
      ).toString()
    : '';
  
  return instance.get<T>(`${endpoint}${queryString}`);
}

// POST 요청
export async function post<T>(
  endpoint: string,
  body?: unknown
): Promise<T> {
  return instance.post<T>(endpoint, body);
}

// PUT 요청
export async function put<T>(
  endpoint: string,
  body?: unknown
): Promise<T> {
  return instance.put<T>(endpoint, body);
}

// DELETE 요청
export async function del<T>(
  endpoint: string
): Promise<T> {
  return instance.delete<T>(endpoint);
}

// 페이지네이션 파라미터 변환
export function buildPaginationParams(params: PaginationParams): Record<string, string> {
  return {
    page: params.page.toString(),
    limit: params.limit.toString(),
    ...(params.sortBy && { sortBy: params.sortBy }),
    ...(params.sortOrder && { sortOrder: params.sortOrder }),
  };
}

// API 응답 변환 헬퍼
export function transformApiResponse<T, R>(
  data: T,
  transformer: (item: T) => R
): R {
  return transformer(data);
}

// 날짜 변환 헬퍼
export function formatDateForApi(date: Date | string): string {
  if (typeof date === 'string') {
    return date;
  }
  return date.toISOString();
}

// 에러 메시지 추출
export function getErrorMessage(error: unknown): string {
  if (error instanceof ApiError) {
    return error.message;
  }
  if (error instanceof Error) {
    return error.message;
  }
  return '알 수 없는 오류가 발생했습니다';
}

// API 클라이언트 export
export const apiClient = {
  get: <T>(endpoint: string, params?: object) =>
    instance.get<T>(endpoint, { params }).then(res => res),
  post: <T>(endpoint: string, body?: unknown) =>
    instance.post<T>(endpoint, body).then(res => res),
  put: <T>(endpoint: string, body?: unknown) =>
    instance.put<T>(endpoint, body).then(res => res),
  delete: <T>(endpoint: string) =>
    instance.delete<T>(endpoint).then(res => res),
};

export default apiClient;
