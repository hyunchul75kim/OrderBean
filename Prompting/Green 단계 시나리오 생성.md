# Frontend program test case
_Exported on 12/17/2025 at 16:04:35 GMT+9 from Cursor (2.2.20)_

---

**User**

@frontend 프로그램도 테스트할수 있는 케이스도 하나 만들어줘.

---

**Cursor**


프론트엔드 테스트 케이스 작성을 위해 구조와 주요 파일을 확인 중입니다.



주요 파일을 확인해 테스트 케이스를 작성합니다.



프론트엔드 테스트 환경 설정 및 테스트 케이스 작성 중입니다.



프론트엔드 테스트 환경 설정 및 테스트 케이스 작성 중입니다.



테스트 환경 설정 및 테스트 케이스 작성 중입니다.


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
    "lint": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0",
    "test": "vitest",
    "test:ui": "vitest --ui",
    "test:coverage": "vitest --coverage"
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
  "name": "orderbean-frontend",
  "version": "0.1.0",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview",
    "lint": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0",
    "test": "vitest",
    "test:ui": "vitest --ui",
    "test:coverage": "vitest --coverage"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.20.0"
  },
  "devDependencies": {
    "@testing-library/jest-dom": "^6.1.5",
    "@testing-library/react": "^14.1.2",
    "@testing-library/user-event": "^14.5.1",
    "@types/react": "^18.2.43",
    "@types/react-dom": "^18.2.17",
    "@typescript-eslint/eslint-plugin": "^6.14.0",
    "@typescript-eslint/parser": "^6.14.0",
    "@vitejs/plugin-react": "^4.2.1",
    "@vitest/coverage-v8": "^1.1.0",
    "@vitest/ui": "^1.1.0",
    "eslint": "^8.55.0",
    "eslint-plugin-react-hooks": "^4.6.0",
    "eslint-plugin-react-refresh": "^0.4.5",
    "jsdom": "^23.0.1",
    "typescript": "^5.2.2",
    "vite": "^5.0.8",
    "vitest": "^1.1.0"
  }
}


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
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
    css: true,
  },
});


```


테스트 설정 파일과 테스트 케이스 작성 중입니다.


```typescript
import '@testing-library/jest-dom';
import { expect, afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';

// 각 테스트 후 cleanup
afterEach(() => {
  cleanup();
});

```

```typescript
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { recommendationService, RecommendedProduct } from '../recommendationService';
import { apiClient } from '../api';

// apiClient 모킹
vi.mock('../api', () => ({
  apiClient: {
    get: vi.fn(),
  },
}));

describe('recommendationService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('getRecommendations', () => {
    it('should return 3 to 5 recommended products for a valid survey ID', async () => {
      // Given: 유효한 설문 ID가 주어졌을 때
      const surveyId = 'survey-123';
      const mockRecommendations: RecommendedProduct[] = [
        { id: '1', name: '에티오피아 예가체프', reason: '산미가 강하고 과일향이 풍부합니다' },
        { id: '2', name: '콜롬비아 수프리모', reason: '균형잡힌 맛과 고소함이 특징입니다' },
        { id: '3', name: '케냐 AA', reason: '밝은 산미와 복합적인 향미를 제공합니다' },
        { id: '4', name: '과테말라 안티구아', reason: '부드러운 산미와 초콜릿 향이 좋습니다' },
      ];

      (apiClient.get as any).mockResolvedValue(mockRecommendations);

      // When: 추천을 요청하면
      const recommendations = await recommendationService.getRecommendations(surveyId);

      // Then: 3~5개의 추천 상품이 반환되어야 함
      expect(recommendations.length).toBeGreaterThanOrEqual(3);
      expect(recommendations.length).toBeLessThanOrEqual(5);
      expect(apiClient.get).toHaveBeenCalledWith(`/recommendations/${surveyId}`);
    });

    it('should return recommended products with required fields (id, name, reason)', async () => {
      // Given: 유효한 설문 ID가 주어졌을 때
      const surveyId = 'survey-123';
      const mockRecommendations: RecommendedProduct[] = [
        { id: '1', name: '에티오피아 예가체프', reason: '산미가 강하고 과일향이 풍부합니다' },
        { id: '2', name: '콜롬비아 수프리모', reason: '균형잡힌 맛과 고소함이 특징입니다' },
        { id: '3', name: '케냐 AA', reason: '밝은 산미와 복합적인 향미를 제공합니다' },
      ];

      (apiClient.get as any).mockResolvedValue(mockRecommendations);

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

    it('should return recommendations with optional imageUrl field', async () => {
      // Given: 이미지 URL이 포함된 추천 상품이 있을 때
      const surveyId = 'survey-123';
      const mockRecommendations: RecommendedProduct[] = [
        {
          id: '1',
          name: '에티오피아 예가체프',
          reason: '산미가 강하고 과일향이 풍부합니다',
          imageUrl: 'https://example.com/image1.jpg',
        },
        {
          id: '2',
          name: '콜롬비아 수프리모',
          reason: '균형잡힌 맛과 고소함이 특징입니다',
        },
      ];

      (apiClient.get as any).mockResolvedValue(mockRecommendations);

      // When: 추천을 요청하면
      const recommendations = await recommendationService.getRecommendations(surveyId);

      // Then: imageUrl은 선택적 필드로 포함될 수 있음
      expect(recommendations[0].imageUrl).toBeDefined();
      expect(recommendations[1].imageUrl).toBeUndefined();
    });

    it('should handle API errors gracefully', async () => {
      // Given: API 호출이 실패할 때
      const surveyId = 'survey-123';
      const errorMessage = 'Failed to fetch recommendations';
      (apiClient.get as any).mockRejectedValue(new Error(errorMessage));

      // When: 추천을 요청하면
      // Then: 에러가 발생해야 함
      await expect(recommendationService.getRecommendations(surveyId)).rejects.toThrow();
    });
  });
});

```

```typescript
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { orderService, OrderRequest, OrderResponse } from '../orderService';
import { apiClient } from '../api';

// apiClient 모킹
vi.mock('../api', () => ({
  apiClient: {
    get: vi.fn(),
    post: vi.fn(),
  },
}));

describe('orderService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('createOrder', () => {
    it('should create an order with valid order data', async () => {
      // Given: 유효한 주문 데이터가 주어졌을 때
      const orderRequest: OrderRequest = {
        productId: 'product-123',
        grindType: 'whole',
        quantity: 2,
      };

      const mockOrderResponse: OrderResponse = {
        orderId: 'order-456',
        orderNumber: 'ORD-2024-001',
      };

      (apiClient.post as any).mockResolvedValue(mockOrderResponse);

      // When: 주문을 생성하면
      const response = await orderService.createOrder(orderRequest);

      // Then: 주문 ID와 주문 번호가 반환되어야 함
      expect(response).toHaveProperty('orderId');
      expect(response).toHaveProperty('orderNumber');
      expect(response.orderId).toBe('order-456');
      expect(response.orderNumber).toBe('ORD-2024-001');
      expect(apiClient.post).toHaveBeenCalledWith('/orders', orderRequest);
    });

    it('should send order data with correct structure', async () => {
      // Given: 주문 데이터가 주어졌을 때
      const orderRequest: OrderRequest = {
        productId: 'product-123',
        grindType: 'ground',
        quantity: 1,
      };

      const mockOrderResponse: OrderResponse = {
        orderId: 'order-789',
        orderNumber: 'ORD-2024-002',
      };

      (apiClient.post as any).mockResolvedValue(mockOrderResponse);

      // When: 주문을 생성하면
      await orderService.createOrder(orderRequest);

      // Then: API에 올바른 형식의 데이터가 전송되어야 함
      expect(apiClient.post).toHaveBeenCalledWith('/orders', {
        productId: 'product-123',
        grindType: 'ground',
        quantity: 1,
      });
    });

    it('should handle API errors when creating order', async () => {
      // Given: API 호출이 실패할 때
      const orderRequest: OrderRequest = {
        productId: 'product-123',
        grindType: 'whole',
        quantity: 1,
      };

      (apiClient.post as any).mockRejectedValue(new Error('Failed to create order'));

      // When: 주문을 생성하면
      // Then: 에러가 발생해야 함
      await expect(orderService.createOrder(orderRequest)).rejects.toThrow();
    });
  });

  describe('getOrder', () => {
    it('should fetch order details by order ID', async () => {
      // Given: 유효한 주문 ID가 주어졌을 때
      const orderId = 'order-123';
      const mockOrder = {
        orderId: 'order-123',
        orderNumber: 'ORD-2024-001',
        productId: 'product-456',
        status: 'pending',
      };

      (apiClient.get as any).mockResolvedValue(mockOrder);

      // When: 주문 정보를 조회하면
      const order = await orderService.getOrder(orderId);

      // Then: 주문 정보가 반환되어야 함
      expect(order).toEqual(mockOrder);
      expect(apiClient.get).toHaveBeenCalledWith(`/orders/${orderId}`);
    });

    it('should handle API errors when fetching order', async () => {
      // Given: API 호출이 실패할 때
      const orderId = 'order-123';
      (apiClient.get as any).mockRejectedValue(new Error('Order not found'));

      // When: 주문 정보를 조회하면
      // Then: 에러가 발생해야 함
      await expect(orderService.getOrder(orderId)).rejects.toThrow();
    });
  });
});

```

```typescript
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { surveyService, SurveyAnswer, SurveyResponse } from '../surveyService';
import { apiClient } from '../api';

// apiClient 모킹
vi.mock('../api', () => ({
  apiClient: {
    post: vi.fn(),
  },
}));

