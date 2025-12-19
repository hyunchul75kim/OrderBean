"""
주문 리포지토리 (임시 메모리 구현)
"""
from typing import List, Optional, Dict
from uuid import UUID, uuid4
from datetime import datetime
from app.models.order import Order, OrderItem
from app.models.menu import Menu
from app.models.option import Option


class OrderRepository:
    """주문 데이터 접근 레이어"""
    
    def __init__(self):
        # 임시 메모리 저장소
        self._orders: List[Order] = []
        self._order_items: List[OrderItem] = []
    
    async def create_order_with_items(
        self,
        order_number: str,
        total_amount: float,
        order_items_data: List[Dict]
    ) -> Order:
        """
        주문 및 주문 항목 생성 (트랜잭션)
        
        Args:
            order_number: 주문 번호
            total_amount: 주문 총액
            order_items_data: 주문 항목 데이터 리스트
        
        Returns:
            생성된 주문
        """
        # 주문 생성
        order = Order(
            id=uuid4(),
            order_number=order_number,
            order_date=datetime.now(),
            status="주문접수",
            total_amount=total_amount,
            created_at=datetime.now(),
            updated_at=datetime.now()
        )
        self._orders.append(order)
        
        # 주문 항목 생성 및 재고 차감
        for item_data in order_items_data:
            menu: Menu = item_data["menu"]
            option: Optional[Option] = item_data.get("option")
            
            order_item = OrderItem(
                id=uuid4(),
                order_id=order.id,
                menu_id=menu.id,
                option_id=option.id if option else None,
                quantity=item_data["quantity"],
                unit_price=item_data["unit_price"],
                subtotal=item_data["subtotal"],
                created_at=datetime.now()
            )
            self._order_items.append(order_item)
            
            # 재고 차감
            menu.stock_quantity -= item_data["quantity"]
            menu.updated_at = datetime.now()
        
        return order
    
    async def get_by_id(self, order_id: UUID) -> Optional[Order]:
        """주문 ID로 조회"""
        for order in self._orders:
            if order.id == order_id:
                return order
        return None
    
    async def get_by_id_with_items(self, order_id: UUID) -> Optional[Order]:
        """주문 ID로 조회 (주문 항목 포함)"""
        order = await self.get_by_id(order_id)
        if not order:
            return None
        
        # 주문 항목 추가
        order.items = [item for item in self._order_items if item.order_id == order_id]
        return order
    
    async def get_all_with_items(self, status: Optional[str] = None) -> List[Order]:
        """모든 주문 조회 (주문 항목 포함)"""
        orders = self._orders.copy()
        
        if status:
            orders = [o for o in orders if o.status == status]
        
        # 주문 항목 추가
        for order in orders:
            order.items = [item for item in self._order_items if item.order_id == order.id]
        
        return orders
    
    async def update_status(self, order_id: UUID, new_status: str) -> Optional[Order]:
        """주문 상태 업데이트"""
        order = await self.get_by_id(order_id)
        if not order:
            return None
        
        order.status = new_status
        order.updated_at = datetime.now()
        return order
    
    async def get_last_order_by_date(self, date_str: str) -> Optional[Order]:
        """특정 날짜의 마지막 주문 조회 (주문 번호 생성용)"""
        prefix = f"ORD-{date_str}-"
        matching_orders = [
            o for o in self._orders
            if o.order_number.startswith(prefix)
        ]
        
        if not matching_orders:
            return None
        
        # 주문 번호의 일련번호로 정렬
        matching_orders.sort(
            key=lambda x: int(x.order_number.split("-")[-1]),
            reverse=True
        )
        
        return matching_orders[0]

