# OrderBean PRD (간편주문 서비스)

---

## 1. 제품 개요

### 1.1 제품명

* **OrderBean**

### 1.2 제품 설명 (One-liner)

* 사용자의 커피 취향을 설문으로 파악해, 실패 없는 커피 선택과 주문을 돕는 개인 맞춤 커피 추천 웹서비스

### 1.3 문제 정의 (Problem Statement)

* 온라인 커피 구매자는 원두 종류와 정보가 너무 많고 전문 용어가 어려워 자신의 취향에 맞는 커피를 선택하지 못한다.
* 이로 인해 구매를 망설이거나 잘못된 선택으로 실패 경험을 반복하고 재구매로 이어지지 않는다.

### 1.4 제품 목표

* 커피 선택의 진입 장벽을 낮춰 구매 전환율을 높인다.
* 개인화 추천을 통해 고객 만족도와 재구매율을 높인다.

---

## 2. 타겟 사용자

### 2.1 주요 타겟

* 온라인에서 커피를 구매하는 입문자 및 라이트 유저
* 홈카페를 시작했으나 원두 선택에 어려움을 느끼는 사용자

### 2.2 사용자 니즈

* 나에게 맞는 커피를 쉽게 알고 싶다
* 실패 없는 선택을 하고 싶다
* 설명이 어렵지 않았으면 좋겠다

---

## 3. 핵심 사용자 여정 (User Journey)

1. OrderBean 접속
2. 취향 설문 시작
3. 설문 응답 입력
4. 맞춤 커피 추천 확인
5. 추천 커피 상세 확인
6. 주문 및 결제
7. 구매 후 만족도 평가
8. 개인화 추천 고도화

---

## 4. 기능적 요구사항 (Functional Requirements)

### FR-1. 취향 설문 수집 (고객)

* 사용자는 산미, 쓴맛, 고소함, 우유 여부 등 간단한 설문에 응답할 수 있어야 한다
* 설문은 5문항 이내로 구성되어야 한다

### FR-2. 개인 맞춤 커피 추천 (고객)

* 시스템은 설문 결과를 기반으로 커피 상품 3~5종을 추천해야 한다
* 각 추천 상품에는 추천 사유가 텍스트로 제공되어야 한다

### FR-3. 추천 결과 기반 주문 (고객)

* 사용자는 추천 결과에서 바로 상품 상세 및 주문이 가능해야 한다
* 분쇄도 및 수량을 선택할 수 있어야 한다
* 주문 완료 시 주문 번호를 제공해야 한다

### FR-4. 구매 후 피드백 수집 (고객)

* 사용자는 구매한 커피에 대해 만족도를 평가할 수 있어야 한다
* 평가는 1~5점 척도로 제공된다

### FR-5. 개인화 추천 고도화 (시스템)

* 사용자의 구매 및 평가 이력은 다음 추천에 반영되어야 한다

### FR-6. 상품 관리 (관리자)

* 관리자는 커피 상품을 등록, 수정, 삭제할 수 있어야 한다
* 상품에는 맛 속성 정보가 포함되어야 한다

### FR-7. 추천 로직 관리 (관리자)

* 관리자는 추천에 사용되는 속성 가중치를 설정할 수 있어야 한다

### FR-8. 운영 대시보드 (관리자)

* 관리자는 설문 참여 수, 추천 클릭률, 구매 전환율을 확인할 수 있어야 한다

---

## 5. 비기능적 요구사항 (Non-Functional Requirements)

### 5.1 성능

* 메인 페이지 로딩 시간은 3초 이내여야 한다
* 추천 결과는 설문 제출 후 2초 이내에 제공되어야 한다
* 동시 사용자 100명 환경을 지원해야 한다

### 5.2 보안

* 모든 인증 및 주문 트래픽은 HTTPS를 사용해야 한다
* 비밀번호는 단방향 해시로 저장해야 한다
* 관리자 페이지는 권한 기반 접근 제어를 적용한다

### 5.3 확장성

* 추천 로직은 모듈화하여 교체 가능해야 한다
* API 기반 구조로 모바일 앱 확장을 고려한다

### 5.4 사용성

