import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/BotonAyuda.css';

function BotonAyuda() {
  const navigate = useNavigate();

  return (
    <button className="boton-ayuda" onClick={() => navigate('/soporte')}>
      ❓ Ayuda
    </button>
  );
}

export default BotonAyuda;
