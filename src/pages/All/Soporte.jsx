import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/PageStyles/Soporte.css';

function Soporte() {
  const [titulo, setTitulo] = useState('');
  const [mensaje, setMensaje] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ titulo, mensaje });

    // Aquí podrías guardar los datos si quieres mostrar un resumen
    navigate('/reporte-enviado');
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

        <p className="soporte-info">
          * Tu reporte será revisado por un miembro del equipo. Recibirás una notificación cuando haya una respuesta.
        </p>
      </form>
    </div>
  );
}

export default Soporte;
