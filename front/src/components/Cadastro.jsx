import { useState } from 'react';
import './Cadastro.css'; 

function Cadastro({ aoVoltar}) {
  const [titulo, setTitulo] = useState('');
  const [tipo, setTipo] = useState('Vídeo');
  const [link, setLink] = useState('');
  const [descricao, setDescricao] = useState('');
  const [tags, setTags] = useState('');


  // função para salvar o novo material no banco de dados
  const salvarNoBanco = async (evento) => {
    evento.preventDefault(); // pedindo pro react parar o comportamento padrão

    const tagsArray = tags.split(',').map(tag => tag.trim());

    const pacote = {
      titulo: titulo,
      tipo: tipo,
      descricao: descricao,
      link: link,
      tags: tagsArray
    };

    try {
      const resposta = await fetch('http://127.0.0.1:8000/materials/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // Avisando que o pacote é um JSON
        },
        body: JSON.stringify(pacote), // Transformando o objeto JS em texto JSON
      });

      if (resposta.ok) {
        const dados = await resposta.json();
        alert("✅ " + dados.mensagem); // Mostra o recibo do Back-end na tela!
        
        // limpando o formulário
        setTitulo('');
        setLink('');
        setDescricao('');
        setTags('');
      } else {
        alert("Erro: O servidor recusou os dados. Verifique os campos.");
      }
    } catch (erro) {
      alert("Erro de conexão. ");
      console.log(erro.mensagem)
    }
  };


  // função para solicitar a resposta da IA
  const GerarDescricaoIa = async () => {
    if (titulo == "") {

      alert ("ATENÇÃO: Digite um título para a ia poder trabalahar!")
      return;
    }

    setDescricao("✨ A IA está pensando... aguarde um instante");  // texto para melhorar a experiência do usuário

    try{
      const url = `http://127.0.0.1:8000/materials/suggest?titulo=${titulo}&tipo=${tipo}`;
      const resposta = await fetch(url);

      if (resposta.ok) {
        const dados = await resposta.json();
        setDescricao(dados.descricao);
        setTags(dados.tags.join(', '));
      } else {
        setDescricao("O servidor recusou o pedido, tente novamente");
      }

    } catch (error) {
      setDescricao("Erro de conexão com o servidor da IA");
      console.log(error.mensagem);
    }
  };

  return (
    <div className="container">
      <h2>Cadastrar</h2>
      <p>Cadastre um novo material!</p>
      
      <form onSubmit={salvarNoBanco}>
        
        <div className="campo">
          <label>Título:</label>
          <input 
            type="text" 
            placeholder="Ex: Crime e Castigo - Dostoiévski " 
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
          <label>Link/URL do Material:</label>
          <input 
            type="url" 
            placeholder="https://..." 
            value={link}
            onChange={(e) => setLink(e.target.value)}
          />
        </div>

        <button type="button" className="btn-ia" onClick={GerarDescricaoIa}>
          ✨ Gerar Descrição com IA
        </button>

        <hr />

        <div className="campo">
          <label>✨ Descrição Sugerida:</label>
          <textarea 
            rows="4" 
            placeholder="Não se preocupe, uma IA vai preecher este campo automaticamente..."
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            required
          ></textarea>
        </div>

        <div className="campo">
          <label>✨ Tags (separadas por vírgula):</label>
          <input 
            type="text" 
            placeholder="Ex: Matemática, Lógica, CIn..." 
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="btn-salvar">Salvar Material</button>
      </form>
      <div className='btn-voltar' onClick={aoVoltar}>
        {"<---"}
      </div>
    </div>
  );
}

export default Cadastro;