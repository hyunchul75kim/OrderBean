import { ApiError, NetworkError, ParseError } from '../utils/errors';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

/**
 * API 응답을 파싱하고 에러를 처리하는 헬퍼 함수
 */
async function parseResponse<T>(response: Response): Promise<T> {
  // 응답이 비어있는 경우
  const contentType = response.headers.get('content-type');
  if (!contentType || !contentType.includes('application/json')) {
    if (response.status === 204 || response.statusText === 'No Content') {
      return {} as T;
    }
    throw new ParseError('응답이 JSON 형식이 아닙니다.');
  }

  try {
    const text = await response.text();
    if (!text) {
      return {} as T;
    }
    return JSON.parse(text) as T;
  } catch (error) {
    throw new ParseError('응답 데이터를 파싱하는데 실패했습니다.');
  }
}

/**
 * fetch 요청을 처리하고 에러를 적절히 변환하는 헬퍼 함수
 */
async function handleRequest<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
    });

    // HTTP 에러 상태 코드 처리
    if (!response.ok) {
      let errorData: unknown;
      try {
        errorData = await response.json();
      } catch {
        errorData = await response.text();
      }

      throw new ApiError(
        `API 요청 실패: ${response.statusText}`,
        response.status,
        errorData
      );
    }

    return parseResponse<T>(response);
  } catch (error) {
    // 이미 ApiError나 ParseError인 경우 그대로 throw
    if (error instanceof ApiError || error instanceof ParseError) {
      throw error;
    }

    // 네트워크 오류 처리
    if (error instanceof TypeError && error.message.includes('fetch')) {
      throw new NetworkError();
    }

    // 기타 에러
    throw new Error(`예상치 못한 오류가 발생했습니다: ${error instanceof Error ? error.message : String(error)}`);
  }
}

export const apiClient = {
  /**
   * GET 요청
   */
  get: async <T = unknown>(endpoint: string): Promise<T> => {
    return handleRequest<T>(endpoint, {
      method: 'GET',
    });
  },

  /**
   * POST 요청
   */
  post: async <T = unknown>(endpoint: string, data?: unknown): Promise<T> => {
    return handleRequest<T>(endpoint, {
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    });
  },

  /**
   * PUT 요청
   */
  put: async <T = unknown>(endpoint: string, data?: unknown): Promise<T> => {
    return handleRequest<T>(endpoint, {
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
    });
  },

  /**
   * DELETE 요청
   */
  delete: async <T = unknown>(endpoint: string): Promise<T> => {
    return handleRequest<T>(endpoint, {
      method: 'DELETE',
    });
  },
};
