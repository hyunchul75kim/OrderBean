# OrderBean 코딩 컨벤션

이 문서는 OrderBean 프로젝트의 코딩 스타일과 컨벤션을 정의합니다. 모든 개발자는 이 가이드라인을 따라 일관된 코드를 작성해야 합니다.

---

## 목차

1. [일반 원칙](#일반-원칙)
2. [TypeScript 컨벤션](#typescript-컨벤션)
3. [React 컨벤션](#react-컨벤션)
4. [Node.js/Express 컨벤션](#nodejsexpress-컨벤션)
5. [파일 및 폴더 구조](#파일-및-폴더-구조)
6. [네이밍 컨벤션](#네이밍-컨벤션)
7. [주석 및 문서화](#주석-및-문서화)
8. [에러 처리](#에러-처리)
9. [Git 컨벤션](#git-컨벤션)

---

## 일반 원칙

### 코드 품질

- **가독성 우선**: 코드는 읽기 쉽고 이해하기 쉬워야 합니다.
- **일관성**: 프로젝트 전반에 걸쳐 일관된 스타일을 유지합니다.
- **단순성**: 복잡한 로직보다 단순하고 명확한 코드를 선호합니다.
- **DRY (Don't Repeat Yourself)**: 중복 코드를 피하고 재사용 가능한 함수/컴포넌트를 만듭니다.

### 타입 안정성

- 모든 변수, 함수, 컴포넌트에 명시적인 타입을 지정합니다.
- `any` 타입 사용을 최소화하고, 필요한 경우 `unknown`을 사용합니다.
- 타입 가드를 적극 활용합니다.

---

## TypeScript 컨벤션

### 타입 정의

#### Interface vs Type

- **Interface**: 객체의 구조를 정의할 때 사용합니다.
- **Type**: Union, Intersection, 또는 복잡한 타입을 정의할 때 사용합니다.

```typescript
// ✅ Good: Interface 사용
export interface Product {
  id: string;
  name: string;
  price: number;
}

// ✅ Good: Type 사용 (Union 타입)
export type OrderStatus = 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';

// ❌ Bad: Type을 객체에 사용
export type Product = {
  id: string;
  name: string;
};
```

#### Optional Properties

옵셔널 속성은 `?`를 사용하여 명시합니다.

```typescript
export interface Product {
  id: string;
  name: string;
  imageUrl?: string; // 옵셔널 속성
  description?: string;
}
```

#### 타입 주석

함수 파라미터와 반환 타입을 명시합니다.

```typescript
// ✅ Good
export const calculateTotal = (items: OrderItem[]): number => {
  return items.reduce((sum, item) => sum + item.price, 0);
};

// ❌ Bad
export const calculateTotal = (items) => {
  return items.reduce((sum, item) => sum + item.price, 0);
};
```

### 변수 선언

- `const`를 기본으로 사용하고, 재할당이 필요한 경우에만 `let`을 사용합니다.
- `var`는 사용하지 않습니다.

```typescript
// ✅ Good
const productId = 'prod-123';
let counter = 0;

// ❌ Bad
var productId = 'prod-123';
```

### 함수 선언

- 화살표 함수를 선호하지만, 함수 선언식도 사용 가능합니다.
- 함수는 하나의 책임만 가져야 합니다.

```typescript
// ✅ Good: 화살표 함수
export const formatPrice = (price: number): string => {
  return `₩${price.toLocaleString()}`;
};

// ✅ Good: 함수 선언식 (호이스팅이 필요한 경우)
export function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
```

### 비동기 처리

- `async/await`를 사용합니다.
- Promise 체이닝은 피합니다.

```typescript
// ✅ Good
export const fetchProduct = async (id: string): Promise<Product> => {
  const response = await apiClient.get(`/products/${id}`);
  return response.data;
};

// ❌ Bad
export const fetchProduct = (id: string): Promise<Product> => {
  return apiClient.get(`/products/${id}`).then(response => response.data);
};
```

### 에러 처리

- try-catch 블록을 사용하여 에러를 처리합니다.
- 에러 메시지는 명확하고 사용자 친화적이어야 합니다.

```typescript
// ✅ Good
export const createOrder = async (orderData: OrderRequest): Promise<Order> => {
  try {
    const response = await apiClient.post('/orders', orderData);
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`주문 생성 실패: ${error.message}`);
    }
    throw new Error('주문 생성 중 알 수 없는 오류가 발생했습니다.');
  }
};
```

---

## React 컨벤션

### 컴포넌트 구조

#### 함수형 컴포넌트

- 함수형 컴포넌트를 사용합니다.
- 컴포넌트 이름은 PascalCase로 작성합니다.

```typescript
// ✅ Good
interface ProductCardProps {
  product: Product;
  onSelect: (productId: string) => void;
}

export const ProductCard = ({ product, onSelect }: ProductCardProps) => {
  return (
    <div className="product-card">
      <h3>{product.name}</h3>
      <button onClick={() => onSelect(product.id)}>선택</button>
    </div>
  );
};
```

#### Props 타입 정의

- Props는 별도의 interface로 정의합니다.
- Props interface 이름은 `{ComponentName}Props` 형식을 따릅니다.

```typescript
// ✅ Good
interface HomePageProps {
  initialProducts?: Product[];
}

export const HomePage = ({ initialProducts = [] }: HomePageProps) => {
  // ...
};
```

### Hooks 사용

#### useState

- 상태 변수명은 명확하고 의미 있는 이름을 사용합니다.
- 여러 상태가 관련되어 있으면 객체로 묶습니다.

```typescript
// ✅ Good
const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
const [isLoading, setIsLoading] = useState(false);

// ✅ Good: 관련된 상태를 객체로 묶기
const [formData, setFormData] = useState({
  name: '',
  email: '',
  message: '',
});
```

#### useEffect

- 의존성 배열을 명시합니다.
- 클린업 함수가 필요한 경우 제공합니다.

```typescript
// ✅ Good
useEffect(() => {
  const fetchData = async () => {
    setIsLoading(true);
    try {
      const data = await fetchProducts();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setIsLoading(false);
    }
  };

  fetchData();
}, []); // 의존성 배열 명시

// ✅ Good: 클린업 함수
useEffect(() => {
  const timer = setInterval(() => {
    // ...
  }, 1000);

  return () => clearInterval(timer); // 클린업
}, []);
```

### 이벤트 핸들러

- 이벤트 핸들러는 `handle` 접두사를 사용합니다.
- 인라인 함수보다는 별도 함수로 정의합니다.

```typescript
// ✅ Good
const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  // 처리 로직
};

return <form onSubmit={handleSubmit}>...</form>;

// ❌ Bad: 인라인 함수 (복잡한 로직인 경우)
return <form onSubmit={(e) => { e.preventDefault(); /* 복잡한 로직 */ }}>...</form>;
```

### 조건부 렌더링

- 삼항 연산자나 논리 연산자를 사용합니다.
- 복잡한 조건은 별도 함수로 분리합니다.

```typescript
// ✅ Good: 간단한 조건
{isLoading ? <Spinner /> : <ProductList products={products} />}

// ✅ Good: 논리 연산자
{error && <ErrorMessage message={error} />}

// ✅ Good: 복잡한 조건은 함수로 분리
const renderContent = () => {
  if (isLoading) return <Spinner />;
  if (error) return <ErrorMessage message={error} />;
  if (products.length === 0) return <EmptyState />;
  return <ProductList products={products} />;
};

return <div>{renderContent()}</div>;
```

### CSS 및 스타일링

- CSS 파일은 컴포넌트와 같은 이름으로 작성합니다.
- CSS 클래스명은 kebab-case를 사용합니다.

```typescript
// HomePage.tsx
import './HomePage.css';

export const HomePage = () => {
  return <div className="home-page">...</div>;
};
```

```css
/* HomePage.css */
.home-page {
  padding: 2rem;
}

.product-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1rem;
}
```

---

## Node.js/Express 컨벤션

### 계층 구조

- Controller → Service → Repository 계층 구조를 따릅니다.
- 각 계층은 명확한 책임을 가져야 합니다.

```
Controller: HTTP 요청/응답 처리
Service: 비즈니스 로직
Repository: 데이터 접근
```

### Controller

- Controller는 HTTP 요청을 받아 Service를 호출하고 응답을 반환합니다.
- 비즈니스 로직은 Controller에 포함하지 않습니다.

```typescript
// ✅ Good
import { Request, Response } from 'express';
import { orderService } from '../services/orderService';

export const createOrder = async (req: Request, res: Response) => {
  try {
    const orderData = req.body;
    const order = await orderService.createOrder(orderData);
    res.status(201).json(order);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'Internal server error' });
    }
  }
};
```

### Service

- Service는 비즈니스 로직을 담당합니다.
- Repository를 호출하여 데이터를 가져오고 처리합니다.

```typescript
// ✅ Good
import { orderRepository } from '../repositories/orderRepository';
import { OrderRequest, Order } from '../models/Order';

export const orderService = {
  createOrder: async (orderData: OrderRequest): Promise<Order> => {
    // 비즈니스 로직
    const totalPrice = orderData.quantity * product.price;
    
    const order = await orderRepository.create({
      ...orderData,
      totalPrice,
      status: 'pending',
    });

    return order;
  },
};
```

### Repository

- Repository는 데이터베이스 접근만 담당합니다.
- SQL 쿼리나 ORM 호출을 포함합니다.

```typescript
// ✅ Good
import { Order, OrderRequest } from '../models/Order';

export const orderRepository = {
  findAll: async (): Promise<Order[]> => {
    // 데이터베이스 쿼리
    // ...
  },

  findById: async (id: string): Promise<Order | null> => {
    // 데이터베이스 쿼리
    // ...
  },

  create: async (orderData: OrderRequest): Promise<Order> => {
    // 데이터베이스 삽입
    // ...
  },
};
```

### 라우트 정의

- 라우트는 별도 파일로 분리합니다.
- RESTful API 규칙을 따릅니다.

```typescript
// ✅ Good: routes/orderRoutes.ts
import express from 'express';
import { orderController } from '../controllers/orderController';

const router = express.Router();

router.get('/', orderController.getAllOrders);
router.get('/:id', orderController.getOrderById);
router.post('/', orderController.createOrder);
router.put('/:id', orderController.updateOrder);
router.delete('/:id', orderController.deleteOrder);

export default router;
```

### 미들웨어

- 미들웨어는 별도 파일로 분리합니다.
- 재사용 가능한 미들웨어를 작성합니다.

```typescript
// ✅ Good: middleware/validation.ts
import { Request, Response, NextFunction } from 'express';

export const validateOrder = (req: Request, res: Response, next: NextFunction) => {
  const { productId, quantity } = req.body;

  if (!productId) {
    return res.status(400).json({ message: 'productId is required' });
  }

  if (!quantity || quantity <= 0) {
    return res.status(400).json({ message: 'quantity must be greater than 0' });
  }

  next();
};
```

---

## 파일 및 폴더 구조

### 파일명

- **컴포넌트**: PascalCase (예: `ProductCard.tsx`)
- **유틸리티/서비스**: camelCase (예: `orderService.ts`, `formatPrice.ts`)
- **타입 정의**: camelCase (예: `product.types.ts`, `order.types.ts`)
- **상수**: camelCase (예: `recommendation.weights.ts`)

### 폴더 구조

```
frontend/src/
├── components/        # 재사용 가능한 컴포넌트
│   ├── Product/
│   │   ├── ProductCard.tsx
│   │   └── ProductCard.css
│   └── Order/
├── pages/            # 페이지 컴포넌트
│   ├── HomePage.tsx
│   └── ProductDetailPage.tsx
├── services/         # API 서비스
│   ├── api.ts
│   └── orderService.ts
├── hooks/           # 커스텀 훅
├── types/           # 타입 정의
└── utils/           # 유틸리티 함수

backend/src/
├── controllers/     # 컨트롤러
├── services/        # 서비스
├── repositories/    # 리포지토리
├── models/          # 모델/타입 정의
├── routes/          # 라우트 정의
├── middleware/      # 미들웨어
└── utils/           # 유틸리티 함수
```

### Import 순서

1. 외부 라이브러리
2. 내부 모듈 (절대 경로)
3. 상대 경로 모듈
4. 타입 import

```typescript
// ✅ Good
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { Product } from '@/types/product.types';
import { orderService } from '@/services/orderService';

import { formatPrice } from '../utils/formatPrice';
import './ProductCard.css';

// 타입만 import
import type { ProductCardProps } from './types';
```

---

## 네이밍 컨벤션

### 변수 및 함수

- **camelCase** 사용
- 의미 있는 이름 사용
- 약어는 피하고 전체 단어 사용

```typescript
// ✅ Good
const productList = [];
const calculateTotalPrice = () => {};
const isUserLoggedIn = true;

// ❌ Bad
const pl = [];
const calc = () => {};
const usrLgn = true;
```

### 상수

- **UPPER_SNAKE_CASE** 사용
- 모듈 상수는 별도 파일로 분리

```typescript
// ✅ Good
const MAX_QUANTITY = 10;
const API_BASE_URL = 'https://api.example.com';

// ❌ Bad
const maxQuantity = 10;
```

### 클래스 및 컴포넌트

- **PascalCase** 사용

```typescript
// ✅ Good
class OrderService {}
export const ProductCard = () => {};

// ❌ Bad
class orderService {}
export const productCard = () => {};
```

### 인터페이스 및 타입

- **PascalCase** 사용
- Interface는 명사로, Props는 `{Component}Props` 형식

```typescript
// ✅ Good
interface Product {}
interface OrderRequest {}
interface ProductCardProps {}

// ❌ Bad
interface product {}
interface order_request {}
```

### 파일명

- 컴포넌트: `PascalCase.tsx`
- 서비스/유틸: `camelCase.ts`
- 타입: `camelCase.types.ts`

---

## 주석 및 문서화

### 함수 주석

- 복잡한 함수는 JSDoc 형식으로 주석을 작성합니다.
- 파라미터와 반환값을 설명합니다.

```typescript
// ✅ Good
/**
 * 상품 추천 점수를 계산합니다.
 * 
 * @param product - 추천 대상 상품
 * @param surveyAnswers - 사용자 설문 답변
 * @param weights - 추천 가중치
 * @returns 계산된 추천 점수 (0-100)
 */
export const calculateProductScore = (
  product: Product,
  surveyAnswers: SurveyAnswer[],
  weights: RecommendationWeights
): number => {
  // ...
};
```

### 인라인 주석

- 복잡한 로직이나 비즈니스 규칙을 설명할 때 사용합니다.
- "무엇을 하는지" 설명하고, "왜 하는지" 설명합니다.

```typescript
// ✅ Good
// 주문 상태가 'pending'인 경우에만 취소 가능
if (order.status === 'pending') {
  await cancelOrder(order.id);
}

// ❌ Bad: 명확한 코드는 주석 불필요
// order의 status를 확인
if (order.status === 'pending') {
  // order를 취소
  await cancelOrder(order.id);
}
```

### TODO 주석

- 임시 코드나 향후 개선 사항을 표시할 때 사용합니다.
- TODO 주석에는 담당자나 이슈 번호를 포함합니다.

```typescript
// ✅ Good
// TODO: 에러 처리 로직 개선 필요 (Issue #123)
// TODO: [김개발] 성능 최적화 필요
```

---

## 에러 처리

### Frontend 에러 처리

- 사용자 친화적인 에러 메시지를 표시합니다.
- 에러 상태를 명확하게 관리합니다.

```typescript
// ✅ Good
const [error, setError] = useState<string | null>(null);

try {
  const order = await orderService.createOrder(orderData);
  // 성공 처리
} catch (err) {
  if (err instanceof Error) {
    setError('주문 생성에 실패했습니다. 다시 시도해주세요.');
  } else {
    setError('알 수 없는 오류가 발생했습니다.');
  }
}
```

### Backend 에러 처리

- 적절한 HTTP 상태 코드를 반환합니다.
- 에러 메시지는 명확하고 보안을 고려합니다.

```typescript
// ✅ Good
export const createOrder = async (req: Request, res: Response) => {
  try {
    const order = await orderService.createOrder(req.body);
    res.status(201).json(order);
  } catch (error) {
    if (error instanceof ValidationError) {
      res.status(400).json({ message: error.message });
    } else if (error instanceof NotFoundError) {
      res.status(404).json({ message: error.message });
    } else {
      console.error('Order creation error:', error);
      res.status(500).json({ message: '주문 생성 중 오류가 발생했습니다.' });
    }
  }
};
```

### 커스텀 에러 클래스

- 필요시 커스텀 에러 클래스를 정의합니다.

```typescript
// ✅ Good
export class ValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ValidationError';
  }
}

export class NotFoundError extends Error {
  constructor(resource: string) {
    super(`${resource}를 찾을 수 없습니다.`);
    this.name = 'NotFoundError';
  }
}
```

---

## Git 컨벤션

### 커밋 메시지

- 커밋 메시지는 명확하고 간결하게 작성합니다.
- 커밋 타입을 접두사로 사용합니다.

#### 커밋 타입

- `feat`: 새로운 기능 추가
- `fix`: 버그 수정
- `docs`: 문서 수정
- `style`: 코드 포맷팅, 세미콜론 누락 등
- `refactor`: 코드 리팩토링
- `test`: 테스트 코드 추가/수정
- `chore`: 빌드 업무 수정, 패키지 매니저 설정 등

#### 커밋 메시지 형식

```
<type>: <subject>

<body>

<footer>
```

#### 예시

```bash
# ✅ Good
feat: 주문 생성 API 구현

- OrderController에 createOrder 메서드 추가
- OrderService에 주문 생성 로직 구현
- OrderRepository에 데이터베이스 저장 로직 추가

Closes #123

# ✅ Good
fix: 상품 목록 페이지에서 이미지 로딩 오류 수정

# ✅ Good
refactor: 추천 엔진 로직을 별도 모듈로 분리
```

### 브랜치 네이밍

- 기능 개발: `feature/기능명`
- 버그 수정: `fix/버그명`
- 문서: `docs/문서명`

```bash
feature/order-creation
fix/product-image-loading
docs/api-documentation
```

---

## 추가 참고사항

### 코드 리뷰 체크리스트

코드 리뷰 시 다음 사항을 확인합니다:

- [ ] 타입이 명시적으로 정의되어 있는가?
- [ ] 함수/컴포넌트가 단일 책임을 가지는가?
- [ ] 에러 처리가 적절한가?
- [ ] 주석이 필요한 복잡한 로직에 주석이 있는가?
- [ ] 네이밍 컨벤션을 따르는가?
- [ ] 불필요한 코드나 주석이 없는가?
- [ ] 테스트가 작성되어 있는가? (가능한 경우)

### 도구 설정

프로젝트에서 사용하는 도구 설정:

- **ESLint**: 코드 품질 검사
- **Prettier**: 코드 포맷팅 (설정 시)
- **TypeScript**: 타입 체크

### 참고 자료

- [TypeScript 공식 문서](https://www.typescriptlang.org/docs/)
- [React 공식 문서](https://react.dev/)
- [Express.js 가이드](https://expressjs.com/en/guide/routing.html)
- [Conventional Commits](https://www.conventionalcommits.org/)

---

## 업데이트 이력

- 2024-01-XX: 초기 문서 작성

---

이 문서는 프로젝트의 발전에 따라 지속적으로 업데이트됩니다. 제안사항이나 개선점이 있으면 이슈를 등록해주세요.

