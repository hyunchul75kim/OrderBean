"""
OrderBean FastAPI 백엔드 서버
"""
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import menus, orders, admin

# FastAPI 앱 생성
app = FastAPI(
    title="OrderBean API",
    description="OrderBean 커피 주문 시스템 백엔드 API",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc"
)

# CORS 설정
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # 개발 환경: 모든 origin 허용 (프로덕션에서는 특정 origin만 허용)
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 라우터 등록
app.include_router(menus.router, prefix="/api/menus", tags=["menus"])
app.include_router(orders.router, prefix="/api/orders", tags=["orders"])
app.include_router(admin.router, prefix="/api/admin", tags=["admin"])


@app.get("/")
async def root():
    """루트 엔드포인트 - 서버 상태 확인"""
    return {
        "message": "OrderBean API Server",
        "status": "running",
        "version": "1.0.0",
        "docs": "/docs"
    }


@app.get("/health")
async def health_check():
    """헬스 체크 엔드포인트"""
    return {
        "status": "healthy",
        "service": "OrderBean API"
    }


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=8000,
        reload=True  # 개발 모드: 코드 변경 시 자동 재시작
    )

