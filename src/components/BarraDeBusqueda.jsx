import React from 'react';
import { FaSearch } from 'react-icons/fa'; // Asegúrate de tener react-icons instalado
import '../styles/BarraDeBusqueda.css'; // Estilos externos si deseas más control

function BarraDeBusqueda() {
  return (
    <div className="search-container">
      <input
        type="text"
        className="search-input"
        placeholder="Buscar oficios..."
      />
      <div className="search-icon">
        <FaSearch />
      </div>
    </div>
  );
}

export default BarraDeBusqueda;
