"""
애플리케이션 설정
"""
from pydantic_settings import BaseSettings
from typing import Optional


class Settings(BaseSettings):
    """애플리케이션 설정"""
    
    # 데이터베이스 설정
    DB_HOST: str = "localhost"
    DB_PORT: int = 5432
    DB_NAME: str = "orderbean_db"
    DB_USER: str = "postgres"
    DB_PASSWORD: str = "postgresql"
    
    # 서버 설정
    HOST: str = "0.0.0.0"
    PORT: int = 8000
    
    # 환경 설정
    ENVIRONMENT: str = "development"
    
    @property
    def database_url(self) -> str:
        """데이터베이스 연결 URL 생성"""
        return f"postgresql://{self.DB_USER}:{self.DB_PASSWORD}@{self.DB_HOST}:{self.DB_PORT}/{self.DB_NAME}"
    
    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"
        case_sensitive = True
        extra = "ignore"  # .env 파일의 추가 필드 무시


# 전역 설정 인스턴스
settings = Settings()

