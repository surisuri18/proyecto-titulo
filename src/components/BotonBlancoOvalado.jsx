import React from 'react';
import '../styles/BotonBlancoOvalado.css';

const BotonBlancoOvalado = ({ texto, onClick }) => {
  return (
    <button className="boton-blanco-ovalado" onClick={onClick}>
      {texto}
    </button>
  );
};

export default BotonBlancoOvalado;
