import './Home.css';

function MaterialCard({material, onExcluir, onEditar}) {
    return (
        <div className="card-material" key={material.id}>
            <div className="card-cabecalho">
                <h3>{material.titulo}</h3>
                <span className="badge-tipo">{material.tipo}</span>
            </div>
            <div className='card-descricao-window'>
                <p className="card-descricao">
                {material.descricao}
                </p>
            </div>

            <div className="card-tags">
                {material.tags && material.tags.split(', ').map((tag, index) => (  //formatando as tags
                <span className='tag' key={index}>#{tag.trim()}</span>
                ))}
            </div>
            <div className='acoes'>

                <button className='btn-editar' onClick={() => onEditar(material)}> Editar</button>

                <button className='btn-acessar' onClick={() => window.open(material.link, '_blank')}> Acessar</button>

                <button className='btn-deletar' onClick={() => onExcluir(material.id)}> Deletar</button>
            </div>
        </div>
    );
}

export default MaterialCard;

