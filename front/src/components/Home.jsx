import { useState, useEffect } from 'react'; // Adicionamos os hooks do React
import './Home.css';

function Home({ PaginadeCadastro }) {
  const [materiais, setMateriais] = useState([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    buscarMateriaisDoBanco();
  }, []);

  const buscarMateriaisDoBanco = async () => {
    try {
      // Faz a requisição para a rota GET  no main.py
      const resposta = await fetch('http://127.0.0.1:8000/materials/');
      const dados = await resposta.json();
      
      // Guarda os dados reais na memória do componente
      setMateriais(dados);
      setCarregando(false);
    } catch (erro) {
      console.error("Erro ao conectar com o Back-end:", erro);
      setCarregando(false);
    }
  };

  return (
    <div className="home-container">
      <header className='home-cabecalho'>
        <input type="text" placeholder='Digite as tags do que procura...' />
        <button className='btn-pesquisar'> pesquisar </button>
        <button onClick={PaginadeCadastro} className='btn-cadastro'>+ Cadastrar novo material</button>
      </header>
      
      <main className='corpo'>
        <h2 className='titulo'>Materiais Cadastrados</h2>
        <p align-self="flex-start">Lista de materiais do V-Lab.</p>

        <div className='lista-de-materiais'>
          {carregando ? (
            <p>Carregando materiais do banco...</p>
          ) : (
            materiais.map((material) => (
              <div className="card-material" key={material.id}>
                <div className="card-cabecalho">
                  <h3>{material.titulo}</h3>
                  <span className="badge-tipo">{material.tipo}</span>
                </div>

                <p className="card-descricao">
                  {material.descricao}
                </p>

                <div className="card-tags">
                  {material.tags && material.tags.split(', ').map((tag, index) => (
                    <span className='tag' key={index}>#{tag.trim()}</span>
                  ))}
                </div>
                <button className="btn-acessar">Acessar Material</button>
              </div>
            ))
          )}

          {!carregando && materiais.length === 0 && (
            <p>Nenhum material encontrado no banco de dados.</p>
          )}
        </div>
      </main>
    </div>
  );
}

export default Home;