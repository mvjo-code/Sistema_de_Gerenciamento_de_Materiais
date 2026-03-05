import { useState, useEffect } from 'react'; // Adicionamos os hooks do React
import './Home.css';
import MaterialCard from './material_card.jsx';

// estados para adicionar e editar material
function Home({ PaginadeCadastro }) {
  const [materiais, setMateriais] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [materialEmEdicao, setMaterialEmEdicao] = useState(null);

  //estados para o formulário de edicação
  const [titulo, setTitulo] = useState('');
  const [tipo, setTipo] = useState('Link');
  const [link, setLink] = useState('');
  const [descricao, setDescricao] = useState('');
  const [tags, setTags] = useState('');

  // estados para a paginação
  const [pagina, setPagina] = useState(1)
  const limit = 10;

  // estado para a busca
  const [termoBusca, setTermoBusca] = useState('');

  useEffect(() => {
    if (materialEmEdicao) {
      setTitulo(materialEmEdicao.titulo);
      setTipo(materialEmEdicao.tipo);
      setLink(materialEmEdicao.link);
      setDescricao(materialEmEdicao.descricao);
      setTags(materialEmEdicao.tags);
    }
    
  },[materialEmEdicao]);

  useEffect(() => {
    buscarMateriaisDoBanco();
  }, [pagina])

  // para colocar as informações na página:
  const buscarMateriaisDoBanco = async () => {
    setCarregando(true);
    try {

      // Página 1 = skip 0 | Página 2 = skip 10 | Página 3 = skip 20
      const skip = (pagina - 1) * limit;

      // Faz a requisição para a rota GET  no main.py
      const resposta = await fetch(`http://127.0.0.1:8000/materials/?skip=${skip}&limit=${limit}&busca=${termoBusca}`);
      const dados = await resposta.json();
      
      // Guarda os dados reais na memória do componente
      setMateriais(dados);
      setCarregando(false);
    } catch (erro) {
      console.error("Erro ao conectar com o Back-end:", erro);
      setCarregando(false);
    }
  };

  const handleExcluir = async (id) => {
    if (window.confirm("Tem certeza que deseja excluir permanentemente?")) {
      try {
        await fetch(`http://127.0.0.1:8000/materials/${id}`, {method: 'DELETE'});
        setMateriais(previ => previ.filter(m => m.id !== id));
      } catch (error) {
        alert("Erro ao excluir material.")
      }
    }
  }

  // função para editar
  const editarNoBanco = async (e) => {
    e.preventDefault();
    try {
      // 1. Transforma o texto "Tag1, Tag2" em uma lista ["Tag1", "Tag2"]
      // O Pydantic do FastAPI exige que as tags sejam um array/lista!
      const tagsArray = typeof tags === 'string' 
        ? tags.split(',').map(tag => tag.trim()).filter(tag => tag !== '') 
        : tags;

      const response = await fetch(`http://127.0.0.1:8000/materials/${materialEmEdicao.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          titulo: titulo, 
          tipo: tipo, 
          link: link, 
          descricao: descricao, 
          tags: tagsArray // <-- Enviando a lista certinha pro Python
        })
      });

      if (response.ok) {
        alert("Material atualizado!");
        setMaterialEmEdicao(null); // Fecha o modal
        buscarMateriaisDoBanco(); // Recarrega a lista
      } else {
        // Se o Python rejeitar 
        const erroBack = await response.json();
        alert("Erro no backend: " + JSON.stringify(erroBack));
      }
    } catch (error) {
      console.error("Erro ao editar:", error);
    }
  }

const handlePesquisar = () => {
  setPagina(1); // Sempre volta pra página 1 ao fazer uma pesquisa nova
  buscarMateriaisDoBanco(); // Puxa os dados com o filtro aplicado
};


  return (
    <div className="home-container">
      <header className='home-cabecalho'>
        <input type="text" 
        placeholder='Digite as tags do que procura...' 
        value={termoBusca}
        onChange={(e) => setTermoBusca(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handlePesquisar()}  // pesquisa quando clica em ENTER
        />
        <button className='btn-pesquisar' onClick={handlePesquisar}> pesquisar </button>
        <button onClick={PaginadeCadastro} className='btn-cadastro'>+ Cadastrar novo material</button>
      </header>
      
      <main className='corpo'>
      


      
      {materialEmEdicao && (  // pop up para o material em edicão
        <div className="modal-overlay"> 
          <div className="container">
            <h2>Editar Material</h2>
            <p>Ajuste as informações abaixo:</p>
            
            <form onSubmit={editarNoBanco}>
              <div className="campo">
                <label>Título:</label>
                <input 
                  type="text" 
                  value={titulo} 
                  onChange={(e) => setTitulo(e.target.value)}
                  required
                />
              </div>

              <div className="campo">
                <label>Tipo:</label>
                <select value={tipo} onChange={(e) => setTipo(e.target.value)}> 
                  <option value="Vídeo">Vídeo</option>
                  <option value="PDF">PDF</option>
                  <option value="Link">Link</option>
                </select>
              </div>
              <div className="campo">
                <label>Link:</label>
                <input 
                  type="url" 
                  value={link}
                  onChange={(e) => setLink(e.target.value)}
                />
              </div>
              <div className="campo">
                      <label>Descrição:</label>
                      <textarea rows="4" value={descricao} onChange={(e) => setDescricao(e.target.value)} required />
                    </div>

                    <div className="campo">
                      <label>Tags (separadas por vírgula):</label>
                      <input type="text" value={tags} onChange={(e) => setTags(e.target.value)} required />
                    </div>
        <div className="acoes-modal">
          <button type="submit" className="btn-salvar">Salvar Alterações</button>
          <button type="button" className="btn-cancelar" onClick={() => setMaterialEmEdicao(null)}>
            Cancelar
          </button>
        </div>
      </form>
    </div>
  </div>
)}



        { // continuação do main
        }
        <h2 className='titulo'>Materiais Cadastrados</h2>
        <p align-self="flex-start">Lista de materiais do V-Lab.</p>

        <div className='lista-de-materiais'>
          {carregando ? (
            <p>Carregando Materiais...</p>
          ) : (
            materiais.map((m) => (
              <MaterialCard
                key={m.id}
                material={m}
                onExcluir={handleExcluir}
                onEditar={(mat) => setMaterialEmEdicao(mat)}
              />
            ))
          )}
        </div>

        { // configurando esquema de paginação
            }

        <div className="paginacao">  
          <button 
            className="btn-paginacao" 
            onClick={() => setPagina(pagina - 1)} 
            disabled={pagina === 1}
          >
            {"<-"}
          </button>
          
          <span className="indicador-pagina">
             {pagina}
          </span>
          
          <button 
            className="btn-paginacao" 
            onClick={() => setPagina(pagina + 1)} 
            disabled={materiais.length < limit}
          >
            {"->"}
          </button>
        </div>



      </main>
    </div>
  );
}

export default Home;

