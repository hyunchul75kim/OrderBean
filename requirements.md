# OrderBean product requirements document
_Exported on 12/15/2025 at 15:42:18 GMT+9 from Cursor (2.2.17)_

---

**User**

# OrderBean PRD (Product Requirements Document)

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

```
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


위 내용을 README.md 파일을 만들어줘.

---

**Cursor**


README.md 파일 생성 중.


```markdown
# OrderBean PRD (Product Requirements Document)

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

```
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

```


README.md 파일을 생성했습니다. 제공하신 PRD 내용을 마크다운 형식으로 정리했습니다.

파일에는 다음이 포함됩니다:
- 제품 개요 및 문제 정의
- 타겟 사용자 및 사용자 여정
- 기능적/비기능적 요구사항
- Gherkin 시나리오
- MVP 범위 및 성공 지표
- 향후 확장 방향

프로젝트 루트에 `README.md`가 생성되었습니다.

---

**User**

@README.md 참조해서 프로젝트 구조를 추가해줘.

---

**Cursor**


프로젝트 구조 확인 중. README.md에 프로젝트 구조 섹션을 추가합니다.



README.md에 프로젝트 구조 섹션 추가 중.


```markdown
# OrderBean PRD (Product Requirements Document)

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

```
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

```
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

```


마크다운 linter 오류 수정 중.



마크다운 linter 오류 수정 중.


```markdown
# OrderBean PRD (Product Requirements Document)

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

```
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

```

```markdown
# OrderBean PRD (Product Requirements Document)

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

```

```markdown
# OrderBean PRD (Product Requirements Document)

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

```


README.md에 프로젝트 구조 섹션을 추가하고 마크다운 linter 오류를 수정했습니다.

추가된 내용:

1. **프로젝트 구조 트리**: 프론트엔드, 관리자, 백엔드, 데이터베이스, 공유 폴더 등 전체 디렉토리 구조
2. **주요 디렉토리 설명**: 각 디렉토리의 역할과 목적
3. **기술 스택 제안**: 개발에 사용할 기술 스택 제안

프로젝트 구조는 PRD의 기능 요구사항을 반영해 설계했습니다:
- 설문 수집 및 추천 기능
- 주문 및 피드백 시스템
- 관리자 대시보드 및 상품 관리
- 모듈화된 추천 로직

모든 마크다운 linter 오류도 수정했습니다.

---

**User**

@README.md 파일을 분석해서 프로젝트 구조를 만들어줘.

---

**Cursor**


README.md를 분석해 프로젝트 구조를 생성 중입니다.



README.md의 프로젝트 구조를 기반으로 디렉토리와 기본 파일 생성 중입니다.



PowerShell에서는 디렉토리를 개별적으로 생성합니다.



기본 파일 생성 중입니다.


```typescriptreact
import React from 'react';

const HomePage: React.FC = () => {
  return (
    <div>
      <h1>OrderBean</h1>
      <p>나에게 맞는 커피를 찾아보세요</p>
      <button>취향 설문 시작하기</button>
    </div>
  );
};

export default HomePage;

```

```typescriptreact
import React from 'react';

const SurveyPage: React.FC = () => {
  return (
    <div>
      <h1>커피 취향 설문</h1>
      {/* 설문 폼 구현 예정 */}
    </div>
  );
};

export default SurveyPage;

```

```typescriptreact
import React from 'react';

const RecommendationPage: React.FC = () => {
  return (
    <div>
      <h1>맞춤 커피 추천</h1>
      {/* 추천 결과 표시 예정 */}
    </div>
  );
};

export default RecommendationPage;

```

```typescriptreact
import React from 'react';

const ProductDetailPage: React.FC = () => {
  return (
    <div>
      <h1>상품 상세</h1>
      {/* 상품 상세 정보 표시 예정 */}
    </div>
  );
};

export default ProductDetailPage;

```

```typescriptreact
import React from 'react';

const OrderPage: React.FC = () => {
  return (
    <div>
      <h1>주문하기</h1>
      {/* 주문 폼 구현 예정 */}
    </div>
  );
};

export default OrderPage;

```

```typescriptreact
import React from 'react';

const FeedbackPage: React.FC = () => {
  return (
    <div>
      <h1>구매 후기</h1>
      {/* 만족도 평가 폼 구현 예정 */}
    </div>
  );
};

