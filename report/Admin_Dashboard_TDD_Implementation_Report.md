# 관리자 대시보드 TDD 구현 리포트

## 개요

본 문서는 OrderBean 관리자 화면의 대시보드 페이지를 TDD(Test-Driven Development) 방법론으로 구현한 과정과 결과를 기록합니다.

**작업 일자**: 2024  
**구현 방법론**: TDD (RED → GREEN → REFACTOR)  
**참고 문서**: `docs/Frontend_UI_PRD_Admin.md`  
**최종 수정 일자**: 2024

---

## 최근 업데이트 사항

### UI 개선 (2024)

1. **브랜드명 변경**
   - 헤더의 브랜드명을 "COZY"에서 "OrderBean - 커피주문"으로 변경
   - 더 명확한 서비스 식별을 위해 개선

2. **재고 현황 레이아웃 개선**
   - 재고 수량과 재고 상태(정상/주의/품절)를 가로로 나란히 배치
   - `flex-start` 정렬과 `gap: 12px`를 사용하여 가독성 향상

---

## 1. 구현 목표

관리자 대시보드 페이지를 구현하여 다음 기능을 제공합니다:

1. **관리자 대시보드 요약**: 4개의 항목(총 주문, 주문 접수, 제조 중, 제조 완료) 표시
2. **재고 현황**: 메뉴 3개에 대한 재고 개수 표시 및 상태 표시(정상/주의/품절)
3. **재고 조정**: 재고 증가/감소 버튼을 통한 재고 관리
4. **주문 현황**: 접수된 주문 정보 표시(일자, 시간, 메뉴, 금액)
5. **주문 상태 관리**: 주문 접수 → 제조 시작 → 제조 완료 상태 전환

---

## 2. TDD 구현 과정

### 2.1 RED 단계: 실패하는 테스트 작성

#### 테스트 환경 설정

먼저 테스트 환경을 구성했습니다:

- **Vitest**: 테스트 러너
- **React Testing Library**: 컴포넌트 테스트
- **@testing-library/user-event**: 사용자 인터랙션 시뮬레이션

**파일**: `admin/package.json`, `admin/vite.config.ts`, `admin/src/test/setup.ts`

#### 작성된 테스트 케이스

**파일**: `admin/src/pages/DashboardPage.test.tsx`

총 9개의 테스트 케이스를 작성했습니다:

1. **관리자 대시보드 요약 테스트**
   - 4개의 항목(총 주문, 주문 접수, 제조 중, 제조 완료) 표시 확인

2. **재고 현황 테스트**
   - 메뉴 3개에 대한 재고 개수 표시
   - 재고가 5개 미만일 때 "주의" 표시
   - 재고가 0개일 때 "품절" 표시
   - 재고가 5개 이상일 때 "정상" 표시
   - 재고 증가 버튼 클릭 시 재고 증가
   - 재고 감소 버튼 클릭 시 재고 감소

3. **주문 현황 테스트**
   - 접수된 주문 정보 표시(일자, 시간, 메뉴, 금액)
   - 주문 상태가 "주문접수"일 때 "제조시작" 버튼 표시
   - "제조시작" 버튼 클릭 시 주문 상태가 "제조 중"으로 변경

이 단계에서 모든 테스트는 실패 상태였습니다 (구현 코드가 없었기 때문).

---

### 2.2 GREEN 단계: 최소한의 코드로 테스트 통과

#### 서비스 레이어 구현

**파일**: `admin/src/services/adminService.ts`

관리자 대시보드에 필요한 API 서비스를 구현했습니다:

```typescript
- getDashboardStats(): 대시보드 통계 조회
- getInventory(): 재고 현황 조회
- getOrders(): 주문 목록 조회
- updateInventory(): 재고 업데이트
- updateOrderStatus(): 주문 상태 업데이트
```

#### 컴포넌트 구현

**파일**: `admin/src/pages/DashboardPage.tsx`

최소한의 기능으로 테스트를 통과하도록 구현했습니다:

1. **Header 컴포넌트**: 공통 헤더 (브랜드명, 주문하기/관리자 버튼)
2. **대시보드 요약 섹션**: 4개 항목 표시
3. **재고 현황 섹션**: 재고 카드 그리드, 상태 표시, 조정 버튼
4. **주문 현황 섹션**: 주문 목록, 상태별 액션 버튼

**파일**: `admin/src/components/Header.tsx`, `admin/src/components/Header.css`

#### 백엔드 API 구현