* 설문 완료 시간은 3분 이내여야 한다
* 커피 전문 용어 사용을 최소화한다
* 모바일 환경에서도 주요 기능을 사용할 수 있어야 한다

---

## 6. Gherkin 기반 핵심 시나리오

### Scenario: 고객이 취향 설문 후 커피를 추천받고 주문한다

```gherkin
Given 고객이 OrderBean 메인 페이지에 접속해 있다
When 고객이 취향 설문을 완료한다
Then 고객 취향에 맞는 커피 3종이 추천된다

When 고객이 추천 커피를 선택해 주문한다
Then 주문이 성공적으로 생성되고 주문 번호가 표시된다
```

---

## 7. MVP 범위

### MVP 포함

* 취향 설문
* 커피 추천
* 추천 기반 주문
* 기본 관리자 상품 관리

### MVP 제외

* 정기 구독
* 고급 AI 추천 모델
* 알림 및 푸시 기능

---

## 8. 성공 지표 (KPI)

* 설문 완료율
* 추천 → 구매 전환율
* 재구매율
* 평균 만족도 점수

---

## 9. 가정 및 제약

* 토이 프로젝트 수준으로 개발한다
* 초기 트래픽은 소규모를 가정한다
* 결제는 테스트 환경으로 대체 가능하다

---

## 10. 향후 확장 방향

* AI 기반 추천 고도화
* 정기 배송 및 구독 모델
* 모바일 앱 출시
* 홈카페 레시피 추천 기능 추가

---

## 11. 프로젝트 구조

```text
OrderBean/
├── frontend/                    # 프론트엔드 (고객용 웹 애플리케이션)
│   ├── src/
│   │   ├── components/          # 재사용 가능한 컴포넌트
│   │   │   ├── Survey/          # 설문 관련 컴포넌트
│   │   │   ├── Recommendation/  # 추천 결과 컴포넌트
│   │   │   ├── Product/         # 상품 관련 컴포넌트
│   │   │   └── Order/           # 주문 관련 컴포넌트
│   │   ├── pages/               # 페이지 컴포넌트
│   │   │   ├── HomePage.tsx
│   │   │   ├── SurveyPage.tsx
│   │   │   ├── RecommendationPage.tsx
│   │   │   ├── ProductDetailPage.tsx
│   │   │   ├── OrderPage.tsx
│   │   │   └── FeedbackPage.tsx
│   │   ├── services/            # API 서비스 레이어
│   │   │   ├── api.ts
│   │   │   ├── surveyService.ts
│   │   │   ├── recommendationService.ts
│   │   │   └── orderService.ts
│   │   ├── hooks/               # 커스텀 훅
│   │   ├── utils/               # 유틸리티 함수
│   │   └── types/               # TypeScript 타입 정의
│   ├── public/
│   └── package.json
│
├── admin/                       # 관리자 대시보드
│   ├── src/
│   │   ├── components/
│   │   │   ├── ProductManagement/  # 상품 관리 컴포넌트
│   │   │   ├── RecommendationConfig/ # 추천 로직 설정 컴포넌트
│   │   │   └── Dashboard/          # 대시보드 컴포넌트
│   │   ├── pages/
│   │   │   ├── DashboardPage.tsx
│   │   │   ├── ProductListPage.tsx
│   │   │   ├── ProductEditPage.tsx
│   │   │   └── RecommendationConfigPage.tsx
│   │   └── services/
│   └── package.json
│
├── backend/                     # 백엔드 API 서버
│   ├── src/
│   │   ├── controllers/         # 컨트롤러 (요청 처리)
│   │   │   ├── surveyController.ts
│   │   │   ├── recommendationController.ts
│   │   │   ├── productController.ts
│   │   │   ├── orderController.ts
│   │   │   ├── feedbackController.ts
│   │   │   └── adminController.ts
│   │   ├── services/            # 비즈니스 로직
│   │   │   ├── surveyService.ts
│   │   │   ├── recommendationService.ts  # 추천 로직
│   │   │   ├── productService.ts
│   │   │   ├── orderService.ts
│   │   │   └── feedbackService.ts
│   │   ├── models/              # 데이터 모델
│   │   │   ├── User.ts
│   │   │   ├── Product.ts
│   │   │   ├── Survey.ts
│   │   │   ├── Order.ts
│   │   │   └── Feedback.ts
│   │   ├── repositories/        # 데이터 접근 레이어
│   │   │   ├── productRepository.ts
│   │   │   ├── orderRepository.ts
│   │   │   └── feedbackRepository.ts
│   │   ├── routes/              # API 라우트
│   │   │   ├── surveyRoutes.ts
│   │   │   ├── recommendationRoutes.ts
│   │   │   ├── productRoutes.ts
│   │   │   ├── orderRoutes.ts
│   │   │   ├── feedbackRoutes.ts
│   │   │   └── adminRoutes.ts
│   │   ├── middleware/          # 미들웨어
│   │   │   ├── auth.ts
│   │   │   └── validation.ts
│   │   ├── utils/               # 유틸리티
│   │   │   └── recommendationEngine.ts  # 추천 엔진 모듈
│   │   └── app.ts               # Express 앱 설정
│   ├── tests/                   # 테스트 파일
│   └── package.json
│
├── database/                    # 데이터베이스 관련
│   ├── migrations/              # 데이터베이스 마이그레이션
│   ├── seeds/                   # 시드 데이터
│   └── schema.sql               # 데이터베이스 스키마
│
├── shared/                      # 공유 타입 및 유틸리티
│   ├── types/                   # 공통 TypeScript 타입
│   │   ├── product.types.ts
│   │   ├── survey.types.ts
│   │   └── order.types.ts
│   └── constants/              # 공통 상수
│       └── recommendation.weights.ts
│
├── docs/                        # 문서
│   ├── api/                     # API 문서
│   └── architecture.md          # 아키텍처 문서
│
├── .gitignore
├── README.md
└── package.json                 # 루트 패키지 (모노레포 설정)
```

