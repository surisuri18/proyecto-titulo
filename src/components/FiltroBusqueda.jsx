import React, { useState, useRef, useEffect } from 'react';
import '../styles/FiltroBusqueda.css'; 

const FilterButton = ({ onFilter }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

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
    <div className="filtro-container" ref={ref}>
      <button
        className="filtro-btn"
        type="button"
        onClick={() => setOpen(prev => !prev)}
      >
        <span>FILTRAR SERVICIO</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          fill="currentColor"
          className="icono-lista"
          viewBox="0 0 16 16"
        >
          <path
            fillRule="evenodd"
            d="M2.5 12.5a.5.5 0 010-1h11a.5.5 0 010 1h-11zm0-4a.5.5 0 010-1h11a.5.5 0 010 1h-11zm0-4a.5.5 0 010-1h11a.5.5 0 010 1h-11z"
          />
        </svg>
      </button>

      {open && (
        <ul className="filtro-dropdown">
          <li onClick={() => handleSelect('location')}>Por ubicación</li>
          <li onClick={() => handleSelect('rating')}>Por valoración</li>
        </ul>
      )}
    </div>
  );
};

export default FilterButton;
