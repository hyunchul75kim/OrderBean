# OrderBean 백엔드 개발 PRD (Backend Product Requirements Document)

---

## 1. 문서 개요

### 1.1 목적
이 문서는 OrderBean 프로젝트의 백엔드 개발을 위한 상세 요구사항을 정의합니다. 데이터 모델, API 설계, 사용자 흐름, 비즈니스 로직 등 백엔드 개발에 필요한 모든 사항을 포함합니다.

### 1.2 참조 문서
* [PRD_Up1.md](./PRD_Up1.md) - 전체 제품 요구사항 문서

### 1.3 기술 스택
* **프레임워크:** Express.js (Node.js/TypeScript)
* **데이터베이스:** PostgreSQL
* **ORM:** TypeORM 또는 Prisma (선택)
* **인증:** JWT (선택, 향후 확장)
* **테스트:** Jest

---

## 2. 데이터 모델 (Data Models)

### 2.1 Menus (메뉴/상품)

커피 메뉴 정보를 저장하는 테이블입니다.

#### 필드 정의

| 필드명 | 타입 | 제약조건 | 설명 |
|--------|------|----------|------|
| id | UUID/String | PRIMARY KEY, NOT NULL | 메뉴 고유 식별자 |
| name | String | NOT NULL, VARCHAR(100) | 커피 이름 |
| description | Text | NULL 허용 | 커피 설명 |
| price | Decimal | NOT NULL, >= 0 | 가격 |
| imageUrl | String | NULL 허용, VARCHAR(500) | 이미지 URL |
| stockQuantity | Integer | NOT NULL, >= 0 | 재고 수량 |
| createdAt | DateTime | NOT NULL | 생성 일시 |
| updatedAt | DateTime | NOT NULL | 수정 일시 |

#### 관계 (Relationships)
* Menus 1:N Options (하나의 메뉴는 여러 옵션을 가질 수 있음)
* Menus 1:N OrderItems (하나의 메뉴는 여러 주문 항목에 포함될 수 있음)

---

### 2.2 Options (옵션)

메뉴에 연결되는 옵션 정보를 저장하는 테이블입니다. (예: 분쇄도, 사이즈 등)

#### 필드 정의

| 필드명 | 타입 | 제약조건 | 설명 |
|--------|------|----------|------|
| id | UUID/String | PRIMARY KEY, NOT NULL | 옵션 고유 식별자 |
| menuId | UUID/String | FOREIGN KEY, NOT NULL | 연결할 메뉴 ID |
| name | String | NOT NULL, VARCHAR(100) | 옵션 이름 (예: "원두", "분쇄(에스프레소)", "분쇄(드립)") |
| price | Decimal | NOT NULL, >= 0 | 옵션 가격 (기본값: 0) |
| createdAt | DateTime | NOT NULL | 생성 일시 |
| updatedAt | DateTime | NOT NULL | 수정 일시 |

#### 관계 (Relationships)
* Options N:1 Menus (여러 옵션은 하나의 메뉴에 속함)
* Options 1:N OrderItems (하나의 옵션은 여러 주문 항목에 사용될 수 있음)

---

### 2.3 Orders (주문)

주문 정보를 저장하는 테이블입니다.

#### 필드 정의

| 필드명 | 타입 | 제약조건 | 설명 |
|--------|------|----------|------|
| id | UUID/String | PRIMARY KEY, NOT NULL | 주문 고유 식별자 |
| orderNumber | String | UNIQUE, NOT NULL, VARCHAR(50) | 주문 번호 (예: "ORD-20240101-001") |
| orderDate | DateTime | NOT NULL | 주문 일시 |
| status | Enum | NOT NULL, DEFAULT '주문접수' | 주문 상태 ('주문접수', '제조중', '완료', '취소') |
| totalAmount | Decimal | NOT NULL, >= 0 | 주문 총 금액 |
| createdAt | DateTime | NOT NULL | 생성 일시 |
| updatedAt | DateTime | NOT NULL | 수정 일시 |

