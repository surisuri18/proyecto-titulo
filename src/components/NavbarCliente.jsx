import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/NavbarCliente.css';  // Asegúrate de tener el archivo CSS correspondiente

function NavbarCliente() {
  return (
    <nav className="navbar navbar-expand-lg custom-navbar">
      <div className="container-fluid d-flex justify-content-between align-items-center">
        {/* Logo a la izquierda */}
        <Link className="navbar-brand" to="/">
          <img src="/logo.png" alt="Logo" height="40" />
        </Link>

        {/* Botones centrados */}
        <div className="mx-auto d-flex gap-3">
          <Link to="/feature1" className="nav-btn btn">¡Ofrece tus servicios</Link>
          <Link to="/feature2" className="nav-btn btn">Cerrar sesión</Link>
        </div>
      </div>
    </nav>
  );
}

export default NavbarCliente;