export default FeedbackPage;

```

```typescript
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000/api';

export const apiClient = {
  get: async (endpoint: string) => {
    const response = await fetch(`${API_BASE_URL}${endpoint}`);
    return response.json();
  },
  post: async (endpoint: string, data: any) => {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return response.json();
  },
  put: async (endpoint: string, data: any) => {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return response.json();
  },
  delete: async (endpoint: string) => {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'DELETE',
    });
    return response.json();
  },
};

```

```typescript
import { apiClient } from './api';

export interface SurveyAnswer {
  questionId: string;
  answer: string | number;
}

export interface SurveyResponse {
  surveyId: string;
  answers: SurveyAnswer[];
}

export const surveyService = {
  submitSurvey: async (answers: SurveyAnswer[]): Promise<SurveyResponse> => {
    return apiClient.post('/survey', { answers });
  },
};

```

```typescript
import { apiClient } from './api';

export interface RecommendedProduct {
  id: string;
  name: string;
  reason: string;
  imageUrl?: string;
}

export const recommendationService = {
  getRecommendations: async (surveyId: string): Promise<RecommendedProduct[]> => {
    return apiClient.get(`/recommendations/${surveyId}`);
  },
};

```

```typescript
import { apiClient } from './api';

export interface OrderRequest {
  productId: string;
  grindType: string;
  quantity: number;
}

export interface OrderResponse {
  orderId: string;
  orderNumber: string;
}

export const orderService = {
  createOrder: async (order: OrderRequest): Promise<OrderResponse> => {
    return apiClient.post('/orders', order);
  },
  getOrder: async (orderId: string) => {
    return apiClient.get(`/orders/${orderId}`);
  },
};

```

```typescriptreact
import React from 'react';

const DashboardPage: React.FC = () => {
  return (
    <div>
      <h1>운영 대시보드</h1>
      {/* 설문 참여 수, 추천 클릭률, 구매 전환율 표시 예정 */}
    </div>
  );
};

export default DashboardPage;

```

```typescriptreact
import React from 'react';

const ProductListPage: React.FC = () => {
  return (
    <div>
      <h1>상품 목록</h1>
      {/* 상품 목록 표시 및 관리 예정 */}
    </div>
  );
};

export default ProductListPage;

```

```typescriptreact
import React from 'react';

const ProductEditPage: React.FC = () => {
  return (
    <div>
      <h1>상품 등록/수정</h1>
      {/* 상품 등록/수정 폼 구현 예정 */}
    </div>
  );
};

export default ProductEditPage;

```

```typescriptreact
import React from 'react';

const RecommendationConfigPage: React.FC = () => {
  return (
    <div>
      <h1>추천 로직 설정</h1>
      {/* 추천 속성 가중치 설정 예정 */}
    </div>
  );
};

export default RecommendationConfigPage;

```

```typescript
import express from 'express';
import cors from 'cors';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
// TODO: 라우트 연결

// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal server error' });
});

export default app;

```

```typescript
import { Request, Response } from 'express';

export const submitSurvey = async (req: Request, res: Response) => {
  try {
    // TODO: 설문 응답 처리 로직 구현
    res.json({ message: 'Survey submitted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error submitting survey' });
  }
};

```

```typescript
import { Request, Response } from 'express';

export const getRecommendations = async (req: Request, res: Response) => {
  try {
    const { surveyId } = req.params;
    // TODO: 추천 로직 구현
    res.json({ recommendations: [] });
  } catch (error) {
    res.status(500).json({ message: 'Error getting recommendations' });
  }
};

```

```typescript
import { Request, Response } from 'express';

export const getProducts = async (req: Request, res: Response) => {
  try {
    // TODO: 상품 목록 조회 로직 구현
    res.json({ products: [] });
  } catch (error) {
    res.status(500).json({ message: 'Error getting products' });
  }
};

export const getProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    // TODO: 상품 상세 조회 로직 구현
    res.json({ product: {} });
  } catch (error) {
    res.status(500).json({ message: 'Error getting product' });
  }
};

export const createProduct = async (req: Request, res: Response) => {
  try {
    // TODO: 상품 생성 로직 구현
    res.json({ message: 'Product created successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error creating product' });
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    // TODO: 상품 수정 로직 구현
    res.json({ message: 'Product updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error updating product' });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    // TODO: 상품 삭제 로직 구현
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting product' });
  }
};