#### 관계 (Relationships)
* Orders 1:N OrderItems (하나의 주문은 여러 주문 항목을 가짐)

---

### 2.4 OrderItems (주문 항목)

주문에 포함된 개별 메뉴 항목을 저장하는 테이블입니다. 주문 내용(메뉴, 수량, 옵션, 금액)을 담습니다.

#### 필드 정의

| 필드명 | 타입 | 제약조건 | 설명 |
|--------|------|----------|------|
| id | UUID/String | PRIMARY KEY, NOT NULL | 주문 항목 고유 식별자 |
| orderId | UUID/String | FOREIGN KEY, NOT NULL | 주문 ID |
| menuId | UUID/String | FOREIGN KEY, NOT NULL | 메뉴 ID |
| optionId | UUID/String | FOREIGN KEY, NULL 허용 | 옵션 ID |
| quantity | Integer | NOT NULL, > 0 | 수량 |
| unitPrice | Decimal | NOT NULL, >= 0 | 단가 (메뉴 가격 + 옵션 가격) |
| subtotal | Decimal | NOT NULL, >= 0 | 금액 (단가 × 수량) |
| createdAt | DateTime | NOT NULL | 생성 일시 |

#### 관계 (Relationships)
* OrderItems N:1 Orders (여러 주문 항목은 하나의 주문에 속함)
* OrderItems N:1 Menus (여러 주문 항목은 하나의 메뉴를 참조)
* OrderItems N:1 Options (여러 주문 항목은 하나의 옵션을 참조)

---

### 2.5 ERD (Entity Relationship Diagram) 요약

```
Menus (1)
  │
  ├─── Options (N)
  │      │
  │      └─── OrderItems (N)
  │             │
  └─────────────┘
                │
         Orders (1)
```

---

## 3. 사용자 흐름 및 데이터 스키마

### 3.1 사용자 흐름 1: 메뉴 조회 및 표시

**흐름:**
1. 사용자가 '주문하기' 메뉴를 클릭
2. 데이터베이스에서 Menus 테이블의 모든 메뉴 정보를 조회
3. 브라우저 화면에 메뉴 목록 표시

**데이터 표시 규칙:**
* **일반 사용자 화면:** 커피 이름, 설명, 가격, 이미지 표시 (재고 수량 제외)
* **관리자 화면:** 모든 정보 + 재고 수량 표시

**API 엔드포인트:**
```
GET /api/menus
```

**응답 예시 (일반 사용자):**
```json
{
  "data": [
    {
      "id": "uuid",
      "name": "에티오피아 예가체프",
      "description": "과일향이 풍부한 커피",
      "price": 15000,
      "imageUrl": "https://..."
    }
  ]
}
```

**응답 예시 (관리자):**
```json
{
  "data": [
    {
      "id": "uuid",
      "name": "에티오피아 예가체프",
      "description": "과일향이 풍부한 커피",
      "price": 15000,
      "imageUrl": "https://...",
      "stockQuantity": 100
    }
  ]
}
```

---

### 3.2 사용자 흐름 2: 장바구니에 메뉴 추가

**흐름:**
1. 사용자가 앱 화면에서 커피 메뉴를 선택
2. 옵션 선택 (예: 분쇄도)
3. 수량 선택
4. 선택 정보를 장바구니에 추가
5. 장바구니 화면에 선택한 메뉴, 옵션, 수량, 금액 표시

**데이터 구조:**
* 장바구니는 프론트엔드에서 관리 (세션 스토리지 또는 상태 관리)
* 주문 전까지 데이터베이스에 저장하지 않음

**장바구니 항목 구조:**
```json
{
  "menuId": "uuid",
  "menuName": "에티오피아 예가체프",
  "optionId": "uuid",
  "optionName": "원두",
  "quantity": 2,
  "unitPrice": 15000,
  "subtotal": 30000
}
```

---

