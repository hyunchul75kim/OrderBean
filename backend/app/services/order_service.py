"""
주문 서비스
"""
from typing import List, Optional
from uuid import UUID
from datetime import datetime
from app.schemas.order import OrderCreate, OrderResponse, OrderItemResponse
from app.repositories.order_repository import OrderRepository
from app.repositories.menu_repository import MenuRepository
from app.repositories.option_repository import OptionRepository


class OrderService:
    """주문 비즈니스 로직 처리"""
    
    def __init__(self):
        self.order_repo = OrderRepository()
        self.menu_repo = MenuRepository()
        self.option_repo = OptionRepository()
    
    async def create_order(self, order_data: OrderCreate) -> OrderResponse:
        """
        주문 생성
        
        Args:
            order_data: 주문 생성 데이터
        
        Returns:
            생성된 주문 정보
        
        Raises:
            ValueError: 재고 부족 또는 잘못된 데이터
        """
        # 1. 메뉴 및 옵션 존재 여부 확인 및 재고 확인
        order_items_data = []
        total_amount = 0.0
        
        for item in order_data.items:
            # 메뉴 조회
            menu = await self.menu_repo.get_by_id(item.menu_id)
            if not menu:
                raise ValueError(f"메뉴를 찾을 수 없습니다: {item.menu_id}")
            
            # 재고 확인
            if menu.stock_quantity < item.quantity:
                raise ValueError(
                    f"재고가 부족합니다. 메뉴: {menu.name}, "
                    f"요청 수량: {item.quantity}, 재고: {menu.stock_quantity}"
                )
            
            # 옵션 조회 (제공된 경우)
            option = None
            option_price = 0.0
            if item.option_id:
                option = await self.option_repo.get_by_id(item.option_id)
                if not option:
                    raise ValueError(f"옵션을 찾을 수 없습니다: {item.option_id}")
                if option.menu_id != item.menu_id:
                    raise ValueError("옵션이 해당 메뉴에 속하지 않습니다")
                option_price = option.price
            
            # 가격 계산
            unit_price = menu.price + option_price
            subtotal = unit_price * item.quantity
            total_amount += subtotal
            
            order_items_data.append({
                "menu": menu,
                "option": option,
                "quantity": item.quantity,
                "unit_price": unit_price,
                "subtotal": subtotal
            })
        
        # 2. 주문 번호 생성
        order_number = await self._generate_order_number()
        
        # 3. 주문 생성 및 재고 차감 (트랜잭션)
        order = await self.order_repo.create_order_with_items(
            order_number=order_number,
            total_amount=total_amount,
            order_items_data=order_items_data
        )
        
        # 4. 응답 구성
        order_items_response = []
        for item_data, order_item in zip(order_items_data, order.items):
            order_items_response.append(OrderItemResponse(
                id=order_item.id,
                menu_id=item_data["menu"].id,
                menu_name=item_data["menu"].name,
                option_id=item_data["option"].id if item_data["option"] else None,
                option_name=item_data["option"].name if item_data["option"] else None,
                quantity=item_data["quantity"],
                unit_price=item_data["unit_price"],
                subtotal=item_data["subtotal"]
            ))
        
        return OrderResponse(
            id=order.id,
            order_number=order.order_number,
            order_date=order.order_date,
            status=order.status,
            total_amount=order.total_amount,
            items=order_items_response,
            created_at=order.created_at,
            updated_at=order.updated_at
        )
    
    async def get_order_by_id(self, order_id: UUID) -> Optional[OrderResponse]:
        """
        주문 ID로 조회
        
        Args:
            order_id: 주문 ID
        
        Returns:
            주문 정보 또는 None
        """
        order = await self.order_repo.get_by_id_with_items(order_id)
        if not order:
            return None
        
        # 주문 항목 응답 구성
        order_items_response = []
        for item in order.items:
            menu = await self.menu_repo.get_by_id(item.menu_id)
            option = None
            if item.option_id:
                option = await self.option_repo.get_by_id(item.option_id)
            
            order_items_response.append(OrderItemResponse(
                id=item.id,
                menu_id=item.menu_id,
                menu_name=menu.name if menu else "알 수 없음",
                option_id=item.option_id,
                option_name=option.name if option else None,
                quantity=item.quantity,
                unit_price=item.unit_price,
                subtotal=item.subtotal
            ))
        
        return OrderResponse(
            id=order.id,
            order_number=order.order_number,
            order_date=order.order_date,
            status=order.status,
            total_amount=order.total_amount,
            items=order_items_response,
            created_at=order.created_at,
            updated_at=order.updated_at
        )
    
    async def get_all_orders(self, status: Optional[str] = None) -> List[OrderResponse]:
        """
        모든 주문 조회 (관리자용)
        
        Args:
            status: 주문 상태 필터 (선택적)
        
        Returns:
            주문 목록
        """
        orders = await self.order_repo.get_all_with_items(status=status)
        
        result = []
        for order in orders:
            # 주문 항목 응답 구성
            order_items_response = []
            for item in order.items:
                menu = await self.menu_repo.get_by_id(item.menu_id)
                option = None
                if item.option_id:
                    option = await self.option_repo.get_by_id(item.option_id)
                
                order_items_response.append(OrderItemResponse(
                    id=item.id,
                    menu_id=item.menu_id,
                    menu_name=menu.name if menu else "알 수 없음",
                    option_id=item.option_id,
                    option_name=option.name if option else None,
                    quantity=item.quantity,
                    unit_price=item.unit_price,
                    subtotal=item.subtotal
                ))
            
            result.append(OrderResponse(
                id=order.id,
                order_number=order.order_number,
                order_date=order.order_date,
                status=order.status,
                total_amount=order.total_amount,
                items=order_items_response,
                created_at=order.created_at,
                updated_at=order.updated_at
            ))
        
        return result
    
    async def update_order_status(self, order_id: UUID, new_status: str) -> Optional[OrderResponse]:
        """
        주문 상태 변경
        
        Args:
            order_id: 주문 ID
            new_status: 새로운 상태
        
        Returns:
            업데이트된 주문 정보 또는 None
        
        Raises:
            ValueError: 잘못된 상태 변경
        """
        # 상태 변경 규칙 검증
        valid_statuses = ["주문접수", "제조중", "완료", "취소"]
        if new_status not in valid_statuses:
            raise ValueError(f"유효하지 않은 상태입니다: {new_status}")
        
        order = await self.order_repo.get_by_id(order_id)
        if not order:
            return None
        
        # 상태 변경 규칙 검증
        status_transitions = {
            "주문접수": ["제조중", "취소"],
            "제조중": ["완료", "취소"],
            "완료": [],
            "취소": []
        }
        
        if new_status not in status_transitions.get(order.status, []):
            raise ValueError(
                f"'{order.status}' 상태에서 '{new_status}' 상태로 변경할 수 없습니다"
            )
        
        # 상태 업데이트
        updated_order = await self.order_repo.update_status(order_id, new_status)
        
        # 응답 구성
        order_items_response = []
        for item in updated_order.items:
            menu = await self.menu_repo.get_by_id(item.menu_id)
            option = None
            if item.option_id:
                option = await self.option_repo.get_by_id(item.option_id)
            
            order_items_response.append(OrderItemResponse(
                id=item.id,
                menu_id=item.menu_id,
                menu_name=menu.name if menu else "알 수 없음",
                option_id=item.option_id,
                option_name=option.name if option else None,
                quantity=item.quantity,
                unit_price=item.unit_price,
                subtotal=item.subtotal
            ))
        
        return OrderResponse(
            id=updated_order.id,
            order_number=updated_order.order_number,
            order_date=updated_order.order_date,
            status=updated_order.status,
            total_amount=updated_order.total_amount,
            items=order_items_response,
            created_at=updated_order.created_at,
            updated_at=updated_order.updated_at
        )
    
    async def _generate_order_number(self) -> str:
        """
        주문 번호 생성
        
        형식: ORD-YYYYMMDD-XXX
        
        Returns:
            주문 번호
        """
        today = datetime.now().strftime("%Y%m%d")
        last_order = await self.order_repo.get_last_order_by_date(today)
        
        if last_order:
            # 마지막 주문 번호에서 일련번호 추출
            last_number = int(last_order.order_number.split("-")[-1])
            sequence = last_number + 1
        else:
            sequence = 1
        
        return f"ORD-{today}-{sequence:03d}"

