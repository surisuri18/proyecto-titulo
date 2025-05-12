import React from 'react';
import '../styles/BarraDeBusqueda.css';
import { BsSearch } from 'react-icons/bs'; // Icono de lupa

function BarraDeBusqueda() {
  return (
    <div className="barra-busqueda-contenedor">
      <input
        type="text"
        placeholder="Buscar..."
        className="barra-busqueda-input"
      />
      <button className="barra-busqueda-boton">
        <BsSearch size={20} />
      </button>
    </div>
  );
}

export default BarraDeBusqueda;
