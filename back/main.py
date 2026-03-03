from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session
from schemas import MaterialCriar
import models
from database import engine, SessionLocal
from fastapi.middleware.cors import CORSMiddleware

# Cria o arquivo do banco e as tabelas (se não existirem)
models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="API do V-Lab")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_methods=["*"],
    allow_headers=["*"],
)

# 1. Função que abre a "porta" do cofre e fecha quando terminamos de usar
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.get("/")
def raiz():
    return {"status": "running successful"}

# 2. Nossa rota agora pede a conexão com o banco (db) como dependência
@app.post("/materials/")
def cadastrar_material(material: MaterialCriar, db: Session = Depends(get_db)):
    
    #separando as tags do texto
    tags_em_texto = ", ".join(material.tags)

    #transformando dados
    novo_material = models.MaterialDB(
        titulo=material.titulo,
        tipo=material.tipo,
        descricao=material.descricao,
        tags=tags_em_texto
    )

    # salvando no disco
    db.add(novo_material) 
    db.commit()           
    db.refresh(novo_material) # Atualiza a variável com o ID que o banco gerou

    # Devolvendo mensagem de sucesso
    return {
        "mensagem": f"Material '{novo_material.titulo}' salvo com sucesso no banco!",
        "id_gerado": novo_material.id
    }

# Rota para BUSCAR todos os materiais cadastrados no banco
@app.get("/materials/")
def listar_materiais(db: Session = Depends(get_db)):
    materiais = db.query(models.MaterialDB).all()
    return materiais