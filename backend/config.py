import os


class DevelopmentConfig:
    SQLALCHEMY_DATABASE_URI = os.getenv("DATABASE_URI", "sqlite:///dev.db")
    ALLOWED_ORIGINS = ["http://localhost:8080", "http://127.0.0.1:8080"]
    DEBUG = True


class ProductionConfig:
    SQLALCHEMY_DATABASE_URI = os.getenv("DATABASE_URI", "sqlite:///prod.db")
    ALLOWED_ORIGINS = ["https://react-frontend-hl44.onrender.com"]
    DEBUG = False


class TestingConfig:
    TESTING = True
    SQLALCHEMY_DATABASE_URI = 'sqlite:///:memory:'
    ALLOWED_ORIGINS = ["*"]
    DEBUG = False


config_by_profile_name = dict(
    development=DevelopmentConfig,
    production=ProductionConfig,
    testing=TestingConfig
)
