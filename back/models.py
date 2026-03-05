from sqlalchemy import Column, Integer, String
from database import Base

# Essa classe cria a tabela real dentro do SQLite
class MaterialDB(Base):
    __tablename__ = "materiais"

    # Criando as colunas da tabela:
    id = Column(Integer, primary_key=True, index=True, autoincrement=True) 
    titulo = Column(String, index=True, nullable=False)
    tipo = Column(String, nullable=False)
    link = Column(String, nullable=False)
    descricao = Column(String, default="Descrição não disponível")
    
    # não é a melhor estratégia, mas por conta do tempo vou salvar as tags
    # como um texto. Uma complexidade muitos-para-muitos iria custar muito tempo
    # desnecessário no momento, então opitei pela separação por vírgulas, funcionará normalmente
    # e depois a modelagem poderá ser atualizada

    tags = Column(String)