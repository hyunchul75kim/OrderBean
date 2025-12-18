/**
 * 공통 로깅 유틸리티
 * 개발 환경에서만 콘솔에 로그를 출력하고, 프로덕션에서는 에러 모니터링 서비스로 전송
 */

type LogLevel = 'debug' | 'info' | 'warn' | 'error';

interface LogEntry {
  level: LogLevel;
  message: string;
  data?: unknown;
  timestamp: Date;
}

/**
 * 개발 환경 여부 확인
 */
const isDev = typeof import !== 'undefined' && import.meta.env?.DEV;

/**
 * 에러 모니터링 서비스 (향후 Sentry 등 연동 가능)
 */
class ErrorMonitoringService {
  captureException(error: Error, context?: Record<string, unknown>): void {
    // TODO: Sentry 등 에러 모니터링 서비스 연동
    // 예: Sentry.captureException(error, { extra: context });
    if (isDev) {
      console.error('[Error Monitoring]', error, context);
    }
  }

  captureMessage(message: string, level: LogLevel = 'error', context?: Record<string, unknown>): void {
    // TODO: Sentry 등 에러 모니터링 서비스 연동
    // 예: Sentry.captureMessage(message, { level, extra: context });
    if (isDev) {
      console[level]('[Error Monitoring]', message, context);
    }
  }
}

const errorMonitoring = new ErrorMonitoringService();

/**
 * 로그 출력 (개발 환경에서만)
 */
function log(level: LogLevel, message: string, data?: unknown): void {
  if (!isDev) {
    // 프로덕션에서는 에러만 모니터링 서비스로 전송
    if (level === 'error') {
      const error = data instanceof Error ? data : new Error(message);
      errorMonitoring.captureException(error, { message, data });
    }
    return;
  }

  const entry: LogEntry = {
    level,
    message,
    data,
    timestamp: new Date(),
  };

  // 개발 환경에서만 콘솔에 출력
  switch (level) {
    case 'debug':
      console.debug(`[${entry.timestamp.toISOString()}] [DEBUG]`, message, data || '');
      break;
    case 'info':
      console.info(`[${entry.timestamp.toISOString()}] [INFO]`, message, data || '');
      break;
    case 'warn':
      console.warn(`[${entry.timestamp.toISOString()}] [WARN]`, message, data || '');
      break;
    case 'error':
      console.error(`[${entry.timestamp.toISOString()}] [ERROR]`, message, data || '');
      break;
  }
}

/**
 * 로거 객체
 */
export const logger = {
  /**
   * 디버그 로그 (개발 환경에서만)
   */
  debug: (message: string, data?: unknown) => log('debug', message, data),

  /**
   * 정보 로그 (개발 환경에서만)
   */
  info: (message: string, data?: unknown) => log('info', message, data),

  /**
   * 경고 로그 (개발 환경에서만, 프로덕션에서는 에러 모니터링으로 전송)
   */
  warn: (message: string, data?: unknown) => {
    log('warn', message, data);
    if (!isDev) {
      errorMonitoring.captureMessage(message, 'warn', { data });
    }
  },

  /**
   * 에러 로그 (개발 환경에서만, 프로덕션에서는 에러 모니터링으로 전송)
   */
  error: (message: string, error?: unknown) => {
    log('error', message, error);
    if (!isDev) {
      const err = error instanceof Error ? error : new Error(message);
      errorMonitoring.captureException(err, { message, originalError: error });
    }
  },
};

/**
 * 에러 모니터링 서비스 (외부에서 직접 사용 가능)
 */
export { errorMonitoring };