describe('surveyService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('submitSurvey', () => {
    it('should submit survey answers and return survey response', async () => {
      // Given: 설문 답변이 주어졌을 때
      const answers: SurveyAnswer[] = [
        { questionId: 'q1', answer: 'high' },
        { questionId: 'q2', answer: 'medium' },
        { questionId: 'q3', answer: 5 },
      ];

      const mockSurveyResponse: SurveyResponse = {
        surveyId: 'survey-123',
        answers: answers,
      };

      (apiClient.post as any).mockResolvedValue(mockSurveyResponse);

      // When: 설문을 제출하면
      const response = await surveyService.submitSurvey(answers);

      // Then: 설문 ID와 답변이 반환되어야 함
      expect(response).toHaveProperty('surveyId');
      expect(response).toHaveProperty('answers');
      expect(response.surveyId).toBe('survey-123');
      expect(response.answers).toEqual(answers);
      expect(apiClient.post).toHaveBeenCalledWith('/survey', { answers });
    });

    it('should handle string answers', async () => {
      // Given: 문자열 답변이 주어졌을 때
      const answers: SurveyAnswer[] = [
        { questionId: 'q1', answer: 'high' },
        { questionId: 'q2', answer: 'low' },
      ];

      const mockSurveyResponse: SurveyResponse = {
        surveyId: 'survey-456',
        answers: answers,
      };

      (apiClient.post as any).mockResolvedValue(mockSurveyResponse);

      // When: 설문을 제출하면
      const response = await surveyService.submitSurvey(answers);

      // Then: 문자열 답변이 올바르게 처리되어야 함
      expect(response.answers[0].answer).toBe('high');
      expect(response.answers[1].answer).toBe('low');
    });

    it('should handle numeric answers', async () => {
      // Given: 숫자 답변이 주어졌을 때
      const answers: SurveyAnswer[] = [
        { questionId: 'q1', answer: 1 },
        { questionId: 'q2', answer: 5 },
        { questionId: 'q3', answer: 3 },
      ];

      const mockSurveyResponse: SurveyResponse = {
        surveyId: 'survey-789',
        answers: answers,
      };

      (apiClient.post as any).mockResolvedValue(mockSurveyResponse);

      // When: 설문을 제출하면
      const response = await surveyService.submitSurvey(answers);

      // Then: 숫자 답변이 올바르게 처리되어야 함
      expect(response.answers[0].answer).toBe(1);
      expect(response.answers[1].answer).toBe(5);
      expect(response.answers[2].answer).toBe(3);
    });

    it('should handle API errors when submitting survey', async () => {
      // Given: API 호출이 실패할 때
      const answers: SurveyAnswer[] = [
        { questionId: 'q1', answer: 'high' },
      ];

      (apiClient.post as any).mockRejectedValue(new Error('Failed to submit survey'));

      // When: 설문을 제출하면
      // Then: 에러가 발생해야 함
      await expect(surveyService.submitSurvey(answers)).rejects.toThrow();
    });

    it('should send answers in correct format', async () => {
      // Given: 설문 답변이 주어졌을 때
      const answers: SurveyAnswer[] = [
        { questionId: 'q1', answer: 'high' },
        { questionId: 'q2', answer: 5 },
      ];

      const mockSurveyResponse: SurveyResponse = {
        surveyId: 'survey-999',
        answers: answers,
      };

      (apiClient.post as any).mockResolvedValue(mockSurveyResponse);

      // When: 설문을 제출하면
      await surveyService.submitSurvey(answers);

      // Then: API에 올바른 형식의 데이터가 전송되어야 함
      expect(apiClient.post).toHaveBeenCalledWith('/survey', {
        answers: [
          { questionId: 'q1', answer: 'high' },
          { questionId: 'q2', answer: 5 },
        ],
      });
    });
  });
});

```

```typescriptreact
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import HomePage from '../HomePage';

// useNavigate 모킹
const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe('HomePage', () => {
  beforeEach(() => {
    mockNavigate.mockClear();
  });

  it('should render the main heading with brand name', () => {
    // Given: HomePage가 렌더링될 때
    render(
      <BrowserRouter>
        <HomePage />
      </BrowserRouter>
    );

    // Then: 브랜드 이름이 표시되어야 함
    expect(screen.getByText('OrderBean')).toBeInTheDocument();
  });

  it('should render the tagline', () => {
    // Given: HomePage가 렌더링될 때
    render(
      <BrowserRouter>
        <HomePage />
      </BrowserRouter>
    );

    // Then: 태그라인이 표시되어야 함
    expect(screen.getByText('나에게 딱 맞는 커피를 찾아보세요')).toBeInTheDocument();
  });

  it('should render the hero description', () => {
    // Given: HomePage가 렌더링될 때
    render(
      <BrowserRouter>
        <HomePage />
      </BrowserRouter>
    );

    // Then: 히어로 섹션 설명이 표시되어야 함
    expect(screen.getByText(/복잡한 원두 선택, 이제 그만!/)).toBeInTheDocument();
    expect(screen.getByText(/간단한 설문으로 당신만의 완벽한 커피를 추천해드립니다/)).toBeInTheDocument();
  });

  it('should render the start survey button', () => {
    // Given: HomePage가 렌더링될 때
    render(
      <BrowserRouter>
        <HomePage />
      </BrowserRouter>
    );

    // Then: 설문 시작 버튼이 표시되어야 함
    const startButton = screen.getByText('취향 설문 시작하기');
    expect(startButton).toBeInTheDocument();
    expect(startButton.tagName).toBe('BUTTON');
  });

  it('should navigate to survey page when start survey button is clicked', () => {
    // Given: HomePage가 렌더링되고 버튼이 있을 때
    render(
      <BrowserRouter>
        <HomePage />
      </BrowserRouter>
    );

    const startButton = screen.getByText('취향 설문 시작하기');

    // When: 버튼을 클릭하면
    startButton.click();

    // Then: /survey 경로로 이동해야 함
    expect(mockNavigate).toHaveBeenCalledWith('/survey');
  });

  it('should render problem section with three problem items', () => {
    // Given: HomePage가 렌더링될 때
    render(
      <BrowserRouter>
        <HomePage />
      </BrowserRouter>
    );

    // Then: 문제 섹션의 제목과 세 가지 문제 항목이 표시되어야 함
    expect(screen.getByText('이런 고민 있으신가요?')).toBeInTheDocument();
    expect(screen.getByText('원두 종류가 너무 많아요')).toBeInTheDocument();
    expect(screen.getByText('전문 용어가 어려워요')).toBeInTheDocument();
    expect(screen.getByText('실패 경험이 두려워요')).toBeInTheDocument();
  });

  it('should render solution section with three features', () => {
    // Given: HomePage가 렌더링될 때
    render(
      <BrowserRouter>
        <HomePage />
      </BrowserRouter>
    );

    // Then: 솔루션 섹션의 제목과 세 가지 기능이 표시되어야 함
    expect(screen.getByText('OrderBean이 해결해드립니다')).toBeInTheDocument();
    expect(screen.getByText('간단한 설문')).toBeInTheDocument();
    expect(screen.getByText('맞춤 추천')).toBeInTheDocument();
    expect(screen.getByText('실패 없는 선택')).toBeInTheDocument();
  });

  it('should render how it works section with three steps', () => {
    // Given: HomePage가 렌더링될 때
    render(
      <BrowserRouter>
        <HomePage />
      </BrowserRouter>
    );

    // Then: 작동 방식 섹션의 제목과 세 가지 단계가 표시되어야 함
    expect(screen.getByText('이렇게 시작하세요')).toBeInTheDocument();
    expect(screen.getByText('취향 설문')).toBeInTheDocument();
    expect(screen.getByText('맞춤 추천')).toBeInTheDocument();
    expect(screen.getByText('주문하기')).toBeInTheDocument();
  });

  it('should render CTA section with start button', () => {
    // Given: HomePage가 렌더링될 때
    render(
      <BrowserRouter>
        <HomePage />
      </BrowserRouter>
    );

    // Then: CTA 섹션의 제목과 버튼이 표시되어야 함
    expect(screen.getByText('지금 바로 시작해보세요')).toBeInTheDocument();
    const ctaButton = screen.getByText('무료로 취향 설문 시작하기');
    expect(ctaButton).toBeInTheDocument();
    expect(ctaButton.tagName).toBe('BUTTON');
  });

  it('should navigate to survey page when CTA button is clicked', () => {
    // Given: HomePage가 렌더링되고 CTA 버튼이 있을 때
    render(
      <BrowserRouter>
        <HomePage />
      </BrowserRouter>
    );

    const ctaButton = screen.getByText('무료로 취향 설문 시작하기');

    // When: CTA 버튼을 클릭하면
    ctaButton.click();

    // Then: /survey 경로로 이동해야 함
    expect(mockNavigate).toHaveBeenCalledWith('/survey');
  });
});

```


린트 오류 확인 및 수정 중입니다.



Vite 설정에 Vitest 타입 추가 중입니다.



Vitest 타입 지원을 위해 `vite.config.ts` 수정 중입니다.


```typescript
/// <reference types="vitest" />
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
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
    css: true,
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
    "noFallthroughCasesInSwitch": true,
    "types": ["vitest/globals", "@testing-library/jest-dom"]
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}


```


테스트 파일에서 `beforeEach` import 확인 및 수정 중입니다.


```typescriptreact
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import HomePage from '../HomePage';

// useNavigate 모킹
const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe('HomePage', () => {
  beforeEach(() => {
    mockNavigate.mockClear();
  });

  it('should render the main heading with brand name', () => {
    // Given: HomePage가 렌더링될 때
    render(
      <BrowserRouter>
        <HomePage />
      </BrowserRouter>
    );

    // Then: 브랜드 이름이 표시되어야 함
    expect(screen.getByText('OrderBean')).toBeInTheDocument();
  });

  it('should render the tagline', () => {
    // Given: HomePage가 렌더링될 때
    render(
      <BrowserRouter>
        <HomePage />
      </BrowserRouter>
    );

    // Then: 태그라인이 표시되어야 함
    expect(screen.getByText('나에게 딱 맞는 커피를 찾아보세요')).toBeInTheDocument();
  });

  it('should render the hero description', () => {
    // Given: HomePage가 렌더링될 때
    render(
      <BrowserRouter>
        <HomePage />
      </BrowserRouter>
    );

    // Then: 히어로 섹션 설명이 표시되어야 함
    expect(screen.getByText(/복잡한 원두 선택, 이제 그만!/)).toBeInTheDocument();
    expect(screen.getByText(/간단한 설문으로 당신만의 완벽한 커피를 추천해드립니다/)).toBeInTheDocument();
  });

  it('should render the start survey button', () => {
    // Given: HomePage가 렌더링될 때
    render(
      <BrowserRouter>
        <HomePage />
      </BrowserRouter>
    );

    // Then: 설문 시작 버튼이 표시되어야 함
    const startButton = screen.getByText('취향 설문 시작하기');
    expect(startButton).toBeInTheDocument();
    expect(startButton.tagName).toBe('BUTTON');
  });

  it('should navigate to survey page when start survey button is clicked', () => {
    // Given: HomePage가 렌더링되고 버튼이 있을 때
    render(
      <BrowserRouter>
        <HomePage />
      </BrowserRouter>
    );

    const startButton = screen.getByText('취향 설문 시작하기');

    // When: 버튼을 클릭하면
    startButton.click();

    // Then: /survey 경로로 이동해야 함
    expect(mockNavigate).toHaveBeenCalledWith('/survey');
  });

  it('should render problem section with three problem items', () => {
    // Given: HomePage가 렌더링될 때
    render(
      <BrowserRouter>
        <HomePage />
      </BrowserRouter>
    );

    // Then: 문제 섹션의 제목과 세 가지 문제 항목이 표시되어야 함
    expect(screen.getByText('이런 고민 있으신가요?')).toBeInTheDocument();
    expect(screen.getByText('원두 종류가 너무 많아요')).toBeInTheDocument();
    expect(screen.getByText('전문 용어가 어려워요')).toBeInTheDocument();
    expect(screen.getByText('실패 경험이 두려워요')).toBeInTheDocument();
  });

  it('should render solution section with three features', () => {
    // Given: HomePage가 렌더링될 때
    render(
      <BrowserRouter>
        <HomePage />
      </BrowserRouter>
    );

    // Then: 솔루션 섹션의 제목과 세 가지 기능이 표시되어야 함
    expect(screen.getByText('OrderBean이 해결해드립니다')).toBeInTheDocument();
    expect(screen.getByText('간단한 설문')).toBeInTheDocument();
    expect(screen.getByText('맞춤 추천')).toBeInTheDocument();
    expect(screen.getByText('실패 없는 선택')).toBeInTheDocument();
  });

  it('should render how it works section with three steps', () => {
    // Given: HomePage가 렌더링될 때
    render(
      <BrowserRouter>
        <HomePage />
      </BrowserRouter>
    );

    // Then: 작동 방식 섹션의 제목과 세 가지 단계가 표시되어야 함
    expect(screen.getByText('이렇게 시작하세요')).toBeInTheDocument();
    expect(screen.getByText('취향 설문')).toBeInTheDocument();
    expect(screen.getByText('맞춤 추천')).toBeInTheDocument();
    expect(screen.getByText('주문하기')).toBeInTheDocument();
  });

  it('should render CTA section with start button', () => {
    // Given: HomePage가 렌더링될 때
    render(
      <BrowserRouter>
        <HomePage />
      </BrowserRouter>
    );

    // Then: CTA 섹션의 제목과 버튼이 표시되어야 함
    expect(screen.getByText('지금 바로 시작해보세요')).toBeInTheDocument();
    const ctaButton = screen.getByText('무료로 취향 설문 시작하기');
    expect(ctaButton).toBeInTheDocument();
    expect(ctaButton.tagName).toBe('BUTTON');
  });

  it('should navigate to survey page when CTA button is clicked', () => {
    // Given: HomePage가 렌더링되고 CTA 버튼이 있을 때
    render(
      <BrowserRouter>
        <HomePage />
      </BrowserRouter>
    );

    const ctaButton = screen.getByText('무료로 취향 설문 시작하기');

    // When: CTA 버튼을 클릭하면
    ctaButton.click();

    // Then: /survey 경로로 이동해야 함
    expect(mockNavigate).toHaveBeenCalledWith('/survey');
  });
});


