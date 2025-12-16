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
