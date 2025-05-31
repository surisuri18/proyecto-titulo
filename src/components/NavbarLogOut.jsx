import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Components/NavbarLogOut.css';
import logo from '../assets/Logo2.png';
import ImageDropdown from './ImageDropdown'; // 👈 importa tu dropdown

const usuarioActual = null;

function NavbarLogOut() {
  return (
    <nav className="navbar navbar-expand-lg custom-navbar px-3">
      <div className="container-fluid position-relative d-flex justify-content-between align-items-center">

        {/* Logo centrado */}
        <Link to="/" className="navbar-brand logo-centered">
          <img src={logo} alt="Logo" className="logo-navbar" />
        </Link>

        {/* Dropdown a la derecha */}
        <div className="ms-auto">
          <ImageDropdown />
        </div>
      </div>
    </nav>
  );
}

export default NavbarLogOut;
