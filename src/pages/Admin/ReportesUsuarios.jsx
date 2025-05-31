import React, { useState } from 'react';
import '../../styles/PageStyles/ReportesUsuarios.css';

function ReportesUsuarios() {
  const [reportes, setReportes] = useState([
    {
      id: 101,
      reportado: { nombre: 'Pedro López', correo: 'pedro@correo.com' },
      reportante: { nombre: 'Ana Torres', correo: 'ana@gmail.com' },
      motivo: 'Conducta inapropiada',
      descripcion: 'El usuario fue grosero en el chat y usó lenguaje ofensivo.',
      visto: false
    },
    {
      id: 102,
      reportado: { nombre: 'Camila Díaz', correo: 'camila@correo.com' },
      reportante: { nombre: 'Luis Vargas', correo: 'luisv@gmail.com' },
      motivo: 'Incumplimiento de acuerdo',
      descripcion: 'No llegó a la cita agendada y no respondió mensajes.',
      visto: false
    }
  ]);

  const marcarComoVisto = (id) => {
    const actualizados = reportes.map(r =>
      r.id === id ? { ...r, visto: true } : r
    );
    setReportes(actualizados);
  };

  return (
    <div className="reportes-usuarios-container">
      <h2>Reportes de Usuarios</h2>

      {reportes.length === 0 ? (
        <p>No hay reportes pendientes.</p>
      ) : (
        <div className="lista-reportes-usuarios">
          {reportes.map((r) => (
            <div key={r.id} className={`reporte-usuario-card ${r.visto ? 'visto' : ''}`}>
              <h4>Reporte #{r.id}</h4>

              <div className="info-usuario">
                <div>
                  <p><strong>Usuario Reportado:</strong></p>
                  <p>{r.reportado.nombre}</p>
                  <p>{r.reportado.correo}</p>
                </div>
                <div>
                  <p><strong>Reportado Por:</strong></p>
                  <p>{r.reportante.nombre}</p>
                  <p>{r.reportante.correo}</p>
                </div>
              </div>

              <p><strong>Motivo:</strong> {r.motivo}</p>

              <div className="descripcion-bloque">
                <p><strong>Descripción:</strong></p>
                <p>{r.descripcion}</p>
              </div>

              <p className="estado">Estado: {r.visto ? 'Visto 👁️' : 'Pendiente 🕓'}</p>
              {!r.visto && (
                <button onClick={() => marcarComoVisto(r.id)}>Marcar como visto</button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ReportesUsuarios;
