# TDD RED 단계 작업 보고서

## 작업 개요

**작업 일자**: 2025-12-16  
**작업 목표**: TDD(Test-Driven Development)의 RED 단계 테스트 케이스 작성 및 커버리지 설정  
**대상 기능**: `recommendationService.getRecommendations`

---

## 1. 작업 내용

### 1.1 테스트 프레임워크 설정

#### Jest 설치 및 설정
- **파일**: `backend/package.json`
- **추가된 의존성**:
  - `jest`: ^29.7.0
  - `ts-jest`: ^29.1.1
  - `@types/jest`: ^29.5.11

#### Jest 설정 파일 생성
- **파일**: `backend/jest.config.js`
- **주요 설정**:
  - ES 모듈 지원 (ESM)
  - TypeScript 변환 설정
  - 테스트 파일 매칭 패턴: `**/tests/**/*.test.ts`, `**/tests/**/*.spec.ts`
  - 커버리지 수집 범위 설정
  - 커버리지 리포트 형식: text, text-summary, html, lcov, json

### 1.2 RED 단계 테스트 케이스 작성

#### 테스트 파일
- **파일**: `backend/tests/recommendationService.test.ts`
- **테스트 대상**: `recommendationService.getRecommendations`

#### 작성된 테스트 케이스

##### 테스트 1: 추천 상품 개수 검증
```typescript
it('should return 3 to 5 recommended products for a valid survey ID', async () => {
  // Given: 유효한 설문 ID가 주어졌을 때
  const surveyId = 'survey-123';

  // When: 추천을 요청하면
  const recommendations = await recommendationService.getRecommendations(surveyId);

  // Then: 3~5개의 추천 상품이 반환되어야 함
  expect(recommendations.length).toBeGreaterThanOrEqual(3);
  expect(recommendations.length).toBeLessThanOrEqual(5);
});
```

**검증 사항**:
- 추천 상품은 3개 이상 5개 이하여야 함

##### 테스트 2: 추천 상품 필수 필드 검증
```typescript
it('should return recommended products with required fields (id, name, reason)', async () => {
  // Given: 유효한 설문 ID가 주어졌을 때
  const surveyId = 'survey-123';

  // When: 추천을 요청하면
  const recommendations = await recommendationService.getRecommendations(surveyId);

  // Then: 각 추천 상품은 id, name, reason 필드를 포함해야 함
  recommendations.forEach((product: RecommendedProduct) => {
    expect(product).toHaveProperty('id');
    expect(product).toHaveProperty('name');
    expect(product).toHaveProperty('reason');
    expect(typeof product.id).toBe('string');
    expect(typeof product.name).toBe('string');
    expect(typeof product.reason).toBe('string');
    expect(product.id.length).toBeGreaterThan(0);
    expect(product.name.length).toBeGreaterThan(0);
    expect(product.reason.length).toBeGreaterThan(0);
  });
});
```

**검증 사항**:
- 각 추천 상품은 `id`, `name`, `reason` 필드를 포함해야 함
- 모든 필드는 문자열 타입이어야 함
- 모든 필드는 비어있지 않아야 함

##### 테스트 3: 설문 기반 추천 검증
```typescript
it('should return recommendations based on survey answers', async () => {
  // Given: 특정 취향을 가진 설문 응답이 있을 때
  const surveyId = 'survey-123';

  // When: 추천을 요청하면
  const recommendations = await recommendationService.getRecommendations(surveyId);

  // Then: 설문 결과에 맞는 추천 상품이 반환되어야 함
  expect(recommendations.length).toBeGreaterThan(0);
  
  // 각 추천 상품에는 추천 사유가 포함되어야 함
  recommendations.forEach((product: RecommendedProduct) => {
    expect(product.reason).toBeTruthy();
    expect(product.reason.length).toBeGreaterThan(10); // 의미있는 추천 사유
  });
});
```

**검증 사항**:
- 추천 상품이 1개 이상 반환되어야 함
- 각 추천 상품에는 의미있는 추천 사유(10자 이상)가 포함되어야 함

### 1.3 커버리지 설정

