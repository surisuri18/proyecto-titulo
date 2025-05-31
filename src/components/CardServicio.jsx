import React from 'react';
import { FaMapMarkerAlt } from 'react-icons/fa';
import '../styles/Components/CardServicio.css';
import Valoracion from './PrestadorServicio/Valoracion';

function CardServicio() {
  return (
    <div className="card-servicio">
      {/* Contenido izquierdo */}
      <div className="contenido-servicio">
        <div className="imagen-servicio"></div>
        <div>
          <h5>Nombre del Trabajador</h5>
          <p>Oficio.</p>

          <Valoracion></Valoracion>

        </div>
      </div>

      {/* Ubicación a la derecha */}
      <div className="ubicacion-servicio">
        <FaMapMarkerAlt className="icono-ubicacion" />
        <span>Región, Comuna</span>
      </div>
    </div>
  );
}

export default CardServicio;
