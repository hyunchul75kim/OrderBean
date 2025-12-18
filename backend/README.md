# OrderBean Backend (FastAPI)

OrderBean 커피 주문 시스템의 FastAPI 기반 백엔드 서버입니다.

## 기술 스택

- **프레임워크:** FastAPI
- **언어:** Python 3.11+
- **서버:** Uvicorn
- **데이터 검증:** Pydantic
- **데이터베이스:** PostgreSQL (향후 구현)

## 설치 및 실행

### 1. 가상 환경 생성 및 활성화

```bash
# Windows
python -m venv venv
venv\Scripts\activate

# macOS/Linux
python3 -m venv venv
source venv/bin/activate
```

### 2. 의존성 설치

```bash
pip install -r requirements.txt
```

### 3. 서버 실행

```bash
# 개발 모드 (자동 재시작)
python main.py

# 또는 uvicorn 직접 실행
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

### 4. 서버 접속 확인

서버가 실행되면 다음 URL에서 접속할 수 있습니다:

- **API 서버:** http://localhost:8000
- **API 문서 (Swagger):** http://localhost:8000/docs
- **API 문서 (ReDoc):** http://localhost:8000/redoc
- **헬스 체크:** http://localhost:8000/health

## API 엔드포인트

### 메뉴
- `GET /api/menus` - 메뉴 목록 조회
- `GET /api/menus/{menu_id}` - 메뉴 상세 조회

### 주문
- `POST /api/orders` - 주문 생성
- `GET /api/orders/{order_id}` - 주문 조회

### 관리자
- `GET /api/admin/orders` - 주문 목록 조회 (관리자)
- `PATCH /api/admin/orders/{order_id}/status` - 주문 상태 변경

## 프로젝트 구조

```
backend/
├── main.py                 # FastAPI 앱 진입점
├── requirements.txt        # Python 패키지 의존성
├── app/
│   ├── routers/           # API 라우터
│   │   ├── menus.py
│   │   ├── orders.py
│   │   └── admin.py
│   ├── schemas/           # Pydantic 스키마
│   │   ├── menu.py
│   │   └── order.py
│   ├── services/          # 비즈니스 로직
│   │   ├── menu_service.py
│   │   └── order_service.py
│   ├── repositories/      # 데이터 접근 레이어
│   │   ├── menu_repository.py
│   │   ├── option_repository.py
│   │   └── order_repository.py
│   └── models/           # 데이터 모델
│       ├── menu.py
│       ├── option.py
│       ├── order.py
│       └── order_item.py
```

## 개발 모드

개발 모드에서는 코드 변경 시 자동으로 서버가 재시작됩니다.

## 테스트

```bash
# 테스트 실행
pytest

# 커버리지 포함
pytest --cov=app
```

## 참고

현재는 메모리 기반 임시 저장소를 사용하고 있습니다. 향후 PostgreSQL 데이터베이스를 연동할 예정입니다.

