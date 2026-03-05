# 📚 V-Lab: Hub Inteligente de Recursos Educacionais

Este projeto é uma aplicação Fullstack desenvolvida como solução para o Desafio Técnico da V-Lab. O objetivo principal é fornecer um repositório centralizado de materiais didáticos onde conteudistas são auxiliados por Inteligência Artificial para categorizar e descrever os recursos de forma automática.

## ✨ Funcionalidades

O sistema atende a todos os requisitos obrigatórios e inclui diferenciais desenvolvidos para melhorar a experiência do usuário:

* **CRUD Completo:** Listagem, Cadastro, Edição e Exclusão de materiais (suportando os tipos: Vídeo, PDF e Link).
* **Paginação Backend/Frontend:** Listagem otimizada de recursos limitando a quantidade de cards por página, garantindo performance.
* **Smart Assist (Integração com IA):** Formulário de cadastro com botão "Gerar Descrição com IA". O sistema envia o Título e Tipo para o Backend, que consulta a API de LLM e devolve uma descrição rica e sugestões de tags.
* **Loading States (Feedback Visual):** Indicadores visuais na interface informando o usuário quando a IA está "pensando" ou quando a lista de materiais está sendo carregada.
* **Tratamento de Erros:** Alertas amigáveis no frontend caso a API da IA falhe ou o backend recuse os dados.
* **🔥 Diferencial - Busca por Tags:** Barra de pesquisa implementada para filtrar os materiais listados na tela inicial diretamente pelo banco de dados.
* **🔥 Diferencial - API Health Check:** Rota `/health` no backend para monitoramento do status da API.

## 🛠️ Stack Tecnológica

**Frontend:**
* React.js (com Vite para build rápido)
* Hooks (`useState`, `useEffect`)
* CSS puro (Design responsivo e componentizado)

**Backend:**
* Python com FastAPI
* SQLAlchemy (ORM)
* Integração com API de LLM (Google Gemini / OpenAI)
* Pydantic para validação rígida de dados

## 🚀 Como Executar o Projeto Localmente

O projeto está dividido em duas pastas principais: `front` (Interface React) e `back` (API Python).

### 1. Configurando o Backend (API)
Abra um terminal na pasta `back`:

```bash
# Crie um ambiente virtual (recomendado)
python -m venv venv

# Ative o ambiente (Windows)
venv\Scripts\activate
# Ative o ambiente (Linux/Mac)
source venv/bin/activate

# Instale as dependências
pip install -r requirements.txt
```

### 2. Configurando o Frontend (React)
Abra um novo terminal na pasta `front`:

```bash
# Instale as dependências do projeto
npm install

# Inicie o servidor de desenvolvimento
npm run dev
```

# Notas pessoais:
## 1: 
Pensei em colocar o fronend e o backend na nuvem com deploys diferentes, mas desisiti da ideia em foquei em outra coisa por causa do tempo apertado
## 2: 
A barra de pesquisa aceita uma tag existente em algum documento, Pensei inicialmente em criar uma Busca Semântica (RAG) para a barra de pesquisa, onde a IA interpretaria o significado do que o usuário digitou para achar materiais parecidos. Porém, para manter o foco nos requisitos obrigatórios do teste e entregar no prazo, mantive uma busca exata por Tags no banco de dados
## 3: 
Deixei o banco de dados disponível no repositório porque nele já têm exemplos de documentos
