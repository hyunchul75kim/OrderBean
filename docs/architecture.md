# OrderBean 아키텍처 문서

## 개요

OrderBean은 개인 맞춤 커피 추천 웹서비스로, 프론트엔드, 관리자 대시보드, 백엔드 API로 구성됩니다.

## 시스템 아키텍처

### 계층 구조

```
┌─────────────────┐
│   Frontend       │  (React + TypeScript + Vite)
│   (고객용)       │
└────────┬─────────┘
         │
         │ HTTP/REST API
         │
┌────────▼─────────┐
│   Backend API    │  (Node.js + Express + TypeScript)
│                  │
│  ┌────────────┐  │
│  │ Controller │  │
│  └─────┬──────┘  │
│        │         │
│  ┌─────▼──────┐  │
│  │  Service   │  │
│  └─────┬──────┘  │
│        │         │
│  ┌─────▼──────┐  │
│  │ Repository │  │
│  └─────┬──────┘  │
└────────┼─────────┘
         │
┌────────▼─────────┐
│   Database       │  (PostgreSQL / SQLite)
└──────────────────┘
```

## 주요 컴포넌트

### Frontend
- React 기반 SPA
- 설문, 추천 결과, 주문 기능 제공
- 반응형 디자인

### Admin Dashboard
- 관리자 전용 대시보드
- 상품 관리, 추천 로직 설정, 통계 확인

### Backend API
- RESTful API 서버
- 계층형 아키텍처 (Controller → Service → Repository)
- 모듈화된 추천 엔진

## 데이터 흐름

1. 사용자가 설문 완료
2. Frontend → Backend API (POST /api/survey)
3. Backend에서 추천 로직 실행
4. Backend → Frontend (추천 결과 반환)
5. 사용자가 주문 선택
6. Frontend → Backend API (POST /api/orders)
7. 주문 생성 및 주문 번호 반환

## 보안

- HTTPS 사용
- 비밀번호 단방향 해시
- 관리자 권한 기반 접근 제어
- 입력 데이터 검증