```


프론트엔드 테스트 케이스 작성 완료. 작성된 내용 요약:

## 작성된 테스트 파일

### 1. **테스트 설정**
- `frontend/src/test/setup.ts` - 테스트 환경 설정 파일
- `frontend/vite.config.ts` - Vitest 설정 추가
- `frontend/package.json` - 테스트 라이브러리 및 스크립트 추가

### 2. **서비스 레이어 테스트**
- `frontend/src/services/__tests__/recommendationService.test.ts`
  - 추천 상품 조회 테스트
  - 필수 필드 검증 테스트
  - 에러 처리 테스트

- `frontend/src/services/__tests__/orderService.test.ts`
  - 주문 생성 테스트
  - 주문 조회 테스트
  - 데이터 형식 검증 테스트

- `frontend/src/services/__tests__/surveyService.test.ts`
  - 설문 제출 테스트
  - 문자열/숫자 답변 처리 테스트
  - 에러 처리 테스트

### 3. **컴포넌트 테스트**
- `frontend/src/pages/__tests__/HomePage.test.tsx`
  - 렌더링 테스트
  - 버튼 클릭 및 네비게이션 테스트
  - 섹션별 콘텐츠 검증 테스트

## 테스트 실행 방법

```bash
# 프론트엔드 디렉토리로 이동
cd frontend

# 의존성 설치
npm install

# 테스트 실행
npm test

# UI 모드로 테스트 실행
npm run test:ui

# 커버리지 포함 테스트 실행
npm run test:coverage
```

모든 테스트는 Given-When-Then 패턴으로 작성되었으며, 백엔드 테스트와 동일한 스타일을 따릅니다.

```shellscript
# 프론트엔드 디렉토리로 이동
cd frontend

# 의존성 설치
npm install

# 테스트 실행
npm test

# UI 모드로 테스트 실행
npm run test:ui

# 커버리지 포함 테스트 실행
npm run test:coverage
```

---

**User**

테스트를 실행하고 결과를 report 폴더에 저장해줘.

---

**Cursor**


프론트엔드 테스트 실행 후 결과를 report 폴더에 저장합니다.



프론트엔드 테스트 실행 후 결과를 report 폴더에 저장합니다. 먼저 의존성 설치 여부를 확인하고 테스트를 실행합니다.



PowerShell에서는 `&&`가 동작하지 않습니다. 명령을 분리해 실행합니다.



테스트 실행 및 리포트 생성 설정 중입니다.


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
    "lint": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0",
    "test": "vitest",
    "test:ui": "vitest --ui",
    "test:coverage": "vitest --coverage",
    "test:report": "vitest --reporter=verbose --reporter=json --outputFile=../report/frontend-test-results.json"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.20.0"
  },
  "devDependencies": {
    "@testing-library/jest-dom": "^6.1.5",
    "@testing-library/react": "^14.1.2",
    "@testing-library/user-event": "^14.5.1",
    "@types/react": "^18.2.43",
    "@types/react-dom": "^18.2.17",
    "@typescript-eslint/eslint-plugin": "^6.14.0",
    "@typescript-eslint/parser": "^6.14.0",
    "@vitejs/plugin-react": "^4.2.1",
    "@vitest/coverage-v8": "^1.1.0",
    "@vitest/ui": "^1.1.0",
    "eslint": "^8.55.0",
    "eslint-plugin-react-hooks": "^4.6.0",
    "eslint-plugin-react-refresh": "^0.4.5",
    "jsdom": "^23.0.1",
    "typescript": "^5.2.2",
    "vite": "^5.0.8",
    "vitest": "^1.1.0"
  }
}


```

---

**User**

@frontend 프로그램도 테스트할수 있는 케이스도 하나 만들어줘.

이 부분부터 작업한 내용을 삭제해줘.

---

**Cursor**


프론트엔드 테스트 관련 파일과 설정을 삭제하고 원래 상태로 되돌리는 중입니다.



프론트엔드 테스트 관련 파일과 설정을 삭제하고 원래 상태로 되돌리는 중입니다.


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
    "@testing-library/jest-dom": "^6.1.5",
    "@testing-library/react": "^14.1.2",
    "@testing-library/user-event": "^14.5.1",
    "@types/react": "^18.2.43",
    "@types/react-dom": "^18.2.17",
    "@typescript-eslint/eslint-plugin": "^6.14.0",
    "@typescript-eslint/parser": "^6.14.0",
    "@vitejs/plugin-react": "^4.2.1",
    "@vitest/coverage-v8": "^1.1.0",
    "@vitest/ui": "^1.1.0",
    "eslint": "^8.55.0",
    "eslint-plugin-react-hooks": "^4.6.0",
    "eslint-plugin-react-refresh": "^0.4.5",
    "jsdom": "^23.0.1",
    "typescript": "^5.2.2",
    "vite": "^5.0.8",
    "vitest": "^1.1.0"
  }
}


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


프론트엔드 테스트 관련 파일과 설정을 삭제했습니다.

## 삭제된 파일들:
1. `frontend/src/test/setup.ts` - 테스트 설정 파일
2. `frontend/src/services/__tests__/recommendationService.test.ts` - 추천 서비스 테스트
3. `frontend/src/services/__tests__/orderService.test.ts` - 주문 서비스 테스트
4. `frontend/src/services/__tests__/surveyService.test.ts` - 설문 서비스 테스트
5. `frontend/src/pages/__tests__/HomePage.test.tsx` - 홈페이지 컴포넌트 테스트
6. `report/frontend-test-results.json` - 테스트 결과 파일

## 복원된 설정 파일들:
1. `frontend/package.json` - 테스트 관련 스크립트와 devDependencies 제거
2. `frontend/vite.config.ts` - Vitest 테스트 설정 제거
3. `frontend/tsconfig.json` - Vitest 관련 타입 설정 제거

프론트엔드가 테스트 추가 이전 상태로 복원되었습니다. 빈 `__tests__` 디렉토리는 수동으로 삭제하시면 됩니다.

---

**User**

@frontend/ 프로그램을 RED 단계 테스트할수 있는 케이스 하나 만들어줘.

---

**Cursor**


프론트엔드 RED 단계 테스트 케이스 작성 전, 구조와 주요 파일을 확인 중입니다.



프론트엔드 RED 단계 테스트 케이스 작성 중입니다. 백엔드 테스트 스타일을 참고해 작성합니다.



프론트엔드 RED 단계 테스트 케이스 작성 중입니다. 테스트 환경 설정부터 진행합니다.


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
    "lint": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0",
    "test": "vitest run"
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
  "name": "orderbean-frontend",
  "version": "0.1.0",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview",
    "lint": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0",
    "test": "vitest run"
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
    "vite": "^5.0.8",
    "vitest": "^1.1.0"
  }
}


```

```typescript
import { describe, it, expect } from 'vitest';
import { recommendationService, RecommendedProduct } from '../recommendationService';

describe('recommendationService', () => {
  describe('getRecommendations', () => {
    it('should return 3 to 5 recommended products for a valid survey ID', async () => {
      // Given: 유효한 설문 ID가 주어졌을 때
      const surveyId = 'survey-123';

      // When: 추천을 요청하면
      const recommendations = await recommendationService.getRecommendations(surveyId);

      // Then: 3~5개의 추천 상품이 반환되어야 함
      expect(recommendations.length).toBeGreaterThanOrEqual(3);
      expect(recommendations.length).toBeLessThanOrEqual(5);
    });
  });
});

```


Vitest 설정 추가 중입니다.


```typescript
/// <reference types="vitest" />
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
  test: {
    globals: true,
    environment: 'node',
  },
});


