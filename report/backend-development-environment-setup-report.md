# OrderBean 백엔드 개발 환경 설정 보고서

**작성일:** 2024-12-18  
**프로젝트:** OrderBean 커피 주문 시스템  
**백엔드 프레임워크:** FastAPI (Python)

---

## 1. 프로젝트 개요

### 1.1 목적
OrderBean 프로젝트의 백엔드 개발 환경을 FastAPI + Python 기반으로 구축하고, PostgreSQL 데이터베이스 연동을 준비합니다.

### 1.2 주요 목표
- FastAPI 기반 RESTful API 서버 구축
- PostgreSQL 데이터베이스 연결 설정
- 계층형 아키텍처 구현 (Router → Service → Repository)
- 개발 환경 및 도구 설정

---

## 2. 기술 스택

### 2.1 핵심 기술
- **프레임워크:** FastAPI 0.125.0
- **언어:** Python 3.10.11
- **서버:** Uvicorn 0.38.0
- **데이터베이스:** PostgreSQL
- **ORM:** SQLAlchemy 2.0.45
- **데이터 검증:** Pydantic 2.12.5

### 2.2 주요 의존성 패키지

```txt
fastapi==0.104.1
uvicorn[standard]==0.24.0
sqlalchemy==2.0.23
psycopg2-binary==2.9.11
alembic==1.12.1
pydantic==2.5.0
pydantic-settings==2.1.0
python-jose[cryptography]==3.3.0
passlib[bcrypt]==1.7.4
python-multipart==0.0.6
python-dotenv==1.0.0
pytest==7.4.3
pytest-asyncio==0.21.1
httpx==0.25.2
```

### 2.3 개발 도구
- **코드 포맷터:** Black 23.11.0
- **린터:** Flake8 6.1.0
- **타입 체커:** MyPy 1.7.1
- **테스트 프레임워크:** Pytest 7.4.3

---

## 3. 개발 환경 설정

### 3.1 가상 환경 생성

```bash
# 가상 환경 생성
python -m venv venv

# 가상 환경 활성화 (터미널별)
# Git Bash
source venv/Scripts/activate

# PowerShell
venv\Scripts\Activate.ps1

# CMD
venv\Scripts\activate.bat
```

### 3.2 의존성 설치

```bash
# requirements.txt에서 패키지 설치
pip install -r requirements.txt
```

### 3.3 환경 변수 설정

`.env` 파일 생성:
```env
# 데이터베이스 설정
DB_HOST=localhost
DB_PORT=5432
DB_NAME=orderbean_db
DB_USER=postgres
DB_PASSWORD=postgresql

# 서버 설정
HOST=0.0.0.0
PORT=8000

# 환경 설정
ENVIRONMENT=development
```

---

## 4. 프로젝트 구조

```
backend/
├── main.py                      # FastAPI 앱 진입점
├── requirements.txt              # Python 패키지 의존성
├── init_db.py                   # 데이터베이스 초기화 스크립트
├── test_db_connection.py        # 데이터베이스 연결 테스트
├── .env                         # 환경 변수 설정
├── .gitignore                   # Git 무시 파일
├── README.md                    # 프로젝트 README
├── DATABASE_SETUP.md            # 데이터베이스 설정 가이드
├── RUN_SERVER.md                # 서버 실행 가이드
├── ACTIVATE_VENV.md             # 가상 환경 활성화 가이드
├── START_POSTGRESQL.md          # PostgreSQL 시작 가이드
└── app/
    ├── __init__.py
    ├── core/                    # 핵심 설정
    │   ├── __init__.py
    │   ├── config.py            # 애플리케이션 설정
    │   └── database.py         # 데이터베이스 연결 및 세션 관리
    ├── routers/                 # API 라우터
    │   ├── __init__.py
    │   ├── menus.py             # 메뉴 관련 API
    │   ├── orders.py            # 주문 관련 API
    │   └── admin.py             # 관리자 API
    ├── schemas/                 # Pydantic 스키마
    │   ├── __init__.py
    │   ├── menu.py              # 메뉴 스키마
    │   └── order.py             # 주문 스키마
    ├── services/                # 비즈니스 로직 레이어
    │   ├── __init__.py
    │   ├── menu_service.py      # 메뉴 서비스
    │   └── order_service.py     # 주문 서비스
    ├── repositories/            # 데이터 접근 레이어
    │   ├── __init__.py
    │   ├── menu_repository.py   # 메뉴 리포지토리
    │   ├── option_repository.py # 옵션 리포지토리
    │   └── order_repository.py  # 주문 리포지토리
    ├── models/                  # 데이터 모델 (dataclass)
    │   ├── __init__.py
    │   ├── menu.py
    │   ├── option.py
    │   ├── order.py
    │   └── order_item.py
    └── db_models/               # SQLAlchemy ORM 모델
        ├── __init__.py
        ├── menu.py
        ├── option.py
        ├── order.py
        └── order_item.py
```

