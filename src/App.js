import React, { useState, useEffect } from 'react';
import axios from 'axios'
import './css/style.css'

function App() {
  const [repositories, setRepositories] = useState({
  });

  async function loadRepositories() {
    const response = await axios.post(`http://localhost:3030/?`,
      {
        aeroporto: repositories.aeroportos,
        nuvens: repositories.nuvens,
        terreno: repositories.area
      });

    const data = await response.data;

    setRepositories({ ...repositories, ret: data });
  }

  useEffect(() => {
    if (repositories.nuvens || repositories.area || repositories.aeroportos) {
      loadRepositories();
    }
  }, [repositories.nuvens, repositories.area, repositories.aeroportos]);

  function enviar(event) {
    event.preventDefault();
    const data = new FormData(event.target);

    setRepositories({
      ...repositories,
      aeroportos: data.get('aeroportos'),
      nuvens: data.get('nuvens'),
      area: data.get('area')
    })
  }

  return (
    <>
      <div className="monitor">
        {repositories.ret && <div>
          <div className="mapas">
            {repositories.ret.mapas.map(mapa =>
              <div className="mapa">
                {mapa.map(linha =>
                  <div className="linha">{linha.map(celula =>
                    <span className="celula">{celula}</span>
                  )}</div>
                )}
              </div>
            )}
          </div>
          <p>Levará {repositories.ret.diasAeroportoCoberto} dias para o primeiro aeroporto ser coberto pelas nuvens.</p>
          <p>Levará {repositories.ret.dias} dias para que todos os aeroportos sejam cobertos pelas nuvens.</p>

        </div>}

      </div>

      <div className="form">
        <form onSubmit={enviar} >
          <p>Aeroportos: <input name="aeroportos" id="aeroportos" type="text" /></p>
          <p>Nuvens: <input name="nuvens" id="nuvens" type="text" /></p>
          <p>Área: <input name="area" id="area" type="text" /></p>
          <button>Enviar</button>

        </form>
      </div>
    </>

  );
}

export default App;
