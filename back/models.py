from sqlalchemy import Column, Integer, String
from database import Base

# Essa classe cria a tabela real dentro do SQLite
class MaterialDB(Base):
    __tablename__ = "materiais"

    # Criando as colunas da nossa tabela:
    id = Column(Integer, primary_key=True, index=True) # O identificador único
    titulo = Column(String, index=True)
    tipo = Column(String)
    descricao = Column(String)
    
    # não é a melhor estratégia, mas por causa do tempo vou salvar as tags
    # como um texto, separando-as por vírgula
    tags = Column(String)