### 주요 디렉토리 설명

#### frontend/

* 고객용 웹 애플리케이션
* 설문, 추천 결과 확인, 주문 등의 기능 제공
* 반응형 디자인으로 모바일 환경 지원

#### admin/

* 관리자 전용 대시보드
* 상품 관리, 추천 로직 설정, 운영 통계 확인

#### backend/

* RESTful API 서버
* 추천 로직은 `services/recommendationService.ts`에 모듈화
* 확장성을 고려한 계층형 아키텍처 (Controller → Service → Repository)

#### database/

* 데이터베이스 스키마 및 마이그레이션 관리
* 초기 데이터 시드 파일

#### shared/

* 프론트엔드와 백엔드 간 공유되는 타입 정의
* 추천 가중치 등 공통 상수

### 기술 스택 제안

* **Frontend**: React + TypeScript + Vite
* **Admin**: React + TypeScript + Vite (또는 Next.js)
* **Backend**: Node.js + Express + TypeScript
* **Database**: PostgreSQL (또는 SQLite for MVP)
* **ORM**: Prisma 또는 TypeORM

## To-Do List

---

## TDD 개발 단계별 작업 목록

### 🔴 RED 단계 (완료)

**상태**: ✅ 완료  
**작업 내용**: 테스트 케이스 작성 및 테스트 실행

- ✅ 백엔드 테스트 케이스 작성 (`backend/tests/recommendationService.test.ts`)
- ✅ 프론트엔드 테스트 케이스 작성 (`frontend/src/services/__tests__/recommendationService.test.ts`)
- ✅ 테스트 실행 및 결과 리포트 생성

**참고 문서**:
- `report/TDD_RED_Phase_Report.md`
- `report/Backend_Test_Execution_Report.md`
- `report/Frontend_RED_Phase_Test_Report.md`

---

### 🟢 GREEN 단계 (진행 중)

**상태**: ⏳ 진행 중  
**목표**: 모든 테스트를 통과시키는 최소한의 구현 완료

#### 🔴 높은 우선순위 (즉시 구현 필요)

**백엔드 작업** (4개):

- [ ] **FR-BE-001: 추천 상품 조회 기능 구현**
  - 설문 ID를 기반으로 3~5개의 추천 상품을 반환하는 기능
  - 파일: `backend/src/services/recommendationService.ts`
  - 검증: 반환되는 상품 개수는 3개 이상 5개 이하여야 함

