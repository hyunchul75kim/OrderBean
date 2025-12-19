"""
메뉴 관련 API 라우터
"""
from fastapi import APIRouter, HTTPException
from typing import List
from app.schemas.menu import Menu, MenuCreate, MenuResponse
from app.services.menu_service import MenuService

router = APIRouter()
menu_service = MenuService()


@router.get("/", response_model=List[MenuResponse])
async def get_menus(include_stock: bool = False):
    """
    메뉴 목록 조회
    
    - **include_stock**: 재고 수량 포함 여부 (관리자용, 기본값: False)
    """
    try:
        menus = await menu_service.get_all_menus(include_stock=include_stock)
        return menus
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"메뉴 조회 중 오류 발생: {str(e)}")


@router.get("/{menu_id}", response_model=MenuResponse)
async def get_menu(menu_id: str, include_stock: bool = False):
    """
    메뉴 상세 조회
    
    - **menu_id**: 메뉴 ID
    - **include_stock**: 재고 수량 포함 여부 (관리자용)
    """
    try:
        menu = await menu_service.get_menu_by_id(menu_id, include_stock=include_stock)
        if not menu:
            raise HTTPException(status_code=404, detail="메뉴를 찾을 수 없습니다")
        return menu
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"메뉴 조회 중 오류 발생: {str(e)}")