```


프론트엔드 RED 단계 테스트 케이스를 작성했습니다.

## 작성된 내용

### 1. 테스트 파일
- `frontend/src/services/__tests__/recommendationService.test.ts`
  - `recommendationService.getRecommendations` 테스트
  - 유효한 설문 ID로 3~5개의 추천 상품이 반환되는지 검증

### 2. 설정 파일 업데이트
- `frontend/package.json` - Vitest 추가 및 테스트 스크립트 추가
- `frontend/vite.config.ts` - Vitest 설정 추가

## 테스트 케이스 설명

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

이 테스트는 RED 단계이므로:
- 현재는 실제 API 서버가 없거나 구현이 완전하지 않아 실패할 수 있습니다
- 백엔드 테스트와 동일한 Given-When-Then 패턴을 사용합니다
- TDD의 RED → GREEN → REFACTOR 사이클을 따릅니다

## 테스트 실행 방법

```bash
cd frontend
npm install
npm test
```

테스트를 실행하면 RED 단계(실패)를 확인할 수 있습니다. 이후 구현을 완료하면 GREEN 단계로 전환됩니다.

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

```shellscript
cd frontend
npm install
npm test
```

---

**User**

테스트를 실행하고, 결과를 report 폴더에 마크다운 저장해줘.

---

**Cursor**


프론트엔드 테스트 실행 후 결과를 report 폴더에 마크다운으로 저장합니다.



테스트 실행 중입니다. 결과를 JSON으로 저장한 뒤 마크다운으로 변환합니다.


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
    "lint": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0",
    "test": "vitest run",
    "test:json": "vitest run --reporter=json --outputFile=../report/frontend-test-results.json"
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
    "vite": "^5.0.8",
    "vitest": "^1.1.0"
  }
}


```


테스트 결과 JSON을 읽어 마크다운으로 변환 중입니다.



테스트 결과를 마크다운 리포트로 작성 중입니다.


```markdown
# 프론트엔드 TDD RED 단계 테스트 보고서

## 작업 개요

**작업 일자**: 2025-12-16  
**작업 목표**: 프론트엔드 TDD(Test-Driven Development)의 RED 단계 테스트 케이스 작성 및 실행  
**대상 기능**: `recommendationService.getRecommendations`

---

## 1. 작업 내용

### 1.1 테스트 프레임워크 설정

#### Vitest 설치 및 설정
- **파일**: `frontend/package.json`
- **추가된 의존성**:
  - `vitest`: ^1.1.0

#### Vite 설정 파일 업데이트
- **파일**: `frontend/vite.config.ts`
- **주요 설정**:
  - Vitest 글로벌 설정 활성화
  - Node.js 환경 설정
  - 테스트 파일 자동 감지

### 1.2 RED 단계 테스트 케이스 작성

#### 테스트 파일
- **파일**: `frontend/src/services/__tests__/recommendationService.test.ts`
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

**테스트 목적**:
- 유효한 설문 ID로 추천을 요청했을 때
- 3~5개의 추천 상품이 반환되는지 검증

**테스트 패턴**: Given-When-Then 패턴 사용

---

## 2. 테스트 실행 결과

### 2.1 테스트 실행 명령어
```bash
cd frontend
npm run test:json
```

### 2.2 테스트 결과 요약

| 항목 | 결과 |
|------|------|
| 전체 테스트 스위트 | 3 |
| 통과한 테스트 스위트 | 3 |
| 실패한 테스트 스위트 | 0 |
| 전체 테스트 케이스 | 1 |
| 통과한 테스트 | 0 |
| 실패한 테스트 | 1 |
| 대기 중인 테스트 | 0 |
| 테스트 성공 여부 | ❌ 실패 |

### 2.3 실패한 테스트 상세

#### 테스트: `should return 3 to 5 recommended products for a valid survey ID`

**상태**: ❌ 실패  
**실행 시간**: 18ms  
**실패 원인**: `fetch failed`

**실패 이유 분석**:
- API 서버가 실행되지 않았거나 연결할 수 없음
- `apiClient.get()` 메서드가 실제 HTTP 요청을 시도하지만 서버가 응답하지 않음
- RED 단계이므로 예상된 실패 (구현이 완료되지 않음)

**에러 메시지**:
```
fetch failed
```

**테스트 위치**:
- 파일: `frontend/src/services/__tests__/recommendationService.test.ts`
- 라인: 5, 컬럼: 22

---

## 3. RED 단계 분석

### 3.1 현재 상태
- ✅ 테스트 케이스 작성 완료
- ❌ 테스트 실행 실패 (예상된 동작)
- ⏳ 구현 미완료 상태

### 3.2 실패 원인
1. **API 서버 미실행**: 백엔드 API 서버가 실행되지 않아 `fetch` 요청이 실패
2. **에러 처리 미구현**: `apiClient`에서 네트워크 에러에 대한 처리 로직이 없음
3. **모킹 미적용**: 테스트에서 실제 API 호출 대신 모킹을 사용하지 않음

### 3.3 다음 단계 (GREEN 단계)
1. **API 모킹 구현**: 테스트에서 실제 API 호출 대신 모킹된 응답 사용
2. **에러 처리 추가**: 네트워크 에러나 잘못된 응답에 대한 처리 로직 구현
3. **테스트 환경 개선**: 테스트 전용 API 클라이언트 또는 모킹 라이브러리 도입

---

## 4. 테스트 코드 품질

### 4.1 장점
- ✅ Given-When-Then 패턴을 명확하게 사용
- ✅ 테스트 의도가 명확함 (3~5개 추천 상품 반환)
- ✅ 백엔드 테스트와 일관된 스타일 유지

### 4.2 개선 필요 사항
- ⚠️ API 모킹 미적용 (실제 네트워크 요청 시도)
- ⚠️ 에러 케이스 테스트 부재
- ⚠️ 엣지 케이스 테스트 부재 (빈 문자열, null 등)

---

## 5. 결론

프론트엔드 RED 단계 테스트 케이스를 성공적으로 작성하고 실행했습니다. 테스트는 예상대로 실패했으며, 이는 TDD의 RED 단계가 정상적으로 진행되고 있음을 의미합니다.

**다음 단계**:
1. API 모킹을 적용하여 테스트를 독립적으로 실행 가능하게 만들기
2. GREEN 단계로 진행하여 테스트를 통과시키는 구현 작성
3. REFACTOR 단계에서 코드 품질 개선

---

## 부록

### A. 테스트 실행 명령어
```bash
# 테스트 실행
npm test

# JSON 리포트 생성
npm run test:json
```

### B. 관련 파일
- 테스트 파일: `frontend/src/services/__tests__/recommendationService.test.ts`
- 서비스 파일: `frontend/src/services/recommendationService.ts`
- API 클라이언트: `frontend/src/services/api.ts`
- 설정 파일: `frontend/vite.config.ts`

### C. 의존성
```json
{
  "devDependencies": {
    "vitest": "^1.1.0"
  }
}
```

---

**보고서 생성 일시**: 2025-12-16  
**테스트 프레임워크**: Vitest 1.1.0  
**실행 환경**: Node.js

```


프론트엔드 테스트를 실행하고 결과를 마크다운 리포트로 저장했습니다.

## 생성된 파일

**`report/Frontend_RED_Phase_Test_Report.md`**

## 테스트 결과 요약

- 전체 테스트: 1개
- 통과: 0개
- 실패: 1개
- 상태: RED 단계 (예상된 실패)

## 실패 원인

테스트가 실패한 이유:
- API 서버가 실행되지 않아 `fetch failed` 에러 발생
- RED 단계이므로 예상된 동작
- 실제 구현이 완료되지 않아 테스트가 통과하지 않음

## 리포트 내용

1. 작업 개요: 테스트 프레임워크 설정 및 테스트 케이스 작성
2. 테스트 실행 결과: 상세한 실행 결과 및 실패 분석
3. RED 단계 분석: 현재 상태 및 다음 단계 제안
4. 테스트 코드 품질: 장점 및 개선 사항
5. 결론 및 다음 단계: GREEN 단계로 진행하기 위한 제안

리포트는 `report/Frontend_RED_Phase_Test_Report.md`에 저장되었습니다.

---

**User**

@backend/ @backend/tests/recommendationService.test.ts 테스트를 실행하고 결과를 report 폴더에 마크다운으로 저장해줘.

---

**Cursor**


백엔드 테스트 실행 후 결과를 report 폴더에 마크다운으로 저장합니다.



백엔드 테스트 실행 후 결과를 JSON으로 저장하고, 마크다운 리포트로 변환합니다.


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
    "test": "jest",
    "test:coverage": "jest --coverage",
    "test:watch": "jest --watch",
    "test:json": "jest --json --outputFile=../report/backend-test-results.json"
  },
  "dependencies": {
    "express": "^4.18.2",
    "cors": "^2.8.5"
  },
  "devDependencies": {
    "@types/express": "^4.17.21",
    "@types/cors": "^2.8.17",
    "@types/node": "^20.10.5",
    "@types/jest": "^29.5.11",
    "tsx": "^4.7.0",
    "typescript": "^5.3.3",
    "jest": "^29.7.0",
    "ts-jest": "^29.1.1"
  }
}


```


루트 디렉토리로 이동한 뒤 백엔드 테스트를 실행합니다.



JSON 형식으로 결과를 저장한 뒤 마크다운 리포트를 생성합니다.



JSON 결과 파일을 읽어 마크다운 리포트를 생성합니다.



JSON 결과를 파싱해 마크다운 리포트를 생성합니다.


```markdown
# 백엔드 테스트 실행 보고서

## 작업 개요

**작업 일자**: 2025-12-16  
**테스트 대상**: `recommendationService.getRecommendations`  
**테스트 프레임워크**: Jest 29.7.0  
**실행 환경**: Node.js

---

## 1. 테스트 실행 결과 요약

### 1.1 전체 통계

| 항목 | 결과 |
|------|------|
| 전체 테스트 스위트 | 1 |
| 통과한 테스트 스위트 | 0 |
| 실패한 테스트 스위트 | 1 |
| 전체 테스트 케이스 | 3 |
| 통과한 테스트 | 1 |
| 실패한 테스트 | 2 |
| 대기 중인 테스트 | 0 |
| 전체 성공 여부 | ❌ 실패 |

### 1.2 실행 시간
- **시작 시간**: 2025-12-16 15:36:00
- **종료 시간**: 2025-12-16 15:36:01
- **총 실행 시간**: 약 0.97초

---

## 2. 테스트 케이스 상세 결과

### 2.1 통과한 테스트

#### ✅ 테스트: `should return recommended products with required fields (id, name, reason)`

**상태**: ✅ 통과  
**실행 시간**: < 1ms  
**테스트 파일**: `backend/tests/recommendationService.test.ts`

**검증 내용**:
- 각 추천 상품은 `id`, `name`, `reason` 필드를 포함해야 함
- 모든 필드는 문자열 타입이어야 함
- 모든 필드는 비어있지 않아야 함

**통과 이유**:
- 현재 구현이 빈 배열(`[]`)을 반환하므로 `forEach`가 실행되지 않음
- 빈 배열에 대한 검증이 없어 테스트가 통과함
- 실제로는 구현이 완료되지 않았지만, 테스트 로직상 통과로 판정됨

---

### 2.2 실패한 테스트

#### ❌ 테스트 1: `should return 3 to 5 recommended products for a valid survey ID`

