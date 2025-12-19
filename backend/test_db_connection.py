"""
데이터베이스 연결 테스트 스크립트
"""
from app.core.database import check_db_connection, engine
from app.core.config import settings
from sqlalchemy import text


def test_connection():
    """데이터베이스 연결 테스트"""
    print("=" * 50)
    print("데이터베이스 연결 테스트")
    print("=" * 50)
    print(f"\n연결 정보:")
    print(f"  호스트: {settings.DB_HOST}")
    print(f"  포트: {settings.DB_PORT}")
    print(f"  데이터베이스: {settings.DB_NAME}")
    print(f"  사용자: {settings.DB_USER}")
    print(f"\n연결 URL: {settings.database_url.replace(settings.DB_PASSWORD, '***')}")
    
    print("\n연결 시도 중...")
    if check_db_connection():
        print("[OK] 데이터베이스 연결 성공!")
        
        # 간단한 쿼리 테스트
        try:
            with engine.connect() as conn:
                result = conn.execute(text("SELECT version()"))
                version = result.fetchone()[0]
                print(f"\nPostgreSQL 버전: {version}")
                
                # 테이블 목록 확인
                result = conn.execute(text("""
                    SELECT table_name 
                    FROM information_schema.tables 
                    WHERE table_schema = 'public'
                    ORDER BY table_name
                """))
                tables = [row[0] for row in result]
                
                if tables:
                    print(f"\n생성된 테이블 ({len(tables)}개):")
                    for table in tables:
                        print(f"  - {table}")
                else:
                    print("\n생성된 테이블이 없습니다. init_db.py를 실행하세요.")
        except Exception as e:
            print(f"\n쿼리 실행 중 오류: {e}")
    else:
        print("[FAIL] 데이터베이스 연결 실패!")
        print("\n확인 사항:")
        print("  1. PostgreSQL 서버가 실행 중인지 확인")
        print("  2. 데이터베이스 설정이 올바른지 확인 (.env 파일)")
        print("  3. 데이터베이스가 존재하는지 확인 (없으면 init_db.py 실행)")


if __name__ == "__main__":
    test_connection()

