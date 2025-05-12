import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg custom-navbar">
      <div className="container d-flex justify-content-center">
        <Link className="navbar-brand m-0" to="/">
          <img
            src="/logo.png"
            alt="Logo"
            className="logo-navbar"
          />
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;

