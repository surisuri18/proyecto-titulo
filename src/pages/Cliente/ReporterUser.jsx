import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/PageStyles/UserProfile.css';
import usuarioDefault from '../../assets/IconosUsuario/Hombre1.png';

export default function ReportUser({ usuario }) {
  const navigate = useNavigate();

  const datosUsuario = usuario || {
    nombre: 'Jimena Martínez',
    correo: 'jimena@ejemplo.com',
    foto: usuarioDefault
  };

  const handleReportar = () => {
    navigate('/reportar-usuario', { state: { usuario: datosUsuario } });
  };

  return (
    <div className="container perfil-usuario">
      <div className="card perfil-card shadow">
        <div className="card-body text-center">
          <img
            src={datosUsuario.foto}
            alt="Foto de perfil"
            className="foto-perfil rounded-circle mb-3 shadow-sm"
          />
          <h3 className="mb-2">{datosUsuario.nombre}</h3>
          <p className="text-muted mb-3">{datosUsuario.correo}</p>

          <button className="btn btn-outline-danger mt-3" onClick={handleReportar}>
            Reportar Usuario
          </button>
        </div>
      </div>
    </div>
  );
}
