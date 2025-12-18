# GREEN 단계 최소 단위 구현 시나리오

## 개요

**목표**: 모든 테스트를 통과시키는 최소한의 구현  
**원칙**: 하드코딩된 더미 데이터를 사용하여 테스트 통과 우선, 이후 점진적 개선  
**작업 범위**: 높은 우선순위 6개 작업 (백엔드 4개 + 프론트엔드 2개)

---

## 구현 전략

### 핵심 원칙
1. **최소 구현**: 테스트를 통과시키는 최소한의 코드만 작성
2. **하드코딩 허용**: 실제 데이터베이스 연결 없이 더미 데이터 사용
3. **점진적 개선**: GREEN 단계 완료 후 REFACTOR 단계에서 개선
4. **테스트 우선**: 각 구현 후 즉시 테스트 실행하여 검증

---

## 백엔드 구현 시나리오

### 1. FR-BE-002: 설문 데이터 조회 기능 구현

**목표**: 설문 ID로 설문 응답 데이터를 조회하는 기능

**구현 방법**:
- 파일: `backend/src/repositories/surveyRepository.ts` 생성
- 하드코딩된 더미 설문 데이터 반환
- `survey-123` ID에 대해 미리 정의된 설문 응답 반환

**더미 데이터 구조**:
```typescript
{
  id: 'survey-123',
  answers: [
    { questionId: 'acidity', answer: 3 },
    { questionId: 'bitterness', answer: 2 },
    { questionId: 'nuttiness', answer: 4 },
    { questionId: 'milkCompatible', answer: true }
  ]
}
```

**검증**: 테스트에서 `survey-123`을 사용하므로 해당 ID에 대한 데이터만 반환

---

### 2. FR-BE-005: 상품 데이터 접근 기능 구현 (필요시)

**목표**: 추천할 상품 데이터를 조회하는 기능

**구현 방법**:
- 파일: `backend/src/repositories/productRepository.ts` 수정
- `findAll()` 메서드에 하드코딩된 더미 상품 5개 반환
- 각 상품은 `id`, `name`, `acidity`, `bitterness`, `nuttiness`, `milkCompatible` 필드 포함

**더미 데이터 구조**:
```typescript
[
  { id: 'product-1', name: '에티오피아 예가체프', acidity: 5, bitterness: 2, nuttiness: 2, milkCompatible: false },
  { id: 'product-2', name: '콜롬비아 수프리모', acidity: 3, bitterness: 3, nuttiness: 4, milkCompatible: true },
  { id: 'product-3', name: '케냐 AA', acidity: 4, bitterness: 3, nuttiness: 3, milkCompatible: false },
  { id: 'product-4', name: '과테말라 안티구아', acidity: 2, bitterness: 2, nuttiness: 5, milkCompatible: true },
  { id: 'product-5', name: '브라질 산토스', acidity: 1, bitterness: 4, nuttiness: 5, milkCompatible: true }
]
```

**검증**: 5개 이상의 상품이 반환되어 추천 알고리즘에서 선택 가능

---

### 3. FR-BE-003: 추천 알고리즘 실행 기능 구현

**목표**: 설문 응답을 기반으로 상품을 추천하는 알고리즘

**구현 방법**:
- 파일: `backend/src/utils/recommendationEngine.ts` 수정
- `calculateProductScore()` 함수 구현
- 간단한 점수 계산: 설문 응답과 상품 속성의 차이를 계산하여 점수 부여
- 점수가 높을수록 추천 우선순위 높음

**점수 계산 로직 (최소 구현)**:
```typescript
// 설문 응답과 상품 속성의 차이를 계산
// 차이가 작을수록 높은 점수 (최대 100점)
score = 100 - (차이의 합계)
```

**검증**: 설문 응답에 맞는 상품이 높은 점수를 받아야 함

---

### 4. FR-BE-004: 추천 사유 생성 기능 구현

**목표**: 각 추천 상품에 대한 추천 사유 생성

**구현 방법**:
- 파일: `backend/src/utils/recommendationEngine.ts` 수정
- `generateRecommendationReason()` 함수 구현
- 간단한 템플릿 기반 사유 생성
- 최소 10자 이상의 의미있는 문장 생성

**사유 생성 로직 (최소 구현)**:
```typescript
// 상품 속성과 설문 응답을 기반으로 간단한 문장 생성
// 예: "산미가 강하고 과일향이 풍부한 커피입니다. 설문에서 선호하신 산미 수준과 잘 맞습니다."
```

**검증**: 추천 사유가 10자 이상이어야 함

---

### 5. FR-BE-001: 추천 상품 조회 기능 통합

**목표**: 모든 기능을 통합하여 3~5개의 추천 상품 반환

**구현 방법**:
- 파일: `backend/src/services/recommendationService.ts` 수정
- `getRecommendations()` 메서드 구현
- 다음 순서로 처리:
  1. 설문 데이터 조회 (surveyRepository)
  2. 상품 데이터 조회 (productRepository)
  3. 각 상품에 대해 추천 점수 계산 (recommendationEngine)
  4. 점수 순으로 정렬
  5. 상위 3~5개 선택
  6. 각 상품에 추천 사유 추가
  7. RecommendedProduct 형식으로 변환하여 반환

