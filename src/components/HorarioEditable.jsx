import React from 'react';
import '../styles/Components/Horario.css';

const dias = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
const horas = [
  '08:00', '09:00', '10:00', '11:00',
  '12:00', '13:00', '14:00', '15:00',
  '16:00', '17:00', '18:00'
];

function HorarioEditable({ disponibilidad, onChange }) {
  const toggle = (dia, hora) => {
    const diaKey = dia.toLowerCase();
    const horasDia = disponibilidad[diaKey] || [];
    const newDispon = { ...disponibilidad };
    if (horasDia.includes(hora)) {
      newDispon[diaKey] = horasDia.filter(h => h !== hora);
    } else {
      newDispon[diaKey] = [...horasDia, hora];
    }
    onChange(newDispon);
  };

  return (
    <div className="horario-container">
      <h3 className="text-center mb-3">Disponibilidad semanal</h3>
      <div className="horario-tabla">
        <div className="horario-celda horario-header"></div>
        {dias.map(dia => (
          <div key={dia} className="horario-celda horario-header">{dia}</div>
        ))}
        {horas.map(hora => (
          <React.Fragment key={hora}>
            <div className="horario-celda horario-hora">{hora}</div>
            {dias.map(dia => {
              const activo = disponibilidad[dia.toLowerCase()]?.includes(hora);
              return (
                <div
                  key={`${dia}-${hora}`}
                  className={`horario-celda editable ${activo ? 'activo' : ''}`}
                  onClick={() => toggle(dia, hora)}
                >
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

export default HorarioEditable;