- [ ] **FR-BE-002: 설문 데이터 조회 기능 구현**
  - 설문 ID로 설문 응답 데이터를 조회하는 기능
  - 파일: `backend/src/repositories/surveyRepository.ts` (또는 새로 생성)
  - 검증: 유효한 설문 ID에 대해 설문 데이터를 반환해야 함

- [ ] **FR-BE-003: 추천 알고리즘 실행 기능 구현**
  - 설문 응답을 기반으로 상품을 추천하는 알고리즘 실행 기능
  - 파일: `backend/src/utils/recommendationEngine.ts`
  - 검증: 설문 응답에 맞는 상품이 추천되어야 함

- [ ] **FR-BE-004: 추천 사유 생성 기능 구현**
  - 각 추천 상품에 대한 추천 사유를 생성하는 기능
  - 파일: `backend/src/services/recommendationService.ts` 또는 별도 유틸리티
  - 검증: 추천 사유는 최소 10자 이상이어야 함

**프론트엔드 작업** (2개):

- [ ] **FR-FE-001: API 모킹 기능 구현**
  - 테스트에서 실제 API 호출 대신 모킹된 응답을 사용하는 기능
  - 파일: `frontend/src/services/__tests__/recommendationService.test.ts`
  - 검증: 테스트가 실제 네트워크 요청 없이 실행되어야 함
  - 도구: Vitest의 `vi.mock()` 사용

- [ ] **FR-FE-002: API 에러 처리 기능 구현**
  - 네트워크 에러나 잘못된 API 응답에 대한 처리 기능
  - 파일: `frontend/src/services/api.ts`
  - 검증: 모든 에러 케이스에 대해 적절한 처리 및 사용자 친화적인 메시지 제공

#### 🟡 중간 우선순위 (단기 구현)

**백엔드 작업** (3개):

- [ ] **FR-BE-005: 상품 데이터 접근 기능 구현**
  - 추천할 상품 데이터를 조회하는 기능
  - 파일: `backend/src/repositories/productRepository.ts` (또는 새로 생성)
  - 검증: 모든 상품 데이터에 접근 가능해야 함

- [ ] **FR-BE-006: 엣지 케이스 처리 기능 구현**
  - 잘못된 입력값에 대한 처리 기능
  - 입력 케이스: 잘못된 설문 ID, null/undefined, 빈 문자열
  - 파일: `backend/src/services/recommendationService.ts`
  - 검증: 모든 엣지 케이스에 대해 안전하게 처리되어야 함

- [ ] **FR-BE-007: 에러 처리 기능 구현**
  - 시스템 에러에 대한 처리 기능
  - 에러 케이스: 데이터베이스 연결 실패, 설문 데이터 없음, 상품 데이터 없음
  - 파일: `backend/src/services/recommendationService.ts`
  - 검증: 모든 에러 케이스에 대해 명확한 에러 메시지 제공

**프론트엔드 작업** (3개):

- [ ] **FR-FE-003: 엣지 케이스 처리 기능 구현**
  - 잘못된 입력값에 대한 처리 기능
  - 입력 케이스: 빈 문자열, null/undefined, 잘못된 설문 ID 형식
  - 파일: `frontend/src/services/recommendationService.ts`
  - 검증: 모든 엣지 케이스에 대해 안전하게 처리

- [ ] **FR-FE-004: 로딩 상태 처리 기능 구현**
  - API 요청 중 로딩 상태를 표시하는 기능
  - 파일: `frontend/src/components/Recommendation/` 또는 관련 컴포넌트
  - 검증: 사용자에게 명확한 로딩 상태 피드백 제공

- [ ] **FR-FE-005: 빈 상태 처리 기능 구현**
  - 추천 결과가 없을 때의 처리 기능
  - 파일: `frontend/src/components/Recommendation/` 또는 관련 컴포넌트
  - 검증: 사용자에게 명확한 안내 메시지 및 대안 액션 제시

#### 구현 체크리스트

**🔴 높은 우선순위 (백엔드)**:
- [ ] `recommendationService.getRecommendations()` 메서드 구현
- [ ] 설문 데이터 조회 로직 구현
- [ ] 추천 알고리즘 로직 구현
- [ ] 추천 사유 생성 로직 구현
- [ ] 모든 테스트 통과 확인

