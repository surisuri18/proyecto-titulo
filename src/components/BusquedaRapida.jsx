import React from 'react';
import '../styles/Components/BusquedaRapida.css';

function BusquedaRapida() {
  const oficios = [
    'FOTÓGRAFO', 'GÁSFITER', 'CERÁMICA', 'DEPILACIÓN',
    'SOLDADOR', 'OBRERO', 'ASEO DEL HOGAR', 'MANICURA',
  ];

  return (
    <div className="busqueda-wrapper">
      <h3 className="busqueda-titulo">Búsqueda Rápida</h3>

      <div className="busqueda-container">
        {oficios.map((oficio, index) => (
          <div key={index} className="busqueda-item">
            {oficio}
          </div>
        ))}
      </div>
    </div>
  );
}

export default BusquedaRapida;
