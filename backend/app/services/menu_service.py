"""
메뉴 서비스
"""
from typing import List, Optional
from uuid import UUID
from app.schemas.menu import MenuResponse
from app.repositories.menu_repository import MenuRepository


class MenuService:
    """메뉴 비즈니스 로직 처리"""
    
    def __init__(self):
        self.repository = MenuRepository()
    
    async def get_all_menus(self, include_stock: bool = False) -> List[MenuResponse]:
        """
        모든 메뉴 조회
        
        Args:
            include_stock: 재고 수량 포함 여부 (관리자용)
        
        Returns:
            메뉴 목록
        """
        menus = await self.repository.get_all()
        
        # 재고 수량 포함 여부에 따라 응답 구성
        result = []
        for menu in menus:
            menu_dict = {
                "id": menu.id,
                "name": menu.name,
                "description": menu.description,
                "price": menu.price,
                "image_url": menu.image_url,
                "created_at": menu.created_at,
                "updated_at": menu.updated_at
            }
            if include_stock:
                menu_dict["stock_quantity"] = menu.stock_quantity
            result.append(MenuResponse(**menu_dict))
        
        return result
    
    async def get_menu_by_id(self, menu_id: UUID, include_stock: bool = False) -> Optional[MenuResponse]:
        """
        메뉴 ID로 조회
        
        Args:
            menu_id: 메뉴 ID
            include_stock: 재고 수량 포함 여부
        
        Returns:
            메뉴 정보 또는 None
        """
        menu = await self.repository.get_by_id(menu_id)
        if not menu:
            return None
        
        menu_dict = {
            "id": menu.id,
            "name": menu.name,
            "description": menu.description,
            "price": menu.price,
            "image_url": menu.image_url,
            "created_at": menu.created_at,
            "updated_at": menu.updated_at
        }
        if include_stock:
            menu_dict["stock_quantity"] = menu.stock_quantity
        
        return MenuResponse(**menu_dict)