**🔴 높은 우선순위 (프론트엔드)**:
- [ ] API 모킹 설정 (`vi.mock()` 사용)
- [ ] 에러 처리 로직 추가 (`try-catch`, 에러 메시지)
- [ ] 모든 테스트 통과 확인

**🟡 중간 우선순위 (백엔드)**:
- [ ] 상품 데이터 접근 로직 구현
- [ ] 엣지 케이스 처리 로직 추가
- [ ] 에러 처리 로직 강화

**🟡 중간 우선순위 (프론트엔드)**:
- [ ] 엣지 케이스 처리 로직 추가
- [ ] 로딩 상태 UI 컴포넌트 구현
- [ ] 빈 상태 UI 컴포넌트 구현

#### 구현 가이드

**🔴 높은 우선순위 구현 순서**:

**백엔드**:
1. 설문 데이터 조회 기능 구현 (FR-BE-002)
2. 상품 데이터 접근 기능 구현 (FR-BE-005) - 필요시
3. 추천 알고리즘 구현 (FR-BE-003)
4. 추천 사유 생성 기능 구현 (FR-BE-004)
5. 추천 상품 조회 기능 통합 (FR-BE-001)

**프론트엔드**:
1. API 모킹 설정 (FR-FE-001)
2. 에러 처리 로직 추가 (FR-FE-002)
3. 테스트 실행 및 검증

**🟡 중간 우선순위 구현 순서**:

**백엔드**:
1. 엣지 케이스 처리 기능 구현 (FR-BE-006)
2. 에러 처리 기능 강화 (FR-BE-007)

**프론트엔드**:
1. 엣지 케이스 처리 기능 구현 (FR-FE-003)
2. 로딩 상태 처리 기능 구현 (FR-FE-004)
3. 빈 상태 처리 기능 구현 (FR-FE-005)

**참고 문서**:
- `report/Implementation_Requirements.md` - 상세 구현 요구사항
- `backend/tests/recommendationService.test.ts` - 테스트 케이스
- `frontend/src/services/__tests__/recommendationService.test.ts` - 테스트 케이스

---

### 🔵 REFACTOR 단계 (예정)

**상태**: ⏳ 대기 중  
**목표**: 코드 품질 개선 및 최적화

#### 예정 작업

**백엔드**:
- [ ] 코드 리팩토링 및 가독성 개선
- [ ] 성능 최적화
- [ ] 캐싱 기능 추가
- [ ] 엣지 케이스 처리 강화
- [ ] 에러 처리 개선

**프론트엔드**:
- [ ] 테스트 환경 개선
- [ ] 에러 케이스 테스트 추가
- [ ] 로딩 상태 처리 추가
- [ ] 빈 상태 처리 추가

---

## 구현 우선순위 요약

### 🔴 높은 우선순위 (즉시 구현 필요)

**목표**: 모든 테스트를 통과시키는 최소한의 구현

**백엔드** (4개):
1. FR-BE-001: 추천 상품 조회 기능 (3~5개 반환)
2. FR-BE-002: 설문 데이터 조회 기능
3. FR-BE-003: 추천 알고리즘 실행 기능
4. FR-BE-004: 추천 사유 생성 기능

**프론트엔드** (2개):
1. FR-FE-001: API 모킹 기능
2. FR-FE-002: API 에러 처리 기능

**총 6개 작업** - GREEN 단계 완료를 위해 필수

---

### 🟡 중간 우선순위 (단기 구현)

**목표**: 프로덕션 준비를 위한 안정성 강화

**백엔드** (3개):
1. FR-BE-005: 상품 데이터 접근 기능
2. FR-BE-006: 엣지 케이스 처리 기능
3. FR-BE-007: 에러 처리 기능

**프론트엔드** (3개):
1. FR-FE-003: 엣지 케이스 처리 기능
2. FR-FE-004: 로딩 상태 처리 기능
3. FR-FE-005: 빈 상태 처리 기능

**총 6개 작업** - 사용자 경험 및 안정성 개선

---

**자세한 내용은 `report/Implementation_Requirements.md` 참고**