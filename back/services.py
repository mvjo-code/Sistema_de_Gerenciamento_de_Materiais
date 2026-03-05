import os
import json
import google.generativeai as genai
from dotenv import load_dotenv

load_dotenv()

# Configuração segura da chave 
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

class AIService:
    def __init__(self):
        # Instrução de Sistema para garantir o comportamento e formato
        self.model = genai.GenerativeModel(
            model_name='gemini-2.5-flash',
            generation_config={"response_mime_type": "application/json"},
            system_instruction=(
                "Você é um Assistente Pedagógico de uma biblioteca de materiais. "
                "Sua tarefa é, epenas, gerar descrições úteis e 3 tags recomendadas para materiais didáticos. "
                "não exagere no tamanho da descrição, deve ser um resumo útil"
                "não seja redundate dizendo link para, apenas dica o conteúdo"
                "Responda estritamente no formato JSON: "
                '{"descricao": "texto aqui", "tags": ["tag1", "tag2", "tag3"]}'
            )
        )

    async def gerar_sugestao(self, titulo: str, tipo: str):
        prompt = f"Título do material: {titulo}. Tipo de recurso: {tipo}."
        
        try:
            
            response = self.model.generate_content(prompt)
            return json.loads(response.text)
        except Exception as e:
            # Tratamento de erro básico
            return {"erro": "Falha ao consultar a IA", "detalhes": str(e)}