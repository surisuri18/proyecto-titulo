import React from 'react';
import '../styles/Horario.css';

const dias = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];

function Horario({ disponibilidad }) {
  const horas = [
    '08:00', '09:00', '10:00', '11:00',
    '12:00', '13:00', '14:00', '15:00',
    '16:00', '17:00', '18:00'
  ];

  return (
    <div className="horario-container">
      <h3 className="text-center mb-3">Disponibilidad semanal</h3>
      <div className="horario-tabla">
        <div className="horario-celda horario-header"></div>
        {dias.map((dia) => (
          <div key={dia} className="horario-celda horario-header">{dia}</div>
        ))}
        {horas.map((hora) => (
          <React.Fragment key={hora}>
            <div className="horario-celda horario-hora">{hora}</div>
            {dias.map((dia) => {
              const activo = disponibilidad[dia.toLowerCase()]?.includes(hora);
              return (
                <div key={`${dia}-${hora}`} className={`horario-celda ${activo ? 'activo' : ''}`}>
                  {activo ? '✓' : ''}
                </div>
              );
            })}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

export default Horario;
