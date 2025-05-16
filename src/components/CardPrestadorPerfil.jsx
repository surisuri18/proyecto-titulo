import React from 'react';
import '../styles/CardPrestadorPerfil.css';
import imagenPerfil from '../assets/imagenPerfil.jpeg';

function CardPrestadorPerfil({ imagenUrl, nombre }) {
  return (
    <div className="card-prestador-perfil">
      <div className="card-avatar">
        <img src={imagenPerfil} alt="Foto del prestador" />
      </div>
      <h3 className="card-nombre">{nombre}</h3>
      <p className="card-campo"></p>
      <p className="card-campo"></p>
    </div>
  );
}

export default CardPrestadorPerfil;
