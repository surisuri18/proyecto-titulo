import React from 'react';
import { FaMapMarkerAlt } from 'react-icons/fa';
import Valoracion from '../../components/PrestadorServicio/Valoracion';
import Horario from '../../components/Horario';
import '../../styles/PageStyles/ProviderProfile.css';
import fotoPerfil from '../../assets/imagenPerfil.jpeg';

const disponibilidadMock = {
  lunes: ['09:00', '10:00', '11:00'],
  martes: ['14:00', '15:00'],
  miercoles: [],
  jueves: ['09:00', '10:00', '11:00', '12:00'],
  viernes: ['16:00'],
  sabado: [],
  domingo: []
};

function ProviderProfile() {
  return (
    <div className="container mt-5">
      <div className="perfil-top">
        {/* Columna izquierda: foto + valoración + ubicación + botón */}
        <div className="perfil-columna">
          <div className="perfil-foto">
            <img src={fotoPerfil} alt="Foto del proveedor" />
          </div>

          <Valoracion valor={4} />

          <div className="perfil-ubicacion">
            <FaMapMarkerAlt className="ubicacion-icono" />
            <span>Región Metropolitana, Santiago</span>
          </div>

          <button className="btn-chat">Iniciar chat</button>
        </div>

        {/* Centro: nombre, oficio y descripción */}
        <div className="perfil-lado-derecho">
          <h2 className="perfil-nombre">María González</h2>
          <p className="perfil-oficio">Manicura</p>
          <p className="perfil-descripcion">
            Soy una profesional con más de 5 años de experiencia en diseño de uñas, estética femenina y atención a domicilio en Santiago. Me especializo en esmaltado permanente, diseños personalizados y cuidado de manos.
          </p>
        </div>

        {/* Derecha: galería de imágenes */}
        <div className="perfil-galeria">
          <div className="galeria-imagen"></div>
          <div className="galeria-imagen"></div>
          <div className="galeria-imagen"></div>
          <div className="galeria-imagen"></div>
        </div>
      </div>

      {/* Horario semanal */}
      <Horario disponibilidad={disponibilidadMock} />
    </div>
  );
}

export default ProviderProfile;


