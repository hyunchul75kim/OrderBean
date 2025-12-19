# PostgreSQL 서버 시작 가이드

## PostgreSQL 서버 시작 방법

### 방법 1: Windows 서비스 관리자 사용

1. `Win + R` 키를 눌러 실행 창 열기
2. `services.msc` 입력 후 Enter
3. "PostgreSQL" 또는 "postgresql"로 시작하는 서비스 찾기
4. 서비스를 우클릭하고 "시작" 선택

### 방법 2: PowerShell에서 서비스 시작

```powershell
# 모든 PostgreSQL 관련 서비스 확인
Get-Service | Where-Object {$_.DisplayName -like "*PostgreSQL*"}

# 서비스 시작 (서비스 이름은 실제 설치된 버전에 따라 다름)
# 예시:
Start-Service postgresql-x64-15
# 또는
Start-Service postgresql-x64-16
```

### 방법 3: PostgreSQL 설치 경로에서 직접 시작

PostgreSQL이 다른 경로에 설치되어 있는 경우:

```powershell
# PostgreSQL bin 폴더로 이동 (경로는 실제 설치 위치에 맞게 수정)
cd "C:\PostgreSQL\XX\bin"  # XX는 버전 번호

# 데이터 디렉토리로 이동하여 서버 시작
pg_ctl -D "C:\PostgreSQL\XX\data" start
```

### 방법 4: pgAdmin 사용

pgAdmin이 설치되어 있다면:
1. pgAdmin 실행
2. 서버가 자동으로 시작되는지 확인
3. 또는 서버를 수동으로 시작

## 서버 실행 확인

PostgreSQL 서버가 실행 중인지 확인:

```powershell
# 포트 5432가 사용 중인지 확인
netstat -an | findstr "5432"

# 또는 psql로 연결 테스트
psql -U postgres -h localhost
```

## 다음 단계

PostgreSQL 서버가 실행되면:

```bash
cd backend
venv\Scripts\Activate.ps1
python init_db.py
```

## 문제 해결

### 포트가 이미 사용 중인 경우

다른 애플리케이션이 5432 포트를 사용하고 있을 수 있습니다. `.env` 파일에서 다른 포트를 사용하도록 설정할 수 있습니다:

```env
DB_PORT=5433  # 다른 포트 사용
```

### 권한 문제

관리자 권한이 필요할 수 있습니다. PowerShell을 관리자 권한으로 실행하세요.

