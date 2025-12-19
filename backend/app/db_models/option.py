"""
옵션 SQLAlchemy 모델
"""
from sqlalchemy import Column, String, Numeric, ForeignKey, DateTime
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
from datetime import datetime
import uuid
from app.core.database import Base


class Option(Base):
    """옵션 테이블 모델"""
    __tablename__ = "options"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    menu_id = Column(UUID(as_uuid=True), ForeignKey("menus.id", ondelete="CASCADE"), nullable=False)
    name = Column(String(100), nullable=False)
    price = Column(Numeric(10, 2), nullable=False, default=0)
    created_at = Column(DateTime, nullable=False, default=datetime.utcnow)
    updated_at = Column(DateTime, nullable=False, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # 관계
    menu = relationship("Menu", back_populates="options")
    order_items = relationship("OrderItem", back_populates="option")

