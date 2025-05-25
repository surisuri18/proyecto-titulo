import React from 'react';
import '../styles/BusquedaRapida.css';

function BusquedaRapida() {
  const oficios = [
    'FOTÓGRAFO', 'GÁSFITER', 'CERÁMICA', 'DEPILACIÓN',
    'SOLDADOR', 'OBRERO', 'ASEO DEL HOGAR', 'MANICURA',
  ];

  return (
    <div className="busqueda-container">
      {oficios.map((oficio, index) => (
        <div key={index} className="busqueda-item">
          {oficio}
        </div>
      ))}
    </div>
  );
}

export default BusquedaRapida;
