import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';
import logo from '../assets/logoPROYECTOTITULO.png'; // Asegúrate de que la ruta sea correcta

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg custom-navbar">
      <div className="container d-flex justify-content-center">
        <Link className="navbar-brand m-0" to="/">
          <img
            src={logo}
            alt="Logoooooo"
            className="logo-navbar"
          />
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;

