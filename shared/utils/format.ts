/**
 * 공통 포맷팅 유틸리티 함수
 */

/**
 * 가격을 한국어 형식으로 포맷팅
 * @param price - 포맷팅할 가격 (숫자)
 * @returns 포맷팅된 가격 문자열 (예: "1,000원")
 */
export function formatPrice(price: number): string {
  return new Intl.NumberFormat('ko-KR').format(price) + '원';
}

/**
 * 날짜 포맷팅 옵션
 */
export interface DateFormatOptions {
  /** 시간 포함 여부 (기본값: true) */
  includeTime?: boolean;
  /** 시간 형식 (기본값: "HH:mm") */
  timeFormat?: 'HH:mm' | 'HH:mm:ss';
  /** 날짜 구분자 (기본값: "월", "일") */
  dateSeparator?: {
    month?: string;
    day?: string;
  };
}

/**
 * 날짜를 한국어 형식으로 포맷팅
 * @param date - 포맷팅할 날짜
 * @param options - 포맷팅 옵션
 * @returns 포맷팅된 날짜 문자열 (예: "12월 25일 14:30")
 */
export function formatDate(date: Date, options: DateFormatOptions = {}): string {
  const {
    includeTime = true,
    timeFormat = 'HH:mm',
    dateSeparator = { month: '월', day: '일' },
  } = options;

  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const seconds = date.getSeconds().toString().padStart(2, '0');

  let formatted = `${month}${dateSeparator.month || '월'} ${day}${dateSeparator.day || '일'}`;

  if (includeTime) {
    if (timeFormat === 'HH:mm:ss') {
      formatted += ` ${hours}:${minutes}:${seconds}`;
    } else {
      formatted += ` ${hours}:${minutes}`;
    }
  }

  return formatted;
}

