from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base, sessionmaker

URL_DO_BANCO = "sqlite:///./banco_documentos.db"

# O 'motor' que faz a ponte entre o Python e o arquivo SQLite
engine = create_engine(
    URL_DO_BANCO, connect_args={"check_same_thread": False}
)

# A sessão é como se fosse a "conversa" aberta com o banco
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# A base usada para criar as tabelas
Base = declarative_base()