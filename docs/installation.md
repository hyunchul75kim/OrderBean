# OrderBean 설치 및 실행 가이드

이 문서는 OrderBean 프로젝트를 로컬 환경에 설치하고 실행하는 방법을 안내합니다.

---

## 목차

1. [필수 요구사항](#필수-요구사항)
2. [프로젝트 클론](#프로젝트-클론)
3. [의존성 설치](#의존성-설치)
4. [환경 변수 설정](#환경-변수-설정)
5. [데이터베이스 설정](#데이터베이스-설정)
6. [프로젝트 실행](#프로젝트-실행)
7. [프로젝트 빌드](#프로젝트-빌드)
8. [트러블슈팅](#트러블슈팅)

---

## 필수 요구사항

다음 소프트웨어가 설치되어 있어야 합니다:

- **Node.js**: v18.0.0 이상
- **npm**: v9.0.0 이상 (또는 yarn, pnpm)
- **데이터베이스**: PostgreSQL 14 이상 (또는 SQLite for MVP)

### Node.js 설치 확인

```bash
node --version
npm --version
```

---

## 프로젝트 클론

프로젝트를 로컬에 클론합니다:

```bash
git clone <repository-url>
cd OrderBean
```

---

## 의존성 설치

이 프로젝트는 모노레포 구조로 되어 있습니다. 루트 디렉토리에서 모든 워크스페이스의 의존성을 한 번에 설치할 수 있습니다.

### 방법 1: 루트에서 설치 (권장)

```bash
# 루트 디렉토리에서 실행
npm install
```

이 명령어는 `frontend`, `admin`, `backend` 워크스페이스의 모든 의존성을 설치합니다.

### 방법 2: 개별 설치

각 프로젝트를 개별적으로 설치할 수도 있습니다:

```bash
# Frontend 설치
cd frontend
npm install
cd ..

# Admin 설치
cd admin
npm install
cd ..

# Backend 설치
cd backend
npm install
cd ..
```

---

## 환경 변수 설정

### Frontend 환경 변수

`frontend` 디렉토리에 `.env` 파일을 생성합니다:

```env
VITE_API_URL=http://localhost:3000/api
```

### Admin 환경 변수

`admin` 디렉토리에 `.env` 파일을 생성합니다:

```env
VITE_API_URL=http://localhost:3000/api
```

### Backend 환경 변수

`backend` 디렉토리에 `.env` 파일을 생성합니다:

```env
# 서버 설정
PORT=3000
NODE_ENV=development

# 데이터베이스 설정
DATABASE_URL=postgresql://user:password@localhost:5432/orderbean
# 또는 SQLite 사용 시
# DATABASE_URL=file:./database/orderbean.db

# JWT 설정 (인증 기능 사용 시)
JWT_SECRET=your-secret-key-here
JWT_EXPIRES_IN=7d
```

---

## 데이터베이스 설정

### PostgreSQL 사용 시

1. PostgreSQL 데이터베이스 생성:

```bash
createdb orderbean
```

2. 스키마 적용:

```bash
psql -d orderbean -f database/schema.sql
```

또는 PostgreSQL 클라이언트를 사용하여 `database/schema.sql` 파일을 실행합니다.

### SQLite 사용 시 (MVP)

SQLite를 사용하는 경우 별도의 설정이 필요하지 않습니다. 데이터베이스 파일은 자동으로 생성됩니다.

---

## 프로젝트 실행

### 개발 모드 실행

개발 모드로 실행하는 방법은 두 가지가 있습니다:

#### 방법 1: 루트에서 실행 (권장)

각 서비스를 별도의 터미널에서 실행합니다:

**터미널 1 - Backend:**
```bash
npm run dev:backend
```

**터미널 2 - Frontend:**
```bash
npm run dev:frontend
```

**터미널 3 - Admin (선택사항):**
```bash
npm run dev:admin
```

#### 방법 2: 개별 디렉토리에서 실행

각 프로젝트 디렉토리로 이동하여 실행합니다:

**Backend:**
```bash
cd backend
npm run dev
# 서버가 http://localhost:3000 에서 실행됩니다
```

**Frontend:**
```bash
cd frontend
npm run dev
# 개발 서버가 http://localhost:5173 에서 실행됩니다
```

**Admin:**
```bash
cd admin
npm run dev
# 개발 서버가 http://localhost:5174 에서 실행됩니다
```

### 접속 URL

실행 후 다음 URL로 접속할 수 있습니다:

- **Frontend**: http://localhost:5173
- **Admin Dashboard**: http://localhost:5174
- **Backend API**: http://localhost:3000/api

---

## 프로젝트 빌드

프로덕션 빌드를 생성하려면:

### 전체 빌드

```bash
npm run build
```

이 명령어는 `frontend`, `admin`, `backend`를 모두 빌드합니다.

### 개별 빌드

```bash
# Frontend 빌드
npm run build:frontend

# Admin 빌드
npm run build:admin

# Backend 빌드
npm run build:backend
```

### 빌드 결과물

- **Frontend**: `frontend/dist/`
- **Admin**: `admin/dist/`
- **Backend**: `backend/dist/`

### 프로덕션 실행

빌드 후 Backend를 프로덕션 모드로 실행:

```bash
cd backend
npm start
```

---

## 트러블슈팅

### 포트가 이미 사용 중인 경우

포트 충돌이 발생하면 환경 변수나 설정 파일에서 포트를 변경할 수 있습니다:

- **Frontend**: `frontend/vite.config.ts`의 `server.port` 수정
- **Admin**: `admin/vite.config.ts`의 `server.port` 수정
- **Backend**: `.env` 파일의 `PORT` 변수 수정

### 의존성 설치 오류

의존성 설치 중 오류가 발생하면:

```bash
# node_modules 삭제 후 재설치
rm -rf node_modules
rm -rf frontend/node_modules
rm -rf admin/node_modules
rm -rf backend/node_modules
rm package-lock.json

# 재설치
npm install
```

### TypeScript 컴파일 오류

TypeScript 오류가 발생하면:

```bash
# 각 프로젝트의 타입 체크
cd frontend && npm run build
cd ../admin && npm run build
cd ../backend && npm run build
```

### 데이터베이스 연결 오류

데이터베이스 연결 오류가 발생하면:

1. 데이터베이스 서버가 실행 중인지 확인
2. `.env` 파일의 `DATABASE_URL`이 올바른지 확인
3. 데이터베이스 사용자 권한 확인

### CORS 오류

프론트엔드에서 API 호출 시 CORS 오류가 발생하면:

`backend/src/app.ts`에서 CORS 설정을 확인하세요:

```typescript
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5174'],
  credentials: true
}));
```

---

## 추가 리소스

- [아키텍처 문서](./architecture.md)
- [API 문서](./api/)
- [README.md](../README.md)

---

## 지원

문제가 발생하거나 질문이 있으시면 이슈를 등록해주세요.