### 3.3 사용자 흐름 3: 주문 생성

**흐름:**
1. 사용자가 장바구니에서 '주문하기' 버튼 클릭
2. 주문 정보를 Orders 테이블에 저장
3. 주문 항목 정보를 OrderItems 테이블에 저장
4. 주문에 따라 Menus 테이블의 재고 수량 수정 (차감)

**비즈니스 로직:**
1. 주문 번호 생성 (형식: `ORD-YYYYMMDD-XXX`)
2. 각 주문 항목의 금액 계산
   * 단가 = 메뉴 가격 + 옵션 가격
   * 소계 = 단가 × 수량
3. 주문 총액 계산 (모든 주문 항목의 소계 합계)
4. 재고 확인 및 차감
   * 주문하려는 메뉴의 재고 수량이 요청 수량 이상인지 확인
   * 재고 부족 시 에러 응답
   * 재고 충분 시 주문 수량만큼 차감
5. 트랜잭션으로 주문 생성과 재고 차감을 원자적으로 처리

**API 엔드포인트:**
```
POST /api/orders
```

**요청 본문:**
```json
{
  "items": [
    {
      "menuId": "uuid",
      "optionId": "uuid",
      "quantity": 2
    },
    {
      "menuId": "uuid",
      "optionId": "uuid",
      "quantity": 1
    }
  ]
}
```

**응답:**
```json
{
  "data": {
    "id": "uuid",
    "orderNumber": "ORD-20240101-001",
    "orderDate": "2024-01-01T10:30:00Z",
    "status": "주문접수",
    "totalAmount": 45000,
    "items": [
      {
        "id": "uuid",
        "menuId": "uuid",
        "menuName": "에티오피아 예가체프",
        "optionId": "uuid",
        "optionName": "원두",
        "quantity": 2,
        "unitPrice": 15000,
        "subtotal": 30000
      }
    ],
    "createdAt": "2024-01-01T10:30:00Z"
  }
}
```

---

### 3.4 사용자 흐름 4: 관리자 주문 현황 조회 및 상태 변경

**흐름:**
1. 관리자가 관리자 화면의 '주문현황' 메뉴 클릭
2. Orders 테이블의 모든 주문 정보를 조회
3. 주문 목록 표시 (주문번호, 주문일시, 주문내용, 상태 등)
4. 관리자가 주문 상태를 변경
   * 기본 상태: '주문접수'
   * '주문접수' 클릭 → '제조중'으로 변경
   * '제조중' 클릭 → '완료'로 변경

**API 엔드포인트:**

**주문 목록 조회:**
```
GET /api/admin/orders
```

**응답:**
```json
{
  "data": [
    {
      "id": "uuid",
      "orderNumber": "ORD-20240101-001",
      "orderDate": "2024-01-01T10:30:00Z",
      "status": "주문접수",
      "totalAmount": 45000,
      "items": [
        {
          "menuName": "에티오피아 예가체프",
          "optionName": "원두",
          "quantity": 2,
          "subtotal": 30000
        }
      ]
    }
  ]
}
```

**주문 상태 변경:**
```
PATCH /api/admin/orders/:id/status
```

**요청 본문:**
```json
{
  "status": "제조중"
}
```

**응답:**
```json
{
  "data": {
    "id": "uuid",
    "orderNumber": "ORD-20240101-001",
    "status": "제조중",
    "updatedAt": "2024-01-01T11:00:00Z"
  }
}
```

**상태 변경 규칙:**
* '주문접수' → '제조중' → '완료'
* '주문접수' 또는 '제조중' → '취소' (선택적)
* '완료' 또는 '취소' 상태는 변경 불가

---

## 4. API 설계

### 4.1 메뉴 관리 API

#### 4.1.1 메뉴 목록 조회
```
GET /api/menus
```

**설명:** 커피 메뉴 목록을 조회합니다. 일반 사용자는 재고 수량을 제외한 정보를, 관리자는 모든 정보를 받습니다.