```

```typescript
import { Request, Response } from 'express';

export const createOrder = async (req: Request, res: Response) => {
  try {
    // TODO: 주문 생성 로직 구현
    res.json({ orderId: '', orderNumber: '' });
  } catch (error) {
    res.status(500).json({ message: 'Error creating order' });
  }
};

export const getOrder = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    // TODO: 주문 조회 로직 구현
    res.json({ order: {} });
  } catch (error) {
    res.status(500).json({ message: 'Error getting order' });
  }
};

```

```typescript
import { Request, Response } from 'express';

export const submitFeedback = async (req: Request, res: Response) => {
  try {
    // TODO: 피드백 저장 로직 구현
    res.json({ message: 'Feedback submitted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error submitting feedback' });
  }
};

```

```typescript
import { Request, Response } from 'express';

export const getDashboardStats = async (req: Request, res: Response) => {
  try {
    // TODO: 대시보드 통계 조회 로직 구현
    res.json({
      surveyCount: 0,
      recommendationClickRate: 0,
      purchaseConversionRate: 0,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error getting dashboard stats' });
  }
};

export const updateRecommendationWeights = async (req: Request, res: Response) => {
  try {
    // TODO: 추천 가중치 업데이트 로직 구현
    res.json({ message: 'Recommendation weights updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error updating recommendation weights' });
  }
};

```

```typescript
export interface SurveyAnswer {
  questionId: string;
  answer: string | number;
}

export const surveyService = {
  processSurvey: async (answers: SurveyAnswer[]) => {
    // TODO: 설문 응답 처리 로직 구현
    return { surveyId: 'survey-1' };
  },
};

```

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

```typescript
export const productService = {
  getAllProducts: async () => {
    // TODO: 상품 목록 조회 로직 구현
    return [];
  },
  getProductById: async (id: string) => {
    // TODO: 상품 조회 로직 구현
    return null;
  },
  createProduct: async (productData: any) => {
    // TODO: 상품 생성 로직 구현
    return { id: 'product-1' };
  },
  updateProduct: async (id: string, productData: any) => {
    // TODO: 상품 수정 로직 구현
    return { id };
  },
  deleteProduct: async (id: string) => {
    // TODO: 상품 삭제 로직 구현
    return true;
  },
};

```

```typescript
export interface OrderRequest {
  productId: string;
  grindType: string;
  quantity: number;
}

export const orderService = {
  createOrder: async (order: OrderRequest) => {
    // TODO: 주문 생성 로직 구현
    return {
      orderId: 'order-1',
      orderNumber: `ORD-${Date.now()}`,
    };
  },
  getOrderById: async (orderId: string) => {
    // TODO: 주문 조회 로직 구현
    return null;
  },
};

```

```typescript
export interface FeedbackData {
  orderId: string;
  productId: string;
  rating: number; // 1-5
  comment?: string;
}

export const feedbackService = {
  submitFeedback: async (feedback: FeedbackData) => {
    // TODO: 피드백 저장 로직 구현
    return { feedbackId: 'feedback-1' };
  },
};

```

```typescript
export interface User {
  id: string;
  email: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

```

```typescript
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl?: string;
  // 맛 속성
  acidity: number; // 산미 (1-5)
  bitterness: number; // 쓴맛 (1-5)
  nuttiness: number; // 고소함 (1-5)
  milkCompatible: boolean; // 우유 호환 여부
  createdAt: Date;
  updatedAt: Date;
}

```

```typescript
export interface SurveyAnswer {
  questionId: string;
  answer: string | number;
}

export interface Survey {
  id: string;
  userId?: string;
  answers: SurveyAnswer[];
  createdAt: Date;
}

```

```typescript
export interface Order {
  id: string;
  orderNumber: string;
  userId?: string;
  productId: string;
  grindType: string;
  quantity: number;
  totalPrice: number;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
  createdAt: Date;
  updatedAt: Date;
}

```

```typescript
export interface Feedback {
  id: string;
  orderId: string;
  productId: string;
  userId?: string;
  rating: number; // 1-5
  comment?: string;
  createdAt: Date;
}

```

```typescript
import { Product } from '../models/Product';

export const productRepository = {
  findAll: async (): Promise<Product[]> => {
    // TODO: 데이터베이스에서 상품 목록 조회
    return [];
  },
  findById: async (id: string): Promise<Product | null> => {
    // TODO: 데이터베이스에서 상품 조회
    return null;
  },
  create: async (product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>): Promise<Product> => {
    // TODO: 데이터베이스에 상품 생성
    throw new Error('Not implemented');
  },
  update: async (id: string, product: Partial<Product>): Promise<Product> => {
    // TODO: 데이터베이스에서 상품 수정
    throw new Error('Not implemented');
  },
  delete: async (id: string): Promise<boolean> => {
    // TODO: 데이터베이스에서 상품 삭제
    return false;
  },
};

```

```typescript
import { Order } from '../models/Order';

export const orderRepository = {
  create: async (order: Omit<Order, 'id' | 'createdAt' | 'updatedAt'>): Promise<Order> => {
    // TODO: 데이터베이스에 주문 생성
    throw new Error('Not implemented');
  },
  findById: async (id: string): Promise<Order | null> => {
    // TODO: 데이터베이스에서 주문 조회
    return null;
  },
  findByOrderNumber: async (orderNumber: string): Promise<Order | null> => {
    // TODO: 데이터베이스에서 주문 번호로 조회
    return null;
  },
};

```

```typescript
import { Feedback } from '../models/Feedback';

export const feedbackRepository = {
  create: async (feedback: Omit<Feedback, 'id' | 'createdAt'>): Promise<Feedback> => {
    // TODO: 데이터베이스에 피드백 생성
    throw new Error('Not implemented');
  },
  findByProductId: async (productId: string): Promise<Feedback[]> => {
    // TODO: 데이터베이스에서 상품별 피드백 조회
    return [];
  },
  findByUserId: async (userId: string): Promise<Feedback[]> => {
    // TODO: 데이터베이스에서 사용자별 피드백 조회
    return [];
  },
};

```

```typescript
import { Router } from 'express';
import { submitSurvey } from '../controllers/surveyController';

const router = Router();

router.post('/', submitSurvey);

export default router;

```

```typescript
import { Router } from 'express';
import { getRecommendations } from '../controllers/recommendationController';

const router = Router();

router.get('/:surveyId', getRecommendations);

export default router;

```

```typescript
import { Router } from 'express';
import {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} from '../controllers/productController';

const router = Router();

router.get('/', getProducts);
router.get('/:id', getProduct);
router.post('/', createProduct);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);

export default router;

```

```typescript
import { Router } from 'express';
import { createOrder, getOrder } from '../controllers/orderController';

const router = Router();

router.post('/', createOrder);
router.get('/:id', getOrder);

export default router;

```

```typescript
import { Router } from 'express';
import { submitFeedback } from '../controllers/feedbackController';

const router = Router();

router.post('/', submitFeedback);

export default router;

```

```typescript
import { Router } from 'express';
import { getDashboardStats, updateRecommendationWeights } from '../controllers/adminController';

const router = Router();

router.get('/dashboard', getDashboardStats);
router.put('/recommendation-weights', updateRecommendationWeights);

export default router;

```

```typescript
import { Request, Response, NextFunction } from 'express';

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
  // TODO: 인증 로직 구현
  next();
};

