import React from 'react';
import '../styles/TituloCrearInicio.css';

function TituloCrearInicio({ texto }) {
  return (
    <div className="titulo-crear-inicio-container">
      <h1 className="titulo-crear-inicio">{texto}</h1>
    </div>
  );
}

export default TituloCrearInicio;
