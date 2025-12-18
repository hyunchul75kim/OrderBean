"""
옵션 리포지토리 (임시 메모리 구현)
"""
from typing import List, Optional
from uuid import UUID, uuid4
from datetime import datetime
from app.models.option import Option


class OptionRepository:
    """옵션 데이터 접근 레이어"""
    
    def __init__(self):
        # 임시 메모리 저장소
        self._options: List[Option] = []
        self._initialize_sample_data()
    
    def _initialize_sample_data(self):
        """샘플 데이터 초기화"""
        # 실제로는 메뉴 ID를 동적으로 가져와야 하지만, 여기서는 샘플로 처리
        pass
    
    async def get_by_id(self, option_id: UUID) -> Optional[Option]:
        """옵션 ID로 조회"""
        for option in self._options:
            if option.id == option_id:
                return option
        return None
    
    async def get_by_menu_id(self, menu_id: UUID) -> List[Option]:
        """메뉴 ID로 옵션 목록 조회"""
        return [opt for opt in self._options if opt.menu_id == menu_id]

