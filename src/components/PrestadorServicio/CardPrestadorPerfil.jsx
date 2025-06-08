// src/components/CardPrestadorPerfil.jsx
import React from 'react';
import '../../styles/Components/CardPrestadorPerfil.css';
import imagenPerfil from '../../assets/imagenPerfil.jpeg';
import { FaMapMarkerAlt } from 'react-icons/fa';

//targeta de preview de un prestador de servicios
export default function CardPrestadorPerfil({
  imagenUrl,
  nombre,
  oficio,
  ubicacion,
  colorBarra,
  colorEtiqueta,
  onClick,       // nueva prop
  clickable = false // por defecto no clickable
}) {
  return (
    <div
      className="card-prestador-perfil"
      onClick={onClick}
      style={{ cursor: clickable ? 'pointer' : 'default' }}
    >
      {/* Avatar */}
      <div className="card-avatar">
        <img
          src={imagenUrl || imagenPerfil}
          alt={`Foto de ${nombre}`}
        />
      </div>

      {/* Nombre */}
      <h3 className="card-nombre">{nombre}</h3>

      {/* Ubicación debajo del nombre */}
      {ubicacion && (
        <div className="card-ubicacion">
          <FaMapMarkerAlt className="card-ubicacion-icono" />
          <span>{ubicacion}</span>
        </div>
      )}

      {/* Barra de color personalizada */}
      {colorBarra && (
        <div
          className="card-barra"
          style={{ backgroundColor: colorBarra }}
        ></div>
      )}

      {/* Etiqueta con el oficio */}
      {oficio && (
        <div
          className="card-etiqueta"
          style={{ backgroundColor: colorEtiqueta }}
        >
          {oficio}
        </div>
      )}
    </div>
  );
}
