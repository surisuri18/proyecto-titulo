import React, { useState, useRef, useEffect } from 'react';

/**
 * FilterButton usando Bootstrap 5
 * Props:
 *  - onFilter: callback que recibe 'location' o 'rating'
 */
const FilterButton = ({ onFilter }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  // Cierra dropdown al click fuera
  useEffect(() => {
    const handleClickOutside = e => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = type => {
    setOpen(false);
    if (onFilter) onFilter(type);
  };

  return (
    <div className="dropdown" ref={ref}>
      <button
        className="btn btn-outline-dark rounded-pill d-flex align-items-center justify-content-between"
        type="button"
        onClick={() => setOpen(prev => !prev)}
      >
        <span>Filtrar Servicio</span>
        <span className="ms-2">
          {/* Icono hamburguesa de Bootstrap Icons */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="currentColor"
            className="bi bi-list"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M2.5 12.5a.5.5 0 010-1h11a.5.5 0 010 1h-11zm0-4a.5.5 0 010-1h11a.5.5 0 010 1h-11zm0-4a.5.5 0 010-1h11a.5.5 0 010 1h-11z"
            />
          </svg>
        </span>
      </button>

      <ul className={`dropdown-menu${open ? ' show' : ''} mt-2 rounded`}>
        <li>
          <button className="dropdown-item" type="button" onClick={() => handleSelect('location')}>
            Por ubicación
          </button>
        </li>
        <li>
          <button className="dropdown-item" type="button" onClick={() => handleSelect('rating')}>
            Por valoración (más alta primero)
          </button>
        </li>
      </ul>
    </div>
  );
};

export default FilterButton;
