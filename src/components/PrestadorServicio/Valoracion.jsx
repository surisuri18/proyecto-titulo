import React from 'react';

/**
 * Valoracion
 * Muestra una calificación de 0 a 5 usando estrellas.
 * Props:
 *  - rating: número (puede ser entero o decimal) entre 0 y 5
 *  - maxRating: número máximo de estrellas (por defecto 5)
 *  - onRate: callback cuando el usuario hace clic en una estrella (opcional)
 *  - readOnly: si es true, las estrellas no son clicables
 */
const Valoracion = ({ rating = 0, maxRating = 5, onRate, readOnly = true }) => {
  const stars = [];
  const floor = Math.floor(rating);

  for (let i = 1; i <= maxRating; i++) {
    let iconClass;
    if (i <= floor) {
      iconClass = 'bi-star-fill';   // llena
    } else if (i === floor + 1 && rating % 1 >= 0.5) {
      iconClass = 'bi-star-half';   // media estrella si rating decimal >= .5
    } else {
      iconClass = 'bi-star';        // vacía
    }

    stars.push(
      <button
        key={i}
        type="button"
        className="btn btn-link p-0 me-1 text-warning"
        onClick={() => !readOnly && onRate && onRate(i)}
        style={{ fontSize: '1.5rem', lineHeight: 1 }}
        disabled={readOnly}
      >
        <i className={`bi ${iconClass}`} />
      </button>
    );
  }

  return <div className="d-flex align-items-center">{stars}</div>;
};

export default Valoracion;
