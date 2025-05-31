import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import espirales from '../assets/espirales.png';
import '../styles/Components/TituloCrearInicio.css';
//TituloCrearInicio.css

function TituloCrearInicio({ texto, height = '140px', fontSize = '3.5rem' }) {
  return (
    <div
      className="d-flex justify-content-center align-items-center text-center titulo-crear-inicio-container"
      style={{
        backgroundImage: `url(${espirales})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: height,
        width: '100%',
      }}
    >
      <h1
        className="m-0 fw-bold titulo-crear-inicio"
        style={{ fontSize }}
      >
        {texto}
      </h1>
    </div>
  );
}

export default TituloCrearInicio;
