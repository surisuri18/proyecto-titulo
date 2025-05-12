import React from 'react';
import '../styles/Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="social-icons">
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
          <i className="bi bi-facebook"></i>
        </a>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
          <i className="bi bi-instagram"></i>
        </a>
        <a href="https://x.com" target="_blank" rel="noopener noreferrer">
          <i className="bi bi-twitter-x"></i>
        </a>
      </div>
      <p className="legal-text">© 2025 miSitio. Todos los derechos reservados.</p>
    </footer>
  );
}

export default Footer;

