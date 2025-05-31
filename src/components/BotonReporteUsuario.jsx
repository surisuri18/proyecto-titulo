import React from 'react';
import { useNavigate } from 'react-router-dom';

function BotonReporteUsuario({ usuario }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/reportar-usuario?nombre=${encodeURIComponent(usuario)}`);
  };

  return (
    <button onClick={handleClick} className="btn-reporte-usuario">
      🚩 Reportar usuario
    </button>
  );
}

export default BotonReporteUsuario;