export const authorizeAdmin = (req: Request, res: Response, next: NextFunction) => {
  // TODO: 관리자 권한 확인 로직 구현
  next();
};

```

```typescript
import { Request, Response, NextFunction } from 'express';

export const validateSurvey = (req: Request, res: Response, next: NextFunction) => {
  // TODO: 설문 데이터 검증 로직 구현
  next();
};

export const validateOrder = (req: Request, res: Response, next: NextFunction) => {
  // TODO: 주문 데이터 검증 로직 구현
  next();
};

```

```typescript
import { Product } from '../models/Product';
import { SurveyAnswer } from '../models/Survey';

export interface RecommendationWeights {
  acidity: number;
  bitterness: number;
  nuttiness: number;
  milkCompatible: number;
}

export const calculateProductScore = (
  product: Product,
  surveyAnswers: SurveyAnswer[],
  weights: RecommendationWeights
): number => {
  // TODO: 추천 점수 계산 로직 구현
  return 0;
};

export const generateRecommendationReason = (
  product: Product,
  surveyAnswers: SurveyAnswer[]
): string => {
  // TODO: 추천 사유 생성 로직 구현
  return '';
};

```

```typescript
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl?: string;
  acidity: number; // 산미 (1-5)
  bitterness: number; // 쓴맛 (1-5)
  nuttiness: number; // 고소함 (1-5)
  milkCompatible: boolean; // 우유 호환 여부
  createdAt: Date;
  updatedAt: Date;
}

