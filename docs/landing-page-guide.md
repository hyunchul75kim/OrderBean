# 랜딩 페이지 실행 가이드

OrderBean 랜딩 페이지를 실행하는 방법을 안내합니다.

---

## 빠른 시작

### 방법 1: 루트 디렉토리에서 실행 (권장)

프로젝트 루트 디렉토리에서 다음 명령어를 실행합니다:

```bash
npm run dev:frontend
```

### 방법 2: Frontend 디렉토리에서 직접 실행

```bash
cd frontend
npm run dev
```

---

## 실행 확인

명령어 실행 후 터미널에 다음과 같은 메시지가 표시됩니다:

```
  VITE v5.x.x  ready in xxx ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
  ➜  press h + enter to show help
```

---

## 브라우저에서 접속

터미널에 표시된 URL로 접속합니다:

**http://localhost:5173**

또는 브라우저 주소창에 직접 입력:

```
http://localhost:5173
```

---

## 랜딩 페이지 구성

랜딩 페이지에는 다음 섹션이 포함되어 있습니다:

1. **Hero 섹션**: 브랜드 소개 및 CTA 버튼
2. **문제 제시 섹션**: 사용자의 고민 3가지
3. **해결책 섹션**: OrderBean의 3가지 특징
4. **사용 방법 섹션**: 3단계 프로세스
5. **최종 CTA 섹션**: 설문 시작 유도

---

## 서버 중지

서버를 중지하려면 터미널에서 `Ctrl + C`를 누르세요.

---

## 포트 변경

기본 포트(5173)가 사용 중인 경우, `frontend/vite.config.ts` 파일에서 포트를 변경할 수 있습니다:

```typescript
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5174, // 원하는 포트 번호로 변경
    // ...
  },
});
```

---

## 백엔드 서버와 함께 실행

랜딩 페이지가 API를 호출하려면 백엔드 서버도 함께 실행해야 합니다:

**터미널 1 - Backend:**
```bash
npm run dev:backend
# 또는
cd backend
npm run dev
```

**터미널 2 - Frontend:**
```bash
npm run dev:frontend
# 또는
cd frontend
npm run dev
```

---

## 문제 해결

### 포트가 이미 사용 중인 경우

다른 프로세스가 포트 5173을 사용 중일 수 있습니다. 다음 방법을 시도해보세요:

1. **포트를 사용하는 프로세스 확인:**
   ```bash
   # Windows
   netstat -ano | findstr :5173
   ```

2. **해당 프로세스 종료** 또는 **포트 변경**

### 서버가 시작되지 않는 경우

1. **의존성 설치 확인:**
   ```bash
   cd frontend
   npm install
   ```

2. **Node.js 버전 확인:**
   ```bash
   node --version
   # v18.0.0 이상이어야 합니다
   ```

3. **에러 메시지 확인:**
   - 터미널에 표시된 에러 메시지를 확인하고 해결하세요

---

## 추가 정보

- [전체 설치 가이드](./installation.md)
- [아키텍처 문서](./architecture.md)
- [README.md](../README.md)

