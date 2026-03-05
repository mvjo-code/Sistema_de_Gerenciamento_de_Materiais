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

# 💡 Notas Pessoais e Decisões de Projeto

**1. Sobre o Deploy:**
Eu até cheguei a planejar o deploy do frontend e do backend na nuvem separadamente. Porém, com o prazo do desafio apertado, decidi que seria mais estratégico focar na qualidade do código e em entregar os requisitos com excelência, em vez de correr riscos com problemas de infraestrutura de última hora.

**2. A Barra de Pesquisa (A ideia do RAG):**
A barra de pesquisa filtra o banco de dados buscando as tags exatas dos materiais. Confesso que minha ideia inicial era implementar uma Busca Semântica (RAG) para a IA interpretar o significado da busca e trazer resultados por contexto. Mas, para não fugir do escopo obrigatório e garantir a entrega no prazo, preferi manter o pé no chão e fazer a busca por tags funcionar redondinho!

**3. Banco de Dados "Na Mão":**
Deixei o arquivo do banco de dados local disponível no repositório de propósito. Fiz isso para facilitar a sua avaliação: assim que você rodar o projeto, já terá uma lista de documentos populada para testar a paginação e a interface logo de cara, sem precisar cadastrar tudo do zero.

**4. Links de Demonstração:**
Como os dados iniciais foram criados para testes, alguns materiais possuem links fictícios que podem dar erro 404 se você tentar acessar. Eles são puramente ilustrativos. Sinta-se à vontade para testar o botão "Editar" e trocar por um link real para ver o redirecionamento funcionando perfeitamente!

**5. Nota sobre responsividade:**
A página de cadastro está totalmente responsiva, contudo não tive tempo suficiente para tornar a página inicial (Home) responsiva também, no final do arquivo Home.css é possível ver o início incompleto do meu trabalho de responsividade da Home.
