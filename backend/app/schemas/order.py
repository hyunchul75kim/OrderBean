"""
주문 관련 Pydantic 스키마
"""
from pydantic import BaseModel, Field
from typing import List, Optional
from datetime import datetime
from uuid import UUID


class OrderItemCreate(BaseModel):
    """주문 항목 생성 스키마"""
    menu_id: UUID = Field(..., description="메뉴 ID")
    option_id: Optional[UUID] = Field(None, description="옵션 ID")
    quantity: int = Field(..., gt=0, description="수량")


class OrderCreate(BaseModel):
    """주문 생성 스키마"""
    items: List[OrderItemCreate] = Field(..., min_items=1, description="주문 항목 목록")


class OrderItemResponse(BaseModel):
    """주문 항목 응답 스키마"""
    id: UUID
    menu_id: UUID
    menu_name: str
    option_id: Optional[UUID]
    option_name: Optional[str]
    quantity: int
    unit_price: float
    subtotal: float

    class Config:
        from_attributes = True


class OrderResponse(BaseModel):
    """주문 응답 스키마"""
    id: UUID
    order_number: str
    order_date: datetime
    status: str
    total_amount: float
    items: List[OrderItemResponse]
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True


class OrderStatusUpdate(BaseModel):
    """주문 상태 업데이트 스키마"""
    status: str = Field(..., description="주문 상태 ('주문접수', '제조중', '완료', '취소')")

