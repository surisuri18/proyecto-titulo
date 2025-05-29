// src/components/MarcaDeAgua.jsx
import React from 'react';
import '../styles/Components/MarcaDeAgua.css';
import marca from '../assets/INICIO.png';

function MarcaDeAgua() {
  return <div className="marca-agua" style={{ backgroundImage: `url(${marca})` }} />;
}

export default MarcaDeAgua;
