"""
관리자 관련 API 라우터
"""
from fastapi import APIRouter, HTTPException
from typing import List
from app.schemas.order import OrderResponse, OrderStatusUpdate
from app.services.order_service import OrderService

router = APIRouter()
order_service = OrderService()


@router.get("/orders", response_model=List[OrderResponse])
async def get_all_orders(status: str = None):
    """
    관리자 주문 목록 조회
    
    - 모든 주문 정보를 조회
    - **status**: 주문 상태 필터 (선택적)
    """
    try:
        orders = await order_service.get_all_orders(status=status)
        return orders
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"주문 목록 조회 중 오류 발생: {str(e)}")


@router.patch("/orders/{order_id}/status", response_model=OrderResponse)
async def update_order_status(order_id: str, status_update: OrderStatusUpdate):
    """
    주문 상태 변경 (관리자)
    
    - **order_id**: 주문 ID
    - **status**: 변경할 상태 ('주문접수', '제조중', '완료', '취소')
    - 상태 변경 규칙: '주문접수' → '제조중' → '완료'
    """
    try:
        order = await order_service.update_order_status(order_id, status_update.status)
        if not order:
            raise HTTPException(status_code=404, detail="주문을 찾을 수 없습니다")
        return order
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"주문 상태 변경 중 오류 발생: {str(e)}")