#### package.json 스크립트 추가
```json
{
  "scripts": {
    "test": "jest",
    "test:coverage": "jest --coverage",
    "test:watch": "jest --watch"
  }
}
```

#### 커버리지 설정 (jest.config.js)
- **커버리지 디렉토리**: `coverage/`
- **커버리지 리포트 형식**:
  - text: 콘솔 출력
  - text-summary: 요약 정보
  - html: 브라우저에서 확인 가능한 HTML 리포트
  - lcov: CI/CD 통합용 LCOV 형식
  - json: JSON 형식 리포트
- **커버리지 임계값**: RED 단계이므로 0%로 설정

---

## 2. 테스트 실행 결과

### 2.1 테스트 실행 명령어
```bash
npm test
# 또는
npm run test:coverage
```

### 2.2 테스트 결과 (RED 단계)

```
Test Suites: 1 failed, 1 total
Tests:       2 failed, 1 passed, 3 total
```

#### 실패한 테스트 (예상대로 실패)

1. **should return 3 to 5 recommended products for a valid survey ID**
   - **실패 이유**: 현재 `recommendationService.getRecommendations`가 빈 배열(`[]`)을 반환
   - **예상 동작**: 3~5개의 추천 상품 반환
   - **실제 동작**: 0개 반환

2. **should return recommendations based on survey answers**
   - **실패 이유**: 빈 배열 반환으로 인해 추천 상품이 없음
   - **예상 동작**: 설문 결과 기반 추천 상품 반환
   - **실제 동작**: 0개 반환

#### 통과한 테스트

- **should return recommended products with required fields**
  - 빈 배열에 대한 필드 검증은 통과 (빈 배열이므로 forEach가 실행되지 않음)

### 2.3 커버리지 리포트

```
=============================== Coverage summary ===============================
Statements   : 1.78% ( 2/112 )
Branches     : 100% ( 0/0 )
Functions    : 2.56% ( 1/39 )
Lines        : 1.78% ( 2/112 )
================================================================================
```

#### 파일별 커버리지

**recommendationService.ts**: 100% 커버리지
- 테스트가 실행되어 함수가 호출됨
- 하지만 실제 로직은 미구현 상태 (빈 배열 반환)

**전체 프로젝트**:
- Statements: 1.78%
- Functions: 2.56%
- Lines: 1.78%

---

## 3. 현재 구현 상태

### 3.1 recommendationService.ts

```typescript
export interface RecommendedProduct {
  id: string;
  name: string;
  reason: string;
  imageUrl?: string;
}

export const recommendationService = {
  getRecommendations: async (surveyId: string): Promise<RecommendedProduct[]> => {
    // TODO: 추천 로직 구현
    return [];
  },
};
```

**현재 상태**:
- 인터페이스 정의 완료
- 함수 시그니처 정의 완료
- 실제 로직 미구현 (빈 배열 반환)

---

## 4. 생성된 파일 목록

### 4.1 설정 파일
- `backend/package.json` - Jest 의존성 및 스크립트 추가
- `backend/jest.config.js` - Jest 설정 파일 (신규 생성)

### 4.2 테스트 파일
- `backend/tests/recommendationService.test.ts` - RED 단계 테스트 케이스 (신규 생성)

### 4.3 커버리지 리포트
- `backend/coverage/` - 커버리지 리포트 디렉토리
  - `index.html` - HTML 리포트
  - `lcov.info` - LCOV 형식 리포트
  - `coverage-final.json` - JSON 형식 리포트

---

## 5. 다음 단계 (GREEN 단계)

### 5.1 구현 필요 사항

1. **설문 데이터 조회**
   - 설문 ID로 설문 응답 데이터 조회
   - 설문 응답 파싱 (산미, 쓴맛, 고소함, 우유 호환 여부 등)

2. **상품 데이터 조회**
   - 모든 상품 또는 필터링된 상품 조회

3. **추천 알고리즘 구현**
   - 설문 응답과 상품 속성 매칭
   - 점수 계산 및 정렬
   - 상위 3~5개 상품 선택

4. **추천 사유 생성**
   - 각 추천 상품에 대한 추천 사유 텍스트 생성

### 5.2 예상 테스트 결과 (GREEN 단계)

