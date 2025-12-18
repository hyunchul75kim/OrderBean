"""
주문 항목 데이터 모델
"""
from dataclasses import dataclass
from uuid import UUID
from datetime import datetime


@dataclass
class OrderItem:
    """주문 항목 모델"""
    id: UUID
    order_id: UUID
    menu_id: UUID
    option_id: UUID | None
    quantity: int
    unit_price: float
    subtotal: float
    created_at: datetime