```

```typescript
export interface SurveyAnswer {
  questionId: string;
  answer: string | number;
}

export interface Survey {
  id: string;
  userId?: string;
  answers: SurveyAnswer[];
  createdAt: Date;
}

```

```typescript
export interface Order {
  id: string;
  orderNumber: string;
  userId?: string;
  productId: string;
  grindType: string;
  quantity: number;
  totalPrice: number;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
  createdAt: Date;
  updatedAt: Date;
}

export interface OrderRequest {
  productId: string;
  grindType: string;
  quantity: number;
}

```

```typescript
export interface RecommendationWeights {
  acidity: number;
  bitterness: number;
  nuttiness: number;
  milkCompatible: number;
}

export const DEFAULT_RECOMMENDATION_WEIGHTS: RecommendationWeights = {
  acidity: 1.0,
  bitterness: 1.0,
  nuttiness: 1.0,
  milkCompatible: 1.0,
};

```

```sql
-- OrderBean 데이터베이스 스키마

-- 사용자 테이블
CREATE TABLE IF NOT EXISTS users (
  id VARCHAR(36) PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  password_hash VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- 상품 테이블
CREATE TABLE IF NOT EXISTS products (
  id VARCHAR(36) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL,
  image_url VARCHAR(500),
  acidity INT NOT NULL CHECK (acidity >= 1 AND acidity <= 5),
  bitterness INT NOT NULL CHECK (bitterness >= 1 AND bitterness <= 5),
  nuttiness INT NOT NULL CHECK (nuttiness >= 1 AND nuttiness <= 5),
  milk_compatible BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- 설문 테이블
CREATE TABLE IF NOT EXISTS surveys (
  id VARCHAR(36) PRIMARY KEY,
  user_id VARCHAR(36),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
);

-- 설문 응답 테이블
CREATE TABLE IF NOT EXISTS survey_answers (
  id VARCHAR(36) PRIMARY KEY,
  survey_id VARCHAR(36) NOT NULL,
  question_id VARCHAR(100) NOT NULL,
  answer VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (survey_id) REFERENCES surveys(id) ON DELETE CASCADE
);

-- 주문 테이블
CREATE TABLE IF NOT EXISTS orders (
  id VARCHAR(36) PRIMARY KEY,
  order_number VARCHAR(50) UNIQUE NOT NULL,
  user_id VARCHAR(36),
  product_id VARCHAR(36) NOT NULL,
  grind_type VARCHAR(50) NOT NULL,
  quantity INT NOT NULL,
  total_price DECIMAL(10, 2) NOT NULL,
  status VARCHAR(20) DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL,
  FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE RESTRICT
);

-- 피드백 테이블
CREATE TABLE IF NOT EXISTS feedbacks (
  id VARCHAR(36) PRIMARY KEY,
  order_id VARCHAR(36) NOT NULL,
  product_id VARCHAR(36) NOT NULL,
  user_id VARCHAR(36),
  rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
  FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
);

-- 추천 가중치 설정 테이블 (관리자용)
CREATE TABLE IF NOT EXISTS recommendation_weights (
  id VARCHAR(36) PRIMARY KEY,
  acidity DECIMAL(5, 2) DEFAULT 1.0,
  bitterness DECIMAL(5, 2) DEFAULT 1.0,
  nuttiness DECIMAL(5, 2) DEFAULT 1.0,
  milk_compatible DECIMAL(5, 2) DEFAULT 1.0,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- 인덱스 생성
CREATE INDEX idx_surveys_user_id ON surveys(user_id);
CREATE INDEX idx_survey_answers_survey_id ON survey_answers(survey_id);
CREATE INDEX idx_orders_user_id ON orders(user_id);
CREATE INDEX idx_orders_product_id ON orders(product_id);
CREATE INDEX idx_feedbacks_product_id ON feedbacks(product_id);
CREATE INDEX idx_feedbacks_user_id ON feedbacks(user_id);

```

```json
{
  "name": "orderbean-frontend",
  "version": "0.1.0",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview",
    "lint": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.20.0"
  },
  "devDependencies": {
    "@types/react": "^18.2.43",
    "@types/react-dom": "^18.2.17",
    "@typescript-eslint/eslint-plugin": "^6.14.0",
    "@typescript-eslint/parser": "^6.14.0",
    "@vitejs/plugin-react": "^4.2.1",
    "eslint": "^8.55.0",
    "eslint-plugin-react-hooks": "^4.6.0",
    "eslint-plugin-react-refresh": "^0.4.5",
    "typescript": "^5.2.2",
    "vite": "^5.0.8"
  }
}

```

```json
{
  "name": "orderbean-admin",
  "version": "0.1.0",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview",
    "lint": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.20.0"
  },
  "devDependencies": {
    "@types/react": "^18.2.43",
    "@types/react-dom": "^18.2.17",
    "@typescript-eslint/eslint-plugin": "^6.14.0",
    "@typescript-eslint/parser": "^6.14.0",
    "@vitejs/plugin-react": "^4.2.1",
    "eslint": "^8.55.0",
    "eslint-plugin-react-hooks": "^4.6.0",
    "eslint-plugin-react-refresh": "^0.4.5",
    "typescript": "^5.2.2",
    "vite": "^5.0.8"
  }
}

```

```json
{
  "name": "orderbean-backend",
  "version": "0.1.0",
  "type": "module",
  "main": "dist/index.js",
  "scripts": {
    "dev": "tsx watch src/index.ts",
    "build": "tsc",
    "start": "node dist/index.js",
    "test": "jest"
  },
  "dependencies": {
    "express": "^4.18.2",
    "cors": "^2.8.5"
  },
  "devDependencies": {
    "@types/express": "^4.17.21",
    "@types/cors": "^2.8.17",
    "@types/node": "^20.10.5",
    "tsx": "^4.7.0",
    "typescript": "^5.3.3"
  }
}

```

```typescript
import app from './app';

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

```

```jsonc
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "lib": ["ES2020"],
    "moduleResolution": "node",
    "rootDir": "./src",
    "outDir": "./dist",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist", "tests"]
}

