import React from 'react';
import PropTypes from 'prop-types';

/**
 * DescriptionBox
 * Componente para que el prestador de servicios introduzca o muestre su descripción.
 * - Si recibe onChange: renderiza un textarea editable.
 * - Si no recibe onChange: muestra el texto en un div de solo lectura.
 *
 * Props:
 *  - description: texto de la descripción
 *  - onChange: función(valor) opcional; si existe, habilita edición.
 *  - placeholder: texto placeholder cuando está vacío
 *  - rows: número de filas del textarea (default 5)
 */
const DescriptionBox = ({ description, onChange, placeholder = 'Descripción de mis servicios y mi contacto', rows = 5 }) => {
  const commonClasses = 'border border-dark rounded p-3';

  if (typeof onChange === 'function') {
    return (
      <textarea
        className={`${commonClasses} form-control`}
        rows={rows}
        value={description}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
      />
    );
  }

  return (
    <div
      className={commonClasses}
      style={{ minHeight: `${rows * 1.5}rem`, whiteSpace: 'pre-wrap' }}
    >
      {description || <span className="text-muted">{placeholder}</span>}
    </div>
  );
};

DescriptionBox.propTypes = {
  description: PropTypes.string,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  rows: PropTypes.number,
};

export default DescriptionBox;