**상태**: ❌ 실패  
**실행 시간**: 2ms  
**테스트 파일**: `backend/tests/recommendationService.test.ts`  
**라인**: 13, 컬럼: 38

**검증 내용**:
- 유효한 설문 ID로 추천을 요청했을 때
- 3~5개의 추천 상품이 반환되어야 함

**실패 원인**:
```
expect(received).toBeGreaterThanOrEqual(expected)

Expected: >= 3
Received:    0
```

**상세 분석**:
- 현재 `recommendationService.getRecommendations()`는 빈 배열(`[]`)을 반환
- 구현이 완료되지 않아 RED 단계 상태
- TODO 주석으로 구현 필요 사항 표시됨

**에러 위치**:
```typescript
// backend/tests/recommendationService.test.ts:13:38
expect(recommendations.length).toBeGreaterThanOrEqual(3);
```

---

#### ❌ 테스트 2: `should return recommendations based on survey answers`

**상태**: ❌ 실패  
**실행 시간**: < 1ms  
**테스트 파일**: `backend/tests/recommendationService.test.ts`  
**라인**: 47, 컬럼: 38

**검증 내용**:
- 특정 취향을 가진 설문 응답이 있을 때
- 설문 결과에 맞는 추천 상품이 반환되어야 함
- 각 추천 상품에는 의미있는 추천 사유가 포함되어야 함

**실패 원인**:
```
expect(received).toBeGreaterThan(expected)

Expected: > 0
Received:   0
```

**상세 분석**:
- 현재 구현이 빈 배열을 반환하여 첫 번째 검증에서 실패
- 추천 사유 검증까지 도달하지 못함
- RED 단계이므로 예상된 실패

**에러 위치**:
```typescript
// backend/tests/recommendationService.test.ts:47:38
expect(recommendations.length).toBeGreaterThan(0);
```

---

## 3. 현재 구현 상태

### 3.1 서비스 구현 코드

**파일**: `backend/src/services/recommendationService.ts`

```typescript
export const recommendationService = {
  getRecommendations: async (surveyId: string): Promise<RecommendedProduct[]> => {
    // TODO: 추천 로직 구현
    return [];
  },
};
```

**현재 상태**:
- ✅ 인터페이스 정의 완료 (`RecommendedProduct`)
- ❌ 추천 로직 미구현 (빈 배열 반환)
- ⏳ RED 단계 상태 유지

### 3.2 테스트 커버리지

현재 테스트 커버리지 정보는 수집되지 않았습니다.  
커버리지를 확인하려면 다음 명령어를 실행하세요:

```bash
cd backend
npm run test:coverage
```

---

## 4. RED 단계 분석

### 4.1 테스트 실패 요약

| 테스트 케이스 | 기대값 | 실제값 | 상태 |
|--------------|--------|--------|------|
| 추천 상품 개수 검증 | 3~5개 | 0개 | ❌ 실패 |
| 필수 필드 검증 | id, name, reason | N/A (빈 배열) | ✅ 통과* |
| 설문 기반 추천 | > 0개 | 0개 | ❌ 실패 |

*참고: 필수 필드 검증 테스트는 빈 배열로 인해 `forEach`가 실행되지 않아 통과했지만, 실제로는 구현이 완료되지 않음

### 4.2 실패 원인 분석

1. **구현 미완료**: `getRecommendations` 메서드가 빈 배열만 반환
2. **추천 로직 부재**: 설문 ID를 기반으로 한 추천 알고리즘 미구현
3. **데이터 소스 부재**: 상품 데이터나 설문 데이터에 대한 접근 로직 없음

### 4.3 예상되는 구현 방향

다음 단계(GREEN 단계)에서 구현해야 할 사항:

1. **설문 데이터 조회**: 설문 ID로 설문 응답 데이터 조회
2. **추천 알고리즘**: 설문 응답을 기반으로 상품 추천 로직 구현
3. **상품 데이터 접근**: 추천할 상품 데이터 조회
4. **추천 사유 생성**: 각 추천 상품에 대한 추천 사유 생성
5. **결과 반환**: 3~5개의 추천 상품 반환

---

## 5. 테스트 코드 품질 평가

### 5.1 장점

- ✅ **Given-When-Then 패턴**: 명확한 테스트 구조
- ✅ **의도 명확성**: 각 테스트의 목적이 명확함
- ✅ **포괄적 검증**: 개수, 필드, 내용 등 다양한 측면 검증
- ✅ **일관된 스타일**: 백엔드 테스트 코드 스타일 일관성 유지

### 5.2 개선 가능 사항

- ⚠️ **엣지 케이스 부재**: 
  - 잘못된 설문 ID 처리
  - null/undefined 입력 처리
  - 빈 문자열 처리
- ⚠️ **에러 처리 테스트 부재**:
  - 데이터베이스 연결 실패
  - 설문 데이터 없음
  - 상품 데이터 없음

---

## 6. 다음 단계 (GREEN 단계)

### 6.1 구현 우선순위

1. **높음**: 기본 추천 로직 구현 (3~5개 상품 반환)
2. **중간**: 추천 사유 생성 로직
3. **낮음**: 성능 최적화 및 캐싱

### 6.2 구현 가이드

```typescript
// 예상 구현 구조
export const recommendationService = {
  getRecommendations: async (surveyId: string): Promise<RecommendedProduct[]> => {
    // 1. 설문 데이터 조회
    const survey = await surveyRepository.findById(surveyId);
    
    // 2. 추천 알고리즘 실행
    const recommendedProducts = await recommendationEngine.calculate(survey);
    
    // 3. 추천 사유 생성
    const productsWithReason = recommendedProducts.map(product => ({
      ...product,
      reason: generateRecommendationReason(product, survey)
    }));
    
    // 4. 3~5개로 제한
    return productsWithReason.slice(0, 5);
  },
};
```

---

## 7. 결론

백엔드 테스트를 성공적으로 실행했으며, RED 단계 상태를 확인했습니다.

**주요 발견 사항**:
- ✅ 테스트 프레임워크 정상 작동
- ✅ 테스트 케이스 정상 실행
- ❌ 3개 중 2개 테스트 실패 (예상된 결과)
- ⏳ 구현 완료 대기 중

**다음 액션**:
1. GREEN 단계로 진행하여 추천 로직 구현
2. 모든 테스트 통과 확인
3. REFACTOR 단계에서 코드 품질 개선

---

## 부록

### A. 테스트 실행 명령어

```bash
# 기본 테스트 실행
cd backend
npm test

# JSON 리포트 생성
npm run test:json

# 커버리지 포함 테스트
npm run test:coverage

# Watch 모드
npm run test:watch
```

### B. 관련 파일

- **테스트 파일**: `backend/tests/recommendationService.test.ts`
- **서비스 파일**: `backend/src/services/recommendationService.ts`
- **설정 파일**: `backend/jest.config.js`
- **JSON 결과**: `report/backend-test-results.json`

### C. 테스트 환경

- **Node.js 버전**: (시스템 기본)
- **Jest 버전**: 29.7.0
- **TypeScript**: 5.3.3
- **ts-jest**: 29.1.1

---

**보고서 생성 일시**: 2025-12-16  
**테스트 실행 시간**: 약 0.97초  
**상태**: RED 단계 (구현 대기 중)

```


백엔드 테스트를 실행하고 결과를 마크다운 리포트로 저장했습니다.

## 생성된 파일

**`report/Backend_Test_Execution_Report.md`**

## 테스트 결과 요약

- 전체 테스트: 3개
- 통과: 1개
- 실패: 2개
- 상태: RED 단계 (예상된 실패)

## 상세 결과

### 통과한 테스트
- `should return recommended products with required fields (id, name, reason)`
  - 빈 배열로 인해 `forEach`가 실행되지 않아 통과 (실제로는 구현 미완료)

### 실패한 테스트
1. `should return 3 to 5 recommended products for a valid survey ID`
   - 기대: 3~5개
   - 실제: 0개 (빈 배열 반환)
2. `should return recommendations based on survey answers`
   - 기대: 1개 이상
   - 실제: 0개

## 리포트 내용

1. 테스트 실행 결과 요약: 통계 및 실행 시간
2. 테스트 케이스 상세 결과: 각 테스트의 통과/실패 분석
3. 현재 구현 상태: 서비스 코드 및 TODO 상태
4. RED 단계 분석: 실패 원인 및 개선 방향
5. 테스트 코드 품질 평가: 장점 및 개선 사항
6. 다음 단계 (GREEN 단계): 구현 가이드 및 우선순위
7. 결론 및 다음 액션

리포트는 `report/Backend_Test_Execution_Report.md`에 저장되었습니다. 현재 RED 단계 상태이며, 구현이 완료되지 않아 예상대로 테스트가 실패했습니다.

---

**User**

@report/Frontend_RED_Phase_Test_Report.md 
@report/Backend_Test_Execution_Report.md 
두 리포트를 분석해서 구현해야할 기능을 기능/비기능 항목으로 구분해서 목록을 알려줘.

---

**Cursor**


두 리포트를 분석해 기능/비기능 요구사항 목록을 정리 중입니다.


```markdown
# 구현 요구사항 분석 보고서

## 개요

**분석 일자**: 2025-12-16  
**분석 대상**: 
- 프론트엔드 TDD RED 단계 테스트 보고서
- 백엔드 테스트 실행 보고서

**목적**: 두 리포트를 분석하여 구현해야 할 기능을 기능 요구사항과 비기능 요구사항으로 분류

---

## 1. 백엔드 구현 요구사항

### 1.1 기능 요구사항 (Functional Requirements)

#### 🔴 높은 우선순위

##### FR-BE-001: 추천 상품 조회 기능
- **설명**: 설문 ID를 기반으로 3~5개의 추천 상품을 반환하는 기능
- **입력**: 설문 ID (string)
- **출력**: 추천 상품 배열 (3~5개)
- **검증 기준**: 
  - 반환되는 상품 개수는 3개 이상 5개 이하여야 함
  - 각 상품은 `id`, `name`, `reason` 필드를 포함해야 함
- **현재 상태**: ❌ 미구현 (빈 배열 반환)
- **참고**: `Backend_Test_Execution_Report.md` 섹션 2.2, 4.1

##### FR-BE-002: 설문 데이터 조회 기능
- **설명**: 설문 ID로 설문 응답 데이터를 조회하는 기능
- **입력**: 설문 ID (string)
- **출력**: 설문 응답 데이터 (SurveyAnswer[])
- **검증 기준**: 
  - 유효한 설문 ID에 대해 설문 데이터를 반환해야 함
  - 존재하지 않는 설문 ID에 대해 적절한 에러 처리
- **현재 상태**: ❌ 미구현
- **참고**: `Backend_Test_Execution_Report.md` 섹션 4.3

