from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
import models, schemas, services, time, logging
from database import SessionLocal

# Configuração de Logs para Observabilidade
logger = logging.getLogger("vlab-api")
router = APIRouter(prefix="/materials", tags=["Materiais"])
ai_service = services.AIService()


# Dependência do Banco
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# recebe o tipo e o título e retorna as sugestões
@router.get("/suggest", tags=["IA"])
async def sugerir_conteudo(titulo: str, tipo: str):
    if not titulo or not tipo:
        raise HTTPException(status_code=400, detail="Título e Tipo são obrigatórios.")
    
    inicio = time.time() # Início da contagem de tempo
    sujestao = await ai_service.gerar_sugestao(titulo, tipo)
    latencia = round(time.time() - inicio, 2)
    
    if "erro" in sujestao:
        logger.error(f"Erro na IA: {sujestao['detalhes']}")
        raise HTTPException(status_code=500, detail=sujestao["detalhes"])
    
    # Log Estruturado exigido
    logger.info(f"[INFO] AI Request: Title='{titulo}', Latency={latencia}s")
    
    return sujestao


# health check
@router.get("/health", tags=["Sistema"])
def health_check():
    """Retorna o status da API para monitoramento."""
    return {"status": "ok", "message": "API está online e operante"}


#listagem com paginação
@router.get("/")
def listar_materiais(skip: int = 0, limit: int = 10, busca: str = None, db: Session = Depends(get_db)):
    """Retorna a lista de materiais com suporte a paginação e busca por tags."""
    query = db.query(models.MaterialDB)
    
    # Se o usuário digitou algo na busca, filtramos as tags (ignorando maiúsculas/minúsculas com ilike)
    if busca:
        query = query.filter(models.MaterialDB.tags.ilike(f"%{busca}%"))
        
    materiais = query.offset(skip).limit(limit).all()
    return materiais


# update
@router.put("/{id}")
def editar_material(id: int, material_atualizado: schemas.MaterialCriar, db: Session = Depends(get_db)):
    """Edita um material existente."""
    db_material = db.query(models.MaterialDB).filter(models.MaterialDB.id == id).first()
    
    if not db_material:
        raise HTTPException(status_code=404, detail="Material não encontrado")

    # Atualizando os campos
    db_material.titulo = material_atualizado.titulo
    db_material.tipo = material_atualizado.tipo
    db_material.link = material_atualizado.link
    db_material.descricao = material_atualizado.descricao
    db_material.tags = ", ".join(material_atualizado.tags)

    db.commit()
    db.refresh(db_material)
    return db_material



# delete
@router.delete("/{id}")
def deletar_material(id: int, db: Session = Depends(get_db)):
    """Remove um material do banco."""
    db_material = db.query(models.MaterialDB).filter(models.MaterialDB.id == id).first()
    
    if not db_material:
        raise HTTPException(status_code=404, detail="Material não encontrado")

    db.delete(db_material)
    db.commit()
    return {"mensagem": f"Material {id} excluído com sucesso"}



# Rota pedindo conexão com banco
@router.post("/")
def cadastrar_material(material: schemas.MaterialCriar, db: Session = Depends(get_db)):
    
    #separando as tags do texto
    tags_em_texto = ", ".join(material.tags)

    #transformando dados
    novo_material = models.MaterialDB(
        titulo=material.titulo,
        tipo=material.tipo,
        descricao=material.descricao,
        link=material.link,
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
