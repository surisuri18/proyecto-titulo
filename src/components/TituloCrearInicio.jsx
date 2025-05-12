import React from 'react';
import '../styles/TituloCrearInicio.css';
//haciendo un comentario para probar si se me sube el commit
function TituloCrearInicio({ texto }) {
  return (
    <div className="titulo-crear-inicio-container">
      <h1 className="titulo-crear-inicio">{texto}</h1>
      <h1 className="titulo-crear-inicio">{texto}</h1> //duplico esto solo para ver si se hace el commit
    </div>
  );
}

export default TituloCrearInicio;