---

## 5. 데이터베이스 설정

### 5.1 데이터베이스 모델

#### Menus (메뉴)
- `id` (UUID, Primary Key)
- `name` (String, 100자)
- `description` (Text, nullable)
- `price` (Decimal, >= 0)
- `image_url` (String, 500자, nullable)
- `stock_quantity` (Integer, >= 0)
- `created_at`, `updated_at` (DateTime)

#### Options (옵션)
- `id` (UUID, Primary Key)
- `menu_id` (UUID, Foreign Key → Menus)
- `name` (String, 100자)
- `price` (Decimal, >= 0)
- `created_at`, `updated_at` (DateTime)

#### Orders (주문)
- `id` (UUID, Primary Key)
- `order_number` (String, 50자, Unique)
- `order_date` (DateTime)
- `status` (Enum: '주문접수', '제조중', '완료', '취소')
- `total_amount` (Decimal, >= 0)
- `created_at`, `updated_at` (DateTime)

#### OrderItems (주문 항목)
- `id` (UUID, Primary Key)
- `order_id` (UUID, Foreign Key → Orders)
- `menu_id` (UUID, Foreign Key → Menus)
- `option_id` (UUID, Foreign Key → Options, nullable)
- `quantity` (Integer, > 0)
- `unit_price` (Decimal, >= 0)
- `subtotal` (Decimal, >= 0)
- `created_at` (DateTime)

### 5.2 데이터베이스 연결 설정

**파일:** `app/core/database.py`

```python
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from app.core.config import settings

engine = create_engine(
    settings.database_url,
    pool_pre_ping=True,
    echo=settings.ENVIRONMENT == "development"
)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
```

### 5.3 데이터베이스 초기화

**스크립트:** `init_db.py`

기능:
- 데이터베이스 존재 여부 확인 및 생성
- 모든 테이블 생성
- 샘플 데이터 삽입 (메뉴 3개, 각 메뉴별 옵션 3개)

실행 방법:
```bash
python init_db.py
```

---

## 6. API 구현

### 6.1 구현된 API 엔드포인트

#### 메뉴 API
- `GET /api/menus` - 메뉴 목록 조회
  - 쿼리 파라미터: `include_stock` (관리자용 재고 수량 포함)
- `GET /api/menus/{menu_id}` - 메뉴 상세 조회

#### 주문 API
- `POST /api/orders` - 주문 생성
  - 요청 본문: `{ "items": [{ "menuId": "...", "optionId": "...", "quantity": 2 }] }`
  - 비즈니스 로직: 재고 확인, 가격 계산, 주문 번호 생성, 재고 차감
- `GET /api/orders/{order_id}` - 주문 조회

#### 관리자 API
- `GET /api/admin/orders` - 주문 목록 조회
  - 쿼리 파라미터: `status` (주문 상태 필터)
- `PATCH /api/admin/orders/{order_id}/status` - 주문 상태 변경
  - 요청 본문: `{ "status": "제조중" }`
  - 상태 변경 규칙: '주문접수' → '제조중' → '완료'

### 6.2 아키텍처 패턴

**계층형 아키텍처 (Layered Architecture):**

1. **Router Layer** (`app/routers/`)
   - HTTP 요청/응답 처리
   - 입력 검증
   - 에러 처리

2. **Service Layer** (`app/services/`)
   - 비즈니스 로직 구현
   - 트랜잭션 관리
   - 데이터 변환

3. **Repository Layer** (`app/repositories/`)
   - 데이터베이스 접근
   - CRUD 작업
   - 쿼리 최적화

4. **Model Layer** (`app/db_models/`)
   - SQLAlchemy ORM 모델
   - 데이터베이스 스키마 정의