```

```ignore
# Dependencies
node_modules/
package-lock.json
yarn.lock
pnpm-lock.yaml

# Build outputs
dist/
build/
*.tsbuildinfo

# Environment variables
.env
.env.local
.env.*.local

# IDE
.vscode/
.idea/
*.swp
*.swo
*~

# OS
.DS_Store
Thumbs.db

# Logs
logs/
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Database
*.db
*.sqlite
*.sqlite3

# Testing
coverage/
.nyc_output/

# Temporary files
tmp/
temp/

```

```json
{
  "name": "orderbean",
  "version": "0.1.0",
  "private": true,
  "description": "개인 맞춤 커피 추천 웹서비스",
  "workspaces": [
    "frontend",
    "admin",
    "backend"
  ],
  "scripts": {
    "dev:frontend": "cd frontend && npm run dev",
    "dev:admin": "cd admin && npm run dev",
    "dev:backend": "cd backend && npm run dev",
    "build:frontend": "cd frontend && npm run build",
    "build:admin": "cd admin && npm run build",
    "build:backend": "cd backend && npm run build",
    "build": "npm run build:frontend && npm run build:admin && npm run build:backend"
  },
  "keywords": [
    "coffee",
    "recommendation",
    "e-commerce"
  ],
  "author": "",
  "license": "MIT"
}

```

```markdown
# OrderBean 아키텍처 문서

## 개요

OrderBean은 개인 맞춤 커피 추천 웹서비스로, 프론트엔드, 관리자 대시보드, 백엔드 API로 구성됩니다.

## 시스템 아키텍처

### 계층 구조

```
┌─────────────────┐
│   Frontend       │  (React + TypeScript + Vite)
│   (고객용)       │
└────────┬─────────┘
         │
         │ HTTP/REST API
         │
┌────────▼─────────┐
│   Backend API    │  (Node.js + Express + TypeScript)
│                  │
│  ┌────────────┐  │
│  │ Controller │  │
│  └─────┬──────┘  │
│        │         │
│  ┌─────▼──────┐  │
│  │  Service   │  │
│  └─────┬──────┘  │
│        │         │
│  ┌─────▼──────┐  │
│  │ Repository │  │
│  └─────┬──────┘  │
└────────┼─────────┘
         │
┌────────▼─────────┐
│   Database       │  (PostgreSQL / SQLite)
└──────────────────┘
```

