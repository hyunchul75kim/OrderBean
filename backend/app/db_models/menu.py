"""
메뉴 SQLAlchemy 모델
"""
from sqlalchemy import Column, String, Text, Numeric, Integer, DateTime
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
from datetime import datetime
import uuid
from app.core.database import Base


class Menu(Base):
    """메뉴 테이블 모델"""
    __tablename__ = "menus"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name = Column(String(100), nullable=False)
    description = Column(Text, nullable=True)
    price = Column(Numeric(10, 2), nullable=False)
    image_url = Column(String(500), nullable=True)
    stock_quantity = Column(Integer, nullable=False, default=0)
    created_at = Column(DateTime, nullable=False, default=datetime.utcnow)
    updated_at = Column(DateTime, nullable=False, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # 관계
    options = relationship("Option", back_populates="menu", cascade="all, delete-orphan")
    order_items = relationship("OrderItem", back_populates="menu")

