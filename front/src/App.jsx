import { useState } from 'react';
import Home from './components/Home';
import Cadastro from './components/Cadastro';

function App() {
  // A memória que guarda a tela inicial
  const [telaAtiva, setTelaAtiva] = useState('home');

  // Lógica de roteamento simples
  return (
    <>
      {telaAtiva === 'home' ? (
        <Home PaginadeCadastro={() => setTelaAtiva('cadastro')} />
      ) : (
        <Cadastro aoVoltar={() => setTelaAtiva('home')} />
      )}
    </>
  );
}

export default App;