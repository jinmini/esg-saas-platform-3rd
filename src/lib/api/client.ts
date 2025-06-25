// API 클라이언트 설정

import { PaginationParams } from '@/types';

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
    public data?: any
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

// 기본 fetch 함수
async function fetchApi<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;
  
  try {
    const response = await fetch(url, {
      ...defaultOptions,
      ...options,
      headers: {
        ...defaultOptions.headers,
        ...options?.headers,
      },
    });

    // 응답 처리
    const data = await response.json();

    if (!response.ok) {
      throw new ApiError(
        response.status,
        data.error || data.message || 'API 요청 실패',
        data
      );
    }

    return data;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    
    // 네트워크 에러 등
    throw new ApiError(
      0,
      error instanceof Error ? error.message : '알 수 없는 오류가 발생했습니다',
      error
    );
  }
}

// GET 요청
export async function get<T>(
  endpoint: string,
  params?: Record<string, any>
): Promise<T> {
  const queryString = params
    ? '?' + new URLSearchParams(params).toString()
    : '';
  
  return fetchApi<T>(`${endpoint}${queryString}`, {
    method: 'GET',
  });
}

// POST 요청
export async function post<T>(
  endpoint: string,
  body?: any
): Promise<T> {
  return fetchApi<T>(endpoint, {
    method: 'POST',
    body: body ? JSON.stringify(body) : undefined,
  });
}

// PUT 요청
export async function put<T>(
  endpoint: string,
  body?: any
): Promise<T> {
  return fetchApi<T>(endpoint, {
    method: 'PUT',
    body: body ? JSON.stringify(body) : undefined,
  });
}

// DELETE 요청
export async function del<T>(
  endpoint: string
): Promise<T> {
  return fetchApi<T>(endpoint, {
    method: 'DELETE',
  });
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
  get,
  post,
  put,
  delete: del,
};
