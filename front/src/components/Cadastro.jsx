import { useState } from 'react';
import './Cadastro.css'; 

function Cadastro() {
  const [titulo, setTitulo] = useState('');
  const [tipo, setTipo] = useState('Vídeo');
  const [link, setLink] = useState('');
  const [descricao, setDescricao] = useState('');
  const [tags, setTags] = useState('');

  const salvarNoBanco = async (evento) => {
    evento.preventDefault(); 

    const tagsArray = tags.split(',').map(tag => tag.trim());

    const pacote = {
      titulo: titulo,
      tipo: tipo,
      descricao: descricao,
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
        
        setTitulo('');
        setLink('');
        setDescricao('');
        setTags('');
      } else {
        alert("❌ Erro: O servidor recusou os dados. Verifique os campos.");
      }
    } catch (erro) {
      alert("❌ Erro de conexão. O seu terminal com o servidor Python está ligado?");
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
            placeholder="Ex: Introdução à Matemática Discreta" 
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

        <button type="button" className="btn-ia">
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
    </div>
  );
}

export default Cadastro;