**요청 파라미터:**
* 없음

**응답:**
* **성공 (200 OK):** 메뉴 목록
* **에러 (500):** 서버 오류

**비즈니스 로직:**
* Menus 테이블에서 모든 활성 메뉴 조회
* 각 메뉴에 연결된 Options 정보도 함께 조회
* 관리자 권한 여부에 따라 재고 수량 포함 여부 결정

---

#### 4.1.2 메뉴 상세 조회
```
GET /api/menus/:id
```

**설명:** 특정 메뉴의 상세 정보를 조회합니다.

**요청 파라미터:**
* `id` (path): 메뉴 ID

**응답:**
* **성공 (200 OK):** 메뉴 상세 정보
* **에러 (404):** 메뉴를 찾을 수 없음

---

### 4.2 주문 관리 API

#### 4.2.1 주문 생성
```
POST /api/orders
```

**설명:** 새로운 주문을 생성합니다. 주문 정보를 데이터베이스에 저장하고, 주문에 따라 메뉴의 재고를 수정합니다.

**요청 본문:**
```json
{
  "items": [
    {
      "menuId": "uuid",
      "optionId": "uuid (optional)",
      "quantity": 2
    }
  ]
}
```

**응답:**
* **성공 (201 Created):** 생성된 주문 정보
* **에러 (400 Bad Request):** 잘못된 요청 (재고 부족, 존재하지 않는 메뉴/옵션 등)
* **에러 (500):** 서버 오류

**비즈니스 로직:**
1. 요청 데이터 검증
   * items 배열이 비어있지 않은지 확인
   * 각 항목의 menuId, quantity가 유효한지 확인
2. 메뉴 및 옵션 존재 여부 확인
3. 재고 수량 확인
   * 각 메뉴의 재고가 요청 수량 이상인지 확인
   * 재고 부족 시 에러 응답
4. 가격 계산
   * 각 항목의 단가 = 메뉴 가격 + 옵션 가격
   * 각 항목의 소계 = 단가 × 수량
   * 주문 총액 = 모든 항목의 소계 합계
5. 트랜잭션 시작
6. 주문 번호 생성 (형식: `ORD-YYYYMMDD-XXX`)
7. Orders 테이블에 주문 정보 저장
8. OrderItems 테이블에 주문 항목 정보 저장
9. Menus 테이블의 재고 수량 차감
10. 트랜잭션 커밋
11. 생성된 주문 정보 반환

**에러 응답 예시:**
```json
{
  "error": {
    "code": "INSUFFICIENT_STOCK",
    "message": "재고가 부족합니다.",
    "details": {
      "menuId": "uuid",
      "menuName": "에티오피아 예가체프",
      "requestedQuantity": 10,
      "availableQuantity": 5
    }
  }
}
```

---

#### 4.2.2 주문 조회
```
GET /api/orders/:id
```

**설명:** 주문 ID를 전달하면 해당 주문 정보를 보여줍니다.

**요청 파라미터:**
* `id` (path): 주문 ID

**응답:**
* **성공 (200 OK):** 주문 정보 (주문 항목 포함)
* **에러 (404):** 주문을 찾을 수 없음

**응답 예시:**
```json
{
  "data": {
    "id": "uuid",
    "orderNumber": "ORD-20240101-001",
    "orderDate": "2024-01-01T10:30:00Z",
    "status": "주문접수",
    "totalAmount": 45000,
    "items": [
      {
        "id": "uuid",
        "menuId": "uuid",
        "menuName": "에티오피아 예가체프",
        "optionId": "uuid",
        "optionName": "원두",
        "quantity": 2,
        "unitPrice": 15000,
        "subtotal": 30000
      },
      {
        "id": "uuid",
        "menuId": "uuid",
        "menuName": "콜롬비아 수프리모",
        "optionId": "uuid",
        "optionName": "분쇄(드립)",
        "quantity": 1,
        "unitPrice": 15000,
        "subtotal": 15000
      }
    ],
    "createdAt": "2024-01-01T10:30:00Z",
    "updatedAt": "2024-01-01T10:30:00Z"
  }
}
```

