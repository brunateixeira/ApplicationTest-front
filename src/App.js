import React, { useState, useEffect } from 'react';
import './css/style.css'

function App() {
  const [repositories, setRepositories] = useState({
    aeroportos: 5,
    nuvens: 8,
    area: '10x10',
  });

  async function loadRepositories() {
    const response = await fetch(`http://localhost:3030/?a=${repositories.aeroportos}&n=${repositories.nuvens}&t=${repositories.area}`);
    const data = await response.json();

    setRepositories({ ...repositories, ret: data });
  }

  // useEffect(() => {
  //   loadRepositories();
  // }, [repositories.nuvens, repositories.area, repositories.aeroportos, loadRepositories]);

  // function enviar() {

  // }

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
          <p>{repositories.ret.diasParaPrimeiroAeroporto} para o primeiro aeroporto ser coberto pelas nuvens</p>
          <p>{repositories.ret.dias} para todos aeroportos serem cobertos pelas nuvens</p>

        </div>}

      </div>

      {/* <div className="form">
        <p>Aeroportos: <input id="aeroportos" type="text" /></p>
        <p>Nuvens: <input id="nuvens" type="text" /></p>
        <p>Área: <input id="area" type="text" /></p>
        <p><input type="button" onClick={() => enviar()} /></p>
      </div> */}
    </>

  );
}

export default App;
