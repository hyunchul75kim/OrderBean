"""
메뉴 데이터 모델
"""
from dataclasses import dataclass
from uuid import UUID
from datetime import datetime


@dataclass
class Menu:
    """메뉴 모델"""
    id: UUID
    name: str
    description: str | None
    price: float
    image_url: str | None
    stock_quantity: int
    created_at: datetime
    updated_at: datetime