**비즈니스 로직:**
1. Orders 테이블에서 주문 ID로 조회
2. 해당 주문의 OrderItems 조회
3. 각 주문 항목의 메뉴 및 옵션 정보 조회
4. 주문 정보와 주문 항목 정보를 결합하여 반환

---

#### 4.2.3 주문 목록 조회 (관리자)
```
GET /api/admin/orders
```

**설명:** 관리자가 모든 주문 목록을 조회합니다.

**요청 파라미터:**
* `status` (optional): 주문 상태 필터
* `page` (optional): 페이지 번호 (기본값: 1)
* `limit` (optional): 페이지당 항목 수 (기본값: 20)

**응답:**
* **성공 (200 OK):** 주문 목록
* **에러 (401):** 인증 실패
* **에러 (403):** 권한 없음

**인증:** 관리자 권한 필요

---

#### 4.2.4 주문 상태 변경 (관리자)
```
PATCH /api/admin/orders/:id/status
```

**설명:** 관리자가 주문 상태를 변경합니다.

**요청 본문:**
```json
{
  "status": "제조중"
}
```

**응답:**
* **성공 (200 OK):** 업데이트된 주문 정보
* **에러 (400):** 잘못된 상태 변경
* **에러 (404):** 주문을 찾을 수 없음
* **에러 (403):** 권한 없음

**인증:** 관리자 권한 필요

**비즈니스 로직:**
1. 주문 존재 여부 확인
2. 상태 변경 규칙 검증
   * '주문접수' → '제조중' 또는 '취소'
   * '제조중' → '완료' 또는 '취소'
   * '완료' 또는 '취소' 상태는 변경 불가
3. Orders 테이블의 status 필드 업데이트
4. updatedAt 필드 업데이트

---

### 4.3 옵션 관리 API (선택적)

#### 4.3.1 메뉴별 옵션 조회
```
GET /api/menus/:menuId/options
```

**설명:** 특정 메뉴에 연결된 옵션 목록을 조회합니다.

**응답:**
```json
{
  "data": [
    {
      "id": "uuid",
      "menuId": "uuid",
      "name": "원두",
      "price": 0
    },
    {
      "id": "uuid",
      "menuId": "uuid",
      "name": "분쇄(에스프레소)",
      "price": 0
    }
  ]
}
```

---

## 5. 데이터베이스 스키마 (SQL)

### 5.1 Menus 테이블

```sql
CREATE TABLE menus (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL CHECK (price >= 0),
    image_url VARCHAR(500),
    stock_quantity INTEGER NOT NULL CHECK (stock_quantity >= 0) DEFAULT 0,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_menus_name ON menus(name);
```

### 5.2 Options 테이블

```sql
CREATE TABLE options (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    menu_id UUID NOT NULL REFERENCES menus(id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL,
    price DECIMAL(10, 2) NOT NULL CHECK (price >= 0) DEFAULT 0,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_options_menu_id ON options(menu_id);
```

### 5.3 Orders 테이블

```sql
CREATE TABLE orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_number VARCHAR(50) UNIQUE NOT NULL,
    order_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(20) NOT NULL DEFAULT '주문접수' 
        CHECK (status IN ('주문접수', '제조중', '완료', '취소')),
    total_amount DECIMAL(10, 2) NOT NULL CHECK (total_amount >= 0),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_orders_order_number ON orders(order_number);
CREATE INDEX idx_orders_order_date ON orders(order_date);
CREATE INDEX idx_orders_status ON orders(status);
```

### 5.4 OrderItems 테이블