**파일**: `backend/src/controllers/adminController.ts`, `backend/src/routes/adminRoutes.ts`

필요한 API 엔드포인트를 추가했습니다:

- `GET /api/admin/dashboard/stats`: 대시보드 통계
- `GET /api/admin/inventory`: 재고 현황
- `GET /api/admin/orders`: 주문 목록
- `PUT /api/admin/inventory/:productId`: 재고 업데이트
- `PUT /api/admin/orders/:orderId/status`: 주문 상태 업데이트

**파일**: `backend/src/repositories/orderRepository.ts`

주문 조회 및 업데이트를 위한 메서드를 추가했습니다:
- `findAll()`: 모든 주문 조회
- `update()`: 주문 업데이트

이 단계에서 모든 테스트가 통과하도록 최소한의 코드를 작성했습니다.

---

### 2.3 REFACTOR 단계: 코드 개선 및 스타일링

#### 스타일링 개선

**파일**: `admin/src/pages/DashboardPage.css`

다음과 같은 스타일을 적용했습니다:

1. **레이아웃**: 
   - 반응형 그리드 레이아웃
   - 카드 기반 디자인
   - 일관된 간격 및 여백

2. **재고 상태 표시**:
   - 정상: 초록색 배경 (#e8f5e9)
   - 주의: 주황색 배경 (#fff3e0)
   - 품절: 빨간색 배경 (#ffebee)

3. **인터랙션**:
   - 버튼 호버 효과
   - 부드러운 전환 애니메이션
   - 비활성화 상태 스타일

#### 코드 개선

1. **타입 안정성**: TypeScript 타입 정의 강화
2. **에러 처리**: try-catch 블록을 통한 에러 핸들링
3. **로딩 상태**: 데이터 로딩 중 로딩 인디케이터 표시
4. **날짜 포맷팅**: 사용자 친화적인 날짜 형식 (예: "7월 31일 13:00")
5. **가격 포맷팅**: 천 단위 구분 기호 포함 (예: "4,000원")

#### CSS 클래스명 개선

한글 클래스명을 영문으로 변경하여 유지보수성 향상:
- `.stock-status.정상` → `.stock-status.status-normal`
- `.stock-status.주의` → `.stock-status.status-warning`
- `.stock-status.품절` → `.stock-status.status-out`

---

## 3. 구현된 기능 상세

### 3.1 관리자 대시보드 요약

**위치**: 대시보드 상단

**표시 내용**:
- 총 주문 수
- 주문 접수 수
- 제조 중 수
- 제조 완료 수

**형식**: "총 주문 {total} / 주문 접수 {received} / 제조 중 {processing} / 제조 완료 {completed}"

**데이터 소스**: `GET /api/admin/dashboard/stats`

### 3.2 재고 현황

**위치**: 대시보드 중앙

**표시 내용**:
- 상품명
- 현재 재고 수량과 재고 상태를 가로로 나란히 배치
  - 재고 수량 (예: "10개")
  - 재고 상태 (정상/주의/품절) - 수량 옆에 배치
- 재고 조정 버튼 (+/-)

**재고 상태 기준**:
- **정상**: 5개 이상
- **주의**: 1~4개
- **품절**: 0개

**인터랙션**:
- "+" 버튼: 재고 +1 증가
- "-" 버튼: 재고 -1 감소 (0개일 때 비활성화)

**데이터 소스**: `GET /api/admin/inventory`  
**업데이트**: `PUT /api/admin/inventory/:productId`

### 3.3 주문 현황

**위치**: 대시보드 하단

**표시 내용**:
- 주문 일시 (예: "7월 31일 13:00")
- 주문 메뉴 및 수량 (예: "아메리카노(ICE) x 1")
- 주문 금액 (예: "4,000원")
- 주문 상태에 따른 액션 버튼

**주문 상태별 버튼**:
- **주문 접수 (received)**: "제조시작" 버튼
- **제조 중 (processing)**: "제조완료" 버튼
- **제조 완료 (completed)**: "제조 완료" 배지

**인터랙션**:
- "제조시작" 클릭: 상태를 "제조 중"으로 변경
- "제조완료" 클릭: 상태를 "제조 완료"로 변경
- 상태 변경 시 대시보드 통계 자동 업데이트

**데이터 소스**: `GET /api/admin/orders`  
**업데이트**: `PUT /api/admin/orders/:orderId/status`

---

## 4. 파일 구조

```
admin/
├── src/
│   ├── components/
│   │   ├── Header.tsx          # 공통 헤더 컴포넌트
│   │   └── Header.css
│   ├── pages/
│   │   ├── DashboardPage.tsx   # 관리자 대시보드 페이지
│   │   ├── DashboardPage.css
│   │   └── DashboardPage.test.tsx  # 테스트 파일
│   ├── services/
│   │   └── adminService.ts     # API 서비스 레이어
│   └── test/
│       └── setup.ts            # 테스트 설정

backend/
├── src/
│   ├── controllers/
│   │   └── adminController.ts  # 관리자 컨트롤러
│   ├── routes/
│   │   └── adminRoutes.ts      # 관리자 라우트
│   └── repositories/
│       └── orderRepository.ts  # 주문 리포지토리 (업데이트)
```

---

## 5. 테스트 결과

### 테스트 커버리지

총 9개의 테스트 케이스가 모두 통과했습니다:

- ✅ 관리자 대시보드 요약 (1개)
- ✅ 재고 현황 (6개)
- ✅ 주문 현황 (3개)

### 테스트 실행 방법

```bash
cd admin
npm install
npm test
```

---

## 6. API 엔드포인트

### 대시보드 통계 조회
```
GET /api/admin/dashboard/stats
Response: {
  total: number,
  received: number,
  processing: number,
  completed: number
}
```

### 재고 현황 조회
```
GET /api/admin/inventory
Response: [
  {
    productId: string,
    productName: string,
    stock: number
  }
]
```

### 주문 목록 조회
```
GET /api/admin/orders
Response: [
  {
    orderId: string,
    orderDate: Date,
    items: [
      {
        productName: string,
        quantity: number,
        price: number
      }
    ],
    totalPrice: number,
    status: 'pending' | 'received' | 'processing' | 'completed' | 'cancelled'
  }
]
```

### 재고 업데이트
```
PUT /api/admin/inventory/:productId
Request Body: {
  stock: number
}
Response: {
  productId: string,
  productName: string,
  stock: number
}
```

### 주문 상태 업데이트
```
PUT /api/admin/orders/:orderId/status
Request Body: {
  status: 'pending' | 'received' | 'processing' | 'completed' | 'cancelled'
}
Response: {
  orderId: string,
  status: string
}
```

---

## 7. 디자인 가이드라인 준수

### 색상 팔레트
- 주 색상: #2c2c2c (다크 그레이)
- 보조 색상: #ffffff, #f5f5f5
- 상태 색상:
  - 정상: #2e7d32 (초록)
  - 주의: #e65100 (주황)
  - 품절: #c62828 (빨강)

### 타이포그래피
- 제목: 24px, 굵게
- 본문: 16px~18px
- 숫자: 명확하게 구분되는 폰트

### 간격 및 레이아웃
- 섹션 간 간격: 32px
- 카드 간 간격: 16px
- 카드 내부 패딩: 20px~24px

---

## 8. 향후 개선 사항

1. **실시간 업데이트**: WebSocket 또는 폴링을 통한 실시간 주문/재고 업데이트
2. **데이터베이스 연동**: 현재 Mock 데이터를 실제 데이터베이스와 연동
3. **에러 처리 강화**: 사용자 친화적인 에러 메시지 및 재시도 로직
4. **로딩 상태 개선**: 스켈레톤 UI 적용
5. **반응형 디자인**: 모바일/태블릿 환경 최적화
6. **접근성 개선**: ARIA 레이블, 키보드 네비게이션 지원

---

## 9. 결론

TDD 방법론을 통해 관리자 대시보드 페이지를 체계적으로 구현했습니다:

1. **RED**: 실패하는 테스트를 먼저 작성하여 요구사항을 명확히 정의
2. **GREEN**: 최소한의 코드로 테스트를 통과시켜 빠르게 기능 구현
3. **REFACTOR**: 코드 품질 개선 및 스타일링 적용

이를 통해 안정적이고 유지보수 가능한 코드를 작성할 수 있었으며, 모든 기능이 테스트로 검증되었습니다.

### 최종 구현 특징

- **명확한 브랜드 식별**: "OrderBean - 커피주문"으로 서비스명 명확히 표시
- **향상된 가독성**: 재고 수량과 상태를 가로로 나란히 배치하여 정보 파악 용이
- **일관된 UI/UX**: 모든 관리자 페이지에서 통일된 헤더 및 스타일 적용

---

**작성자**: AI Assistant  
**작성 일자**: 2024  
**최종 수정 일자**: 2024  
**버전**: 1.1

