import React from 'react';
import '../styles/CardPrestadorPerfil.css';
import imagenPerfil from '../assets/imagenPerfil.jpeg';
import { FaMapMarkerAlt } from 'react-icons/fa';

function CardPrestadorPerfil({ imagenUrl, nombre, oficio, colorBarra, colorEtiqueta }) {
  return (
    <div className="card-prestador-perfil">
      {/* Imagen */}
      <div className="card-avatar">
        <img src={imagenUrl || imagenPerfil} alt="Foto del prestador" />
      </div>

      {/* Nombre */}
      <h3 className="card-nombre">{nombre}</h3>

      {/* Barras personalizadas */}
      <p className="card-campo"></p>
      <p className="card-campo"></p>

      {/* Icono de ubicación */}
      <div className="card-icono">
        <FaMapMarkerAlt />
      </div>

      {/* Barra de color personalizada */}
      <div className="card-barra" style={{ backgroundColor: colorBarra }}></div>

      {/* Etiqueta con oficio */}
      <div className="card-etiqueta" style={{ backgroundColor: colorEtiqueta }}>
        {oficio}
      </div>
    </div>
  );
}

export default CardPrestadorPerfil;

