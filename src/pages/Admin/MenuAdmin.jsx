import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/PageStyles/MenuAdmin.css';
import iconoOjo from '../../assets/IconosAdmin/IconoAdmin1.png';
import iconoPregunta from '../../assets/IconosAdmin/IconoAdmin2.png';
import iconoUsuarios from '../../assets/IconosAdmin/IconoAdmin3.png';

function MenuAdmin() {
  const navigate = useNavigate();

  return (
    <div className="menu-admin">
      <h2>¡Bienvenido! Administrador</h2>
      <p className="subtitulo">¿Qué hará hoy?</p>

      <div className="tarjeta-grid">
        <div className="tarjeta" onClick={() => navigate('/admin/reportes-usuarios')}>
          <img src={iconoOjo} alt="Icono ojos" />
          <p>Revisar reportes de usuarios</p>
        </div>

        <div className="tarjeta" onClick={() => navigate('/admin/reportes-app')}>
          <img src={iconoPregunta} alt="Icono pregunta" />
          <p>Revisar reportes de funcionamiento</p>
        </div>

        <div className="tarjeta" onClick={() => navigate('/admin/usuarios')}>
          <img src={iconoUsuarios} alt="Icono usuarios" />
          <p>Gestionar usuarios</p>
        </div>
      </div>
    </div>
  );
}

export default MenuAdmin;
