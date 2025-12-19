"""
데이터베이스 초기화 스크립트
"""
import sys
from sqlalchemy import create_engine, text
from app.core.config import settings
from app.core.database import Base, engine, init_db, check_db_connection
from app.db_models import Menu, Option, Order, OrderItem
from datetime import datetime
import uuid


def create_database():
    """데이터베이스가 없으면 생성"""
    # postgres 데이터베이스에 연결 (기본 데이터베이스)
    admin_url = f"postgresql://{settings.DB_USER}:{settings.DB_PASSWORD}@{settings.DB_HOST}:{settings.DB_PORT}/postgres"
    admin_engine = create_engine(admin_url, isolation_level="AUTOCOMMIT")
    
    try:
        with admin_engine.connect() as conn:
            # 데이터베이스 존재 여부 확인
            result = conn.execute(
                text(f"SELECT 1 FROM pg_database WHERE datname = '{settings.DB_NAME}'")
            )
            exists = result.fetchone()
            
            if not exists:
                # 데이터베이스 생성
                conn.execute(text(f'CREATE DATABASE "{settings.DB_NAME}"'))
                print(f"데이터베이스 '{settings.DB_NAME}' 생성 완료")
            else:
                print(f"데이터베이스 '{settings.DB_NAME}' 이미 존재합니다")
    except Exception as e:
        print(f"데이터베이스 생성 중 오류 발생: {e}")
        sys.exit(1)
    finally:
        admin_engine.dispose()


def init_tables():
    """테이블 생성"""
    try:
        print("테이블 생성 중...")
        init_db()
        print("테이블 생성 완료")
    except Exception as e:
        print(f"테이블 생성 중 오류 발생: {e}")
        sys.exit(1)


def seed_sample_data():
    """샘플 데이터 삽입"""
    from sqlalchemy.orm import Session
    from app.core.database import SessionLocal
    
    db: Session = SessionLocal()
    
    try:
        # 기존 데이터 확인
        existing_menus = db.query(Menu).count()
        if existing_menus > 0:
            print("샘플 데이터가 이미 존재합니다. 건너뜁니다.")
            return
        
        print("샘플 데이터 삽입 중...")
        
        # 메뉴 데이터
        menus_data = [
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
        
        menus = []
        for menu_data in menus_data:
            menu = Menu(**menu_data)
            menus.append(menu)
            db.add(menu)
        
        db.commit()
        
        # 옵션 데이터 (각 메뉴에 기본 옵션 추가)
        for menu in menus:
            options_data = [
                {"name": "원두", "price": 0.0},
                {"name": "분쇄(에스프레소)", "price": 0.0},
                {"name": "분쇄(드립)", "price": 0.0}
            ]
            
            for opt_data in options_data:
                option = Option(menu_id=menu.id, **opt_data)
                db.add(option)
        
        db.commit()
        print("샘플 데이터 삽입 완료")
        
    except Exception as e:
        db.rollback()
        print(f"샘플 데이터 삽입 중 오류 발생: {e}")
        sys.exit(1)
    finally:
        db.close()


def main():
    """메인 함수"""
    print("=" * 50)
    print("데이터베이스 초기화 시작")
    print("=" * 50)
    
    # 1. 데이터베이스 연결 확인
    print("\n1. 데이터베이스 연결 확인 중...")
    if not check_db_connection():
        print("데이터베이스가 존재하지 않습니다. 생성 중...")
        create_database()
    
    # 2. 테이블 생성
    print("\n2. 테이블 생성 중...")
    init_tables()
    
    # 3. 샘플 데이터 삽입
    print("\n3. 샘플 데이터 삽입 중...")
    seed_sample_data()
    
    print("\n" + "=" * 50)
    print("데이터베이스 초기화 완료!")
    print("=" * 50)


if __name__ == "__main__":
    main()

