# GREEN 단계 중간 우선순위 최소 단위 구현 시나리오

## 개요

**목표**: 프로덕션 준비를 위한 안정성 강화  
**원칙**: 최소한의 구현으로 엣지 케이스와 에러 처리, 사용자 경험 개선  
**작업 범위**: 중간 우선순위 6개 작업 (백엔드 3개 + 프론트엔드 3개)

---

## 구현 전략

### 핵심 원칙
1. **최소 구현**: 기본적인 검증과 처리만 구현
2. **안전성 우선**: 모든 엣지 케이스에서 안전하게 처리
3. **사용자 경험**: 명확한 피드백 제공
4. **점진적 개선**: 기본 구현 후 필요시 확장

---

## 백엔드 구현 시나리오

### 1. FR-BE-005: 상품 데이터 접근 기능 구현

**목표**: 추천할 상품 데이터를 조회하는 기능 (이미 높은 우선순위에서 구현됨)

**현재 상태**: 
- `productRepository.ts`에 `findAll()` 메서드 존재
- 높은 우선순위 구현에서 더미 데이터 반환 예정

**확인 사항**:
- 높은 우선순위 구현 완료 후 검증
- 필요시 추가 개선

**검증**: 모든 상품 데이터에 접근 가능해야 함

---

### 2. FR-BE-006: 엣지 케이스 처리 기능 구현

**목표**: 잘못된 입력값에 대한 안전한 처리

**구현 방법**:
- 파일: `backend/src/services/recommendationService.ts` 수정
- `getRecommendations()` 메서드 시작 부분에 입력 검증 추가

**처리할 엣지 케이스**:

1. **null/undefined 입력**
   ```typescript
   if (!surveyId) {
     throw new Error('Survey ID is required');
   }
   ```

2. **빈 문자열**
   ```typescript
   if (surveyId.trim().length === 0) {
     throw new Error('Survey ID cannot be empty');
   }
   ```

3. **잘못된 설문 ID 형식** (선택적, 최소 구현)
   ```typescript
   // 기본적인 형식 검증 (예: 최소 길이)
   if (surveyId.length < 3) {
     throw new Error('Invalid survey ID format');
   }
   ```

**구현 위치**:
- `recommendationService.getRecommendations()` 메서드 시작 부분

**검증**:
- 모든 엣지 케이스에서 명확한 에러 메시지 반환
- 시스템이 크래시하지 않음

---

### 3. FR-BE-007: 에러 처리 기능 구현

**목표**: 시스템 에러에 대한 명확한 처리

**구현 방법**:
- 파일: `backend/src/services/recommendationService.ts` 수정
- `getRecommendations()` 메서드에 try-catch 추가
- 각 단계에서 발생할 수 있는 에러 처리

**처리할 에러 케이스**:

1. **설문 데이터 없음**
   ```typescript
   const survey = await surveyRepository.findById(surveyId);
   if (!survey) {
     throw new Error(`Survey not found: ${surveyId}`);
   }
   ```

2. **상품 데이터 없음**
   ```typescript
   const products = await productRepository.findAll();
   if (!products || products.length === 0) {
     throw new Error('No products available for recommendation');
   }
   ```

3. **일반적인 에러 처리**
   ```typescript
   try {
     // 추천 로직 실행
   } catch (error) {
     if (error instanceof Error) {
       throw error; // 이미 명확한 메시지가 있는 경우
     }
     throw new Error('Failed to get recommendations');
   }
   ```

**구현 위치**:
- `recommendationService.getRecommendations()` 메서드 전체

**검증**:
- 모든 에러 케이스에서 명확한 에러 메시지 제공
- 에러가 상위 레이어로 전파되어 적절히 처리됨

---

## 프론트엔드 구현 시나리오

### 4. FR-FE-003: 엣지 케이스 처리 기능 구현

**목표**: 잘못된 입력값에 대한 안전한 처리

**구현 방법**:
- 파일: `frontend/src/services/recommendationService.ts` 수정
- `getRecommendations()` 메서드 시작 부분에 입력 검증 추가

**처리할 엣지 케이스**:

1. **null/undefined 입력**
   ```typescript
   if (!surveyId) {
     throw new Error('Survey ID is required');
   }
   ```

2. **빈 문자열**
   ```typescript
   if (surveyId.trim().length === 0) {
     throw new Error('Survey ID cannot be empty');
   }
   ```

3. **잘못된 설문 ID 형식** (선택적)
   ```typescript
   // 기본적인 형식 검증
   if (surveyId.length < 3) {
     throw new Error('Invalid survey ID format');
   }
   ```

**구현 위치**:
- `recommendationService.getRecommendations()` 메서드 시작 부분

**검증**:
- 모든 엣지 케이스에서 명확한 에러 메시지 반환
- API 호출 전에 검증하여 불필요한 요청 방지

---

### 5. FR-FE-004: 로딩 상태 처리 기능 구현

