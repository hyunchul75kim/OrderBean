# PyCharm에서 랜딩 페이지 실행 가이드

PyCharm에서 OrderBean 랜딩 페이지(Frontend)를 실행하는 방법을 안내합니다.

---

## 목차

1. [프로젝트 열기](#프로젝트-열기)
2. [Node.js 설정 확인](#nodejs-설정-확인)
3. [의존성 설치](#의존성-설치)
4. [실행 설정 구성](#실행-설정-구성)
5. [랜딩 페이지 실행](#랜딩-페이지-실행)
6. [문제 해결](#문제-해결)

---

## 프로젝트 열기

1. **PyCharm 실행**
2. **File → Open** 메뉴 선택
3. `OrderBean` 프로젝트 루트 디렉토리 선택
4. **OK** 클릭

---

## Node.js 설정 확인

PyCharm에서 Node.js가 인식되는지 확인합니다.

### Node.js 인터프리터 설정

1. **File → Settings** (또는 `Ctrl + Alt + S`)
2. **Languages & Frameworks → Node.js** 선택
3. **Node interpreter**에서 Node.js 경로 확인
   - 자동으로 감지되지 않으면 **...** 버튼을 클릭하여 수동으로 설정
   - 일반 경로: `C:\Program Files\nodejs\node.exe` 또는 설치된 경로
4. **Package manager**에서 `npm` 선택
5. **Apply** → **OK** 클릭

---

## 의존성 설치

### 방법 1: PyCharm 터미널 사용

1. **View → Tool Windows → Terminal** (또는 `Alt + F12`)
2. 터미널에서 다음 명령어 실행:

```bash
# 루트 디렉토리에서
npm install

# 또는 frontend 디렉토리로 이동 후
cd frontend
npm install
```

### 방법 2: npm 스크립트 실행

1. **package.json** 파일 열기 (`frontend/package.json`)
2. 파일을 우클릭하고 **Show npm Scripts** 선택
3. 또는 **View → Tool Windows → npm** 선택
4. `install` 스크립트를 더블클릭하여 실행

---

## 실행 설정 구성

### 방법 1: npm 스크립트로 실행 (가장 간단)

1. **frontend/package.json** 파일 열기
2. **package.json** 파일을 우클릭
3. **Show npm Scripts** 선택
4. `dev` 스크립트를 더블클릭하여 실행

### 방법 2: Run Configuration 생성 (권장)

1. **Run → Edit Configurations...** 선택
2. 왼쪽 상단의 **+** 버튼 클릭
3. **npm** 선택
4. 설정 입력:
   - **Name**: `Frontend Dev Server`
   - **package.json**: `frontend/package.json` 선택
   - **Command**: `run`
   - **Scripts**: `dev`
   - **Node interpreter**: 자동 감지된 Node.js 경로
5. **Apply** → **OK** 클릭

### 방법 3: Node.js 실행 설정

1. **Run → Edit Configurations...** 선택
2. 왼쪽 상단의 **+** 버튼 클릭
3. **Node.js** 선택
4. 설정 입력:
   - **Name**: `Frontend Dev Server`
   - **Node interpreter**: Node.js 경로
   - **Node parameters**: (비워둠)
   - **Working directory**: `$ProjectFileDir$/frontend`
   - **JavaScript file**: `node_modules/vite/bin/vite.js`
   - **Application parameters**: (비워둠)
5. **Apply** → **OK** 클릭

---

## 랜딩 페이지 실행

### 방법 1: npm 스크립트 실행

1. **View → Tool Windows → npm** 선택
2. `frontend` 패키지의 `dev` 스크립트를 더블클릭
3. 또는 상단 툴바의 실행 버튼 클릭

### 방법 2: Run Configuration 실행

1. 상단 툴바의 실행 설정 드롭다운에서 **Frontend Dev Server** 선택
2. 실행 버튼(▶️) 클릭 또는 `Shift + F10`

### 방법 3: 터미널에서 직접 실행

1. **View → Tool Windows → Terminal** (또는 `Alt + F12`)
2. 다음 명령어 실행:

```bash
cd frontend
npm run dev
```

---

## 실행 확인

실행이 성공하면:

1. **Run** 창 또는 **Terminal** 창에 다음과 같은 메시지가 표시됩니다:
   ```
   VITE v5.x.x  ready in xxx ms
   
   ➜  Local:   http://localhost:5173/
   ➜  Network: use --host to expose
   ```

2. 브라우저에서 **http://localhost:5173** 접속

3. PyCharm의 내장 브라우저를 사용하려면:
   - 메시지에 표시된 URL을 클릭하거나
   - **Run** 창에서 URL을 Ctrl + 클릭

---

## 서버 중지

서버를 중지하려면:

- **Run** 창에서 중지 버튼(⏹️) 클릭
- 또는 `Ctrl + F2` 단축키 사용

---

## 문제 해결

### Node.js가 인식되지 않는 경우

1. **File → Settings → Languages & Frameworks → Node.js**
2. **Node interpreter**에서 **...** 버튼 클릭
3. Node.js 설치 경로를 수동으로 지정
   - 일반 경로: `C:\Program Files\nodejs\node.exe`
   - 또는 `C:\Users\[사용자명]\AppData\Roaming\npm\node.exe`

### npm 스크립트가 보이지 않는 경우

1. **package.json** 파일을 열어두기
2. **View → Tool Windows → npm** 선택
3. 프로젝트를 다시 로드: **File → Invalidate Caches / Restart**

### 포트가 이미 사용 중인 경우

1. **Run** 창에서 에러 메시지 확인
2. 포트를 사용하는 프로세스 종료:
   - Windows: `netstat -ano | findstr :5173` 후 `taskkill /PID [PID] /F`
3. 또는 `frontend/vite.config.ts`에서 포트 변경:
   ```typescript
   server: {
     port: 5174, // 다른 포트로 변경
   }
   ```

### 의존성이 설치되지 않은 경우

1. **Terminal** 창에서:
   ```bash
   cd frontend
   npm install
   ```
2. 또는 **npm** 창에서 `install` 스크립트 실행

### 실행 설정이 저장되지 않는 경우

1. **Run → Edit Configurations...**
2. 설정을 다시 확인하고 **Apply** 클릭
3. 프로젝트를 다시 로드

---

## 추가 팁

### 자동 실행 설정

프로젝트를 열 때 자동으로 실행하려면:

1. **Run → Edit Configurations...**
2. 실행 설정 선택
3. **Before launch** 섹션에서 **+** 버튼 클릭
4. **Run npm script** 선택
5. `install` 스크립트 추가 (선택사항)

### 디버깅 모드 실행

디버깅을 위해 실행하려면:

1. 실행 설정에서 **Debug** 모드 선택
2. 또는 `Shift + F9` 단축키 사용
3. 브레이크포인트를 설정하여 코드 디버깅 가능

### 여러 서버 동시 실행

백엔드와 프론트엔드를 동시에 실행하려면:

1. **Run → Edit Configurations...**
2. **Compound** 설정 생성
3. **Frontend Dev Server**와 **Backend Dev Server** 추가
4. 한 번에 두 서버 모두 실행 가능

---

## 참고 자료

- [전체 설치 가이드](./installation.md)
- [랜딩 페이지 가이드](./landing-page-guide.md)
- [아키텍처 문서](./architecture.md)