##### FR-BE-003: 추천 알고리즘 실행 기능
- **설명**: 설문 응답을 기반으로 상품을 추천하는 알고리즘 실행 기능
- **입력**: 설문 응답 데이터
- **출력**: 추천 점수가 계산된 상품 목록
- **검증 기준**: 
  - 설문 응답에 맞는 상품이 추천되어야 함
  - 추천 점수 기반으로 정렬되어야 함
- **현재 상태**: ❌ 미구현
- **참고**: `Backend_Test_Execution_Report.md` 섹션 4.3

##### FR-BE-004: 추천 사유 생성 기능
- **설명**: 각 추천 상품에 대한 추천 사유를 생성하는 기능
- **입력**: 상품 정보, 설문 응답 데이터
- **출력**: 추천 사유 문자열 (최소 10자 이상)
- **검증 기준**: 
  - 각 추천 상품에는 의미있는 추천 사유가 포함되어야 함
  - 추천 사유는 최소 10자 이상이어야 함
- **현재 상태**: ❌ 미구현
- **참고**: `Backend_Test_Execution_Report.md` 섹션 2.2, 4.3

#### 🟡 중간 우선순위

##### FR-BE-005: 상품 데이터 접근 기능
- **설명**: 추천할 상품 데이터를 조회하는 기능
- **입력**: 필터 조건 (선택적)
- **출력**: 상품 데이터 배열
- **검증 기준**: 
  - 모든 상품 데이터에 접근 가능해야 함
  - 필터링 옵션 지원
- **현재 상태**: ❌ 미구현
- **참고**: `Backend_Test_Execution_Report.md` 섹션 4.2

##### FR-BE-006: 엣지 케이스 처리 기능
- **설명**: 잘못된 입력값에 대한 처리 기능
- **입력 케이스**:
  - 잘못된 설문 ID
  - null/undefined 입력
  - 빈 문자열
- **출력**: 적절한 에러 메시지 또는 기본값
- **검증 기준**: 
  - 모든 엣지 케이스에 대해 안전하게 처리되어야 함
  - 명확한 에러 메시지 제공
- **현재 상태**: ❌ 미구현
- **참고**: `Backend_Test_Execution_Report.md` 섹션 5.2

##### FR-BE-007: 에러 처리 기능
- **설명**: 시스템 에러에 대한 처리 기능
- **에러 케이스**:
  - 데이터베이스 연결 실패
  - 설문 데이터 없음
  - 상품 데이터 없음
- **출력**: 적절한 에러 응답
- **검증 기준**: 
  - 모든 에러 케이스에 대해 명확한 에러 메시지 제공
  - 시스템 안정성 유지
- **현재 상태**: ❌ 미구현
- **참고**: `Backend_Test_Execution_Report.md` 섹션 5.2

### 1.2 비기능 요구사항 (Non-Functional Requirements)

#### 🟢 낮은 우선순위

##### NFR-BE-001: 성능 최적화
- **설명**: 추천 알고리즘의 성능 최적화
- **요구사항**:
  - 추천 조회 응답 시간 최적화
  - 대량 데이터 처리 시 성능 유지
- **현재 상태**: ⏳ 향후 개선 필요
- **참고**: `Backend_Test_Execution_Report.md` 섹션 6.1

##### NFR-BE-002: 캐싱 기능
- **설명**: 자주 조회되는 데이터에 대한 캐싱
- **요구사항**:
  - 설문 데이터 캐싱
  - 상품 데이터 캐싱
  - 추천 결과 캐싱 (선택적)
- **현재 상태**: ⏳ 향후 개선 필요
- **참고**: `Backend_Test_Execution_Report.md` 섹션 6.1

##### NFR-BE-003: 코드 품질 및 유지보수성
- **설명**: 코드의 가독성, 유지보수성 향상
- **요구사항**:
  - 명확한 함수명 및 변수명
  - 적절한 주석 및 문서화
  - 일관된 코딩 스타일
- **현재 상태**: ⏳ REFACTOR 단계에서 개선
- **참고**: `Backend_Test_Execution_Report.md` 섹션 5.1, 7

##### NFR-BE-004: 테스트 커버리지
- **설명**: 테스트 커버리지 확보
- **요구사항**:
  - 핵심 기능에 대한 테스트 커버리지 80% 이상
  - 엣지 케이스 테스트 추가
- **현재 상태**: ⏳ 향후 개선 필요
- **참고**: `Backend_Test_Execution_Report.md` 섹션 3.2, 5.2

---

## 2. 프론트엔드 구현 요구사항

### 2.1 기능 요구사항 (Functional Requirements)

#### 🔴 높은 우선순위

##### FR-FE-001: API 모킹 기능
- **설명**: 테스트에서 실제 API 호출 대신 모킹된 응답을 사용하는 기능
- **입력**: 모킹할 API 엔드포인트 및 응답 데이터
- **출력**: 모킹된 API 응답
- **검증 기준**: 
  - 테스트가 실제 네트워크 요청 없이 실행되어야 함
  - 다양한 시나리오에 대한 모킹 지원
- **현재 상태**: ❌ 미구현
- **참고**: `Frontend_RED_Phase_Test_Report.md` 섹션 3.2, 3.3

##### FR-FE-002: API 에러 처리 기능
- **설명**: 네트워크 에러나 잘못된 API 응답에 대한 처리 기능
- **에러 케이스**:
  - 네트워크 연결 실패
  - API 서버 응답 없음
  - 잘못된 응답 형식
- **출력**: 사용자 친화적인 에러 메시지
- **검증 기준**: 
  - 모든 에러 케이스에 대해 적절한 처리
  - 사용자에게 명확한 피드백 제공
- **현재 상태**: ❌ 미구현
- **참고**: `Frontend_RED_Phase_Test_Report.md` 섹션 2.3, 3.2

#### 🟡 중간 우선순위

##### FR-FE-003: 엣지 케이스 처리 기능
- **설명**: 잘못된 입력값에 대한 처리 기능
- **입력 케이스**:
  - 빈 문자열
  - null/undefined
  - 잘못된 설문 ID 형식
- **출력**: 적절한 검증 메시지 또는 기본값
- **검증 기준**: 
  - 모든 엣지 케이스에 대해 안전하게 처리
  - 사용자 경험 저하 방지
- **현재 상태**: ❌ 미구현
- **참고**: `Frontend_RED_Phase_Test_Report.md` 섹션 4.2

##### FR-FE-004: 로딩 상태 처리 기능
- **설명**: API 요청 중 로딩 상태를 표시하는 기능
- **입력**: API 요청 상태
- **출력**: 로딩 인디케이터 또는 스켈레톤 UI
- **검증 기준**: 
  - 사용자에게 명확한 로딩 상태 피드백
  - 적절한 로딩 시간 관리
- **현재 상태**: ⏳ 향후 구현 필요
- **참고**: (리포트에 명시되지 않았으나 UX 개선을 위해 필요)

##### FR-FE-005: 빈 상태 처리 기능
- **설명**: 추천 결과가 없을 때의 처리 기능
- **입력**: 빈 추천 결과
- **출력**: 빈 상태 UI 및 안내 메시지
- **검증 기준**: 
  - 사용자에게 명확한 안내 메시지 제공
  - 대안 액션 제시
- **현재 상태**: ⏳ 향후 구현 필요
- **참고**: (리포트에 명시되지 않았으나 UX 개선을 위해 필요)

### 2.2 비기능 요구사항 (Non-Functional Requirements)

#### 🟢 낮은 우선순위

##### NFR-FE-001: 테스트 독립성
- **설명**: 테스트가 외부 의존성 없이 독립적으로 실행 가능해야 함
- **요구사항**:
  - API 모킹을 통한 테스트 독립성 확보
  - 테스트 실행 속도 향상
- **현재 상태**: ❌ 미구현
- **참고**: `Frontend_RED_Phase_Test_Report.md` 섹션 3.2, 3.3

##### NFR-FE-002: 테스트 환경 개선
- **설명**: 테스트 전용 API 클라이언트 또는 모킹 라이브러리 도입
- **요구사항**:
  - Vitest와 호환되는 모킹 라이브러리 사용
  - 테스트 설정 간소화
- **현재 상태**: ⏳ 향후 개선 필요
- **참고**: `Frontend_RED_Phase_Test_Report.md` 섹션 3.3

##### NFR-FE-003: 코드 품질 및 유지보수성
- **설명**: 프론트엔드 코드의 가독성, 유지보수성 향상
- **요구사항**:
  - Given-When-Then 패턴 유지
  - 일관된 테스트 스타일
  - 명확한 테스트 의도
- **현재 상태**: ✅ 부분 구현 (패턴은 적용됨)
- **참고**: `Frontend_RED_Phase_Test_Report.md` 섹션 4.1

##### NFR-FE-004: 에러 케이스 테스트 커버리지
- **설명**: 다양한 에러 케이스에 대한 테스트 추가
- **요구사항**:
  - 네트워크 에러 테스트
  - 잘못된 응답 형식 테스트
  - 타임아웃 처리 테스트
- **현재 상태**: ❌ 미구현
- **참고**: `Frontend_RED_Phase_Test_Report.md` 섹션 4.2

---

## 3. 통합 구현 요구사항

### 3.1 기능 요구사항

##### FR-INT-001: API 통신 프로토콜 정의
- **설명**: 프론트엔드와 백엔드 간 API 통신 프로토콜 정의
- **요구사항**:
  - RESTful API 설계
  - 요청/응답 형식 표준화
  - 에러 응답 형식 표준화
- **현재 상태**: ⏳ 부분 구현
- **참고**: 두 리포트 모두에서 API 통신 관련 이슈 언급

##### FR-INT-002: 데이터 형식 검증
- **설명**: API 요청/응답 데이터 형식 검증
- **요구사항**:
  - TypeScript 타입 정의
  - 런타임 검증 (선택적)
- **현재 상태**: ⏳ 부분 구현
- **참고**: 두 리포트 모두에서 타입 검증 필요성 언급

### 3.2 비기능 요구사항

##### NFR-INT-001: 개발 환경 일관성
- **설명**: 프론트엔드와 백엔드 개발 환경의 일관성 유지
- **요구사항**:
  - 동일한 코딩 컨벤션
  - 일관된 테스트 스타일
  - 공유 타입 정의
- **현재 상태**: ✅ 부분 구현 (테스트 스타일 일관성 유지)
- **참고**: 두 리포트 모두에서 일관된 스타일 언급

---

## 4. 우선순위 요약

### 4.1 즉시 구현 필요 (🔴 높은 우선순위)

**백엔드**:
1. FR-BE-001: 추천 상품 조회 기능 (3~5개 반환)
2. FR-BE-002: 설문 데이터 조회 기능
3. FR-BE-003: 추천 알고리즘 실행 기능
4. FR-BE-004: 추천 사유 생성 기능