**검증**:
- 반환되는 상품 개수: 3~5개
- 각 상품에 `id`, `name`, `reason` 필드 포함
- 추천 사유가 10자 이상

---

## 프론트엔드 구현 시나리오

### 6. FR-FE-001: API 모킹 기능 구현

**목표**: 테스트에서 실제 API 호출 대신 모킹된 응답 사용

**구현 방법**:
- 파일: `frontend/src/services/__tests__/recommendationService.test.ts` 수정
- Vitest의 `vi.mock()` 사용하여 `apiClient` 모킹
- `beforeEach`에서 모킹 초기화
- 각 테스트에서 필요한 응답 데이터 모킹

**모킹 구조**:
```typescript
vi.mock('../api', () => ({
  apiClient: {
    get: vi.fn()
  }
}));
```

**모킹 데이터**:
```typescript
const mockRecommendations = [
  { id: '1', name: '에티오피아 예가체프', reason: '산미가 강하고 과일향이 풍부합니다' },
  { id: '2', name: '콜롬비아 수프리모', reason: '균형잡힌 맛과 고소함이 특징입니다' },
  { id: '3', name: '케냐 AA', reason: '밝은 산미와 복합적인 향미를 제공합니다' }
];
```

**검증**: 테스트가 실제 네트워크 요청 없이 실행되어야 함

---

### 7. FR-FE-002: API 에러 처리 기능 구현

**목표**: 네트워크 에러나 잘못된 API 응답에 대한 처리

**구현 방법**:
- 파일: `frontend/src/services/api.ts` 수정
- `get()`, `post()` 메서드에 `try-catch` 추가
- 에러 발생 시 적절한 에러 메시지와 함께 throw
- HTTP 상태 코드 확인 및 처리

**에러 처리 로직**:
```typescript
try {
  const response = await fetch(...);
  if (!response.ok) {
    throw new Error(`API Error: ${response.status}`);
  }
  return await response.json();
} catch (error) {
  throw new Error(`Network error: ${error.message}`);
}
```

**검증**: 
- 네트워크 에러 시 명확한 에러 메시지
- HTTP 에러 시 상태 코드 포함

---

## 구현 순서

### Phase 1: 백엔드 기본 구조 (순차적)

1. **설문 데이터 조회 기능** (FR-BE-002)
   - `surveyRepository.ts` 생성
   - 더미 설문 데이터 반환

2. **상품 데이터 접근 기능** (FR-BE-005)
   - `productRepository.ts` 수정
   - 더미 상품 데이터 반환

3. **추천 알고리즘 구현** (FR-BE-003)
   - `recommendationEngine.ts` 수정
   - 점수 계산 로직 구현

4. **추천 사유 생성 기능** (FR-BE-004)
   - `recommendationEngine.ts` 수정
   - 사유 생성 로직 구현

5. **추천 상품 조회 통합** (FR-BE-001)
   - `recommendationService.ts` 수정
   - 모든 기능 통합

6. **백엔드 테스트 실행 및 검증**
   - `npm test` 실행
   - 모든 테스트 통과 확인

### Phase 2: 프론트엔드 테스트 개선 (병렬 가능)

7. **API 모킹 기능** (FR-FE-001)
   - 테스트 파일에 모킹 추가
   - 모킹 데이터 설정

8. **API 에러 처리 기능** (FR-FE-002)
   - `api.ts`에 에러 처리 추가

9. **프론트엔드 테스트 실행 및 검증**
   - `npm test` 실행
   - 모든 테스트 통과 확인

---

## 예상 결과

### 백엔드 테스트
- ✅ 3개 테스트 모두 통과
- ✅ 추천 상품 3~5개 반환
- ✅ 필수 필드 포함 확인
- ✅ 추천 사유 10자 이상 확인

### 프론트엔드 테스트
- ✅ 1개 테스트 통과
- ✅ 실제 네트워크 요청 없이 실행
- ✅ 모킹된 데이터로 검증

---

## 주의사항

1. **하드코딩 허용**: 이 단계에서는 하드코딩된 더미 데이터 사용이 허용됨
2. **최소 구현**: 테스트를 통과시키는 최소한의 코드만 작성
3. **리팩토링 보류**: 코드 품질 개선은 REFACTOR 단계에서 진행
4. **에러 처리 최소화**: 기본적인 에러 처리만 구현, 상세한 에러 케이스는 중간 우선순위에서 처리

---

## 승인 요청

이 시나리오로 진행하시겠습니까?

**승인 시 진행할 작업**:
1. 백엔드 5개 파일 생성/수정
2. 프론트엔드 2개 파일 수정
3. 테스트 실행 및 검증

**예상 소요 시간**: 약 30-60분

---

**작성 일시**: 2025-12-16  
**대상**: GREEN 단계 높은 우선순위 작업 (6개)

