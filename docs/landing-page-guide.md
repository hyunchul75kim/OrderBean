# OrderBean 프로젝트 실행 가이드

OrderBean 프로젝트의 각 구성 요소를 실행하는 방법을 안내합니다.

---

## 프로젝트 구조

OrderBean 프로젝트는 다음 3개의 주요 구성 요소로 이루어져 있습니다:

1. **Frontend** (사용자 화면) - 포트 5173
   - 고객용 주문 및 추천 화면
   - 랜딩 페이지, 설문, 주문 페이지 등

2. **Admin** (관리자 화면) - 포트 5174
   - 관리자 대시보드
   - 주문 관리, 재고 관리, 상품 관리

3. **Backend** (API 서버) - 포트 3000
   - RESTful API 서버
   - 주문, 상품, 추천 로직 등 처리

---

## 빠른 시작

### 전체 프로젝트 실행 (권장)

프로젝트 루트 디렉토리에서 다음 명령어들을 각각 다른 터미널에서 실행합니다:

**터미널 1 - Backend:**
```bash
npm run dev:backend
```

**터미널 2 - Frontend (사용자 화면):**
```bash
npm run dev:frontend
```

**터미널 3 - Admin (관리자 화면):**
```bash
npm run dev:admin
```

### 개별 디렉토리에서 실행

각 디렉토리에서 직접 실행할 수도 있습니다:

**Backend:**
```bash
cd backend
npm run dev
```

**Frontend:**
```bash
cd frontend
npm run dev
```

**Admin:**
```bash
cd admin
npm run dev
```

---

## 접속 URL

각 서비스가 실행되면 다음 URL로 접속할 수 있습니다:

- **Frontend (사용자 화면)**: http://localhost:5173
- **Admin (관리자 화면)**: http://localhost:5174
- **Backend API**: http://localhost:3000

---

## Frontend (사용자 화면)

### 실행 확인

Frontend 서버 실행 후 터미널에 다음과 같은 메시지가 표시됩니다:

```
  VITE v5.x.x  ready in xxx ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

### 주요 페이지

- **랜딩 페이지**: `/` - 서비스 소개 및 시작
- **설문 페이지**: `/survey` - 커피 취향 설문
- **추천 결과**: `/recommendations` - 맞춤 커피 추천
- **주문 페이지**: `/order` - 상품 주문
- **피드백 페이지**: `/feedback` - 구매 후 평가

### 랜딩 페이지 구성

랜딩 페이지에는 다음 섹션이 포함되어 있습니다:

1. **Hero 섹션**: 브랜드 소개 및 CTA 버튼
2. **문제 제시 섹션**: 사용자의 고민 3가지
3. **해결책 섹션**: OrderBean의 3가지 특징
4. **사용 방법 섹션**: 3단계 프로세스
5. **최종 CTA 섹션**: 설문 시작 유도

---

## Admin (관리자 화면)

### 실행 확인

Admin 서버 실행 후 터미널에 다음과 같은 메시지가 표시됩니다:

```
  VITE v5.x.x  ready in xxx ms

  ➜  Local:   http://localhost:5174/
  ➜  Network: use --host to expose