**프론트엔드**:
1. FR-FE-001: API 모킹 기능
2. FR-FE-002: API 에러 처리 기능

### 4.2 단기 구현 (🟡 중간 우선순위)

**백엔드**:
1. FR-BE-005: 상품 데이터 접근 기능
2. FR-BE-006: 엣지 케이스 처리 기능
3. FR-BE-007: 에러 처리 기능

**프론트엔드**:
1. FR-FE-003: 엣지 케이스 처리 기능
2. FR-FE-004: 로딩 상태 처리 기능
3. FR-FE-005: 빈 상태 처리 기능

### 4.3 중장기 개선 (🟢 낮은 우선순위)

**백엔드**:
1. NFR-BE-001: 성능 최적화
2. NFR-BE-002: 캐싱 기능
3. NFR-BE-003: 코드 품질 및 유지보수성
4. NFR-BE-004: 테스트 커버리지

**프론트엔드**:
1. NFR-FE-001: 테스트 독립성
2. NFR-FE-002: 테스트 환경 개선
3. NFR-FE-003: 코드 품질 및 유지보수성
4. NFR-FE-004: 에러 케이스 테스트 커버리지

---

## 5. 구현 로드맵 제안

### Phase 1: 핵심 기능 구현 (RED → GREEN)
- 백엔드: 추천 로직 기본 구현 (FR-BE-001 ~ FR-BE-004)
- 프론트엔드: API 모킹 및 에러 처리 (FR-FE-001, FR-FE-002)
- 목표: 모든 테스트 통과

### Phase 2: 안정성 강화
- 백엔드: 엣지 케이스 및 에러 처리 (FR-BE-006, FR-BE-007)
- 프론트엔드: 엣지 케이스 처리 (FR-FE-003)
- 목표: 프로덕션 준비

### Phase 3: 사용자 경험 개선
- 프론트엔드: 로딩 상태, 빈 상태 처리 (FR-FE-004, FR-FE-005)
- 목표: 향상된 사용자 경험

### Phase 4: 성능 및 품질 개선
- 백엔드: 성능 최적화, 캐싱 (NFR-BE-001, NFR-BE-002)
- 프론트엔드: 테스트 환경 개선 (NFR-FE-001, NFR-FE-002)
- 목표: 확장 가능한 시스템

---

## 6. 결론

두 리포트를 분석한 결과, 총 **23개의 구현 요구사항**을 식별했습니다:

- **기능 요구사항**: 15개
  - 백엔드: 7개
  - 프론트엔드: 5개
  - 통합: 2개
- **비기능 요구사항**: 8개
  - 백엔드: 4개
  - 프론트엔드: 4개

**즉시 구현이 필요한 핵심 기능**은 6개이며, 이를 통해 TDD의 GREEN 단계로 진입할 수 있습니다.

---

**보고서 생성 일시**: 2025-12-16  
**분석 대상 리포트**:
- `Frontend_RED_Phase_Test_Report.md`
- `Backend_Test_Execution_Report.md`

```


두 리포트를 분석해 구현 요구사항을 기능/비기능으로 분류한 문서를 생성했습니다.

## 생성된 파일

**`report/Implementation_Requirements.md`**

## 분석 결과 요약

### 전체 통계
- 총 구현 요구사항: 23개
  - 기능 요구사항: 15개
  - 비기능 요구사항: 8개

### 백엔드 요구사항 (11개)

#### 기능 요구사항 (7개)
1. FR-BE-001: 추천 상품 조회 기능 (3~5개 반환) — 높음
2. FR-BE-002: 설문 데이터 조회 기능 — 높음
3. FR-BE-003: 추천 알고리즘 실행 기능 — 높음
4. FR-BE-004: 추천 사유 생성 기능 — 높음
5. FR-BE-005: 상품 데이터 접근 기능 — 중간
6. FR-BE-006: 엣지 케이스 처리 기능 — 중간
7. FR-BE-007: 에러 처리 기능 — 중간

#### 비기능 요구사항 (4개)
1. NFR-BE-001: 성능 최적화 — 낮음
2. NFR-BE-002: 캐싱 기능 — 낮음
3. NFR-BE-003: 코드 품질 및 유지보수성 — 낮음
4. NFR-BE-004: 테스트 커버리지 — 낮음

### 프론트엔드 요구사항 (9개)

#### 기능 요구사항 (5개)
1. FR-FE-001: API 모킹 기능 — 높음
2. FR-FE-002: API 에러 처리 기능 — 높음
3. FR-FE-003: 엣지 케이스 처리 기능 — 중간
4. FR-FE-004: 로딩 상태 처리 기능 — 중간
5. FR-FE-005: 빈 상태 처리 기능 — 중간

#### 비기능 요구사항 (4개)
1. NFR-FE-001: 테스트 독립성 — 낮음
2. NFR-FE-002: 테스트 환경 개선 — 낮음
3. NFR-FE-003: 코드 품질 및 유지보수성 — 낮음
4. NFR-FE-004: 에러 케이스 테스트 커버리지 — 낮음

### 통합 요구사항 (3개)
- FR-INT-001: API 통신 프로토콜 정의
- FR-INT-002: 데이터 형식 검증
- NFR-INT-001: 개발 환경 일관성

## 즉시 구현 필요 항목 (우선순위 높음)

### 백엔드 (4개)
1. 추천 상품 조회 기능
2. 설문 데이터 조회 기능
3. 추천 알고리즘 실행 기능
4. 추천 사유 생성 기능

### 프론트엔드 (2개)
1. API 모킹 기능
2. API 에러 처리 기능

## 구현 로드맵 제안

문서에는 4단계 구현 로드맵이 포함되어 있습니다:
- Phase 1: 핵심 기능 구현 (RED → GREEN)
- Phase 2: 안정성 강화
- Phase 3: 사용자 경험 개선
- Phase 4: 성능 및 품질 개선

각 요구사항에는 상세 설명, 입력/출력, 검증 기준, 현재 상태, 참고 섹션이 포함되어 있습니다. 전체 내용은 `report/Implementation_Requirements.md` 파일에서 확인할 수 있습니다.

---

**User**

구현 우선순위를 README.md 파일에 GREEN 단계에서 해야 할 목록을 추가해줘.

---

**Cursor**


README.md에 GREEN 단계 작업 목록 추가를 위해 파일 구조 확인 중입니다.



README.md에 GREEN 단계 작업 목록 추가 중입니다.



README.md에 GREEN 단계 작업 목록 추가 중입니다.


```markdown
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

#### 백엔드 작업 목록

##### 🔴 높은 우선순위

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

#### 프론트엔드 작업 목록

##### 🔴 높은 우선순위

- [ ] **FR-FE-001: API 모킹 기능 구현**
  - 테스트에서 실제 API 호출 대신 모킹된 응답을 사용하는 기능
  - 파일: `frontend/src/services/__tests__/recommendationService.test.ts`
  - 검증: 테스트가 실제 네트워크 요청 없이 실행되어야 함
  - 도구: Vitest의 `vi.mock()` 사용

- [ ] **FR-FE-002: API 에러 처리 기능 구현**
  - 네트워크 에러나 잘못된 API 응답에 대한 처리 기능
  - 파일: `frontend/src/services/api.ts`
  - 검증: 모든 에러 케이스에 대해 적절한 처리 및 사용자 친화적인 메시지 제공

#### 구현 체크리스트

**백엔드**:
- [ ] `recommendationService.getRecommendations()` 메서드 구현
- [ ] 설문 데이터 조회 로직 구현
- [ ] 추천 알고리즘 로직 구현
- [ ] 추천 사유 생성 로직 구현
- [ ] 모든 테스트 통과 확인

**프론트엔드**:
- [ ] API 모킹 설정 (`vi.mock()` 사용)
- [ ] 에러 처리 로직 추가 (`try-catch`, 에러 메시지)
- [ ] 모든 테스트 통과 확인

#### 구현 가이드

**백엔드 구현 순서**:
1. 설문 데이터 조회 기능 구현 (FR-BE-002)
2. 상품 데이터 접근 기능 구현 (필요시)
3. 추천 알고리즘 구현 (FR-BE-003)
4. 추천 사유 생성 기능 구현 (FR-BE-004)
5. 추천 상품 조회 기능 통합 (FR-BE-001)

**프론트엔드 구현 순서**:
1. API 모킹 설정 (FR-FE-001)
2. 에러 처리 로직 추가 (FR-FE-002)
3. 테스트 실행 및 검증

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

### 즉시 구현 필요 (🔴 높은 우선순위)

**백엔드** (4개):
1. FR-BE-001: 추천 상품 조회 기능
2. FR-BE-002: 설문 데이터 조회 기능
3. FR-BE-003: 추천 알고리즘 실행 기능
4. FR-BE-004: 추천 사유 생성 기능

**프론트엔드** (2개):
1. FR-FE-001: API 모킹 기능
2. FR-FE-002: API 에러 처리 기능

### 단기 구현 (🟡 중간 우선순위)

**백엔드** (3개):
1. FR-BE-005: 상품 데이터 접근 기능
2. FR-BE-006: 엣지 케이스 처리 기능
3. FR-BE-007: 에러 처리 기능

**프론트엔드** (3개):
1. FR-FE-003: 엣지 케이스 처리 기능
2. FR-FE-004: 로딩 상태 처리 기능
3. FR-FE-005: 빈 상태 처리 기능

**자세한 내용은 `report/Implementation_Requirements.md` 참고**

```


README.md에 GREEN 단계 작업 목록을 추가했습니다.



README.md에 GREEN 단계 작업 목록을 추가했습니다.

## 추가된 내용

### 1. TDD 개발 단계별 작업 목록 섹션
- RED 단계 (완료): 완료된 작업 요약
- GREEN 단계 (진행 중): 구현해야 할 작업 목록
- REFACTOR 단계 (예정): 향후 개선 작업

### 2. GREEN 단계 상세 목록

#### 백엔드 작업 (4개)
- FR-BE-001: 추천 상품 조회 기능
- FR-BE-002: 설문 데이터 조회 기능
- FR-BE-003: 추천 알고리즘 실행 기능
- FR-BE-004: 추천 사유 생성 기능

#### 프론트엔드 작업 (2개)
- FR-FE-001: API 모킹 기능
- FR-FE-002: API 에러 처리 기능

### 3. 구현 체크리스트
각 작업 항목에 체크박스와 상세 설명 포함

### 4. 구현 가이드
백엔드와 프론트엔드의 구현 순서 제안

### 5. 우선순위 요약
즉시 구현 필요 항목과 단기 구현 항목 구분

린트 경고는 마크다운 스타일 관련이며 기능에는 영향 없습니다. GREEN 단계 작업 목록이 README.md에 추가되었습니다.

---

**User**

목록을 높은 우선순위와 중간 우선순위로 구분해서 다시 정리해줘.

---

**Cursor**


README.md의 GREEN 단계 목록을 높은 우선순위와 중간 우선순위로 재구성 중입니다.



GREEN 단계 목록을 높은 우선순위와 중간 우선순위로 구분해 재구성 중입니다.


```markdown
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

