"""
주문 항목 SQLAlchemy 모델
"""
from sqlalchemy import Column, Integer, Numeric, ForeignKey, DateTime, CheckConstraint
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
from datetime import datetime
import uuid
from app.core.database import Base


class OrderItem(Base):
    """주문 항목 테이블 모델"""
    __tablename__ = "order_items"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    order_id = Column(UUID(as_uuid=True), ForeignKey("orders.id", ondelete="CASCADE"), nullable=False, index=True)
    menu_id = Column(UUID(as_uuid=True), ForeignKey("menus.id"), nullable=False, index=True)
    option_id = Column(UUID(as_uuid=True), ForeignKey("options.id", ondelete="SET NULL"), nullable=True)
    quantity = Column(Integer, nullable=False)
    unit_price = Column(Numeric(10, 2), nullable=False)
    subtotal = Column(Numeric(10, 2), nullable=False)
    created_at = Column(DateTime, nullable=False, default=datetime.utcnow)
    
    # 제약조건
    __table_args__ = (
        CheckConstraint("quantity > 0", name="check_quantity_positive"),
        CheckConstraint("unit_price >= 0", name="check_unit_price_non_negative"),
        CheckConstraint("subtotal >= 0", name="check_subtotal_non_negative"),
    )
    
    # 관계
    order = relationship("Order", back_populates="items")
    menu = relationship("Menu", back_populates="order_items")
    option = relationship("Option", back_populates="order_items")