**목표**: API 요청 중 로딩 상태 표시

**구현 방법**:
- 파일: `frontend/src/pages/RecommendationPage.tsx` 수정
- React의 `useState`로 로딩 상태 관리
- 로딩 중일 때 간단한 텍스트 또는 스피너 표시

**구현 구조**:
```typescript
const [loading, setLoading] = useState(false);
const [recommendations, setRecommendations] = useState<RecommendedProduct[]>([]);

useEffect(() => {
  const fetchRecommendations = async () => {
    setLoading(true);
    try {
      const data = await recommendationService.getRecommendations(surveyId);
      setRecommendations(data);
    } catch (error) {
      // 에러 처리
    } finally {
      setLoading(false);
    }
  };
  fetchRecommendations();
}, [surveyId]);
```

**UI 표시** (최소 구현):
```typescript
{loading && <div>로딩 중...</div>}
{!loading && recommendations.map(...)}
```

**검증**:
- API 요청 중 로딩 상태가 표시됨
- 로딩 완료 후 추천 결과가 표시됨

---

### 6. FR-FE-005: 빈 상태 처리 기능 구현

**목표**: 추천 결과가 없을 때의 처리

**구현 방법**:
- 파일: `frontend/src/pages/RecommendationPage.tsx` 수정
- 추천 결과가 빈 배열일 때 빈 상태 UI 표시

**구현 구조**:
```typescript
{!loading && recommendations.length === 0 && (
  <div>
    <p>추천할 커피를 찾을 수 없습니다.</p>
    <button onClick={() => navigate('/survey')}>
      다시 설문하기
    </button>
  </div>
)}
```

**UI 요소** (최소 구현):
- 안내 메시지
- 대안 액션 버튼 (설문 다시하기)

**검증**:
- 빈 결과일 때 명확한 안내 메시지 표시
- 사용자가 다음 액션을 취할 수 있는 버튼 제공

---

## 구현 순서

### Phase 1: 백엔드 안정성 강화 (순차적)

1. **엣지 케이스 처리** (FR-BE-006)
   - `recommendationService.ts`에 입력 검증 추가
   - null/undefined, 빈 문자열 처리

2. **에러 처리 기능** (FR-BE-007)
   - try-catch 블록 추가
   - 설문 데이터 없음, 상품 데이터 없음 처리
   - 명확한 에러 메시지 제공

3. **백엔드 테스트 실행 및 검증**
   - 엣지 케이스 테스트 추가 (선택적)
   - 기존 테스트 통과 확인

### Phase 2: 프론트엔드 사용자 경험 개선 (순차적)

4. **엣지 케이스 처리** (FR-FE-003)
   - `recommendationService.ts`에 입력 검증 추가
   - API 호출 전 검증

5. **로딩 상태 처리** (FR-FE-004)
   - `RecommendationPage.tsx`에 로딩 상태 추가
   - 로딩 UI 표시

6. **빈 상태 처리** (FR-FE-005)
   - `RecommendationPage.tsx`에 빈 상태 UI 추가
   - 안내 메시지 및 대안 액션 제공

7. **프론트엔드 테스트 실행 및 검증**
   - UI 동작 확인
   - 에러 케이스 테스트 (선택적)

---

## 예상 결과

### 백엔드
- ✅ 모든 엣지 케이스에서 안전하게 처리
- ✅ 명확한 에러 메시지 제공
- ✅ 시스템 안정성 향상

### 프론트엔드
- ✅ 모든 엣지 케이스에서 안전하게 처리
- ✅ 로딩 상태 표시
- ✅ 빈 상태 처리
- ✅ 사용자 경험 개선

---

## 주의사항

1. **최소 구현**: 기본적인 검증과 처리만 구현
2. **에러 메시지**: 사용자 친화적인 메시지 제공
3. **UI 최소화**: 기본적인 텍스트 기반 UI만 구현 (스타일링은 나중에)
4. **테스트**: 핵심 기능만 테스트, UI 테스트는 선택적

---

## 추가 고려사항

### 백엔드
- 엣지 케이스 테스트 작성 (선택적)
- 에러 로깅 추가 (선택적)

### 프론트엔드
- 로딩 스피너 컴포넌트 (선택적, 텍스트로 대체 가능)
- 에러 메시지 표시 UI (선택적)
- 빈 상태 이미지/아이콘 (선택적, 텍스트만으로도 충분)

---

## 승인 요청

이 시나리오로 진행하시겠습니까?

**승인 시 진행할 작업**:
1. 백엔드 1개 파일 수정 (recommendationService.ts)
2. 프론트엔드 2개 파일 수정 (recommendationService.ts, RecommendationPage.tsx)
3. 테스트 실행 및 검증

**예상 소요 시간**: 약 20-40분

---

**작성 일시**: 2025-12-16  
**대상**: GREEN 단계 중간 우선순위 작업 (6개)  
**참고**: 높은 우선순위 구현 완료 후 진행 권장

