"""
옵션 데이터 모델
"""
from dataclasses import dataclass
from uuid import UUID
from datetime import datetime


@dataclass
class Option:
    """옵션 모델"""
    id: UUID
    menu_id: UUID
    name: str
    price: float
    created_at: datetime
    updated_at: datetime