```sql
CREATE TABLE order_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
    menu_id UUID NOT NULL REFERENCES menus(id),
    option_id UUID REFERENCES options(id) ON DELETE SET NULL,
    quantity INTEGER NOT NULL CHECK (quantity > 0),
    unit_price DECIMAL(10, 2) NOT NULL CHECK (unit_price >= 0),
    subtotal DECIMAL(10, 2) NOT NULL CHECK (subtotal >= 0),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_order_items_order_id ON order_items(order_id);
CREATE INDEX idx_order_items_menu_id ON order_items(menu_id);
```

---

## 6. 비즈니스 로직 상세

### 6.1 주문 번호 생성 로직

**형식:** `ORD-YYYYMMDD-XXX`

**규칙:**
1. `ORD-` 접두사
2. 주문 일자 (YYYYMMDD 형식)
3. 일자별 순차 번호 (001, 002, ...)

**구현 방법:**
1. 오늘 날짜의 마지막 주문 번호 조회
2. 마지막 번호의 일련번호 추출
3. 일련번호 + 1하여 새 주문 번호 생성
4. 오늘 첫 주문이면 001부터 시작

**예시:**
* 2024-01-01 첫 주문: `ORD-20240101-001`
* 2024-01-01 두 번째 주문: `ORD-20240101-002`
* 2024-01-02 첫 주문: `ORD-20240102-001`

---

### 6.2 재고 관리 로직

#### 6.2.1 주문 시 재고 차감

1. 주문 항목별로 재고 확인
2. 모든 항목의 재고가 충분한지 확인
3. 하나라도 부족하면 전체 주문 실패
4. 모든 재고가 충분하면 트랜잭션 내에서 차감
5. 주문 실패 시 재고 복구 불필요 (트랜잭션 롤백)

#### 6.2.2 주문 취소 시 재고 복구 (선택적)

1. 주문 상태가 '취소'로 변경될 때
2. 해당 주문의 모든 주문 항목에 대해
3. 메뉴의 재고 수량에 주문 수량만큼 추가

---

### 6.3 가격 계산 로직

**단가 계산:**
```
unitPrice = menu.price + option.price
```

**소계 계산:**
```
subtotal = unitPrice × quantity
```

**주문 총액 계산:**
```
totalAmount = SUM(all orderItems.subtotal)
```

---

## 7. 에러 처리

### 7.1 HTTP 상태 코드

| 상태 코드 | 설명 | 사용 시나리오 |
|-----------|------|--------------|
| 200 OK | 성공 | 조회 성공 |
| 201 Created | 생성 성공 | 주문 생성 성공 |
| 400 Bad Request | 잘못된 요청 | 재고 부족, 잘못된 데이터 형식 |
| 401 Unauthorized | 인증 실패 | 토큰 없음 또는 만료 |
| 403 Forbidden | 권한 없음 | 관리자 권한 필요 |
| 404 Not Found | 리소스 없음 | 존재하지 않는 메뉴/주문 |
| 500 Internal Server Error | 서버 오류 | 예상치 못한 오류 |

### 7.2 에러 응답 형식

```json
{
  "error": {
    "code": "ERROR_CODE",
    "message": "에러 메시지",
    "details": {
      // 추가 정보 (선택적)
    }
  }
}
```

### 7.3 주요 에러 코드

| 에러 코드 | 설명 |
|-----------|------|
| INSUFFICIENT_STOCK | 재고 부족 |
| MENU_NOT_FOUND | 메뉴를 찾을 수 없음 |
| OPTION_NOT_FOUND | 옵션을 찾을 수 없음 |
| ORDER_NOT_FOUND | 주문을 찾을 수 없음 |
| INVALID_STATUS_TRANSITION | 잘못된 상태 변경 |
| INVALID_REQUEST | 잘못된 요청 데이터 |

---

## 8. 데이터 검증

### 8.1 주문 생성 요청 검증

1. **items 배열 검증**
   * 필수 필드
   * 배열이 비어있지 않아야 함
   * 최소 1개 항목 필요