### 6.3 주요 비즈니스 로직

#### 주문 생성 로직
1. 메뉴 및 옵션 존재 여부 확인
2. 재고 수량 확인
3. 가격 계산 (메뉴 가격 + 옵션 가격) × 수량
4. 주문 번호 생성 (형식: `ORD-YYYYMMDD-XXX`)
5. 트랜잭션 내에서 주문 생성 및 재고 차감

#### 주문 번호 생성 로직
- 형식: `ORD-YYYYMMDD-XXX`
- 일자별 순차 번호 자동 생성
- 예: `ORD-20241218-001`, `ORD-20241218-002`

---

## 7. 서버 실행 및 테스트

### 7.1 서버 실행 방법

```bash
# 방법 1: main.py 직접 실행
python main.py

# 방법 2: uvicorn 명령어 사용
uvicorn main:app --reload --host 0.0.0.0 --port 8000

# 방법 3: python -m uvicorn 사용
python -m uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

### 7.2 서버 접속 확인

서버 실행 후 다음 URL에서 접속 가능:

- **API 서버:** http://localhost:8000
- **API 문서 (Swagger):** http://localhost:8000/docs
- **API 문서 (ReDoc):** http://localhost:8000/redoc
- **헬스 체크:** http://localhost:8000/health

### 7.3 테스트 결과

#### 서버 상태 확인
```json
GET http://localhost:8000/
Response: {
  "message": "OrderBean API Server",
  "status": "running",
  "version": "1.0.0",
  "docs": "/docs"
}
```

#### 헬스 체크
```json
GET http://localhost:8000/health
Response: {
  "status": "healthy",
  "service": "OrderBean API"
}
```

#### 메뉴 목록 조회
```json
GET http://localhost:8000/api/menus
Response: [
  {
    "id": "uuid",
    "name": "에티오피아 예가체프",
    "description": "과일향이 풍부한 커피",
    "price": 15000.0,
    "image_url": "https://example.com/ethiopia.jpg",
    "created_at": "2024-12-18T...",
    "updated_at": "2024-12-18T..."
  },
  ...
]
```

---

## 8. 문제 해결 과정

### 8.1 서버 실행 에러

**문제:**
```
python -m uvicornapp.main:app–reload
ModuleNotFoundError: No module named 'uvicornapp'
```

**원인:**
- 잘못된 명령어 형식 (`uvicornapp`는 존재하지 않는 모듈)
- 옵션 구분자 오류 (`–reload` 대신 `--reload` 사용 필요)

**해결:**
- 올바른 명령어: `uvicorn main:app --reload`
- 또는: `python -m uvicorn main:app --reload`

### 8.2 가상 환경 활성화 에러 (Git Bash)

**문제:**
```bash
$ venv\Scripts\Activate.ps1
bash: venvScriptsActivate.ps1: command not found
```

**원인:**
- Git Bash에서는 PowerShell 스크립트(.ps1) 실행 불가
- Windows 경로 구분자(`\`) 사용

**해결:**
- Git Bash: `source venv/Scripts/activate`
- PowerShell: `venv\Scripts\Activate.ps1`
- CMD: `venv\Scripts\activate.bat`

### 8.3 프론트엔드 빌드 에러

**문제:**
```
shared/utils/logger.ts:18:28: ERROR: Expected "(" but found "!=="
const isDev = typeof import !== 'undefined' && import.meta.env?.DEV;
```

**원인:**
- `import`는 예약어이므로 `typeof import`는 문법 오류
- esbuild 파서가 파싱 실패

**해결:**
```typescript
// 수정 전
const isDev = typeof import !== 'undefined' && import.meta.env?.DEV;

