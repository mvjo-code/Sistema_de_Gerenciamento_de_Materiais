from fastapi import FastAPI
import models
from database import engine
from fastapi.middleware.cors import CORSMiddleware
import logging
from routes import router # Importando o arquivo de rotas

# Configuração de Logs Estruturados
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("vlab-api")

# Cria o arquivo do banco e a tabela (se não exisitir)
models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="API do V-Lab")

# gerenciamento básico de acesso á api
origins = [
    "http://localhost:5173", # Para testes locais 
    "https://seu-front-vlab.vercel.app", # URL do deploy
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins, 
    allow_methods=["GET", "POST", "PUT", "DELETE"], # Mais seguro especificar os métodos
    allow_headers=["*"],
)

# item bônus de observalidade
@app.get("/health", tags=["Sistema"])
def health_check():
    return {"status": "ok", "message": "API está online e operante"}

app.include_router(router)

@app.get("/")
def raiz():
    return {"status": "running successful"}