2. **각 주문 항목 검증**
   * `menuId`: 필수, UUID 형식
   * `optionId`: 선택, UUID 형식 (제공된 경우)
   * `quantity`: 필수, 1 이상의 정수

3. **메뉴 및 옵션 존재 여부**
   * `menuId`로 Menus 테이블에서 조회
   * `optionId`가 제공된 경우 Options 테이블에서 조회
   * 존재하지 않으면 에러

4. **재고 수량 검증**
   * 각 메뉴의 재고가 요청 수량 이상인지 확인

---

## 9. 성능 요구사항

### 9.1 응답 시간

* 메뉴 목록 조회: 200ms 이내
* 주문 생성: 500ms 이내
* 주문 조회: 200ms 이내
* 주문 목록 조회: 500ms 이내

### 9.2 동시성

* 동일 메뉴에 대한 동시 주문 시 재고 일관성 보장
* 트랜잭션 격리 수준: READ COMMITTED 이상
* 낙관적 잠금 또는 비관적 잠금 사용 고려

---

## 10. 보안 요구사항

### 10.1 인증 및 인가 (향후 확장)

* 관리자 API는 관리자 권한 검증 필수
* JWT 토큰 기반 인증
* 역할 기반 접근 제어 (RBAC)

### 10.2 데이터 보안

* SQL Injection 방지: ORM 사용 또는 파라미터화된 쿼리
* 입력 데이터 검증 및 이스케이프 처리
* 민감한 정보 로깅 금지

---

## 11. 테스트 요구사항

### 11.1 단위 테스트

* 주문 번호 생성 로직
* 가격 계산 로직
* 재고 차감 로직
* 상태 변경 로직

### 11.2 통합 테스트

* 주문 생성 API
* 주문 조회 API
* 주문 상태 변경 API
* 재고 차감 및 복구 시나리오

### 11.3 테스트 시나리오

1. **정상 주문 생성**
   * 재고 충분한 경우
   * 여러 메뉴 주문
   * 옵션 포함 주문

2. **재고 부족 시나리오**
   * 재고 부족 시 에러 응답
   * 재고 차감되지 않음

3. **주문 상태 변경**
   * 정상적인 상태 변경
   * 잘못된 상태 변경 시 에러

---

## 12. 로깅

### 12.1 로그 레벨

* INFO: 정상적인 API 요청/응답
* WARN: 재고 부족, 잘못된 요청
* ERROR: 예상치 못한 오류

### 12.2 로그 내용

* 요청 시간
* HTTP 메서드 및 경로
* 요청 파라미터 (민감 정보 제외)
* 응답 상태 코드
* 처리 시간

---

## 13. API 문서화

### 13.1 Swagger/OpenAPI

* 모든 API 엔드포인트에 대한 문서 자동 생성
* 요청/응답 예제 포함
* 에러 응답 예제 포함

---

## 부록 A: 주문 생성 플로우차트

```
[사용자: 주문하기 버튼 클릭]
         ↓
[요청 데이터 검증]
         ↓
[메뉴/옵션 존재 여부 확인]
         ↓
[재고 수량 확인]
    ↓         ↓
[부족]    [충분]
    ↓         ↓
[에러 응답] [트랜잭션 시작]
                ↓
         [주문 번호 생성]
                ↓
         [Orders 테이블 저장]
                ↓
         [OrderItems 테이블 저장]
                ↓
         [Menus 재고 차감]
                ↓
         [트랜잭션 커밋]
                ↓
         [주문 정보 반환]
```

---

## 부록 B: 상태 변경 플로우차트

```
[관리자: 상태 변경 요청]
         ↓
[주문 존재 여부 확인]
         ↓
[현재 상태 확인]
         ↓
[변경 가능 여부 확인]
    ↓         ↓
[불가능]  [가능]
    ↓         ↓
[에러 응답] [상태 업데이트]
                ↓
         [성공 응답]
```

---

**문서 버전:** 1.0  
**최종 수정일:** 2024-01-01  
**작성자:** Backend Development Team

