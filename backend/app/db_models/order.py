"""
주문 SQLAlchemy 모델
"""
from sqlalchemy import Column, String, DateTime, Numeric, CheckConstraint
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
from datetime import datetime
import uuid
from app.core.database import Base


class Order(Base):
    """주문 테이블 모델"""
    __tablename__ = "orders"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    order_number = Column(String(50), unique=True, nullable=False, index=True)
    order_date = Column(DateTime, nullable=False, default=datetime.utcnow)
    status = Column(
        String(20),
        nullable=False,
        default="주문접수",
        index=True
    )
    total_amount = Column(Numeric(10, 2), nullable=False)
    created_at = Column(DateTime, nullable=False, default=datetime.utcnow)
    updated_at = Column(DateTime, nullable=False, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # 제약조건
    __table_args__ = (
        CheckConstraint(
            "status IN ('주문접수', '제조중', '완료', '취소')",
            name="check_order_status"
        ),
    )
    
    # 관계
    items = relationship("OrderItem", back_populates="order", cascade="all, delete-orphan")