// 수정 후
const isDev = typeof import.meta !== 'undefined' && import.meta.env?.DEV;
```

### 8.4 데이터베이스 연결 에러

**문제:**
```
psycopg2.OperationalError: connection to server at "localhost" (::1), port 5432 failed: Connection refused
```

**원인:**
- PostgreSQL 서버가 실행되지 않음

**해결:**
- PostgreSQL 서비스 시작 필요
- Windows 서비스 관리자에서 PostgreSQL 서비스 시작
- 또는 `START_POSTGRESQL.md` 가이드 참고

---

## 9. 생성된 문서

### 9.1 개발 가이드 문서

1. **README.md** - 프로젝트 개요 및 기본 사용법
2. **DATABASE_SETUP.md** - 데이터베이스 설정 가이드
3. **RUN_SERVER.md** - 서버 실행 가이드 및 문제 해결
4. **ACTIVATE_VENV.md** - 가상 환경 활성화 가이드 (터미널별)
5. **START_POSTGRESQL.md** - PostgreSQL 서버 시작 가이드

### 9.2 PRD 문서

- **docs/Backend_PRD.md** - 백엔드 개발 상세 요구사항 문서
  - 데이터 모델 정의
  - API 설계
  - 사용자 흐름
  - 비즈니스 로직

---

## 10. 현재 상태

### 10.1 완료된 작업

✅ FastAPI 프로젝트 구조 생성  
✅ 가상 환경 설정 및 패키지 설치  
✅ 데이터베이스 연결 설정 (PostgreSQL)  
✅ SQLAlchemy ORM 모델 생성  
✅ API 라우터 구현 (메뉴, 주문, 관리자)  
✅ 서비스 레이어 구현 (비즈니스 로직)  
✅ 리포지토리 레이어 구현 (데이터 접근)  
✅ Pydantic 스키마 정의  
✅ 서버 실행 및 테스트  
✅ 에러 해결 및 문서화  

### 10.2 진행 중인 작업

🔄 PostgreSQL 서버 연결 테스트  
🔄 데이터베이스 초기화 및 샘플 데이터 삽입  

### 10.3 향후 작업

⏳ 실제 데이터베이스 연동 (현재는 메모리 기반 임시 저장소)  
⏳ 인증/인가 구현 (JWT)  
⏳ 단위 테스트 및 통합 테스트 작성  
⏳ API 문서 보완  
⏳ 에러 핸들링 고도화  
⏳ 로깅 시스템 구현  

---

## 11. 다음 단계

### 11.1 즉시 수행 가능한 작업

1. **PostgreSQL 서버 시작**
   - Windows 서비스 관리자에서 PostgreSQL 서비스 시작
   - 또는 `START_POSTGRESQL.md` 가이드 참고

2. **데이터베이스 초기화**
   ```bash
   python init_db.py
   ```

3. **데이터베이스 연결 테스트**
   ```bash
   python test_db_connection.py
   ```

### 11.2 단기 작업

1. **리포지토리 레이어를 실제 데이터베이스로 전환**
   - 현재 메모리 기반 임시 저장소를 SQLAlchemy 세션으로 교체

2. **API 엔드포인트 테스트**
   - Postman 또는 Swagger UI를 통한 API 테스트

3. **에러 핸들링 개선**
   - 커스텀 예외 클래스 생성
   - 에러 응답 형식 표준화

### 11.3 중기 작업

1. **인증/인가 구현**
   - JWT 토큰 기반 인증
   - 역할 기반 접근 제어 (RBAC)

2. **테스트 코드 작성**
   - 단위 테스트 (Service, Repository)
   - 통합 테스트 (API 엔드포인트)

3. **로깅 시스템**
   - 구조화된 로깅
   - 로그 레벨 관리

---

## 12. 참고 자료

### 12.1 프로젝트 문서
- [Backend PRD](./docs/Backend_PRD.md)
- [PRD Up1](./docs/PRD_Up1.md)

### 12.2 외부 문서
- [FastAPI 공식 문서](https://fastapi.tiangolo.com/)
- [SQLAlchemy 문서](https://docs.sqlalchemy.org/)
- [Pydantic 문서](https://docs.pydantic.dev/)

---

## 13. 결론

OrderBean 백엔드 개발 환경이 성공적으로 구축되었습니다. FastAPI 기반의 RESTful API 서버가 정상적으로 실행되며, PostgreSQL 데이터베이스 연동 준비가 완료되었습니다.

계층형 아키텍처를 통해 코드의 유지보수성과 확장성을 확보했으며, 개발 가이드 문서를 통해 팀원들이 쉽게 개발 환경을 구축할 수 있도록 정리했습니다.

다음 단계로는 실제 데이터베이스 연동 및 비즈니스 로직 구현을 진행할 예정입니다.

---

**작성자:** Backend Development Team  
**최종 업데이트:** 2024-12-18

