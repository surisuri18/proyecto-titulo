import React from 'react';
import '../styles/BotonInicioRegistro.css';

function BotonInicioRegistro({ text, onClick }) {
  return (
    <button className="custom-login-button" onClick={onClick}>
      {text}
    </button>
  );
}

export default BotonInicioRegistro;
