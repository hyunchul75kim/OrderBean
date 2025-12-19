"""
주문 데이터 모델
"""
from dataclasses import dataclass, field
from uuid import UUID
from datetime import datetime
from typing import List
from app.models.order_item import OrderItem


@dataclass
class Order:
    """주문 모델"""
    id: UUID
    order_number: str
    order_date: datetime
    status: str
    total_amount: float
    created_at: datetime
    updated_at: datetime
    items: List['OrderItem'] = field(default_factory=list)

