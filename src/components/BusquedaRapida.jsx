import React from 'react';
import '../styles/BusquedaRapida.css';

function BusquedaRapida() {
  return (
    <div className="busqueda-rapida-oval">
      <div className="links-container">
        <a href="/oficio1" className="link">Oficio 1</a>
        <a href="/oficio2" className="link">Oficio 2</a>
        <a href="/oficio3" className="link">Oficio 3</a>
        <a href="/oficio4" className="link">Oficio 4</a>
      </div>
      <div className="links-container">
        <a href="/oficio5" className="link">Oficio 5</a>
        <a href="/oficio6" className="link">Oficio 6</a>
        <a href="/oficio7" className="link">Oficio 7</a>
        <a href="/oficio8" className="link">Oficio 8</a>
      </div>
    </div>
  );
}

export default BusquedaRapida;
