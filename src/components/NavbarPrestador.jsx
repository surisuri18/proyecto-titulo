import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/NavbarPrestador.css'; // Asegúrate de que este archivo exista

function NavbarPrestador() {
  return (
    <nav className="navbar navbar-expand-lg custom-navbar">
      <div className="container-fluid d-flex justify-content-between align-items-center">
        {/* Logo a la izquierda */}
        <Link className="navbar-brand" to="/">
          <img src="/logo.png" alt="Logo" height="40" />
        </Link>

        {/* Botones centrados */}
        <div className="mx-auto d-flex gap-3">
          <Link to="/feature1" className="nav-btn btn">¡Busca un servicio!</Link>
          <Link to="/feature2" className="nav-btn btn">Cerrar Sesión</Link>
        </div>
      </div>
    </nav>
  );
}

export default NavbarPrestador;
