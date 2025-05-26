import React, { useState } from 'react';
import '../styles/Soporte.css';

function Soporte() {
  const [titulo, setTitulo] = useState('');
  const [mensaje, setMensaje] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ titulo, mensaje });
    alert('Tu reporte ha sido enviado');
    setTitulo('');
    setMensaje('');
  };

  return (
    <div className="soporte-container">
      <h2>Centro de Ayuda</h2>
      <form onSubmit={handleSubmit} className="soporte-form">
        <label>Título del problema</label>
        <input
          type="text"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          required
        />

        <label>Describe lo que sucede</label>
        <textarea
          rows="5"
          value={mensaje}
          onChange={(e) => setMensaje(e.target.value)}
          required
        />

        <button type="submit">Enviar reporte</button>
      </form>
    </div>
  );
}

export default Soporte;