```

### 주요 기능

- **관리자 대시보드**: `/admin`
  - 주문 통계 요약 (총 주문, 주문 접수, 제조 중, 제조 완료)
  - 재고 현황 및 조정
  - 주문 현황 및 처리

- **상품 관리**: `/admin/products`
  - 상품 목록 확인
  - 상품 등록/수정/삭제

- **주문 관리**: `/admin/orders`
  - 전체 주문 내역 확인
  - 주문 상태 필터링

- **추천 로직 설정**: `/admin/recommendation-config`
  - 추천 알고리즘 가중치 설정

---

## Backend (API 서버)

### 실행 확인

Backend 서버 실행 후 터미널에 다음과 같은 메시지가 표시됩니다:

```
Server is running on port 3000
```

### 주요 API 엔드포인트

- **설문**: `/api/survey`
- **추천**: `/api/recommendations`
- **상품**: `/api/products`
- **주문**: `/api/orders`
- **피드백**: `/api/feedback`
- **관리자**: `/api/admin`
  - `/api/admin/dashboard/stats` - 대시보드 통계
  - `/api/admin/inventory` - 재고 현황
  - `/api/admin/orders` - 주문 목록

---

## 서버 중지

각 서버를 중지하려면 해당 터미널에서 `Ctrl + C`를 누르세요.

---

## 포트 변경

기본 포트가 사용 중인 경우, 각 프로젝트의 설정 파일에서 포트를 변경할 수 있습니다:

### Frontend 포트 변경

`frontend/vite.config.ts`:
```typescript
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173, // 원하는 포트 번호로 변경
    // ...
  },
});
```

### Admin 포트 변경

`admin/vite.config.ts`:
```typescript
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5174, // 원하는 포트 번호로 변경
    // ...
  },
});
```

### Backend 포트 변경

`backend/src/index.ts`에서 포트 설정을 변경하거나 환경 변수로 설정:
```typescript
const PORT = process.env.PORT || 3000;
```

---

## 개발 워크플로우

### 전체 개발 환경 실행

개발 시에는 보통 3개의 터미널을 사용합니다:

1. **Backend 서버** (필수)
   - API 요청을 처리하기 위해 항상 실행되어야 합니다

2. **Frontend 또는 Admin** (선택)
   - 작업하는 화면에 따라 실행
   - 또는 둘 다 실행하여 동시에 개발 가능

### 테스트 실행

**Frontend 테스트:**
```bash
cd frontend
npm test
```

**Admin 테스트:**
```bash
cd admin
npm test
```

**Backend 테스트:**
```bash
cd backend
npm test
```

---

## 문제 해결

### 포트가 이미 사용 중인 경우

다른 프로세스가 포트를 사용 중일 수 있습니다. 다음 방법을 시도해보세요:

1. **포트를 사용하는 프로세스 확인:**
   ```bash
   # Windows
   netstat -ano | findstr :5173
   netstat -ano | findstr :5174
   netstat -ano | findstr :3000
   ```

2. **해당 프로세스 종료** 또는 **포트 변경**

### 서버가 시작되지 않는 경우

1. **의존성 설치 확인:**
   ```bash
   # 루트 디렉토리에서
   npm install
   
   # 각 디렉토리에서도 확인
   cd frontend && npm install
   cd admin && npm install
   cd backend && npm install
   ```

2. **Node.js 버전 확인:**
   ```bash
   node --version
   # v18.0.0 이상이어야 합니다
   ```

3. **에러 메시지 확인:**
   - 터미널에 표시된 에러 메시지를 확인하고 해결하세요

### API 연결 오류

Frontend나 Admin에서 API 호출이 실패하는 경우:

1. **Backend 서버가 실행 중인지 확인**
2. **CORS 설정 확인** (backend/src/app.ts)
3. **프록시 설정 확인** (각 vite.config.ts의 proxy 설정)

---

## 빌드

### 프로덕션 빌드

**전체 빌드:**
```bash
npm run build
```

**개별 빌드:**
```bash
npm run build:frontend
npm run build:admin
npm run build:backend
```

### 빌드 결과물

- **Frontend**: `frontend/dist/`
- **Admin**: `admin/dist/`
- **Backend**: `backend/dist/`

---

## 추가 정보

- [전체 설치 가이드](./installation.md)
- [아키텍처 문서](./architecture.md)
- [Frontend UI PRD (Customer)](./Frontend_UI_PRD_Customer.md)
- [Admin Interface PRD](./Admin_Interface_PRD.md)
- [README.md](../README.md)

---

## 요약

| 구성 요소 | 포트 | 실행 명령어 | 접속 URL |
|---------|------|-----------|---------|
| Frontend | 5173 | `npm run dev:frontend` | http://localhost:5173 |
| Admin | 5174 | `npm run dev:admin` | http://localhost:5174 |
| Backend | 3000 | `npm run dev:backend` | http://localhost:3000 |
