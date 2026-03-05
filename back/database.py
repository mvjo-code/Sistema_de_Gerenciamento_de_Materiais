from sqlalchemy import create_engine  
from sqlalchemy.orm import declarative_base, sessionmaker

URL_DO_BANCO = "sqlite:///./banco_documentos.db" # localização do banco

# Criando o tradutor de pythonn para sql
engine = create_engine(
    URL_DO_BANCO, connect_args={"check_same_thread": False}
)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine) # A comunicação com o banco

Base = declarative_base()  #A base usada para criar as tabelas