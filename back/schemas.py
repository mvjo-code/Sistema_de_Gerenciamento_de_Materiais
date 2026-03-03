from pydantic import BaseModel
from typing import List, Optional

class MaterialCriar(BaseModel):
    titulo: str
    tipo: str
    descricao: str
    tags: list[str]