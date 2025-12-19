# 서버 실행 가이드

## 에러 원인 분석

터미널에서 발생한 에러:
```
python -m uvicornapp.main:app–reload
ModuleNotFoundError: No module named 'uvicornapp'
```

### 문제점:
1. **잘못된 명령어 형식**: `uvicornapp.main:app–reload`는 올바르지 않은 형식입니다.
2. **모듈 이름 오류**: `uvicornapp`는 존재하지 않는 모듈입니다.
3. **옵션 구분자 오류**: `–reload` 대신 `--reload` (하이픈 2개)를 사용해야 합니다.

## 올바른 서버 실행 방법

### 방법 1: uvicorn 명령어 사용 (권장)

```bash
# 가상 환경 활성화
cd backend
venv\Scripts\Activate.ps1

# 서버 실행
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

### 방법 2: python -m uvicorn 사용

```bash
# 가상 환경 활성화
cd backend
venv\Scripts\Activate.ps1

# 서버 실행
python -m uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

### 방법 3: main.py 직접 실행

```bash
# 가상 환경 활성화
cd backend
venv\Scripts\Activate.ps1

# 서버 실행
python main.py
```

## 명령어 설명

- `main:app`: `main.py` 파일의 `app` 객체를 의미
- `--reload`: 개발 모드 (코드 변경 시 자동 재시작)
- `--host 0.0.0.0`: 모든 네트워크 인터페이스에서 접근 가능
- `--port 8000`: 포트 번호

## 서버 접속 확인

서버가 실행되면 다음 URL에서 접속할 수 있습니다:

- **API 서버**: http://localhost:8000
- **API 문서 (Swagger)**: http://localhost:8000/docs
- **API 문서 (ReDoc)**: http://localhost:8000/redoc
- **헬스 체크**: http://localhost:8000/health

## 주의사항

1. **가상 환경 활성화 필수**: 서버 실행 전에 반드시 가상 환경을 활성화해야 합니다.
2. **포트 충돌**: 8000 포트가 이미 사용 중이면 다른 포트를 사용하세요:
   ```bash
   uvicorn main:app --reload --port 8001
   ```
3. **작업 디렉토리**: `backend` 폴더에서 명령어를 실행해야 합니다.

## 문제 해결

### ModuleNotFoundError 발생 시

```bash
# 가상 환경이 활성화되었는지 확인
which python  # 또는 where python (Windows)

# 가상 환경 재활성화
venv\Scripts\Activate.ps1

# 필요한 패키지 재설치
pip install -r requirements.txt
```

### 포트가 이미 사용 중인 경우

```bash
# 다른 포트 사용
uvicorn main:app --reload --port 8001

# 또는 기존 프로세스 종료
# Windows에서 포트 사용 중인 프로세스 찾기
netstat -ano | findstr :8000
# PID 확인 후 종료
taskkill /PID <PID번호> /F
```

