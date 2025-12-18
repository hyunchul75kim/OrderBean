/**
 * API 관련 커스텀 에러 클래스
 */

export class ApiError extends Error {
  constructor(
    message: string,
    public statusCode: number,
    public response?: unknown
  ) {
    super(message);
    this.name = 'ApiError';
    Object.setPrototypeOf(this, ApiError.prototype);
  }

  /**
   * HTTP 상태 코드에 따른 사용자 친화적인 메시지 반환
   */
  getUserMessage(): string {
    switch (this.statusCode) {
      case 400:
        return '잘못된 요청입니다. 입력값을 확인해주세요.';
      case 401:
        return '인증이 필요합니다. 다시 로그인해주세요.';
      case 403:
        return '접근 권한이 없습니다.';
      case 404:
        return '요청한 리소스를 찾을 수 없습니다.';
      case 409:
        return '이미 존재하는 데이터입니다.';
      case 422:
        return '입력 데이터가 올바르지 않습니다.';
      case 429:
        return '요청이 너무 많습니다. 잠시 후 다시 시도해주세요.';
      case 500:
        return '서버에 문제가 발생했습니다. 잠시 후 다시 시도해주세요.';
      case 503:
        return '서비스를 일시적으로 사용할 수 없습니다. 잠시 후 다시 시도해주세요.';
      default:
        return this.message || '알 수 없는 오류가 발생했습니다.';
    }
  }
}

export class NetworkError extends Error {
  constructor(message: string = '네트워크 연결에 실패했습니다. 인터넷 연결을 확인해주세요.') {
    super(message);
    this.name = 'NetworkError';
    Object.setPrototypeOf(this, NetworkError.prototype);
  }
}

export class ParseError extends Error {
  constructor(message: string = '응답 데이터를 파싱하는데 실패했습니다.') {
    super(message);
    this.name = 'ParseError';
    Object.setPrototypeOf(this, ParseError.prototype);
  }
}

