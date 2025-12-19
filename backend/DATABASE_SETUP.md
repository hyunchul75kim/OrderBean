# 데이터베이스 설정 가이드

## 1. PostgreSQL 서버 시작

PostgreSQL 서버가 실행 중인지 확인하고 시작하세요.

### Windows에서 PostgreSQL 서비스 확인 및 시작

```powershell
# 서비스 확인
Get-Service -Name postgresql*

# 서비스 시작 (서비스 이름은 설치 버전에 따라 다를 수 있음)
Start-Service postgresql-x64-XX  # XX는 버전 번호
```

또는 Windows 서비스 관리자에서 "PostgreSQL" 서비스를 시작하세요.

### PostgreSQL이 설치된 경로에서 직접 시작

```powershell
# PostgreSQL 설치 경로로 이동 (일반적으로)
cd "C:\Program Files\PostgreSQL\XX\bin"

# 서버 시작
pg_ctl -D "C:\Program Files\PostgreSQL\XX\data" start
```

## 2. 데이터베이스 초기화

PostgreSQL 서버가 실행 중이면 다음 명령어로 데이터베이스를 초기화하세요:

```bash
# 가상 환경 활성화
venv\Scripts\Activate.ps1

# 데이터베이스 초기화 (데이터베이스 생성, 테이블 생성, 샘플 데이터 삽입)
python init_db.py
```

## 3. 데이터베이스 연결 테스트

```bash
python test_db_connection.py
```

## 4. 설정 확인

`.env` 파일이 `backend` 폴더에 있고 다음 내용이 포함되어 있는지 확인하세요:

```env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=orderbean_db
DB_USER=postgres
DB_PASSWORD=postgresql
```

## 문제 해결

### 연결 실패 시 확인 사항

1. **PostgreSQL 서버가 실행 중인가?**
   - Windows 서비스 관리자에서 확인
   - 또는 `psql -U postgres` 명령어로 연결 테스트

2. **포트가 올바른가?**
   - 기본 포트는 5432
   - 다른 포트를 사용하는 경우 `.env` 파일 수정

3. **사용자 이름과 비밀번호가 올바른가?**
   - `.env` 파일의 `DB_USER`와 `DB_PASSWORD` 확인
   - `psql -U postgres`로 직접 연결 테스트

4. **방화벽 설정**
   - PostgreSQL 포트(5432)가 차단되지 않았는지 확인

### 데이터베이스가 이미 존재하는 경우

`init_db.py`는 데이터베이스가 없으면 자동으로 생성합니다. 이미 존재하는 경우에도 테이블은 정상적으로 생성됩니다.

