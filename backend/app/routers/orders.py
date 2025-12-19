"""
주문 관련 API 라우터
"""
from fastapi import APIRouter, HTTPException
from typing import List
from app.schemas.order import OrderCreate, OrderResponse, OrderItemCreate
from app.services.order_service import OrderService

router = APIRouter()
order_service = OrderService()


@router.post("/", response_model=OrderResponse, status_code=201)
async def create_order(order_data: OrderCreate):
    """
    주문 생성
    
    - 주문 정보를 데이터베이스에 저장
    - 주문에 따라 메뉴의 재고 수량 자동 차감
    """
    try:
        order = await order_service.create_order(order_data)
        return order
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"주문 생성 중 오류 발생: {str(e)}")


@router.get("/{order_id}", response_model=OrderResponse)
async def get_order(order_id: str):
    """
    주문 조회
    
    - **order_id**: 주문 ID
    - 주문 ID를 전달하면 해당 주문 정보를 반환
    """
    try:
        order = await order_service.get_order_by_id(order_id)
        if not order:
            raise HTTPException(status_code=404, detail="주문을 찾을 수 없습니다")
        return order
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"주문 조회 중 오류 발생: {str(e)}")

