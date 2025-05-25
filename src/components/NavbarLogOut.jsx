import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/NavbarLogOut.css';

import logo from '../assets/Logo2.png';

function NavbarLogOut() {
  return (
    <nav className="navbar navbar-expand-lg custom-navbar">
      <div className="container-fluid d-flex justify-content-between align-items-center">

        {/* Logo */}
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <img src={logo} alt="TuExpertoCerca" className="logo-navbar" />
        </Link>

        {/* Botones */}
        <div className="mx-auto d-flex gap-3">

          <Link to="/feature1" className="nav-btn">OFRECE TUS SERVICIOS</Link>
          <Link to="/feature2" className="nav-btn">INICIAR SESIÓN</Link>
          <Link to="/registeruser" className="nav-btn">REGÍSTRATE</Link>
        </div>
      </div>
    </nav>
  );
}

export default NavbarLogOut;
