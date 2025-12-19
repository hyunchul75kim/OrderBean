# 가상 환경 활성화 가이드

## 에러 원인 분석

Git Bash에서 발생한 에러:
```bash
$ venv\Scripts\Activate.ps1
bash: venvScriptsActivate.ps1: command not found
```

### 문제점:
1. **PowerShell 스크립트 실행 불가**: Git Bash에서는 `.ps1` (PowerShell 스크립트) 파일을 직접 실행할 수 없습니다.
2. **경로 구분자 문제**: Git Bash에서는 Windows 경로 구분자(`\`) 대신 슬래시(`/`)를 사용해야 합니다.
3. **터미널 종류별 다른 스크립트**: 각 터미널 종류에 맞는 활성화 스크립트를 사용해야 합니다.

## 해결 방법

### Git Bash (MINGW64)에서 사용

```bash
# 방법 1: activate 스크립트 사용 (권장)
source venv/Scripts/activate

# 방법 2: activate.bat 사용
source venv/Scripts/activate.bat
```

### PowerShell에서 사용

```powershell
# PowerShell 스크립트 사용
venv\Scripts\Activate.ps1

# 또는 배치 파일 사용
venv\Scripts\activate.bat
```

### CMD (명령 프롬프트)에서 사용

```cmd
venv\Scripts\activate.bat
```

### Windows Terminal에서 사용

```powershell
# PowerShell 프로필 사용 시
venv\Scripts\Activate.ps1

# CMD 프로필 사용 시
venv\Scripts\activate.bat
```

## 가상 환경 활성화 확인

활성화가 성공하면 프롬프트 앞에 `(venv)`가 표시됩니다:

```bash
# 활성화 전
$ 

# 활성화 후
(venv) $ 
```

## 가상 환경 비활성화

```bash
deactivate
```

## 전체 워크플로우 예시 (Git Bash)

```bash
# 1. backend 폴더로 이동
cd backend

# 2. 가상 환경 활성화
source venv/Scripts/activate

# 3. 활성화 확인 (프롬프트에 (venv) 표시됨)
# (venv) $ 

# 4. 서버 실행
python main.py
# 또는
uvicorn main:app --reload

# 5. 작업 완료 후 비활성화
deactivate
```

## 문제 해결

### "command not found" 에러 발생 시

1. **경로 확인**: `backend` 폴더에 있는지 확인
   ```bash
   pwd  # 현재 경로 확인
   ls venv/Scripts/  # Scripts 폴더 내용 확인
   ```

2. **스크립트 파일 존재 확인**:
   ```bash
   ls -la venv/Scripts/activate*
   ```

3. **실행 권한 확인** (필요한 경우):
   ```bash
   chmod +x venv/Scripts/activate
   ```

### 가상 환경이 생성되지 않은 경우

```bash
# Python 3 사용
python3 -m venv venv

# 또는 Python 사용
python -m venv venv
```

## 각 터미널별 요약

| 터미널 | 명령어 |
|--------|--------|
| Git Bash | `source venv/Scripts/activate` |
| PowerShell | `venv\Scripts\Activate.ps1` |
| CMD | `venv\Scripts\activate.bat` |
| Linux/Mac | `source venv/bin/activate` |

