"""
메뉴 리포지토리 (임시 메모리 구현)
"""
from typing import List, Optional
from uuid import UUID, uuid4
from datetime import datetime
from app.models.menu import Menu


class MenuRepository:
    """메뉴 데이터 접근 레이어"""
    
    def __init__(self):
        # 임시 메모리 저장소 (실제로는 데이터베이스 사용)
        self._menus: List[Menu] = []
        self._initialize_sample_data()
    
    def _initialize_sample_data(self):
        """샘플 데이터 초기화"""
        sample_menus = [
            {
                "name": "에티오피아 예가체프",
                "description": "과일향이 풍부한 커피",
                "price": 15000.0,
                "image_url": "https://example.com/ethiopia.jpg",
                "stock_quantity": 100
            },
            {
                "name": "콜롬비아 수프리모",
                "description": "균형잡힌 맛의 커피",
                "price": 18000.0,
                "image_url": "https://example.com/colombia.jpg",
                "stock_quantity": 50
            },
            {
                "name": "케냐 AA",
                "description": "산미가 강한 커피",
                "price": 20000.0,
                "image_url": "https://example.com/kenya.jpg",
                "stock_quantity": 30
            }
        ]
        
        for menu_data in sample_menus:
            menu = Menu(
                id=uuid4(),
                **menu_data,
                created_at=datetime.now(),
                updated_at=datetime.now()
            )
            self._menus.append(menu)
    
    async def get_all(self) -> List[Menu]:
        """모든 메뉴 조회"""
        return self._menus.copy()
    
    async def get_by_id(self, menu_id: UUID) -> Optional[Menu]:
        """메뉴 ID로 조회"""
        for menu in self._menus:
            if menu.id == menu_id:
                return menu
        return None
    
    async def update_stock(self, menu_id: UUID, quantity: int) -> bool:
        """
        재고 수량 업데이트
        
        Args:
            menu_id: 메뉴 ID
            quantity: 차감할 수량 (음수면 차감, 양수면 증가)
        
        Returns:
            성공 여부
        """
        menu = await self.get_by_id(menu_id)
        if not menu:
            return False
        
        new_stock = menu.stock_quantity - quantity
        if new_stock < 0:
            return False
        
        menu.stock_quantity = new_stock
        menu.updated_at = datetime.now()
        return True