구현 완료 후:
- 모든 테스트 통과
- 커버리지 증가
- 추천 상품 3~5개 반환
- 각 상품에 의미있는 추천 사유 포함

---

## 6. 참고 사항

### 6.1 테스트 실행 명령어

```bash
# 일반 테스트 실행
npm test

# 커버리지 포함 테스트 실행
npm run test:coverage

# 감시 모드 테스트 실행
npm run test:watch
```

### 6.2 커버리지 리포트 확인

- **HTML 리포트**: `backend/coverage/index.html` 브라우저에서 열기
- **콘솔 출력**: `npm run test:coverage` 실행 시 자동 출력

### 6.3 TDD 사이클

1. ✅ **RED**: 실패하는 테스트 작성 (완료)
2. ⏳ **GREEN**: 테스트를 통과하는 최소한의 코드 작성 (다음 단계)
3. ⏳ **REFACTOR**: 코드 개선 및 리팩토링

---

## 7. 작업 체크리스트

- [x] Jest 테스트 프레임워크 설정
- [x] Jest 설정 파일 생성 (ES 모듈 지원)
- [x] RED 단계 테스트 케이스 작성
- [x] 커버리지 설정 및 리포트 생성
- [x] 테스트 실행 및 RED 단계 확인
- [ ] GREEN 단계 구현 (다음 단계)
- [ ] REFACTOR 단계 (다음 단계)

---

## 8. 부록

### 8.1 테스트 코드 전체

```typescript
import { recommendationService, RecommendedProduct } from '../src/services/recommendationService';

describe('recommendationService', () => {
  describe('getRecommendations', () => {
    it('should return 3 to 5 recommended products for a valid survey ID', async () => {
      const surveyId = 'survey-123';
      const recommendations = await recommendationService.getRecommendations(surveyId);
      expect(recommendations.length).toBeGreaterThanOrEqual(3);
      expect(recommendations.length).toBeLessThanOrEqual(5);
    });

    it('should return recommended products with required fields (id, name, reason)', async () => {
      const surveyId = 'survey-123';
      const recommendations = await recommendationService.getRecommendations(surveyId);
      recommendations.forEach((product: RecommendedProduct) => {
        expect(product).toHaveProperty('id');
        expect(product).toHaveProperty('name');
        expect(product).toHaveProperty('reason');
        expect(typeof product.id).toBe('string');
        expect(typeof product.name).toBe('string');
        expect(typeof product.reason).toBe('string');
        expect(product.id.length).toBeGreaterThan(0);
        expect(product.name.length).toBeGreaterThan(0);
        expect(product.reason.length).toBeGreaterThan(0);
      });
    });

    it('should return recommendations based on survey answers', async () => {
      const surveyId = 'survey-123';
      const recommendations = await recommendationService.getRecommendations(surveyId);
      expect(recommendations.length).toBeGreaterThan(0);
      recommendations.forEach((product: RecommendedProduct) => {
        expect(product.reason).toBeTruthy();
        expect(product.reason.length).toBeGreaterThan(10);
      });
    });
  });
});
```

### 8.2 Jest 설정 파일 전체

```javascript
export default {
  preset: 'ts-jest/presets/default-esm',
  testEnvironment: 'node',
  extensionsToTreatAsEsm: ['.ts'],
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1',
  },
  transform: {
    '^.+\\.ts$': ['ts-jest', {
      useESM: true,
    }],
  },
  testMatch: ['**/tests/**/*.test.ts', '**/tests/**/*.spec.ts'],
  collectCoverageFrom: [
    'src/**/*.ts',
    '!src/**/*.d.ts',
    '!src/index.ts',
    '!src/app.ts',
  ],
  coverageDirectory: 'coverage',
  coverageReporters: [
    'text',
    'text-summary',
    'html',
    'lcov',
    'json',
  ],
  coverageThreshold: {
    global: {
      branches: 0,
      functions: 0,
      lines: 0,
      statements: 0,
    },
  },
  verbose: true,
};
```

---

**작성자**: AI Assistant  
**작성 일자**: 2025-12-16  
**프로젝트**: OrderBean (커피 추천 서비스)

