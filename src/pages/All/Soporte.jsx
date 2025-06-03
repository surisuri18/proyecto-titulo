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
    navigate('/reporte-enviado');
  };

  return (
    <div className="container py-5 soporte-wrapper">
      <div className="row justify-content-center">
        <div className="col-12 col-md-8 col-lg-6">
          <h2 className="text-center mb-4">Centro de Ayuda</h2>
          <form onSubmit={handleSubmit} className="soporte-form p-4 shadow rounded bg-white">
            <div className="mb-3">
              <label className="form-label">Título del problema</label>
              <input
                type="text"
                className="form-control"
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Describe lo que sucede</label>
              <textarea
                className="form-control"
                rows="5"
                value={mensaje}
                onChange={(e) => setMensaje(e.target.value)}
                required
              />
            </div>

            <div className="d-grid">
              <button type="submit" className="btn btn-primary btn-lg">
                Enviar reporte
              </button>
            </div>

            <p className="text-muted mt-3 small text-center soporte-info">
              * Tu reporte será revisado por un miembro del equipo. Recibirás una notificación cuando haya una respuesta.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Soporte;
