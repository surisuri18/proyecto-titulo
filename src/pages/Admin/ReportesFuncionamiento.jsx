import React, { useState } from 'react';
import '../../styles/PageStyles/ReportesFuncionamiento.css';

function ReportesFuncionamiento() {
  const [reportes, setReportes] = useState([
    {
      id: 1,
      usuario: {
        nombre: 'María Pérez',
        correo: 'maria@mail.com'
      },
      titulo: 'Problema con el registro',
      descripcion: 'No se puede registrar con correo Gmail.',
      resuelto: false
    },
    {
      id: 2,
      usuario: {
        nombre: 'Carlos Soto',
        correo: 'carlos@ejemplo.com'
      },
      titulo: 'Error al enviar mensaje',
      descripcion: 'El botón de enviar en el chat no responde.',
      resuelto: false
    }
  ]);

  const marcarComoResuelto = (id) => {
    const actualizados = reportes.map(r =>
      r.id === id ? { ...r, resuelto: true } : r
    );
    setReportes(actualizados);
  };

  return (
    <div className="reportes-container">
      <h2>Reportes de Funcionamiento</h2>

      {reportes.length === 0 ? (
        <p>No hay reportes pendientes.</p>
      ) : (
        <div className="lista-reportes">
          {reportes.map((r) => (
            <div key={r.id} className={`reporte-card ${r.resuelto ? 'resuelto' : ''}`}>
              <h4>{r.titulo}</h4>
              <p><strong>ID del reporte:</strong> #{r.id}</p>
              <p><strong>Usuario:</strong> {r.usuario.nombre}</p>
              <p><strong>Correo:</strong> {r.usuario.correo}</p>

              <div className="descripcion-bloque">
                <p><strong>Descripción del problema:</strong></p>
                <p>{r.descripcion}</p>
              </div>

              <p className="estado">Estado: {r.resuelto ? 'Resuelto ✅' : 'Pendiente 🕓'}</p>
              {!r.resuelto && (
                <button onClick={() => marcarComoResuelto(r.id)}>Marcar como resuelto</button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ReportesFuncionamiento;