**백엔드**:
- [ ] `recommendationService.getRecommendations()` 메서드 구현
- [ ] 설문 데이터 조회 로직 구현
- [ ] 추천 알고리즘 로직 구현
- [ ] 추천 사유 생성 로직 구현
- [ ] 모든 테스트 통과 확인

**프론트엔드**:
- [ ] API 모킹 설정 (`vi.mock()` 사용)
- [ ] 에러 처리 로직 추가 (`try-catch`, 에러 메시지)
- [ ] 모든 테스트 통과 확인

#### 구현 가이드

**백엔드 구현 순서**:
1. 설문 데이터 조회 기능 구현 (FR-BE-002)
2. 상품 데이터 접근 기능 구현 (필요시)
3. 추천 알고리즘 구현 (FR-BE-003)
4. 추천 사유 생성 기능 구현 (FR-BE-004)
5. 추천 상품 조회 기능 통합 (FR-BE-001)

**프론트엔드 구현 순서**:
1. API 모킹 설정 (FR-FE-001)
2. 에러 처리 로직 추가 (FR-FE-002)
3. 테스트 실행 및 검증

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

### 즉시 구현 필요 (🔴 높은 우선순위)

**백엔드** (4개):
1. FR-BE-001: 추천 상품 조회 기능
2. FR-BE-002: 설문 데이터 조회 기능
3. FR-BE-003: 추천 알고리즘 실행 기능
4. FR-BE-004: 추천 사유 생성 기능

**프론트엔드** (2개):
1. FR-FE-001: API 모킹 기능
2. FR-FE-002: API 에러 처리 기능

### 단기 구현 (🟡 중간 우선순위)

**백엔드** (3개):
1. FR-BE-005: 상품 데이터 접근 기능
2. FR-BE-006: 엣지 케이스 처리 기능
3. FR-BE-007: 에러 처리 기능

**프론트엔드** (3개):
1. FR-FE-003: 엣지 케이스 처리 기능
2. FR-FE-004: 로딩 상태 처리 기능
3. FR-FE-005: 빈 상태 처리 기능

**자세한 내용은 `report/Implementation_Requirements.md` 참고**
```

```markdown
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

**백엔드 구현 순서**:
1. 설문 데이터 조회 기능 구현 (FR-BE-002)
2. 상품 데이터 접근 기능 구현 (필요시)
3. 추천 알고리즘 구현 (FR-BE-003)
4. 추천 사유 생성 기능 구현 (FR-BE-004)
5. 추천 상품 조회 기능 통합 (FR-BE-001)

**프론트엔드 구현 순서**:
1. API 모킹 설정 (FR-FE-001)
2. 에러 처리 로직 추가 (FR-FE-002)
3. 테스트 실행 및 검증

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

### 즉시 구현 필요 (🔴 높은 우선순위)

**백엔드** (4개):
1. FR-BE-001: 추천 상품 조회 기능
2. FR-BE-002: 설문 데이터 조회 기능
3. FR-BE-003: 추천 알고리즘 실행 기능
4. FR-BE-004: 추천 사유 생성 기능

**프론트엔드** (2개):
1. FR-FE-001: API 모킹 기능
2. FR-FE-002: API 에러 처리 기능

### 단기 구현 (🟡 중간 우선순위)

**백엔드** (3개):
1. FR-BE-005: 상품 데이터 접근 기능
2. FR-BE-006: 엣지 케이스 처리 기능
3. FR-BE-007: 에러 처리 기능

**프론트엔드** (3개):
1. FR-FE-003: 엣지 케이스 처리 기능
2. FR-FE-004: 로딩 상태 처리 기능
3. FR-FE-005: 빈 상태 처리 기능

**자세한 내용은 `report/Implementation_Requirements.md` 참고**
```

```markdown
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

### 즉시 구현 필요 (🔴 높은 우선순위)

**백엔드** (4개):
1. FR-BE-001: 추천 상품 조회 기능
2. FR-BE-002: 설문 데이터 조회 기능
3. FR-BE-003: 추천 알고리즘 실행 기능
4. FR-BE-004: 추천 사유 생성 기능

**프론트엔드** (2개):
1. FR-FE-001: API 모킹 기능
2. FR-FE-002: API 에러 처리 기능

### 단기 구현 (🟡 중간 우선순위)

**백엔드** (3개):
1. FR-BE-005: 상품 데이터 접근 기능
2. FR-BE-006: 엣지 케이스 처리 기능
3. FR-BE-007: 에러 처리 기능

**프론트엔드** (3개):
1. FR-FE-003: 엣지 케이스 처리 기능
2. FR-FE-004: 로딩 상태 처리 기능
3. FR-FE-005: 빈 상태 처리 기능

**자세한 내용은 `report/Implementation_Requirements.md` 참고**
```

```markdown
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
```


README.md의 GREEN 단계 목록을 높은 우선순위와 중간 우선순위로 구분해 재구성했습니다.

## 주요 변경 사항

### 1. GREEN 단계 섹션 재구성
- 높은 우선순위 (즉시 구현 필요): 6개 작업
  - 백엔드 4개 + 프론트엔드 2개
- 중간 우선순위 (단기 구현): 6개 작업
  - 백엔드 3개 + 프론트엔드 3개

### 2. 구조 개선
- 각 우선순위별로 백엔드/프론트엔드 구분
- 각 작업 항목에 상세 설명 포함
- 구현 체크리스트를 우선순위별로 구분
- 구현 가이드를 우선순위별로 구분

### 3. 우선순위 요약 섹션 개선
- 각 우선순위의 목표 명시
- 작업 개수 요약
- 시각적 구분 강화

이제 GREEN 단계 작업 목록이 우선순위별로 구분되어 있습니다. 높은 우선순위 작업부터 진행하면 GREEN 단계를 완료할 수 있습니다.

---

**User**

@README.md 
@README.md (352-387) 
을 최소단위로 구현하려고 하는데, 먼저 시나리오를 작성해서 보여주고 승인 받은후 구현해줘.

---

**Cursor**


최소 단위 구현을 위한 시나리오 작성 전, 현재 코드 상태 확인 중입니다.



최소 단위 구현 시나리오 작성 중입니다.



Product 모델 확인 중입니다. 확인 후 최소 단위 구현 시나리오를 작성합니다.


```markdown
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

```


GREEN 단계 최소 단위 구현 시나리오를 작성했습니다.

## 구현 시나리오 요약

### 핵심 전략
- 최소 구현: 테스트 통과에 필요한 최소 코드만 작성
- 하드코딩 허용: 실제 DB 연결 없이 더미 데이터 사용
- 점진적 개선: GREEN 완료 후 REFACTOR에서 개선

### 구현 순서

**Phase 1: 백엔드 (순차적)**
1. FR-BE-002: 설문 데이터 조회 (더미 설문 데이터)
2. FR-BE-005: 상품 데이터 접근 (더미 상품 5개)
3. FR-BE-003: 추천 알고리즘 (간단한 점수 계산)
4. FR-BE-004: 추천 사유 생성 (템플릿 기반)
5. FR-BE-001: 추천 상품 조회 통합 (모든 기능 연결)

**Phase 2: 프론트엔드**
6. FR-FE-001: API 모킹 (Vitest `vi.mock()` 사용)
7. FR-FE-002: API 에러 처리 (`try-catch` 추가)

### 예상 결과
- 백엔드: 3개 테스트 모두 통과
- 프론트엔드: 1개 테스트 통과
- 총 6개 작업 완료

### 상세 시나리오
전체 시나리오는 `report/GREEN_Phase_Implementation_Scenario.md`에 저장했습니다.

이 시나리오로 진행할까요? 승인해 주시면 구현을 시작하겠습니다.

---

**User**

시나리오 명을 Green_high_Scenario 로 변경해줘.

---

**Cursor**


시나리오 파일명을 `Green_high_Scenario.md`로 변경 중입니다.



파일명을 `Green_high_Scenario.md`로 변경 중입니다.


```markdown
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

```


파일명을 `Green_high_Scenario.md`로 변경했습니다.

- 새 파일: `Green_high_Scenario.md` 생성
- 기존 파일: `GREEN_Phase_Implementation_Scenario.md` 삭제

시나리오 내용은 동일하며, 파일명만 변경되었습니다.

---

**User**

@README.md 내용중
@README.md (389-426) 
을 최소단위로 구현하려고 하는데, 먼저 시나리오를 작성해서 보여주고 승인 받은후 구현해줘.

---

**Cursor**


중간 우선순위 작업의 최소 단위 구현 시나리오 작성을 위해 현재 코드 상태 확인 중입니다.



중간 우선순위 작업의 최소 단위 구현 시나리오 작성 중입니다.


```markdown
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

```


중간 우선순위 작업의 최소 단위 구현 시나리오를 작성했습니다.

## 구현 시나리오 요약

### 핵심 전략
- 최소 구현: 기본 검증과 처리만 구현
- 안전성 우선: 엣지 케이스에서 안전하게 처리
- 사용자 경험: 명확한 피드백 제공

### 구현 순서

**Phase 1: 백엔드 안정성 강화**
1. FR-BE-006: 엣지 케이스 처리 (null/undefined, 빈 문자열 검증)
2. FR-BE-007: 에러 처리 (설문 데이터 없음, 상품 데이터 없음 처리)

**Phase 2: 프론트엔드 사용자 경험 개선**
3. FR-FE-003: 엣지 케이스 처리 (입력 검증)
4. FR-FE-004: 로딩 상태 처리 (로딩 UI 표시)
5. FR-FE-005: 빈 상태 처리 (빈 결과 안내 메시지)

### 주요 구현 내용

**백엔드**:
- 입력 검증 (null, undefined, 빈 문자열)
- 에러 처리 (try-catch, 명확한 에러 메시지)

**프론트엔드**:
- 입력 검증 (API 호출 전 검증)
- 로딩 상태 관리 (useState, 로딩 UI)
- 빈 상태 처리 (안내 메시지 + 대안 액션)

### 예상 결과
- 백엔드: 엣지 케이스 안전 처리, 명확한 에러 메시지
- 프론트엔드: 로딩/빈 상태 처리, 사용자 경험 개선

### 상세 시나리오
전체 시나리오는 `Green_middle_Scenario.md`에 저장했습니다.

이 시나리오로 진행할까요? 승인해 주시면 구현을 시작하겠습니다.

참고: 높은 우선순위 구현 완료 후 진행하는 것을 권장합니다.