## 주요 컴포넌트

### Frontend
- React 기반 SPA
- 설문, 추천 결과, 주문 기능 제공
- 반응형 디자인

### Admin Dashboard
- 관리자 전용 대시보드
- 상품 관리, 추천 로직 설정, 통계 확인

### Backend API
- RESTful API 서버
- 계층형 아키텍처 (Controller → Service → Repository)
- 모듈화된 추천 엔진

## 데이터 흐름

1. 사용자가 설문 완료
2. Frontend → Backend API (POST /api/survey)
3. Backend에서 추천 로직 실행
4. Backend → Frontend (추천 결과 반환)
5. 사용자가 주문 선택
6. Frontend → Backend API (POST /api/orders)
7. 주문 생성 및 주문 번호 반환

## 보안

- HTTPS 사용
- 비밀번호 단방향 해시
- 관리자 권한 기반 접근 제어
- 입력 데이터 검증

```


백엔드 라우트 연결 및 필수 설정 파일 추가 중입니다.


```typescript
import express from 'express';
import cors from 'cors';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
import surveyRoutes from './routes/surveyRoutes';
import recommendationRoutes from './routes/recommendationRoutes';
import productRoutes from './routes/productRoutes';
import orderRoutes from './routes/orderRoutes';
import feedbackRoutes from './routes/feedbackRoutes';
import adminRoutes from './routes/adminRoutes';

app.use('/api/survey', surveyRoutes);
app.use('/api/recommendations', recommendationRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/feedback', feedbackRoutes);
app.use('/api/admin', adminRoutes);

// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal server error' });
});

export default app;


```

```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
    },
  },
});

```

```jsonc
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}

```

```jsonc
{
  "compilerOptions": {
    "composite": true,
    "skipLibCheck": true,
    "module": "ESNext",
    "moduleResolution": "bundler",
    "allowSyntheticDefaultImports": true
  },
  "include": ["vite.config.ts"]
}

```

```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5174,
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
    },
  },
});

```

```jsonc
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}

```

```jsonc
{
  "compilerOptions": {
    "composite": true,
    "skipLibCheck": true,
    "module": "ESNext",
    "moduleResolution": "bundler",
    "allowSyntheticDefaultImports": true
  },
  "include": ["vite.config.ts"]
}

```


README.md를 분석해 프로젝트 구조를 생성했습니다.

## 생성된 구조

### 1. **프론트엔드** (`frontend/`)
- 페이지 컴포넌트 (HomePage, SurveyPage, RecommendationPage 등)
- 서비스 레이어 (API 클라이언트, surveyService, recommendationService, orderService)
- 컴포넌트 디렉토리 (Survey, Recommendation, Product, Order)
- Vite 설정 및 TypeScript 설정

### 2. **관리자 대시보드** (`admin/`)
- 관리자 페이지 (DashboardPage, ProductListPage, ProductEditPage, RecommendationConfigPage)
- 컴포넌트 디렉토리 구조
- Vite 설정 및 TypeScript 설정

### 3. **백엔드** (`backend/`)
- 컨트롤러 (모든 API 엔드포인트)
- 서비스 레이어 (비즈니스 로직)
- 모델 (User, Product, Survey, Order, Feedback)
- 리포지토리 (데이터 접근 레이어)
- 라우트 (모든 API 라우트 정의 및 연결)
- 미들웨어 (인증, 검증)
- 추천 엔진 유틸리티
- Express 앱 설정 및 서버 진입점

### 4. **데이터베이스** (`database/`)
- SQL 스키마 파일 (모든 테이블 정의)
- 마이그레이션 및 시드 디렉토리

### 5. **공유 리소스** (`shared/`)
- 공통 TypeScript 타입 정의
- 추천 가중치 상수

### 6. **문서** (`docs/`)
- 아키텍처 문서

### 7. **루트 설정 파일**
- `.gitignore`
- 루트 `package.json` (모노레포 워크스페이스 설정)
- 각 프로젝트의 `package.json` 및 설정 파일

모든 파일에 기본 구조와 TODO 주석을 포함했습니다. 다음 단계로 각 기능을 구현하면 됩니다.

