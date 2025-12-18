"""
메뉴 관련 Pydantic 스키마
"""
from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime
from uuid import UUID


class MenuBase(BaseModel):
    """메뉴 기본 스키마"""
    name: str = Field(..., min_length=1, max_length=100, description="커피 이름")
    description: Optional[str] = Field(None, description="커피 설명")
    price: float = Field(..., ge=0, description="가격")
    image_url: Optional[str] = Field(None, max_length=500, description="이미지 URL")


class MenuCreate(MenuBase):
    """메뉴 생성 스키마"""
    stock_quantity: int = Field(..., ge=0, description="재고 수량")


class Menu(MenuBase):
    """메뉴 스키마"""
    id: UUID
    stock_quantity: int
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True


class MenuResponse(BaseModel):
    """메뉴 응답 스키마 (재고 수량 선택적 포함)"""
    id: UUID
    name: str
    description: Optional[str]
    price: float
    image_url: Optional[str]
    stock_quantity: Optional[int] = None  # 관리자만 볼 수 있음
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True

